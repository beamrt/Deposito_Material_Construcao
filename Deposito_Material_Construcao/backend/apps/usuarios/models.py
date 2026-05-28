from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

class UsuarioManager(BaseUserManager):
    def create_user(self, email, nome, cpf, password=None, tipo_usuario='FUNCIONARIO'):
        if not email:
            raise ValueError('O usuário deve ter um e-mail válido.')
        if not cpf:
            raise ValueError('O usuário deve ter um CPF válido.')
            
        user = self.model(
            email=self.normalize_email(email),
            nome=nome,
            cpf=cpf,
            tipo_usuario=tipo_usuario,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(self, email, nome, cpf, password=None):
        user = self.create_user(email, nome, cpf, password, tipo_usuario='ADMIN')
        user.save(using=self._db)
        return user

class Usuario(AbstractBaseUser):
    TIPO_CHOICES = [
        ('MASTER', 'MASTER/MATRIZ'),
        ('ADMIN', 'ADMIN'),
        ('GERENTE', 'GERENTE'),
        ('FUNCIONARIO', 'FUNCIONARIO'),
    ]

    id_usuario = models.AutoField(primary_key=True, db_column='id_usuario')
    nome = models.CharField(max_length=150)
    cpf = models.CharField(max_length=11, unique=True)
    email = models.EmailField(max_length=150, unique=True)
    password = models.CharField(max_length=255, db_column='senha_hash')
    tipo_usuario = models.CharField(max_length=20, choices=TIPO_CHOICES, default='FUNCIONARIO', db_column='tipo_usuario')
    ativo = models.BooleanField(default=True, db_column='ativo')
    data_criacao = models.DateTimeField(auto_now_add=True, db_column='data_criacao')
    ultimo_login = models.DateTimeField(null=True, blank=True, db_column='ultimo_login')

    lojas = models.ManyToManyField('lojas.Loja', through='UsuarioLoja', related_name='usuarios')

    objects = UsuarioManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['nome', 'cpf']

    class Meta:
        db_table = 'usuario'

    def __str__(self):
        return self.email

    @property
    def is_active(self):
        return self.ativo

    @is_active.setter
    def is_active(self, value):
        self.ativo = value

    @property
    def is_staff(self):
        return self.tipo_usuario in ['ADMIN', 'GERENTE', 'MASTER']

    @property
    def is_superuser(self):
        return self.tipo_usuario == 'ADMIN'

    def has_perm(self, perm, obj=None):
        return self.tipo_usuario in ['ADMIN', 'MASTER']

    def has_module_perms(self, app_label):
        return self.tipo_usuario in ['ADMIN', 'MASTER']


class UsuarioLoja(models.Model):
    id_usuario = models.OneToOneField(Usuario, on_delete=models.CASCADE, db_column='id_usuario', primary_key=True)
    id_loja = models.ForeignKey('lojas.Loja', on_delete=models.CASCADE, db_column='id_loja')

    class Meta:
        db_table = 'usuario_loja'
        unique_together = (('id_usuario', 'id_loja'),)