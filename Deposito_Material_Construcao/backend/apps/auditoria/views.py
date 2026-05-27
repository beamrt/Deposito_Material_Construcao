from django.http import JsonResponse
from .models import AuditLog

def api_auditoria(request):
    if not request.user.is_authenticated:
        return JsonResponse({'error': 'Não autorizado'}, status=401)
        
    if request.user.tipo_usuario != 'ADMIN':
        return JsonResponse({'error': 'Acesso exclusivo para Administradores'}, status=403)

    logs = AuditLog.objects.all().order_by('-data_hora')

    data = [{
        'id_auditoria': l.id_auditoria,
        'usuario': l.id_usuario.email if l.id_usuario else 'Sistema',
        'acao': l.acao,
        'tabela_afetada': l.tabela_afetada,
        'id_registro': l.id_registro,
        'detalhes': l.detalhes,
        'data_hora': l.data_hora.strftime('%d/%m/%Y %H:%M:%S')
    } for l in logs]
    
    return JsonResponse({'logs': data})