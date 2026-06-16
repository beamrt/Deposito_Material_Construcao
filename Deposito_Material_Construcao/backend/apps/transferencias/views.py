from django.shortcuts import render
import json
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.utils import timezone
from django.db import transaction
from pymongo import MongoClient
from bson.objectid import ObjectId
from apps.estoque.models import Estoque
from apps.produtos.models import Produto
from apps.lojas.models import Loja

MONGO_URI = "mongodb://mongodb_database:27017/"
client = MongoClient(MONGO_URI)
db = client['constrular_db']
collection = db['transferencias']

@csrf_exempt
def api_transferencia_criar(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'Method not allowed'}, status=405)

    try:
        data = json.loads(request.body)
        
        loja_origem_id = data.get('loja_origem')
        loja_destino_id = data.get('loja_destino')
        produtos = data.get('produtos')

        if not all([loja_origem_id, loja_destino_id, produtos]):
            return JsonResponse({'error': 'Loja de origem, destino e produtos são obrigatórios.'}, status=400)

        if loja_origem_id == loja_destino_id:
            return JsonResponse({'error': 'As unidades de origem e destino devem ser diferentes.'}, status=400)

        try:
            with transaction.atomic():
                loja_origem = Loja.objects.get(pk=loja_origem_id)
                
                for item in produtos:
                    produto_id = item.get('id_produto')
                    qtd_transferir = int(item.get('qtd', 0))

                    if qtd_transferir <= 0:
                        raise ValueError(f"Quantidade do produto {produto_id} deve ser maior que zero.")

                    estoque_origem = Estoque.objects.select_for_update().get(id_produto=produto_id, id_loja=loja_origem)

                    if estoque_origem.quantidade < qtd_transferir:
                        raise ValueError(f"Saldo insuficiente para o produto ID {produto_id} na loja de origem.")

                    estoque_origem.quantidade -= qtd_transferir
                    estoque_origem.save()

        except Estoque.DoesNotExist:
            return JsonResponse({'error': 'Produto não encontrado no estoque da loja de origem.'}, status=404)
        except ValueError as e:
            return JsonResponse({'error': str(e)}, status=400)
        except Loja.DoesNotExist:
            return JsonResponse({'error': 'Loja de origem não encontrada.'}, status=404)

        transferencia_doc = {
            "data_criacao": timezone.now().isoformat(),
            "loja_origem": loja_origem_id,
            "loja_destino": loja_destino_id,
            "status": "Em Trânsito",
            "produtos": produtos,
            "historico_status": [
                {
                    "status": "Criada",
                    "data": timezone.now().isoformat(),
                    "observacao": "Estoque debitado da origem e transferência iniciada."
                }
            ]
        }

        resultado = collection.insert_one(transferencia_doc)

        return JsonResponse({
            'message': 'Transferência registrada! Estoque descontado.',
            'id_transferencia': str(resultado.inserted_id)
        }, status=201)

    except json.JSONDecodeError:
        return JsonResponse({'error': 'JSON inválido'}, status=400)
    except Exception as e:
        return JsonResponse({'error': f'Erro interno: {str(e)}'}, status=500)
    
@csrf_exempt
def api_transferencia_receber(request):
    if request.method != 'POST':
        return JsonResponse({'error': 'Method not allowed'}, status=405)

    try:
        data = json.loads(request.body)
        id_transferencia = data.get('id_transferencia')

        if not id_transferencia:
            return JsonResponse({'error': 'ID da transferência é obrigatório.'}, status=400)

        try:
            transferencia = collection.find_one({"_id": ObjectId(id_transferencia)})
        except:
            return JsonResponse({'error': 'ID de transferência inválido.'}, status=400)

        if not transferencia:
            return JsonResponse({'error': 'Transferência não encontrada.'}, status=404)

        if transferencia.get('status') == 'Concluída':
            return JsonResponse({'error': 'Esta transferência já foi recebida anteriormente.'}, status=400)

        loja_destino_id = transferencia.get('loja_destino')
        produtos = transferencia.get('produtos', [])

        with transaction.atomic():
            loja_destino = Loja.objects.get(pk=loja_destino_id)
            
            for item in produtos:
                produto_id = item.get('id_produto')
                qtd_receber = int(item.get('qtd', 0))

                produto_obj = Produto.objects.get(pk=produto_id)

                estoque_destino, created = Estoque.objects.select_for_update().get_or_create(
                    id_loja=loja_destino,
                    id_produto=produto_obj,
                    defaults={'quantidade': 0, 'estoque_minimo': 0}
                )

                estoque_destino.quantidade += qtd_receber
                estoque_destino.save()

        collection.update_one(
            {"_id": ObjectId(id_transferencia)},
            {
                "$set": {"status": "Concluída"},
                "$push": {
                    "historico_status": {
                        "status": "Concluída",
                        "data": timezone.now().isoformat(),
                        "observacao": "Mercadoria recebida e adicionada ao estoque da loja de destino."
                    }
                }
            }
        )

        return JsonResponse({'message': 'Sucesso! Mercadoria recebida e estoque somado.'}, status=200)

    except json.JSONDecodeError:
        return JsonResponse({'error': 'JSON inválido'}, status=400)
    except Exception as e:
        return JsonResponse({'error': f'Erro interno: {str(e)}'}, status=500)