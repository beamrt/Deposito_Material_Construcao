from django.db import models
from apps.produtos.models import Produto
from apps.lojas.models import Loja

class Estoque(models.Model):
    id_estoque = models.AutoField(primary_key=True)
    id_loja = models.ForeignKey(Loja, on_delete=models.CASCADE, db_column='id_loja')
    id_produto = models.ForeignKey(Produto, on_delete=models.CASCADE, db_column='id_produto')
    quantidade = models.IntegerField(default=0)
    estoque_minimo = models.IntegerField(default=0)
    estoque_maximo = models.IntegerField(null=True, blank=True)
    localizacao = models.CharField(max_length=255, null=True, blank=True)
    data_atualizacao = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'estoque'

    def __str__(self):
        return f"{self.id_produto.nome} - {self.id_loja.nome}"