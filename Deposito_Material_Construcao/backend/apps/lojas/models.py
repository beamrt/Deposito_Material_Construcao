from django.db import models

class Loja(models.Model):
    id_loja = models.AutoField(primary_key=True, db_column='id_loja')
    nome = models.CharField(max_length=150)
    cnpj = models.CharField(max_length=14, unique=True)
    telefone = models.CharField(max_length=20, null=True, blank=True)
    email = models.CharField(max_length=150, null=True, blank=True)
    ativa = models.BooleanField(default=True)
    data_criacao = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'loja'

    def __str__(self):
        return self.nome