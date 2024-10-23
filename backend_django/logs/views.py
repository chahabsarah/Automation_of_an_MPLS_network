# logs/views.py
from django.shortcuts import render
from django.http import JsonResponse
from logs.logs_extractor import recuperer_et_filtrer_logs_8, \
    recuperer_et_filtrer_logs_1, recuperer_et_filtrer_logs_2, \
    recuperer_et_filtrer_logs_3, recuperer_et_filtrer_logs_4, \
   recuperer_et_filtrer_logs_5, recuperer_et_filtrer_logs_6, \
    recuperer_et_filtrer_logs_7, recuperer_et_filtrer_tous_les_logs


def recuperer_et_filtrer_logs_routeur_1(request):
    recuperer_et_filtrer_logs_1()
    return JsonResponse({'status': 'Logs récupérés pour le routeur 1'})


def recuperer_et_filtrer_logs_routeur_2(request):
    recuperer_et_filtrer_logs_2()
    return JsonResponse({'status': 'Logs récupérés pour le routeur 2'})


def recuperer_et_filtrer_logs_routeur_3(request):
    recuperer_et_filtrer_logs_3()
    return JsonResponse({'status': 'Logs récupérés pour le routeur 3'})


def recuperer_et_filtrer_logs_routeur_4(request):
    recuperer_et_filtrer_logs_4()
    return JsonResponse({'status': 'Logs récupérés pour le routeur 4'})


def recuperer_et_filtrer_logs_routeur_5(request):
    recuperer_et_filtrer_logs_5()
    return JsonResponse({'status': 'Logs récupérés pour le routeur 5'})


def recuperer_et_filtrer_logs_routeur_6(request):
    recuperer_et_filtrer_logs_6()
    return JsonResponse({'status': 'Logs récupérés pour le routeur 6'})


def recuperer_et_filtrer_logs_routeur_7(request):
    recuperer_et_filtrer_logs_7()
    return JsonResponse({'status': 'Logs récupérés pour le routeur 7'})


def recuperer_et_filtrer_logs_routeur_8(request):
    recuperer_et_filtrer_logs_8()
    return JsonResponse({'status': 'Logs récupérés pour le routeur 8'})


def get_all_logs(request):
    """Read all logs from the .txt file and return them as a JSON response."""
    try:
        with open('logs_127.0.0.1.txt', 'r') as file:
            logs = file.readlines()
        return JsonResponse({'logs': logs})
    except FileNotFoundError:
        return JsonResponse({'error': 'Log file not found.'}, status=404)
    
def recuperer_logs_view(request):
    """Vue pour récupérer les logs."""
    try:
        recuperer_et_filtrer_tous_les_logs()  # Appeler votre fonction
        return JsonResponse({'status': 'success', 'message': 'Logs récupérés et filtrés avec succès.'})
    except Exception as e:
        return JsonResponse({'status': 'error', 'message': str(e)})