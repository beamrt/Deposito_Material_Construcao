from django.urls import path
from . import views

urlpatterns = [
    path('cadastro/', views.cadastrar_produto, name='cadastrar_produto'),
    path('listar/', views.listar_produtos, name='listar_produto'),
    path('deletar/<int:pk>/', views.deletar_produto, name='deletar_produto'),
    path('editar/<int:pk>/', views.editar_produto, name='editar_produto')
]