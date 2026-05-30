from django.db import models

class Categoria(models.Model):
    id_categoria = models.AutoField(primary_key=True)
    nome = models.CharField(max_length=255)

    class Meta:
        db_table = 'categoria'

    def __str__(self):
        return self.nome


class Produto(models.Model):
    id_produto = models.AutoField(primary_key=True)
    nome = models.CharField(max_length=255)
    descricao = models.TextField(null=True, blank=True)
    id_categoria = models.ForeignKey(Categoria, on_delete=models.SET_NULL, null=True, db_column='id_categoria', related_name='produtos')
    marca = models.CharField(max_length=255, null=True, blank=True)
    unidade_medida = models.CharField(max_length=50, null=True, blank=True)
    codigo_barras = models.CharField(max_length=255, null=True, blank=True)
    preco_custo = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    preco_venda = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    margem_lucro = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    ativo = models.BooleanField(default=True)
    data_criacao = models.DateTimeField(auto_now_add=True)
    data_atualizacao = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'produto'

    def __str__(self):
        return self.nome