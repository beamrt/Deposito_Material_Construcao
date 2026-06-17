from django.test import TestCase
from django.contrib.auth import get_user_model
from django.template import Context
from .models import Cliente, ClienteEndereco
import json

User = get_user_model()

class ClientesAPITestCase(TestCase):

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
            email='admin@teste.com',
            password='senha123',
            tipo_usuario='ADMIN',
            nome='Admin',
            cpf='11122233344'
        )
        self.client.force_login(self.admin_user)
        
        self.cliente_exemplo = Cliente.objects.create(
            nome='Marcos Silva',
            cpf_cnpj='12345678901',
            telefone='11999999999',
            email='marcos@teste.com'
        )

    def test_validators_diretos(self):
        from .validators import validar_cpf_cnpj, validar_cep
        self.assertFalse(validar_cpf_cnpj('123'))
        self.assertTrue(validar_cpf_cnpj('12345678901214'))
        self.assertFalse(validar_cep('123'))

    def test_criar_cliente_com_sucesso(self):
        dados = {
            'nome': 'Novo Cliente',
            'cpf_cnpj': '98765432100',
            'telefone': '11988888888',
            'email': 'novo@teste.com'
        }
        resposta = self.client.post('/api/clientes/criar/', data=json.dumps(dados), content_type='application/json')
        self.assertEqual(resposta.status_code, 201)

    def test_criar_cliente_metodo_invalido_deve_retornar_405(self):
        resposta = self.client.get('/api/clientes/criar/')
        self.assertEqual(resposta.status_code, 405)

    def test_criar_cliente_faltando_campos_deve_retornar_400(self):
        dados = {'nome': 'Sem CPF'}
        resposta = self.client.post('/api/clientes/criar/', data=json.dumps(dados), content_type='application/json')
        self.assertEqual(resposta.status_code, 400)

    def test_criar_cliente_cpf_duplicado_deve_retornar_400(self):
        dados = {
            'nome': 'Outro Marcos',
            'cpf_cnpj': '12345678901'
        }
        resposta = self.client.post('/api/clientes/criar/', data=json.dumps(dados), content_type='application/json')
        self.assertEqual(resposta.status_code, 400)

    def test_criar_cliente_cpf_invalido_deve_retornar_400(self):
        dados = {
            'nome': 'Cliente Invalido',
            'cpf_cnpj': '000'
        }
        resposta = self.client.post('/api/clientes/criar/', data=json.dumps(dados), content_type='application/json')
        self.assertEqual(resposta.status_code, 400)

    def test_criar_cliente_email_invalido_deve_retornar_400(self):
        dados = {
            'nome': 'Cliente Email Ruim',
            'cpf_cnpj': '11111111112',
            'email': 'email-errado.com'
        }
        resposta = self.client.post('/api/clientes/criar/', data=json.dumps(dados), content_type='application/json')
        self.assertEqual(resposta.status_code, 400)

    def test_criar_cliente_json_invalido_deve_retornar_400(self):
        resposta = self.client.post('/api/clientes/criar/', data='{json_quebrado:', content_type='application/json')
        self.assertEqual(resposta.status_code, 400)

    def test_editar_cliente_com_sucesso(self):
        dados = {'nome': 'Marcos Silva Alterado'}
        resposta = self.client.put(f'/api/clientes/editar/{self.cliente_exemplo.id_cliente}/', data=json.dumps(dados), content_type='application/json')
        self.assertEqual(resposta.status_code, 200)
        self.cliente_exemplo.refresh_from_db()
        self.assertEqual(self.cliente_exemplo.nome, 'Marcos Silva Alterado')

    def test_editar_cliente_nome_vazio_deve_retornar_400(self):
        dados = {'nome': ''}
        resposta = self.client.put(f'/api/clientes/editar/{self.cliente_exemplo.id_cliente}/', data=json.dumps(dados), content_type='application/json')
        self.assertEqual(resposta.status_code, 400)

    def test_editar_cliente_email_invalido_deve_retornar_400(self):
        dados = {'email': 'novo-email-invalido'}
        resposta = self.client.put(f'/api/clientes/editar/{self.cliente_exemplo.id_cliente}/', data=json.dumps(dados), content_type='application/json')
        self.assertEqual(resposta.status_code, 400)

    def test_editar_cliente_json_invalido_deve_retornar_400(self):
        resposta = self.client.put(f'/api/clientes/editar/{self.cliente_exemplo.id_cliente}/', data='{json_quebrado:', content_type='application/json')
        self.assertEqual(resposta.status_code, 400)

    def test_editar_cliente_metodo_invalido_deve_retornar_405(self):
        resposta = self.client.get(f'/api/clientes/editar/{self.cliente_exemplo.id_cliente}/')
        self.assertEqual(resposta.status_code, 405)

    def test_editar_cliente_nao_encontrado_deve_retornar_404(self):
        dados = {'nome': 'Ninguém'}
        resposta = self.client.put('/api/clientes/editar/9999/', data=json.dumps(dados), content_type='application/json')
        self.assertEqual(resposta.status_code, 404)

    def test_inativar_cliente_com_sucesso(self):
        resposta = self.client.delete(f'/api/clientes/inativar/{self.cliente_exemplo.id_cliente}/')
        self.assertEqual(resposta.status_code, 200)

    def test_inativar_cliente_metodo_invalido_deve_retornar_405(self):
        resposta = self.client.get(f'/api/clientes/inativar/{self.cliente_exemplo.id_cliente}/')
        self.assertEqual(resposta.status_code, 405)

    def test_gerenciar_endereco_criar_com_sucesso(self):
        dados = {
            'rua': 'Av Central',
            'numero': '123',
            'bairro': 'Centro',
            'cidade': 'Leme',
            'estado': 'SP',
            'cep': '13610-000'
        }
        resposta = self.client.post(f'/api/clientes/{self.cliente_exemplo.id_cliente}/enderecos/', data=json.dumps(dados), content_type='application/json')
        self.assertEqual(resposta.status_code, 201)

    def test_gerenciar_endereco_faltando_campos_deve_retornar_400(self):
        dados = {'rua': 'Av Central'}
        resposta = self.client.post(f'/api/clientes/{self.cliente_exemplo.id_cliente}/enderecos/', data=json.dumps(dados), content_type='application/json')
        self.assertEqual(resposta.status_code, 400)

    def test_gerenciar_endereco_cep_invalido_deve_retornar_400(self):
        dados = {
            'rua': 'Av Central',
            'numero': '123',
            'bairro': 'Centro',
            'cidade': 'Leme',
            'estado': 'SP',
            'cep': '123'
        }
        resposta = self.client.post(f'/api/clientes/{self.cliente_exemplo.id_cliente}/enderecos/', data=json.dumps(dados), content_type='application/json')
        self.assertEqual(resposta.status_code, 400)

    def test_gerenciar_endereco_json_invalido_deve_retornar_400(self):
        resposta = self.client.post(f'/api/clientes/{self.cliente_exemplo.id_cliente}/enderecos/', data='{json_quebrado:', content_type='application/json')
        self.assertEqual(resposta.status_code, 400)

    def test_gerenciar_endereco_metodo_invalido_deve_retornar_405(self):
        resposta = self.client.get(f'/api/clientes/{self.cliente_exemplo.id_cliente}/enderecos/')
        self.assertEqual(resposta.status_code, 405)

    def test_gerenciar_endereco_cliente_nao_encontrado_deve_retornar_404(self):
        resposta = self.client.post('/api/clientes/9999/enderecos/', data=json.dumps({}), content_type='application/json')
        self.assertEqual(resposta.status_code, 404)