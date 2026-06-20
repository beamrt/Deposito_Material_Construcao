from django.test import TestCase
from django.contrib.auth import get_user_model
from django.template import Context
from .models import Loja
import json

User = get_user_model()

class LojasAPITestCase(TestCase):

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        cls._orig_copy = getattr(Context, '__copy__', None)
        
        def python314_safe_copy(self):
            duplicate = Context()
            duplicate.dicts = self.dicts[:]
            return duplicate
            
        Context.__copy__ = python314_safe_copy

    @classmethod
    def tearDownClass(cls):
        if cls._orig_copy:
            Context.__copy__ = cls._orig_copy
        super().tearDownClass()

    def setUp(self):
        self.admin_user = User.objects.create_user(
            email='admin_loja@teste.com',
            password='senha123',
            tipo_usuario='ADMIN',
            nome='Admin Loja',
            cpf='22233344455'
        )
        self.client.force_login(self.admin_user)

    def test_string_representation_model_loja(self):
        loja = Loja.objects.create(
            nome='Depósito Central',
            cnpj='12345678000199'
        )
        self.assertEqual(str(loja), 'Depósito Central')

    def test_listar_lojas_vazio_deve_retornar_mensagem(self):
        resposta = self.client.get('/api/lojas/index')
        self.assertEqual(resposta.status_code, 200)
        dados = resposta.json()
        self.assertIn('message', dados)
        self.assertEqual(dados['message'], 'Nenhuma loja cadastrada')

    def test_listar_lojas_com_sucesso(self):
        Loja.objects.create(
            nome='Depósito Filial 1',
            cnpj='98765432000188',
            telefone='1140028922',
            email='filial1@deposito.com'
        )
        resposta = self.client.get('/api/lojas/index')
        self.assertEqual(resposta.status_code, 200)
        dados = resposta.json()
        self.assertIn('all', dados)
        self.assertEqual(len(dados['all']), 1)
        self.assertEqual(dados['all'][0]['nome'], 'Depósito Filial 1')