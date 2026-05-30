import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db import transaction
from django.db.models import Q, Sum, F
from .models import Estoque
from apps.auditoria.models import AuditLog
from apps.produtos.models import Produto
from apps.lojas.models import Loja
from apps.usuarios.models import Usuario

@csrf_exempt
def api_estoque_list(request):
    if request.method == 'GET':
        busca = request.GET.get('busca')
        categoria_id = request.GET.get('categoria')
        loja_id = request.GET.get('loja')

        lista_estoque = Estoque.objects.select_related('id_produto', 'id_loja', 'id_produto__id_categoria').all()

        if busca:
            lista_estoque = lista_estoque.filter(id_produto__nome__icontains=busca)
        if categoria_id:
            lista_estoque = lista_estoque.filter(id_produto__id_categoria=categoria_id)
        if loja_id:
            lista_estoque = lista_estoque.filter(id_loja=loja_id)

        data = [{
            'id_estoque': e.id_estoque,
            'id_loja': e.id_loja.id_loja,
            'nome_loja': e.id_loja.nome,
            'id_produto': e.id_produto.id_produto,
            'nome_produto': e.id_produto.nome,
            'categoria': e.id_produto.id_categoria.nome if e.id_produto.id_categoria else "Sem Categoria",
            'quantidade': e.quantidade,
            'estoque_minimo': e.estoque_minimo,
            'estoque_maximo': e.estoque_maximo,
            'localizacao': e.localizacao,
            'status_critico': e.quantidade <= e.estoque_minimo,
            'data_atualizacao': e.data_atualizacao
        } for e in lista_estoque]

        return JsonResponse({'estoque': data})

    elif request.method == 'POST':
        try:
            body = json.loads(request.body)
            id_produto = body.get('id_produto')
            id_loja = body.get('id_loja')
            quantidade = int(body.get('quantidade', 0))
            estoque_minimo = int(body.get('estoque_minimo', 0))
            estoque_maximo = body.get('estoque_maximo')
            localizacao = body.get('localizacao')
            id_usuario = body.get('id_usuario', 1)
        except Exception:
            return JsonResponse({'error': 'JSON inválido.'}, status=400)

        if quantidade < 0:
            return JsonResponse({'error': 'Quantidade inicial não pode ser negativa.'}, status=400)

        try:
            produto_obj = Produto.objects.get(pk=id_produto)
            loja_obj = Loja.objects.get(pk=id_loja)
            usuario_obj = Usuario.objects.get(pk=id_usuario)

            with transaction.atomic():
                novo_estoque = Estoque.objects.create(
                    id_loja=loja_obj,
                    id_produto=produto_obj,
                    quantidade=quantidade,
                    estoque_minimo=estoque_minimo,
                    estoque_maximo=int(estoque_maximo) if estoque_maximo else None,
                    localizacao=localizacao
                )
                
                # Salvando no formato exato das colunas do seu banco
                AuditLog.objects.create(
                    id_usuario=usuario_obj,
                    acao='CADASTRO_INICIAL',
                    tabela_afetada='estoque',
                    id_registro=novo_estoque.id_estoque,
                    detalhes=f"Estoque inicial de {quantidade} unidades criado para o produto '{produto_obj.nome}' na loja '{loja_obj.nome}'."
                )

            return JsonResponse({'message': 'Estoque inicial registrado com sucesso.'}, status=201)
        except Exception as err:
            return JsonResponse({'error': str(err)}, status=400)


@csrf_exempt
def api_movimentar_estoque(request):
    if request.method == 'POST':
        try:
            body = json.loads(request.body)
            id_produto = body.get('id_produto')
            id_loja = body.get('id_loja')
            tipo = body.get('tipo')
            qtd_movimento = int(body.get('quantidade', 0))
            id_usuario = body.get('id_usuario', 1)
        except Exception:
            return JsonResponse({'error': 'Dados inválidos.'}, status=400)

        try:
            produto_obj = Produto.objects.get(pk=id_produto)
            loja_obj = Loja.objects.get(pk=id_loja)
            usuario_obj = Usuario.objects.get(pk=id_usuario)

            with transaction.atomic():
                estoque = Estoque.objects.select_for_update().get(id_produto=produto_obj, id_loja=loja_obj)
                qtd_anterior = estoque.quantidade

                if tipo == 'ENTRADA':
                    estoque.quantidade += qtd_movimento
                elif tipo == 'SAIDA':
                    if estoque.quantidade < qtd_movimento:
                        AuditLog.objects.create(
                            id_usuario=usuario_obj,
                            acao='FALHA_SAIDA_NEGATIVA',
                            tabela_afetada='estoque',
                            id_registro=estoque.id_estoque,
                            detalhes=f"Tentativa de saída de {qtd_movimento} un falhou. Saldo atual: {qtd_anterior} un. Produto: '{produto_obj.nome}'."
                        )
                        return JsonResponse({'error': 'Operação cancelada: Saldo insuficiente para essa saída.'}, status=400)
                    
                    estoque.quantidade -= qtd_movimento

                estoque.save()

                # Salvando movimentação bem-sucedida usando suas colunas reais
                AuditLog.objects.create(
                    id_usuario=usuario_obj,
                    acao=tipo,
                    tabela_afetada='estoque',
                    id_registro=estoque.id_estoque,
                    detalhes=f"Movimentação de {tipo}: {qtd_movimento} un. Qtd Anterior: {qtd_anterior} | Nova Qtd: {estoque.quantidade}. Produto: '{produto_obj.nome}'."
                )

            return JsonResponse({'message': 'Movimentação processada!', 'saldo_atual': estoque.quantidade})
        except Estoque.DoesNotExist:
            return JsonResponse({'error': 'Estoque não encontrado para este produto nesta loja.'}, status=404)
        except Exception as err:
            return JsonResponse({'error': str(err)}, status=500)


