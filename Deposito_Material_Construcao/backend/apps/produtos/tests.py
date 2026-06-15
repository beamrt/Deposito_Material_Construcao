from django.test import TestCase
from django.urls import reverse
from rest_framework.test import APIClient
from rest_framework import status
from .models import Produto, Categoria

class ProdutoAPITests(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.categoria_teste = Categoria.objects.create(nome="Ferramentas")

        self.produto_cobaia = Produto.objects.create(
            nome="Chave de Fenda",
            descricao="Chave de fenda Philips",
            id_categoria=self.categoria_teste,
            marca="Tramontina",
            unidade_medida="UN",
            preco_custo="5.00",
            preco_venda="12.00",
            margem_lucro="7.00",
            ativo=True
        )

        self.url_cadastro = '/api/produtos/cadastro/' 
        self.url_listar = '/api/produtos/listar/'
        self.url_editar = reverse('editar_produto', kwargs={'pk': self.produto_cobaia.pk})
        self.url_deletar = reverse('deletar_produto', kwargs={'pk': self.produto_cobaia.pk})


    def test_cadastro_produto_com_sucesso(self):
        dados_produto = {
            "nome": "Martelo",
            "descricao": "Martelo com cabo de madeira",
            "id_categoria": self.categoria_teste.pk, 
            "marca": "Tramontina",
            "unidade_medida": "UN",
            "preco_custo": "15.00",
            "preco_venda": "30.00",
            "margem_lucro": "15.00",
            "ativo": True
        }

        resposta = self.client.post(self.url_cadastro, dados_produto, format='json')
        self.assertEqual(resposta.status_code, status.HTTP_201_CREATED)
        self.assertEqual(Produto.objects.count(), 2) 

    def test_cadastro_produto_sem_nome_deve_falhar(self):
        dados_invalidos = {
            "descricao": "Produto sem nome",
            "id_categoria": self.categoria_teste.pk,
            "preco_venda": "10.00"
        }

        resposta = self.client.post(self.url_cadastro, dados_invalidos, format='json')
        self.assertEqual(resposta.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertEqual(Produto.objects.count(), 1)


    def test_listar_produtos(self):
        resposta = self.client.get(self.url_listar)
        self.assertEqual(resposta.status_code, status.HTTP_200_OK)
        self.assertEqual(len(resposta.data), 1)
        self.assertEqual(resposta.data[0]['nome'], "Chave de Fenda")


    def test_editar_produto(self):
        dados_atualizados = {
            "nome": "Chave de Fenda Grande",
            "descricao": "Chave de fenda Philips",
            "id_categoria": self.categoria_teste.pk,
            "marca": "Tramontina",
            "unidade_medida": "UN",
            "preco_custo": "5.00",
            "preco_venda": "15.00", 
            "margem_lucro": "10.00",
            "ativo": True
        }

        resposta = self.client.put(self.url_editar, dados_atualizados, format='json')
        self.assertEqual(resposta.status_code, status.HTTP_200_OK)
        self.produto_cobaia.refresh_from_db()
        self.assertEqual(self.produto_cobaia.nome, "Chave de Fenda Grande")
        self.assertEqual(str(self.produto_cobaia.preco_venda), "15.00")

    def test_deletar_produto(self):
        resposta = self.client.delete(self.url_deletar)
        self.assertEqual(resposta.status_code, status.HTTP_200_OK)
        self.assertEqual(Produto.objects.count(), 0)