from django.db import models

class Cliente(models.Model):
    id_cliente = models.AutoField(primary_key=True, db_column='id_cliente')
    nome = models.CharField(max_length=255)
    cpf_cnpj = models.CharField(max_length=18, unique=True)
    telefone = models.CharField(max_length=20, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)

    class Meta:
        db_table = 'cliente'
        managed = False

    def __str__(self):
        return self.nome

class ClienteEndereco(models.Model):
    id_endereco = models.AutoField(primary_key=True, db_column='id_endereco')
    rua = models.CharField(max_length=255)
    numero = models.CharField(max_length=20)
    complemento = models.CharField(max_length=255, blank=True, null=True)
    bairro = models.CharField(max_length=100)
    cidade = models.CharField(max_length=100)
    estado = models.CharField(max_length=2)
    cep = models.CharField(max_length=9)

    class Meta:
        db_table = 'endereco'  # <--- Corrigido para bater com o nome real do seu banco!
        managed = False

    def __str__(self):
        return f"{self.rua}, {self.numero}"