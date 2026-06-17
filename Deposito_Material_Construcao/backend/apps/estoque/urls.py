from django.urls import path
from . import views

urlpatterns = [
    path('', views.api_estoque_list, name='estoque_list'),
    path('editar/<int:id_estoque>/', views.api_estoque_editar, name='estoque_editar'),
    path('deletar/<int:id_estoque>/', views.api_estoque_deletar, name='estoque_deletar'),
    path('transferir/', views.api_criar_transferencia, name='criar_transferencia'), # <--- Rota do Áudio 1
    
    path('dashboard/', views.api_dashboard_estoque, name='dashboard_estoque'),
    path('movimentar/', views.api_movimentar_estoque, name='movimentar_estoque'),
    path('entrada/', views.api_estoque_entrada, name='estoque_entrada'),
    path('saida/', views.api_estoque_saida, name='estoque_saida'),
]