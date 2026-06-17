import json
import uuid
from django.test import TestCase, Client
from django.urls import reverse
from django.contrib.auth import get_user_model
from django.core import mail
from django.utils import timezone
from unittest.mock import patch
from django.db import IntegrityError
from django.http import HttpRequest
from apps.lojas.models import Loja
from apps.usuarios.models import UsuarioLoja
from apps.auditoria.models import AuditLog
from apps.usuarios.views import TenantMiddleware

Usuario = get_user_model()

class UsuariosViewsCompletoTest(TestCase):
    def setUp(self):
        self.client = Client()
        
        self.loja1 = Loja.objects.create(id_loja=1, nome="Matriz", cnpj="11111111000111")
        self.loja2 = Loja.objects.create(id_loja=2, nome="Filial Sul", cnpj="22222222000122")
        self.loja3 = Loja.objects.create(id_loja=3, nome="Filial Norte", cnpj="33333333000133")
        self.loja_invalida = Loja.objects.create(id_loja=9, nome="Invalida", cnpj="99999999000199")

        self.user_comum = Usuario.objects.create_user(
            email="func@deposito.com", nome="Funcionario", cpf="11111111111", password="SenhaForte123"
        )
        UsuarioLoja.objects.create(id_usuario=self.user_comum, id_loja=self.loja1)

        self.user_inativo = Usuario.objects.create_user(
            email="inativo@deposito.com", nome="Inativo", cpf="22222222222", password="SenhaForte123"
        )
        self.user_inativo.ativo = False
        self.user_inativo.save()

        self.user_admin = Usuario.objects.create_user(
            email="admin@deposito.com", nome="Admin", cpf="33333333333", password="SenhaForte123", tipo_usuario="ADMIN"
        )
        self.user_gerente = Usuario.objects.create_user(
            email="gerente@deposito.com", nome="Gerente", cpf="44444444444", password="SenhaForte123", tipo_usuario="GERENTE"
        )
        UsuarioLoja.objects.create(id_usuario=self.user_gerente, id_loja=self.loja1)

    def test_login_metodo_nao_permitido(self):
        response = self.client.get(reverse('api_login'))
        self.assertEqual(response.status_code, 405)

    def test_login_json_invalido(self):
        response = self.client.post(reverse('api_login'), data="string-quebrada-nao-json", content_type="application/json")
        self.assertEqual(response.status_code, 400)
        self.assertIn('JSON inválido', response.json()['error'])

    def test_login_campos_obrigatorios_ausentes(self):
        response = self.client.post(reverse('api_login'), data=json.dumps({"email": ""}), content_type="application/json")
        self.assertEqual(response.status_code, 400)

    def test_login_usuario_inativo(self):
        payload = {"email": "inativo@deposito.com", "senha": "SenhaForte123", "id_loja": 1}
        response = self.client.post(reverse('api_login'), data=json.dumps(payload), content_type="application/json")
        self.assertEqual(response.status_code, 403)
        self.assertTrue(AuditLog.objects.filter(acao="Tentativa de login").exists())

    def test_login_loja_id_fora_do_escopo(self):
        payload = {"email": "func@deposito.com", "senha": "SenhaForte123", "id_loja": 9}
        response = self.client.post(reverse('api_login'), data=json.dumps(payload), content_type="application/json")
        self.assertEqual(response.status_code, 404)

    def test_login_nao_pertence_a_loja(self):
        payload = {"email": "func@deposito.com", "senha": "SenhaForte123", "id_loja": 2}
        response = self.client.post(reverse('api_login'), data=json.dumps(payload), content_type="application/json")
        self.assertEqual(response.status_code, 403)

    def test_login_admin_transita_livremente(self):
        payload = {"email": "admin@deposito.com", "senha": "SenhaForte123", "id_loja": 2}
        response = self.client.post(reverse('api_login'), data=json.dumps(payload), content_type="application/json")
        self.assertEqual(response.status_code, 200)

    def test_login_senha_incorreta(self):
        payload = {"email": "func@deposito.com", "senha": "SenhaErradaErrada", "id_loja": 1}
        response = self.client.post(reverse('api_login'), data=json.dumps(payload), content_type="application/json")
        self.assertEqual(response.status_code, 401)

    def test_cadastro_senhas_nao_coincidem(self):
        payload = {
            "nome": "Novo", "email": "novo@deposito.com", "cpf": "99999999999",
            "senha": "SenhaForte123", "confirmacao_senha": "Diferente123"
        }
        response = self.client.post(reverse('api_usuarios'), data=json.dumps(payload), content_type="application/json")
        self.assertEqual(response.status_code, 400)

    def test_cadastro_senha_fraca(self):
        payload = {
            "nome": "Novo", "email": "novo@deposito.com", "cpf": "99999999999",
            "senha": "senhasegura", "confirmacao_senha": "senhasegura"
        }
        response = self.client.post(reverse('api_usuarios'), data=json.dumps(payload), content_type="application/json")
        self.assertEqual(response.status_code, 400)

    def test_cadastro_email_duplicado(self):
        payload = {
            "nome": "Novo", "email": "func@deposito.com", "cpf": "99999999999",
            "senha": "SenhaForte123", "confirmacao_senha": "SenhaForte123"
        }
        response = self.client.post(reverse('api_usuarios'), data=json.dumps(payload), content_type="application/json")
        self.assertEqual(response.status_code, 400)

    def test_cadastro_cpf_duplicado_integrity_error(self):
        payload = {
            "nome": "Novo", "email": "novo_email@deposito.com", "cpf": "11111111111",
            "senha": "SenhaForte123", "confirmacao_senha": "SenhaForte123"
        }
        response = self.client.post(reverse('api_usuarios'), data=json.dumps(payload), content_type="application/json")
        self.assertEqual(response.status_code, 409)

    def test_cadastro_json_invalido(self):
        response = self.client.post(reverse('api_usuarios'), data="nao-e-json", content_type="application/json")
        self.assertEqual(response.status_code, 400)

    def test_cadastro_com_loja_vinculada(self):
        payload = {
            "nome": "Novo Func", "email": "novofunc@deposito.com", "cpf": "12345678901",
            "senha": "SenhaForte123", "confirmacao_senha": "SenhaForte123", "id_loja": 1
        }
        response = self.client.post(reverse('api_usuarios'), data=json.dumps(payload), content_type="application/json")
        self.assertEqual(response.status_code, 201)
        self.assertTrue(Usuario.objects.filter(email="novofunc@deposito.com").exists())

    def test_cadastro_erro_valor_modelo(self):
        payload = {
            "nome": "Novo", "email": "invalido", "cpf": "111",
            "senha": "SenhaForte123", "confirmacao_senha": "SenhaForte123"
        }
        with patch.object(Usuario.objects, 'create_user', side_effect=ValueError("Erro de validação simulado")):
            response = self.client.post(reverse('api_usuarios'), data=json.dumps(payload), content_type="application/json")
            self.assertEqual(response.status_code, 400)

    def test_listar_usuarios_nao_autenticado(self):
        response = self.client.get(reverse('api_usuarios'))
        self.assertEqual(response.status_code, 401)

    def test_listar_usuarios_perfil_comum_negado(self):
        self.client.force_login(self.user_comum)
        response = self.client.get(reverse('api_usuarios'))
        self.assertEqual(response.status_code, 403)

    def test_listar_usuarios_como_admin_ou_master(self):
        self.client.force_login(self.user_admin)
        response = self.client.get(reverse('api_usuarios'))
        self.assertEqual(response.status_code, 200)
        self.assertIn('usuarios', response.json())

    def test_listar_usuarios_como_gerente(self):
        self.client.force_login(self.user_gerente)
        response = self.client.get(reverse('api_usuarios'))
        self.assertEqual(response.status_code, 200)
        self.assertIn('usuarios', response.json())

    def test_detail_nao_autorizado(self):
        response = self.client.put(reverse('api_usuario_detail', args=[self.user_comum.pk]))
        self.assertEqual(response.status_code, 401)

    def test_detail_perfil_bloqueado(self):
        self.client.force_login(self.user_comum)
        response = self.client.put(reverse('api_usuario_detail', args=[self.user_admin.pk]))
        self.assertEqual(response.status_code, 403)

    def test_detail_put_e_delete_sucesso(self):
        self.client.force_login(self.user_admin)
        
        payload = {"nome": "Funcionario Alterado", "tipo_usuario": "FUNCIONARIO"}
        res_put = self.client.put(reverse('api_usuario_detail', args=[self.user_comum.pk]), data=json.dumps(payload), content_type="application/json")
        self.assertEqual(res_put.status_code, 200)

        res_del = self.client.delete(reverse('api_usuario_detail', args=[self.user_comum.pk]))
        self.assertEqual(res_del.status_code, 200)
        
        self.user_comum.refresh_from_db()
        self.assertFalse(self.user_comum.ativo)

    def test_detail_como_gerente_sucesso(self):
        self.client.force_login(self.user_gerente)
        payload = {"nome": "Alterado pelo Gerente"}
        response = self.client.put(reverse('api_usuario_detail', args=[self.user_comum.pk]), data=json.dumps(payload), content_type="application/json")
        self.assertEqual(response.status_code, 200)

    def test_detail_json_invalido(self):
        self.client.force_login(self.user_admin)
        response = self.client.put(reverse('api_usuario_detail', args=[self.user_comum.pk]), data="nao-json", content_type="application/json")
        self.assertEqual(response.status_code, 400)

    def test_api_logout(self):
        self.client.force_login(self.user_comum)
        response = self.client.post(reverse('api_logout'))
        self.assertEqual(response.status_code, 200)

    def test_recuperar_senha_metodo_invalido(self):
        response = self.client.get(reverse('api_recuperar_senha'))
        self.assertEqual(response.status_code, 405)

    def test_recuperar_senha_json_invalido(self):
        response = self.client.post(reverse('api_recuperar_senha'), data="nao-json", content_type="application/json")
        self.assertEqual(response.status_code, 400)

    def test_recuperar_senha_email_inexistente(self):
        payload = {"email": "naoexiste@deposito.com"}
        response = self.client.post(reverse('api_recuperar_senha'), data=json.dumps(payload), content_type="application/json")
        self.assertEqual(response.status_code, 200)

    def test_recuperar_senha_fluxo_sucesso_e_redefinicao(self):
        payload_rec = {"email": "func@deposito.com"}
        response_rec = self.client.post(reverse('api_recuperar_senha'), data=json.dumps(payload_rec), content_type="application/json")
        self.assertEqual(response_rec.status_code, 200)
        self.assertEqual(len(mail.outbox), 1)

        pin_gerado = self.client.session.get('reset_pin_func@deposito.com')
        self.assertTrue(pin_gerado)

        payload_red = {
            "email": "func@deposito.com",
            "pin": pin_gerado,
            "nova_senha": "NovaSenhaLinda123",
            "confirmacao_senha": "NovaSenhaLinda123"
        }
        response_red = self.client.post(reverse('api_redefinir_senha'), data=json.dumps(payload_red), content_type="application/json")
        self.assertEqual(response_red.status_code, 200)

    def test_redefinir_senha_metodo_invalido(self):
        response = self.client.get(reverse('api_redefinir_senha'))
        self.assertEqual(response.status_code, 405)

    def test_redefinir_senha_json_invalido(self):
        response = self.client.post(reverse('api_redefinir_senha'), data="nao-json", content_type="application/json")
        self.assertEqual(response.status_code, 400)

    def test_redefinir_senha_campos_ausentes(self):
        payload = {"email": "func@deposito.com"}
        response = self.client.post(reverse('api_redefinir_senha'), data=json.dumps(payload), content_type="application/json")
        self.assertEqual(response.status_code, 400)

    def test_redefinir_senha_nao_coincide(self):
        payload = {"email": "func@deposito.com", "pin": "123456", "nova_senha": "SenhaForte123", "confirmacao_senha": "Diferente123"}
        response = self.client.post(reverse('api_redefinir_senha'), data=json.dumps(payload), content_type="application/json")
        self.assertEqual(response.status_code, 400)

    def test_redefinir_senha_fraca(self):
        payload = {"email": "func@deposito.com", "pin": "123456", "nova_senha": "fraca", "confirmacao_senha": "fraca"}
        response = self.client.post(reverse('api_redefinir_senha'), data=json.dumps(payload), content_type="application/json")
        self.assertEqual(response.status_code, 400)

    def test_redefinir_senha_pin_errado_ou_expirado(self):
        payload = {"email": "func@deposito.com", "pin": "000000", "nova_senha": "NovaSenhaLinda123", "confirmacao_senha": "NovaSenhaLinda123"}
        response = self.client.post(reverse('api_redefinir_senha'), data=json.dumps(payload), content_type="application/json")
        self.assertEqual(response.status_code, 400)

    def test_redefinir_senha_usuario_nao_encontrado(self):
        session = self.client.session
        session['reset_pin_sumiu@deposito.com'] = '111111'
        session.save()
        
        payload = {
            "email": "sumiu@deposito.com", 
            "pin": "111111", 
            "nova_senha": "NovaSenhaLinda123", 
            "confirmacao_senha": "NovaSenhaLinda123"
        }
        response = self.client.post(reverse('api_redefinir_senha'), data=json.dumps(payload), content_type="application/json")
        self.assertEqual(response.status_code, 404)

    def test_alternar_unidade_nao_autenticado(self):
        response = self.client.post(reverse('api_alternar_unidade'))
        self.assertEqual(response.status_code, 401)

    def test_alternar_unidade_perfil_invalido(self):
        self.client.force_login(self.user_comum)
        response = self.client.post(reverse('api_alternar_unidade'))
        self.assertEqual(response.status_code, 403)

    def test_alternar_unidade_metodo_invalido(self):
        self.client.force_login(self.user_admin)
        response = self.client.get(reverse('api_alternar_unidade'))
        self.assertEqual(response.status_code, 405)

    def test_alternar_unidade_json_invalido(self):
        self.client.force_login(self.user_admin)
        response = self.client.post(reverse('api_alternar_unidade'), data="nao-json", content_type="application/json")
        self.assertEqual(response.status_code, 400)

    def test_alternar_unidade_sem_id_loja(self):
        self.client.force_login(self.user_admin)
        response = self.client.post(reverse('api_alternar_unidade'), data=json.dumps({}), content_type="application/json")
        self.assertEqual(response.status_code, 400)

    def test_alternar_unidade_loja_nao_encontrada(self):
        self.client.force_login(self.user_admin)
        response = self.client.post(reverse('api_alternar_unidade'), data=json.dumps({"id_loja": 999}), content_type="application/json")
        self.assertEqual(response.status_code, 404)


class UsuarioModelPropertiesTest(TestCase):
    def test_usuario_manager_exceptions(self):
        with self.assertRaises(ValueError):
            Usuario.objects.create_user(email="", nome="Teste", cpf="123", password="123")
        with self.assertRaises(ValueError):
            Usuario.objects.create_user(email="t@t.com", nome="Teste", cpf="", password="123")

    def test_usuario_custom_properties_e_helpers(self):
        user = Usuario.objects.create_user(email="model@test.com", nome="M", cpf="00011122233", password="123", tipo_usuario="GERENTE")
        
        self.assertEqual(str(user), "model@test.com")
        self.assertTrue(user.is_active)
        self.assertTrue(user.is_staff)
        self.assertFalse(user.is_superuser)
        
        user.is_active = False
        self.assertFalse(user.ativo)
        
        self.assertFalse(user.has_perm('any_perm'))
        self.assertFalse(user.has_module_perms('any_app'))


class TenantMiddlewareTest(TestCase):
    def test_middleware_injeta_tenant_id(self):
        request = HttpRequest()
        request.session = {'tenant_id': 1}
        
        middleware = TenantMiddleware(get_response=lambda req: req)
        middleware(request)
        
        self.assertEqual(request.tenant_id, 1)