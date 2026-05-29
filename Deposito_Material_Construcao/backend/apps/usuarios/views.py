import json
import uuid
import re
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import get_object_or_404
from django.utils import timezone

from apps.auditoria.models import AuditLog
from .models import Usuario, UsuarioLoja
from apps.lojas.models import Loja

@csrf_exempt
def api_login(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'Método não permitido'}, status=405)
    
    try:
        data = json.loads(request.body)
        email = data.get('email')
        senha = data.get('senha')
        id_loja_selecionada = data.get('id_loja')
    except Exception:
        return JsonResponse({'error': 'JSON inválido'}, status=400)

    if not email or not senha or not id_loja_selecionada:
        return JsonResponse({'error': 'E-mail, senha e unidade são obrigatórios'}, status=400)

    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    ip_cliente = x_forwarded_for.split(',')[0] if x_forwarded_for else request.META.get('REMOTE_ADDR')

    user = authenticate(request, username=email, password=senha)

    if user is not None:
        if not user.ativo:
            AuditLog.objects.create(
                id_usuario=user, acao="Tentativa de login", tabela_afetada="usuario", 
                detalhes=f"Usuário inativo tentou logar. IP: {ip_cliente}"
            )
            return JsonResponse({'error': 'Esta conta foi inativada pelo administrador.'}, status=403)
        
        pertence_a_loja = user.lojas.filter(id_loja=id_loja_selecionada).exists()
        if not pertence_a_loja and user.tipo_usuario != 'MASTER':
            AuditLog.objects.create(
                id_usuario=user, acao="Login Negado - Unidade Incorreta", tabela_afetada="usuario", 
                detalhes=f"Tentou acessar a unidade {id_loja_selecionada} sem permissão. IP: {ip_cliente}"
            )
            return JsonResponse({'error': 'Acesso negado para esta unidade organizacional.'}, status=403)
        
        login(request, user)
        user.ultimo_login = timezone.now()
        user.save()

        request.session['tenant_id'] = int(id_loja_selecionada)

        AuditLog.objects.create(
            id_usuario=user, acao="Login efetuado com sucesso", tabela_afetada="usuario", 
            id_registro=user.id_usuario, detalhes=f"IP: {ip_cliente} | Unidade/Tenant: {id_loja_selecionada}"
        )
        
        return JsonResponse({
            'message': 'Autenticado com sucesso',
            'usuario': {
                'id_usuario': user.id_usuario,
                'nome': user.nome,
                'email': user.email,
                'tipo_usuario': user.tipo_usuario,
                'loja_contexto_id': id_loja_selecionada
            }
        })
    else:
        AuditLog.objects.create(
            acao="Falha de autenticação", tabela_afetada="usuario", 
            detalhes=f"Tentativa inválida com e-mail: {email} | IP: {ip_cliente}"
        )
        return JsonResponse({'error': 'E-mail ou senha incorretos'}, status=401)

@csrf_exempt
def api_logout(request):
    logout(request)
    return JsonResponse({'message': 'Sessão encerrada'})

@csrf_exempt
def api_usuarios(request):
    if request.method == 'GET':
        if not request.user.is_authenticated:
            return JsonResponse({'error': 'Não autorizado'}, status=401)
        
        if request.user.tipo_usuario not in ['MASTER', 'ADMIN', 'GERENTE']:
            return JsonResponse({'error': 'Acesso proibido para este perfil'}, status=403)

        if request.user.tipo_usuario in ['ADMIN', 'MASTER']:
            usuarios = Usuario.objects.all()
        else:
            lojas_do_gerente = request.user.lojas.all()
            usuarios = Usuario.objects.filter(lojas__in=lojas_do_gerente).distinct()
            
        data = [{
            'id_usuario': u.id_usuario,
            'nome': u.nome,
            'email': u.email,
            'tipo_usuario': u.tipo_usuario,
            'ativo': u.ativo,
            'lojas': [l.nome for l in u.lojas.all()]
        } for u in usuarios]
        return JsonResponse({'usuarios': data})

    elif request.method == 'POST':
        try:
            body = json.loads(request.body)
            senha = body.get('senha')
            confirmacao_senha = body.get('confirmacao_senha')
            cpf = body.get('cpf')
            email = body.get('email')
            nome = body.get('nome')
        except Exception:
            return JsonResponse({'error': 'JSON inválido'}, status=400)
        
        if not nome or not email or not senha or not confirmacao_senha or not cpf:
            return JsonResponse({
                'error': 'Todos os campos (nome, email, cpf, senha e confirmacao_senha) são obrigatórios.'
            }, status=400)
        
        if senha != confirmacao_senha:
            return JsonResponse({'error': 'A senha e a confirmação de senha não coincidem.'}, status=400)
        
        if len(senha) < 8 or not re.search(r"[A-Z]", senha) or not re.search(r"[0-9]", senha):
            return JsonResponse({
                'error': 'A senha deve possuir no mínimo 8 caracteres, contendo ao menos 1 letra maiúscula e 1 número.'
            }, status=400)

        if Usuario.objects.filter(email=email).exists():
            return JsonResponse({'error': 'Este e-mail já está cadastrado.'}, status=400)

        try:
            user = Usuario.objects.create_user(
                email=email,
                nome=nome,
                cpf=cpf,
                password=senha,
                tipo_usuario='FUNCIONARIO'
            )
            user.ativo = True
            user.save()
        except ValueError as err_modelo:
            return JsonResponse({'error': str(err_modelo)}, status=400)
        except Exception as e:
            print(f'ERRO FATAL AO CRIAR O USUÁRIO: {repr(e)}')
            return JsonResponse({'error': 'Erro interno ao salvar os dados do usuário.'}, status=500)
        
        id_loja = body.get('id_loja')
        if id_loja:
            loja_obj = get_object_or_404(Loja, pk=id_loja)
            UsuarioLoja.objects.create(id_usuario=user, id_loja=loja_obj)
        
        usuario_autor = request.user if request.user.is_authenticated else user
        AuditLog.objects.create(
            id_usuario=usuario_autor, acao="Autocadastro realizado", tabela_afetada="usuario", 
            id_registro=user.id_usuario, detalhes=f"O usuário comum {user.email} realizou o cadastro e aguarda definição de unidade."
        )
        return JsonResponse({'message': 'Usuário cadastrado com sucesso! Aguarde a liberação de acessos pelo administrador.'}, status=201)

