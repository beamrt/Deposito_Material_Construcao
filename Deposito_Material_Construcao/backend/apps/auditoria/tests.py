from django.test import TestCase
from django.contrib.auth import get_user_model
from django.utils import timezone
from .models import AuditLog
import json

User = get_user_model()

class AuditLogAPITestCase(TestCase):

    def setUp(self):
        self.admin_user = User.objects.create_user(
            email='admin@teste.com',
            password='senha_segura123',
            tipo_usuario='ADMIN',
            nome='Administrador Teste',
            cpf='11122233344'
        )
        
        self.comum_user = User.objects.create_user(
            email='comum@teste.com',
            password='senha_segura123',
            tipo_usuario='CLIENTE',
            nome='Usuario Comum Teste',
            cpf='55566677788'
        )

        self.log_exemplo = AuditLog.objects.create(
            id_usuario=self.admin_user,
            acao='TESTE_UNITARIO',
            tabela_afetada='clientes',
            id_registro=99,
            detalhes='Log criado para fins de teste automatizado.',
            tenant_id=1
        )
        
        self.url = '/api/auditoria/' 

    def test_buscar_logs_sem_estar_logado_deve_retornar_401(self):
        resposta = self.client.get(self.url)
        self.assertEqual(resposta.status_code, 401)
        dados_resposta = json.loads(resposta.content)
        self.assertEqual(dados_resposta['error'], 'Não autorizado')

    def test_buscar_logs_com_usuario_comum_deve_retornar_403(self):
        self.client.force_login(self.comum_user)
        resposta = self.client.get(self.url)
        self.assertEqual(resposta.status_code, 403)
        dados_resposta = json.loads(resposta.content)
        self.assertEqual(dados_resposta['error'], 'Acesso exclusivo para Administradores e Master')

    def test_buscar_logs_com_admin_deve_retornar_sucesso_e_lista_correta(self):
        self.client.force_login(self.admin_user)
        resposta = self.client.get(self.url)
        self.assertEqual(resposta.status_code, 200)
        dados_resposta = json.loads(resposta.content)
        
        self.assertIn('logs', dados_resposta)
        self.assertTrue(len(dados_resposta['logs']) > 0)
        
        primeiro_log = dados_resposta['logs'][0]
        self.assertEqual(primeiro_log['id_auditoria'], self.log_exemplo.id_auditoria)
        self.assertEqual(primeiro_log['usuario'], 'admin@teste.com')
        self.assertEqual(primeiro_log['acao'], 'TESTE_UNITARIO')
        self.assertEqual(primeiro_log['tabela_afetada'], 'clientes')
        self.assertEqual(primeiro_log['id_registro'], 99)
        self.assertEqual(primeiro_log['detalhes'], 'Log criado para fins de teste automatizado.')
        self.assertEqual(primeiro_log['tenant_id'], 1)
        self.assertIn('data_hora', primeiro_log)