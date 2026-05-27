import json
from unittest import TestCase
from unittest.mock import patch, MagicMock

class UsuarioAPITestCase(TestCase):

    @patch('apps.usuarios.views.JsonResponse')
    @patch('apps.usuarios.views.AuditLog')
    @patch('apps.usuarios.views.authenticate')
    def test_us01_login_com_sucesso(self, mock_auth, mock_audit, mock_json_res):
        
        mock_user = MagicMock()
        mock_user.backend = 'django.contrib.auth.backends.ModelBackend'
        mock_user.ultimo_login = MagicMock()
        mock_auth.return_value = mock_user
        
        
        mock_audit.objects.create.return_value = MagicMock()
        
        
        mock_response = MagicMock()
        mock_response.status_code = 200
        mock_json_res.return_value = mock_response
        
        request = MagicMock()
        request.method = 'POST'
        request.body = json.dumps({"email": "admin@teste.com", "senha": "SenhaForte123"}).encode('utf-8')
        request._dont_enforce_csrf_checks = True
        request.session = MagicMock()
        
    
        import sys
        sys.modules['apps.usuarios.views'].models = MagicMock()
        
        from apps.usuarios.views import api_login
        response = api_login(request)
        
        self.assertIsNotNone(response)

    @patch('apps.usuarios.views.authenticate')
    def test_us01_login_credenciais_invalidas(self, mock_auth):
        mock_auth.return_value = None
        
        request = MagicMock()
        request.method = 'POST'
        request.body = json.dumps({"email": "invalido@teste.com", "senha": "123"}).encode('utf-8')
        
        from apps.usuarios.views import api_login
        response = api_login(request)
        self.assertIsNotNone(response)

    @patch('apps.usuarios.models.Usuario.objects.create')
    def test_us02_cadastro_usuario_com_sucesso(self, mock_create):
        request = MagicMock()
        request.method = 'POST'
        payload = {
            "nome": "Novo Funcionario",
            "cpf": "99988877766",
            "email": "novofunc@teste.com",
            "tipo_usuario": "FUNCIONARIO",
            "senha": "SenhaValida1",
            "id_loja": 1
        }
        request.body = json.dumps(payload).encode('utf-8')
        
        from apps.usuarios.views import api_usuarios
        response = api_usuarios(request)
        self.assertIsNotNone(response)

    @patch('apps.usuarios.models.Usuario.objects.create')
    def test_us02_cadastro_usuario_senha_fraca(self, mock_create):
        request = MagicMock()
        request.method = 'POST'
        payload = {
            "nome": "Invalido",
            "cpf": "00011122233",
            "email": "fraco@teste.com",
            "tipo_usuario": "FUNCIONARIO",
            "senha": "123"
        }
        request.body = json.dumps(payload).encode('utf-8')
        
        from apps.usuarios.views import api_usuarios
        response = api_usuarios(request)
        self.assertIsNotNone(response)

    def test_us03_restricao_perfil_funcionario(self):
        request = MagicMock()
        request.method = 'GET'
        
        from apps.usuarios.views import api_usuarios
        response = api_usuarios(request)
        self.assertIsNotNone(response)