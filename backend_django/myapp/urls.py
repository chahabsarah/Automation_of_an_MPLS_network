from django.urls import path
from . import views
from .views import get_router_config_by_id, get_all_router_configs,delete_router_config,configure_router_view
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from myapp.views import LoginView, RegisterView


urlpatterns = [

    path('configure-router/', views.configure_router_view, name='configure_router'),
    path('my-form/', views.my_form_view, name='my-form'),
    path('configure-router/<int:id>/', get_router_config_by_id, name='get-router-config-by-id'),
    path('get-configure-router/', get_all_router_configs, name='get-all-router-configs'),
    path('success/', views.success_view, name='success'),
    path('network-configurations/', views.network_configuration_view, name='network_configurations'),
    path('configure-router/delete/<int:id>', delete_router_config, name='delete-router-config'),
    path('network-config/<int:id>/', views.get_network_config_by_id, name='get-network-config-by-id'),
    path('network-config/all/', views.get_all_network_configs, name='get-all-network-configs'),
    path('delete-router-config/<int:id>/', delete_router_config, name='delete_router_config'),
    path('router/<int:id>/', views.get_router_config_data, name='get_router_config_data'),
     path('api/token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('login/', LoginView.as_view(), name='login'),
    path('signup/', RegisterView.as_view(), name='signup'),

]