@csrf_exempt
def api_usuario_detail(request, pk):
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'Não autorizado'}, status=401)

    if request.user.tipo_usuario not in ['MASTER', 'ADMIN', 'GERENTE']:
        return JsonResponse({'error': 'Acesso negado'}, status=403)

    if request.user.tipo_usuario in ['ADMIN', 'MASTER']:
        user_target = get_object_or_404(Usuario, pk=pk)
    else:
        lojas_do_gerente = request.user.lojas.all()
        user_target = get_object_or_404(Usuario, pk=pk, lojas__in=lojas_do_gerente)

    if request.method == 'PUT':
        try:
            body = json.loads(request.body)
        except Exception:
            return JsonResponse({'error': 'JSON inválido'}, status=400)

        user_target.nome = body.get('nome', user_target.nome)
        user_target.tipo_usuario = body.get('tipo_usuario', user_target.tipo_usuario)
        user_target.save()
        
        AuditLog.objects.create(id_usuario=request.user, acao="Editou usuário", tabela_afetada="usuario", id_registro=user_target.id_usuario)
        return JsonResponse({'message': 'Usuário atualizado com sucesso'})

    elif request.method == 'DELETE':
        user_target.ativo = False
        user_target.save()
        
        AuditLog.objects.create(
            id_usuario=request.user, acao="Inativou usuário", tabela_afetada="usuario", 
            id_registro=user_target.id_usuario, detalhes=f"Inativado por {request.user.email} - Exclusão Lógica"
        )
        return JsonResponse({'message': 'Usuário inativado logicamente com sucesso'})

@csrf_exempt
def api_recuperar_senha(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'Método não permitido'}, status=405)
        
    try:
        data = json.loads(request.body)
        email = data.get('email')
    except Exception:
        return JsonResponse({'error': 'JSON inválido'}, status=400)
        
    user = Usuario.objects.filter(email=email).first()
    if user:
        token = uuid.uuid4().hex
        return JsonResponse({
            'message': 'Link de redefinição enviado para o e-mail informado.',
            'token_simulado': token,
            'url_front_sugerida': f'http://localhost:3000/reset-password?token={token}'
        })
    return JsonResponse({'message': 'Se o e-mail existir no sistema, um link foi enviado.'})

@csrf_exempt
def api_alternar_unidade(request):
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'Não autorizado'}, status=401)
        
    if request.user.tipo_usuario != 'MASTER':
        return JsonResponse({'error': 'Apenas usuários MASTER podem alternar entre unidades corporativas.'}, status=403)
        
    if request.method != 'POST':
        return JsonResponse({'error': 'Método não permitido'}, status=405)
        
    try:
        data = json.loads(request.body)
        nova_loja_id = data.get('id_loja')
    except Exception:
        return JsonResponse({'error': 'JSON inválido'}, status=400)
        
    if not nova_loja_id:
        return JsonResponse({'error': 'O ID da nova loja é obrigatório.'}, status=400)
        
    loja_existe = Loja.objects.filter(pk=nova_loja_id).exists()
    if not loja_existe:
        return JsonResponse({'error': 'Unidade organizacional não encontrada.'}, status=404)
        
    antigo_tenant = request.session.get('tenant_id')
    request.session['tenant_id'] = int(nova_loja_id)
    
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    ip_cliente = x_forwarded_for.split(',')[0] if x_forwarded_for else request.META.get('REMOTE_ADDR')
    
    AuditLog.objects.create(
        id_usuario=request.user,
        acao="Troca de Unidade (Master)",
        tabela_afetada="usuario",
        detalhes=f"IP: {ip_cliente} | Mudou da unidade {antigo_tenant} para a unidade {nova_loja_id}"
    )
    
    return JsonResponse({
        'message': 'Contexto de unidade alternado com sucesso.',
        'loja_contexto_id': request.session['tenant_id']
    })

class TenantMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        request.tenant_id = request.session.get('tenant_id', None)
        response = self.get_response(request)
        return response