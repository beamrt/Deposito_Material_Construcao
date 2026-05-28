from django.db import models
from django.conf import settings

class AuditLog(models.Model):
    id_auditoria = models.AutoField(primary_key=True, db_column='id_auditoria')
    id_usuario = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, db_column='id_usuario')
    acao = models.CharField(max_length=100, null=True, blank=True)
    tabela_afetada = models.CharField(max_length=100, null=True, blank=True)
    id_registro = models.IntegerField(null=True, blank=True)
    data_hora = models.DateTimeField(auto_now_add=True, db_column='data_hora')
    detalhes = models.TextField(null=True, blank=True)
    
    tenant_id = models.IntegerField(null=True, blank=True, db_column='tenant_id')

    class Meta:
        db_table = 'auditoria'

    def __str__(self):
        return f"{self.data_hora} - {self.acao}"