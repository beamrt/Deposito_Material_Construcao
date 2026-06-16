import json
from django.test import TestCase, Client
from django.urls import reverse
from django.contrib.auth import get_user_model
from unittest.mock import patch
from apps.lojas.models import Loja
from apps.produtos.models import Produto
from apps.auditoria.models import AuditLog
from .models import Estoque

Usuario = get_user_model()

class EstoqueViewsCompletoTest(TestCase):
    def setUp(self):
        self.client = Client()
        
        self.loja = Loja.objects.create(id_loja=1, nome="Matriz", cnpj="11111111000111")
        self.loja2 = Loja.objects.create(id_loja=2, nome="Filial", cnpj="22222222000122")
        
        self.user = Usuario.objects.create_user(
            email="operador@teste.com", nome="Operador", cpf="99999999999", password="SenhaForte123"
        )
        
        self.produto1 = Produto.objects.create(id_produto=10, nome="Cimento CP II")
        self.produto2 = Produto.objects.create(id_produto=20, nome="Tijolo Ceramico")

        self.estoque1 = Estoque.objects.create(
            id_loja=self.loja, id_produto=self.produto1, quantidade=50, estoque_minimo=10, estoque_maximo=100, localizacao="Galpao A"
        )
        self.estoque2 = Estoque.objects.create(
            id_loja=self.loja, id_produto=self.produto2, quantidade=5, estoque_minimo=10, estoque_maximo=30, localizacao="Prateleira B"
        )

    def test_list_get_sem_filtros(self):
        response = self.client.get(reverse('api_estoque_list'))
        self.assertEqual(response.status_code, 200)
        self.assertEqual(len(response.json()['estoque']), 2)

    def test_list_get_com_todos_os_filtros(self):
        response = self.client.get(reverse('api_estoque_list'), {'busca': 'Cimento', 'loja': '1'})
        self.assertEqual(response.status_code, 200)
        res_json = response.json()['estoque']
        self.assertEqual(len(res_json), 1)
        self.assertEqual(res_json[0]['nome_produto'], "Cimento CP II")

    def test_list_post_json_invalido(self):
        response = self.client.post(reverse('api_estoque_list'), data="texto-corrompido", content_type="application/json")
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()['error'], 'JSON inválido.')

    def test_list_post_quantidade_negativa(self):
        payload = {"id_produto": 10, "id_loja": 1, "quantidade": -5, "id_usuario": self.user.pk}
        response = self.client.post(reverse('api_estoque_list'), data=json.dumps(payload), content_type="application/json")
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()['error'], 'Quantidade inicial não pode ser negativa.')

    def test_list_post_sucesso_com_opcionais(self):
        produto3 = Produto.objects.create(id_produto=30, nome="Areia Fina")
        payload = {
            "id_produto": 30, "id_loja": 1, "quantidade": 20, "estoque_minimo": 5,
            "estoque_maximo": "50", "localizacao": "Patio C", "id_usuario": self.user.pk
        }
        response = self.client.post(reverse('api_estoque_list'), data=json.dumps(payload), content_type="application/json")
        self.assertEqual(response.status_code, 201)
        self.assertTrue(Estoque.objects.filter(id_produto=produto3, id_loja=self.loja).exists())

    def test_list_post_falha_entidades_inexistentes(self):
        payload = {"id_produto": 999, "id_loja": 1, "quantidade": 10, "id_usuario": self.user.pk}
        response = self.client.post(reverse('api_estoque_list'), data=json.dumps(payload), content_type="application/json")
        self.assertEqual(response.status_code, 400)

    def test_movimentar_post_dados_invalidos(self):
        response = self.client.post(reverse('api_movimentar_estoque'), data="quebrado", content_type="application/json")
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.json()['error'], 'Dados inválidos.')

    def test_movimentar_sucesso_entrada(self):
        payload = {"id_produto": 10, "id_loja": 1, "tipo": "ENTRADA", "quantidade": 15, "id_usuario": self.user.pk}
        response = self.client.post(reverse('api_movimentar_estoque'), data=json.dumps(payload), content_type="application/json")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['saldo_atual'], 65)

    def test_movimentar_sucesso_saida(self):
        payload = {"id_produto": 10, "id_loja": 1, "tipo": "SAIDA", "quantidade": 20, "id_usuario": self.user.pk}
        response = self.client.post(reverse('api_movimentar_estoque'), data=json.dumps(payload), content_type="application/json")
        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.json()['saldo_atual'], 30)

    def test_movimentar_falha_saldo_insuficiente(self):
        payload = {"id_produto": 10, "id_loja": 1, "tipo": "SAIDA", "quantidade": 100, "id_usuario": self.user.pk}
        response = self.client.post(reverse('api_movimentar_estoque'), data=json.dumps(payload), content_type="application/json")
        self.assertEqual(response.status_code, 400)
        self.assertIn('Saldo insuficiente', response.json()['error'])

    def test_movimentar_estoque_nao_encontrado(self):
        payload = {"id_produto": 20, "id_loja": 2, "tipo": "ENTRADA", "quantidade": 10, "id_usuario": self.user.pk}
        response = self.client.post(reverse('api_movimentar_estoque'), data=json.dumps(payload), content_type="application/json")
        self.assertEqual(response.status_code, 404)

    def test_movimentar_erro_generico_servidor(self):
        payload = {"id_produto": 10, "id_loja": 1, "tipo": "ENTRADA", "quantidade": 10, "id_usuario": self.user.pk}
        with patch('apps.estoque.views.Estoque.objects.select_for_update') as mock_query, \
             patch('django.views.debug.ExceptionReporter.get_traceback_text', return_value="Erro"):
            mock_query.return_value.get.side_effect = Exception("Erro Simulado de Conexão")
            response = self.client.post(reverse('api_movimentar_estoque'), data=json.dumps(payload), content_type="application/json")
            self.assertEqual(response.status_code, 500)
            self.assertEqual(response.json()['error'], "Erro Simulado de Conexão")

    def test_dashboard_get(self):
        AuditLog.objects.create(
            id_usuario=self.user, acao="ENTRADA", tabela_afetada="estoque", id_registro=self.estoque1.pk, detalhes="Teste log"
        )
        response = self.client.get(reverse('api_dashboard_estoque'), {'loja': '1'})
        self.assertEqual(response.status_code, 200)
        
        res_json = response.json()
        self.assertEqual(res_json['total_itens_estoque'], 55)
        self.assertEqual(len(res_json['produtos_baixo_estoque']), 1)
        self.assertEqual(res_json['produtos_baixo_estoque'][0]['id_produto'], 20)
        self.assertEqual(len(res_json['movimentacoes_recentes']), 1)

    def test_model_string_representation(self):
        self.assertEqual(str(self.estoque1), "Cimento CP II - Matriz")