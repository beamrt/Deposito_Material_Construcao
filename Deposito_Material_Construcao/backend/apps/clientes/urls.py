from django.urls import path
from . import views

urlpatterns = [
    path('listar/', views.api_cliente_listar, name='listar_clientes'),
    path('criar/', views.api_cliente_criar, name='criar_cliente'),
    path('<int:pk>/editar/', views.api_cliente_editar, name='editar_cliente'),
    path('<int:pk>/inativar/', views.api_cliente_inativar, name='inativar_cliente'),
    path('<int:cliente_pk>/endereco/', views.api_endereco_gerenciar, name='gerenciar_endereco'),
]