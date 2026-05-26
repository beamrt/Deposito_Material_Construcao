import json
import uuid
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import get_object_or_404
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
    except Exception:
        return JsonResponse({'error': 'JSON inválido'}, status=400)

    if not email or not senha:
        return JsonResponse({'error': 'E-mail e senha são obrigatórios'}, status=400)

    user = authenticate(request, username=email, password=senha)

    if user is not None:
        if not user.ativo:
            AuditLog.objects.create(id_usuario=user, acao="Tentativa de login", tabela_afetada="usuario", detalhes="Usuário inativo tentou realizar login")
            return JsonResponse({'error': 'Esta conta foi inativada pelo administrador.'}, status=403)
        
        login(request, user)
        user.ultimo_login = models.functions.Now()
        user.save()


        primeira_loja = user.lojas.first()
        id_loja_contexto = primeira_loja.id_loja if primeira_loja else None

        AuditLog.objects.create(id_usuario=user, acao="Login efetuado com sucesso", tabela_afetada="usuario", id_registro=user.id_usuario)
        
        return JsonResponse({
            'message': 'Autenticado com sucesso',
            'usuario': {
                'id_usuario': user.id_usuario,
                'nome': user.nome,
                'email': user.email,
                'tipo_usuario': user.tipo_usuario,
                'loja_contexto_id': id_loja_contexto
            }
        })
    else:
        AuditLog.objects.create(acao="Falha de autenticação", tabela_afetada="usuario", detalhes=f"Tentativa inválida com o e-mail: {email}")
        return JsonResponse({'error': 'E-mail ou senha incorretos'}, status=401)

@csrf_exempt
def api_logout(request):
    logout(request)
    return JsonResponse({'message': 'Sessão encerrada'})

@csrf_exempt
def api_usuarios(request):
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'Não autorizado'}, status=401)
    
    if request.user.tipo_usuario not in ['ADMIN', 'GERENTE']:
        return JsonResponse({'error': 'Acesso proibido para este perfil'}, status=403)

    if request.method == 'GET':
        if request.user.tipo_usuario == 'ADMIN':
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
        except Exception:
            return JsonResponse({'error': 'JSON inválido'}, status=400)
        
        form = UsuarioAPIForm(body)
        if form.is_valid():
            user = form.save(commit=False)
            user.set_password(form.cleaned_data['senha'])
            user.ativo = True
            user.save()
            
            
            id_loja = body.get('id_loja')
            if id_loja:
                loja_obj = get_object_or_404(Loja, pk=id_loja)
                UsuarioLoja.objects.create(id_usuario=user, id_loja=loja_obj)
            
            AuditLog.objects.create(id_usuario=request.user, acao="Criou novo usuário", tabela_afetada="usuario", id_registro=user.id_usuario, detalhes=f"Criou o usuário {user.email}")
            return JsonResponse({'message': 'Usuário criado com sucesso'}, status=201)
        else:
            return JsonResponse({'errors': form.errors.get_json_data()}, status=400)

@csrf_exempt
def api_usuario_detail(request, pk):
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'Não autorizado'}, status=401)

    if request.user.tipo_usuario not in ['ADMIN', 'GERENTE']:
        return JsonResponse({'error': 'Acesso negado'}, status=403)

    if request.user.tipo_usuario == 'ADMIN':
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
        AuditLog.objects.create(id_usuario=request.user, acao="Inativou usuário", tabela_afetada="usuario", id_registro=user_target.id_usuario, detalhes="Executou a exclusão lógica")
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