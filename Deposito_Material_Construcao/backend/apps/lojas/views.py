from django.shortcuts import render
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt

from apps.lojas.models import Loja

# Create your views here.

@csrf_exempt
def api_lojas(request):
    allLojas = list(Loja.objects.values())

    if not allLojas:
        return JsonResponse({ 'message': 'Nenhuma loja cadastrada' })

    return JsonResponse({ 'all': allLojas })