@csrf_exempt
def api_transferir_estoque(request):
    if request.method == 'POST':
        try:
            body = json.loads(request.body)
            id_produto = body.get('id_produto')
            id_loja_origem = body.get('id_loja_origem')
            id_loja_destino = body.get('id_loja_destino')
            quantidade = int(body.get('quantidade', 0))
            id_usuario = body.get('id_usuario', 1)
        except Exception:
            return JsonResponse({'error': 'Dados inválidos.'}, status=400)

        if id_loja_origem == id_loja_destino:
            return JsonResponse({'error': 'As unidades de origem e destino devem ser diferentes.'}, status=400)

        if quantidade <= 0:
            return JsonResponse({'error': 'A quantidade de transferência deve ser maior que zero.'}, status=400)

        try:
            produto_obj = Produto.objects.get(pk=id_produto)
            loja_origem_obj = Loja.objects.get(pk=id_loja_origem)
            loja_destino_obj = Loja.objects.get(pk=id_loja_destino)
            usuario_obj = Usuario.objects.get(pk=id_usuario)

            with transaction.atomic():
                estoque_origem = Estoque.objects.select_for_update().get(id_produto=produto_obj, id_loja=loja_origem_obj)
                
                if estoque_origem.quantidade < quantidade:
                    return JsonResponse({'error': 'Saldo insuficiente na unidade de origem.'}, status=400)
                
                estoque_destino, created = Estoque.objects.select_for_update().get_or_create(
                    id_produto=produto_obj,
                    id_loja=loja_destino_obj,
                    defaults={'quantidade': 0, 'estoque_minimo': 0}
                )

                origem_anterior = estoque_origem.quantidade
                destino_anterior = estoque_destino.quantidade

                estoque_origem.quantidade -= quantidade
                estoque_destino.quantidade += quantidade

                estoque_origem.save()
                estoque_destino.save()

                # Registro de Transferência
                AuditLog.objects.create(
                    id_usuario=usuario_obj,
                    acao='TRANSFERENCIA',
                    tabela_afetada='estoque',
                    id_registro=estoque_origem.id_estoque,
                    detalhes=f"Transferido {quantidade} un do produto '{produto_obj.nome}' da Loja '{loja_origem_obj.nome}' (Anterior: {origem_anterior} | Atual: {estoque_origem.quantidade}) para Loja '{loja_destino_obj.nome}' (Anterior: {destino_anterior} | Atual: {estoque_destino.quantidade})."
                )

            return JsonResponse({'message': 'Transferência concluída com sucesso!'})
        except Estoque.DoesNotExist:
            return JsonResponse({'error': 'Registro de estoque de origem não localizado.'}, status=404)
        except Exception as err:
            return JsonResponse({'error': str(err)}, status=500)


def api_dashboard_estoque(request):
    if request.method == 'GET':
        loja_id = request.GET.get('loja')
        
        queryset = Estoque.objects.all()
        auditoria_queryset = AuditLog.objects.filter(tabela_afetada='estoque').select_related('id_usuario')
        
        if loja_id:
            queryset = queryset.filter(id_loja=loja_id)

        total_itens = queryset.aggregate(total=Sum('quantidade'))['total'] or 0
        
        produtos_criticos = queryset.filter(quantidade__lte=F('estoque_minimo')).select_related('id_produto', 'id_loja')
        criticos_data = [{
            'id_produto': p.id_produto.id_produto,
            'nome_produto': p.id_produto.nome,
            'loja': p.id_loja.nome,
            'quantidade': p.quantidade,
            'estoque_minimo': p.estoque_minimo
        } for p in produtos_criticos]

        recentes = auditoria_queryset.order_by('-data_hora')[:10]
        recentes_data = [{
            'id_auditoria': r.id_auditoria,
            'usuario': r.id_usuario.nome if r.id_usuario else "Sistema",
            'operacao': r.acao,
            'detalhes': r.detalhes,
            'data_hora': r.data_hora
        } for r in recentes]

        return JsonResponse({
            'total_itens_estoque': total_itens,
            'produtos_baixo_estoque': criticos_data,
            'movimentacoes_recentes': recentes_data
        })