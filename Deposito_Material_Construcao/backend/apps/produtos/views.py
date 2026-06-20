from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Produto
from .serializers import ProdutoSerializer
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
import json
from .models import Categoria

@api_view(['POST'])
def cadastrar_produto(request):
    dados_recebidos = request.data
    analista = ProdutoSerializer(data=dados_recebidos)
    
    if analista.is_valid():
        analista.save()
        return Response(analista.data, status=status.HTTP_201_CREATED)
    else: 
        return Response(analista.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def listar_produtos(request):
    produtos = Produto.objects.all()
    serializer = ProdutoSerializer(produtos, many=True)
    return Response(serializer.data)

@api_view(['DELETE'])
def deletar_produto(request, pk):
    try:
        produto = Produto.objects.get(pk=pk)
        produto.delete()
        return Response({'message': 'Produto deletado com sucesso!'}, status=200)
    except Produto.DoesNotExist:
        return Response({'error': 'Produto não encontrado'}, status=404)

@api_view(['PUT'])
def editar_produto(request, pk):
    try:
        produto = Produto.objects.get(pk=pk)
    except Produto.DoesNotExist:
        return Response({'error': 'Produto não encontrado'}, status=404)

    serializer = ProdutoSerializer(produto, data=request.data)
    
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data, status=200)
    
    return Response(serializer.errors, status=400)

def listar_categorias(request):
    categorias = Categoria.objects.all().values('id_categoria', 'nome')
    return JsonResponse(list(categorias), safe=False)

@csrf_exempt
def cadastrar_categoria(request):
    if request.method == 'POST':
        try:
            data = json.loads(request.body)
            nome = data.get('nome')
            Categoria.objects.create(nome=nome)
            print(f"Recebido para cadastrar: {nome}")            
            return JsonResponse({'message': 'Categoria cadastrada com sucesso!'}, status=201)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
            
    return JsonResponse({'error': 'Método não permitido'}, status=405)

@csrf_exempt
def editar_categoria(request, id_categoria):
    if request.method == 'PUT':
        try:
            data = json.loads(request.body)
            nome = data.get('nome')
            categoria = Categoria.objects.get(pk=id_categoria)
            categoria.nome = nome
            categoria.save()
            print(f"Editando a categoria ID {id_categoria} para o novo nome: {nome}")
            
            return JsonResponse({'message': 'Categoria atualizada com sucesso!'}, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
    
    return JsonResponse({'error': 'Método não permitido'}, status=405)

@csrf_exempt
def deletar_categoria(request, id_categoria):
    if request.method == 'DELETE':
        try:
            print(f"Deletando a categoria ID: {id_categoria}")
            categoria = Categoria.objects.get(pk=id_categoria)
            categoria.delete()
            
            return JsonResponse({'message': 'Categoria deletada com sucesso!'}, status=200)
        except Exception as e:
            return JsonResponse({'error': str(e)}, status=400)
            
    return JsonResponse({'error': 'Método não permitido'}, status=405)