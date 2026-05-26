"""
URL configuration for config project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path
from apps.usuarios.views import (
    api_login, api_logout, api_usuarios, 
    api_usuario_detail, api_recuperar_senha
)
from apps.auditoria.views import api_auditoria

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/login/', api_login, name='api_login'),
    path('api/auth/logout/', api_logout, name='api_logout'),
    path('api/auth/recuperar-senha/', api_recuperar_senha, name='api_recuperar_senha'),
    path('api/usuarios/', api_usuarios, name='api_usuarios'),
    path('api/usuarios/<int:pk>/', api_usuario_detail, name='api_usuario_detail'),
    path('api/auditoria/', api_auditoria, name='api_auditoria'),
]