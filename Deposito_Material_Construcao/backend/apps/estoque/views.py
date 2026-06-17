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
from django.utils import timezone

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
            'fornecedor': getattr(e, 'fornecedor', ''),
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
            fornecedor = body.get('fornecedor', '')
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
                    localizacao=localizacao,
                    fornecedor=fornecedor
                )
                
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
            usuario_obj = Usuario.objects.filter(pk=id_usuario).first()

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

@csrf_exempt
def api_estoque_entrada(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'Método não permitido.'}, status=405)

    try:
        data = json.loads(request.body)
        loja_id = data.get('id_loja')
        produto_id = data.get('id_produto')
        quantidade = int(data.get('quantidade', 0))
        fornecedor = data.get('fornecedor', 'Não informado')
        observacao = data.get('observacao', '')
        usuario = data.get('usuario', 'Sistema') 

        if quantidade <= 0:
            return JsonResponse({'error': 'A quantidade de entrada deve ser maior que zero.'}, status=400)

        with transaction.atomic():
            loja = Loja.objects.get(pk=loja_id)
            produto = Produto.objects.get(pk=produto_id)

            estoque, created = Estoque.objects.select_for_update().get_or_create(
                id_loja=loja,
                id_produto=produto,
                defaults={'quantidade': 0, 'estoque_minimo': 10}
            )

            estoque.quantidade += quantidade
            estoque.data_atualizacao = timezone.now()
            estoque.save()

        recibo = {
            "tipo": "ENTRADA",
            "id_loja": loja_id,
            "id_produto": produto_id,
            "nome_produto": produto.nome,
            "quantidade": quantidade,
            "fornecedor": fornecedor,
            "observacao": observacao,
            "usuario": usuario,
            "data_movimentacao": timezone.now().isoformat()
        }

        return JsonResponse({'message': f'Sucesso! {quantidade} unidades adicionadas ao estoque.'}, status=200)

    except Loja.DoesNotExist:
        return JsonResponse({'error': 'Loja não encontrada.'}, status=404)
    except Produto.DoesNotExist:
        return JsonResponse({'error': 'Produto não encontrado.'}, status=404)
    except Exception as e:
        return JsonResponse({'error': f'Erro interno: {str(e)}'}, status=500)


@csrf_exempt
def api_estoque_saida(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'Método não permitido.'}, status=405)

    try:
        data = json.loads(request.body)
        loja_id = data.get('id_loja')
        produto_id = data.get('id_produto')
        quantidade = int(data.get('quantidade', 0))
        motivo = data.get('motivo', 'Venda')
        observacao = data.get('observacao', '')
        usuario = data.get('usuario', 'Sistema')

        if quantidade <= 0:
            return JsonResponse({'error': 'A quantidade de saída deve ser maior que zero.'}, status=400)

        with transaction.atomic():
            loja = Loja.objects.get(pk=loja_id)
            produto = Produto.objects.get(pk=produto_id)

            try:
                estoque = Estoque.objects.select_for_update().get(id_loja=loja, id_produto=produto)
            except Estoque.DoesNotExist:
                return JsonResponse({'error': 'Produto não existe no estoque desta loja.'}, status=400)

            if estoque.quantidade < quantidade:
                return JsonResponse({'error': f'Saldo insuficiente! Quantidade atual: {estoque.quantidade}.'}, status=400)

            estoque.quantidade -= quantidade
            estoque.data_atualizacao = timezone.now()
            estoque.save()

        recibo = {
            "tipo": "SAIDA",
            "id_loja": loja_id,
            "id_produto": produto_id,
            "nome_produto": produto.nome,
            "quantidade": quantidade,
            "motivo": motivo,
            "observacao": observacao,
            "usuario": usuario,
            "data_movimentacao": timezone.now().isoformat()
        }

        return JsonResponse({'message': f'Sucesso! Baixa de {quantidade} unidades realizada.'}, status=200)

    except Loja.DoesNotExist:
        return JsonResponse({'error': 'Loja não encontrada.'}, status=404)
    except Produto.DoesNotExist:
        return JsonResponse({'error': 'Produto não encontrado.'}, status=404)
    except Exception as e:
        return JsonResponse({'error': f'Erro interno: {str(e)}'}, status=500)
    
@csrf_exempt
def api_estoque_editar(request, id_estoque):
    if request.method == 'PUT':
        try:
            data = json.loads(request.body)
            
            novo_fornecedor = data.get('fornecedor')
            nova_qtd = data.get('quantidade')
            novo_minimo = data.get('estoque_minimo')
            
            estoque_item = Estoque.objects.get(pk=id_estoque)
            
            if novo_fornecedor is not None:
                estoque_item.fornecedor = novo_fornecedor
            if nova_qtd is not None:
                estoque_item.quantidade = nova_qtd
            if novo_minimo is not None:
                estoque_item.estoque_minimo = novo_minimo
                
            estoque_item.data_atualizacao = timezone.now()
            estoque_item.save()
            
            return JsonResponse({'message': 'Estoque atualizado com sucesso!'}, status=200)
        except Estoque.DoesNotExist:
            return JsonResponse({'error': 'Item de estoque não encontrado.'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
            
    return JsonResponse({'error': 'Método não permitido'}, status=405)

@csrf_exempt
def api_estoque_deletar(request, id_estoque):
    if request.method == 'DELETE':
        try:
            estoque_item = Estoque.objects.get(pk=id_estoque)
            estoque_item.delete()
            return JsonResponse({'message': 'Item removido do estoque físico com sucesso!'}, status=200)
        except Estoque.DoesNotExist:
            return JsonResponse({'error': 'Item de estoque não encontrado.'}, status=404)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
            
    return JsonResponse({'error': 'Método não permitido'}, status=405)

@csrf_exempt
def api_criar_transferencia(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            loja_origem_id = data.get('loja_origem')
            loja_destino_id = data.get('loja_destino')
            produtos = data.get('produtos', [])

            loja_origem = Loja.objects.get(pk=loja_origem_id)
            loja_destino = Loja.objects.get(pk=loja_destino_id)

            with transaction.atomic():
                for p in produtos:
                    prod_id = p.get('id_produto')
                    qtd_transferir = p.get('qtd')

                    produto_obj = Produto.objects.get(pk=prod_id)

                    estoque_origem = Estoque.objects.select_for_update().get(id_loja=loja_origem, id_produto=produto_obj)
                    if estoque_origem.quantidade < qtd_transferir:
                        return JsonResponse({'error': f'Saldo insuficiente no produto {produto_obj.nome}'}, status=400)

                    estoque_origem.quantidade -= qtd_transferir
                    estoque_origem.save()

                    estoque_destino, created = Estoque.objects.select_for_update().get_or_create(
                        id_loja=loja_destino,
                        id_produto=produto_obj,
                        defaults={'quantidade': 0, 'estoque_minimo': 5}
                    )
                    estoque_destino.quantidade += qtd_transferir
                    estoque_destino.save()

            return JsonResponse({'message': 'Transferência entre filiais concluída com sucesso!'}, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
            
    return JsonResponse({'error': 'Método não permitido'}, status=405)