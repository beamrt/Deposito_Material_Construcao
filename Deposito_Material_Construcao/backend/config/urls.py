from django.contrib import admin
from django.urls import path, include
from apps.usuarios.views import (
    api_login, api_logout, api_usuarios, 
    api_usuario_detail, api_recuperar_senha,
    api_redefinir_senha,
    api_alternar_unidade  
)
from apps.auditoria.views import api_auditoria
from apps.estoque.views import (
    api_estoque_list, 
    api_movimentar_estoque, 
    api_dashboard_estoque,
    api_kpis_dashboard_mongo,
)
from apps.lojas.views import api_lojas
from apps.clientes.views import (
    api_cliente_criar,
    api_cliente_editar,
    api_cliente_inativar,
    api_endereco_gerenciar
)

from apps.estoque import views as estoque_views

urlpatterns = [
    path('admin/', admin.site.urls),
    
    path('api/auth/login/', api_login, name='api_login'),
    path('api/auth/logout/', api_logout, name='api_logout'),
    path('api/auth/recuperar-senha/', api_recuperar_senha, name='api_recuperar_senha'),
    path('api/auth/redefinir-senha/', api_redefinir_senha, name='api_redefinir_senha'),
    path('api/auth/alternar-unidade/', api_alternar_unidade, name='api_alternar_unidade'),
    
    path('api/usuarios/', api_usuarios, name='api_usuarios'),
    path('api/usuarios/<int:pk>/', api_usuario_detail, name='api_usuario_detail'),
    path('api/auditoria/', api_auditoria, name='api_auditoria'),
    
    path('api/lojas/index', api_lojas, name='api_lojas'),

    path('api/clientes/criar/', api_cliente_criar, name='api_cliente_criar'),
    path('api/clientes/editar/<int:pk>/', api_cliente_editar, name='api_cliente_editar'),
    path('api/clientes/inativar/<int:pk>/', api_cliente_inativar, name='api_cliente_inativar'),
    path('api/clientes/<int:cliente_pk>/enderecos/', api_endereco_gerenciar, name='api_endereco_gerenciar'),
    path('api/clientes/', include('apps.clientes.urls')),
    
    path('api/produtos/', include('apps.produtos.urls')),
    path('api/transferencias/', include('apps.transferencias.urls')),

    path('api/estoque/', api_estoque_list, name='api_estoque_list'),
    path('api/estoque/movimentar/', api_movimentar_estoque, name='api_movimentar_estoque'),
    path('api/estoque/dashboard/', api_dashboard_estoque, name='api_dashboard_estoque'),
    path('api/estoque/entrada/', estoque_views.api_estoque_entrada, name='api_estoque_entrada'),
    path('api/estoque/saida/', estoque_views.api_estoque_saida, name='api_estoque_saida'), 
    
    path('api/estoque/kpis/', estoque_views.api_kpis_dashboard_mongo, name='kpis_dashboard_mongo'),
]