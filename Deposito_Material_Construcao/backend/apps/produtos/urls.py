from django.urls import path
from . import views

urlpatterns = [
    path('cadastro/', views.cadastrar_produto, name='cadastrar_produto'),
    path('listar/', views.listar_produtos, name='listar_produto'),
    path('deletar/<int:pk>/', views.deletar_produto, name='deletar_produto'),
    path('editar/<int:pk>/', views.editar_produto, name='editar_produto'),
    path('categorias/listar/', views.listar_categorias, name='listar_categorias'),
    path('categorias/cadastro/', views.cadastrar_categoria, name='cadastrar_categoria'),
    path('categorias/editar/<int:id_categoria>/', views.editar_categoria, name='editar_categoria'),
    path('categorias/deletar/<int:id_categoria>/', views.deletar_categoria, name='deletar_categoria')
]