from django.db import models
from apps.clientes.models import Cliente
from apps.lojas.models import Loja
from apps.usuarios.models import Usuario

class Venda(models.Model):
    id_venda = models.AutoField(primary_key=True, db_column='id_venda')
    cliente = models.ForeignKey(Cliente, on_delete=models.DO_NOTHING, db_column='id_cliente')
    loja = models.ForeignKey(Loja, on_delete=models.DO_NOTHING, db_column='id_loja')
    vendedor = models.ForeignKey(Usuario, on_delete=models.DO_NOTHING, db_column='id_usuario')
    data_venda = models.DateTimeField(auto_now_add=True)
    valor_total = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    status = models.CharField(max_length=50, default='Concluída')

    class Meta:
        db_table = 'venda'
        managed = True 

    def __str__(self):
        return f"Venda {self.id_venda} - {self.cliente.nome}"