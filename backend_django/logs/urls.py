from django.urls import path
from . import views
from logs.views import recuperer_logs_view

urlpatterns = [
    path('logs/routeur1/', views.recuperer_et_filtrer_logs_routeur_1, name='routeur_1_logs'),
    path('logs/routeur2/', views.recuperer_et_filtrer_logs_routeur_2, name='routeur_2_logs'),
    path('logs/routeur3/', views.recuperer_et_filtrer_logs_routeur_3, name='routeur_3_logs'),
    path('logs/routeur4/', views.recuperer_et_filtrer_logs_routeur_4, name='routeur_4_logs'),
    path('logs/routeur5/', views.recuperer_et_filtrer_logs_routeur_5, name='routeur_5_logs'),
    path('logs/routeur6/', views.recuperer_et_filtrer_logs_routeur_6, name='routeur_6_logs'),
    path('logs/routeur7/', views.recuperer_et_filtrer_logs_routeur_7, name='routeur_7_logs'),
    path('logs/routeur8/', views.recuperer_et_filtrer_logs_routeur_8, name='routeur_8_logs'),
    path('logs/all/', views.get_all_logs, name='get_all_logs'),
    path('recuperer-logs/', recuperer_logs_view, name='recuperer_logs'),

]
