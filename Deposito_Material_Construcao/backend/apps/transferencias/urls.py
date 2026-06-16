from django.urls import path
from . import views

urlpatterns = [
    path('criar/', views.api_transferencia_criar, name='criar_transferencia'),
    path('receber/', views.api_transferencia_receber, name='receber_transferencia')
]