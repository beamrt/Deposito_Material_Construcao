import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils import timezone
from django.core.validators import validate_email
from django.core.exceptions import ValidationError
from django.apps import apps
from .models import Cliente, ClienteEndereco
from .validators import validar_cpf_cnpj, validar_cep
from django.core.paginator import Paginator
from django.db.models import Q
from apps.usuarios.models import UsuarioLoja

def registrar_auditoria(request, acao, cliente_id, valores_alterados):
    try:
        AuditoriaModel = apps.get_model('auditoria', 'auditoria')
    except LookupError:
        try:
            AuditoriaModel = apps.get_model('auditoria', 'Auditoria')
        except LookupError:
            return
            
    usuario = request.user if request.user and request.user.is_authenticated else None

    AuditoriaModel.objects.create(
        usuario=usuario,
        acao=acao,
        cliente_affected_id=cliente_id,
        data_hora=timezone.now(),
        valores_alterados=json.dumps(valores_alterados)
    )

@csrf_exempt
def api_cliente_criar(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'Method not allowed'}, status=405)
    
    try:
        data = json.loads(request.body)
        nome = data.get('nome')
        cpf_cnpj = data.get('cpf_cnpj')
        telefone = data.get('telefone')
        email = data.get('email')

        if not nome or not cpf_cnpj:
            return JsonResponse({'error': 'Missing required fields'}, status=400)

        if Cliente.objects.filter(cpf_cnpj=cpf_cnpj).exists():
            return JsonResponse({'error': 'CPF/CNPJ already exists'}, status=400)

        if not validar_cpf_cnpj(cpf_cnpj):
            return JsonResponse({'error': 'Invalid CPF/CNPJ format'}, status=400)

        if email:
            try:
                validate_email(email)
            except ValidationError:
                return JsonResponse({'error': 'Invalid email format'}, status=400)

        cliente = Cliente.objects.create(
            nome=nome,
            cpf_cnpj=cpf_cnpj,
            telefone=telefone,
            email=email
        )

        registrar_auditoria(request, 'Criação', cliente.id_cliente, data)
        return JsonResponse({'id': cliente.id_cliente, 'message': 'Client created successfully'}, status=201)

    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)

@csrf_exempt
def api_cliente_editar(request, pk):
    if request.method != 'PUT':
        return JsonResponse({'error': 'Method not allowed'}, status=405)

    try:
        cliente = Cliente.objects.get(id_cliente=pk)
        data = json.loads(request.body)
        
        nome = data.get('nome', cliente.nome)
        telefone = data.get('telefone', cliente.telefone)
        email = data.get('email', cliente.email)

        if not nome:
            return JsonResponse({'error': 'Name cannot be empty'}, status=400)

        if email != cliente.email:
            try:
                validate_email(email)
            except ValidationError:
                return JsonResponse({'error': 'Invalid email format'}, status=400)

        valores_alterados = {}
        if nome != cliente.nome: valores_alterados['nome'] = {'antes': cliente.nome, 'depois': nome}
        if telefone != cliente.telefone: valores_alterados['telefone'] = {'antes': cliente.telefone, 'depois': telefone}
        if email != cliente.email: valores_alterados['email'] = {'antes': cliente.email, 'depois': email}

        cliente.nome = nome
        cliente.telefone = telefone
        cliente.email = email
        cliente.save()

        if valores_alterados:
            registrar_auditoria(request, 'Edição', cliente.id_cliente, valores_alterados)

        return JsonResponse({'message': 'Client updated successfully'})

    except Cliente.DoesNotExist:
        return JsonResponse({'error': 'Client not found'}, status=404)
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)

@csrf_exempt
def api_cliente_inativar(request, pk):
    if request.method != 'DELETE':
        return JsonResponse({'error': 'Method not allowed'}, status=405)

    try:
        cliente = Cliente.objects.get(id_cliente=pk)
        
        registrar_auditoria(request, 'Inativação', cliente.id_cliente, {'status': 'inativo'})
        return JsonResponse({'message': 'Client inactivated successfully'})

    except Cliente.DoesNotExist:
        return JsonResponse({'error': 'Client not found'}, status=404)

@csrf_exempt
def api_endereco_gerenciar(request, cliente_pk):
    if not Cliente.objects.filter(id_cliente=cliente_pk).exists():
        return JsonResponse({'error': 'Client not found'}, status=404)

    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            rua = data.get('rua')
            numero = data.get('numero')
            complemento = data.get('complemento')
            bairro = data.get('bairro')
            cidade = data.get('cidade')
            estado = data.get('estado')
            cep = data.get('cep')

            if not all([rua, numero, bairro, cidade, estado, cep]):
                return JsonResponse({'error': 'Missing required fields'}, status=400)

            if not validar_cep(cep):
                return JsonResponse({'error': 'Invalid CEP format'}, status=400)

            endereco = ClienteEndereco.objects.create(
                rua=rua,
                numero=numero,
                complemento=complemento,
                bairro=bairro,
                cidade=cidade,
                estado=estado,
                cep=cep
            )
            return JsonResponse({'id': endereco.id_endereco, 'message': 'Address created successfully'}, status=201)
        except json.JSONDecodeError:
            return JsonResponse({'error': 'Invalid JSON'}, status=400)

    return JsonResponse({'error': 'Method not allowed'}, status=405)

@csrf_exempt
def api_cliente_listar(request):
    if request.method != 'GET':
        return JsonResponse({'error': 'Method not allowed'}, status=405)

    clientes = Cliente.objects.all()
    if not request.user.is_superuser:
        pass 

    termo = request.GET.get('q', '')
    if termo:
        clientes = clientes.filter(Q(nome__icontains=termo) | Q(cpf_cnpj__icontains=termo))

    clientes = clientes.order_by('nome')

    page_number = request.GET.get('page', 1)
    paginator = Paginator(clientes, 10) 
    page_obj = paginator.get_page(page_number)

    data = [{
        'id': c.id_cliente,
        'nome': c.nome,
        'cpf_cnpj': c.cpf_cnpj
    } for c in page_obj]

    return JsonResponse({
        'clientes': data,
        'total_paginas': paginator.num_pages,
        'pagina_atual': page_obj.number
    })

@csrf_exempt
def api_cliente_listar(request):
    if request.method != 'GET':
        return JsonResponse({'error': 'Method not allowed'}, status=405)

    clientes = Cliente.objects.all()

    if request.user and request.user.is_authenticated:
        if not request.user.is_superuser:
            try:
                usuario_loja = UsuarioLoja.objects.get(id_usuario=request.user.id)
                clientes = clientes.filter(id_loja=usuario_loja.id_loja)
            except UsuarioLoja.DoesNotExist:
                clientes = Cliente.objects.none()

    termo = request.GET.get('q', '')
    if termo:
        clientes = clientes.filter(Q(nome__icontains=termo) | Q(cpf_cnpj__icontains=termo))

    clientes = clientes.order_by('nome')

    try:
        page_number = int(request.GET.get('page', 1))
    except ValueError:
        page_number = 1
        
    paginator = Paginator(clientes, 6)
    page_obj = paginator.get_page(page_number)

    data = [{
        'id': c.id_cliente,
        'nome': c.nome,
        'cpf_cnpj': c.cpf_cnpj,
        'telefone': c.telefone,
        'email': c.email
    } for c in page_obj]

    return JsonResponse({
        'clientes': data,
        'total_paginas': paginator.num_pages,
        'pagina_atual': page_obj.number,
        'total_clientes': paginator.count
    })