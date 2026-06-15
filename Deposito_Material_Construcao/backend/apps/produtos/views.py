from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Produto
from .serializers import ProdutoSerializer

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