
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('checks/', include('checks.urls')),
    path('config/', include('network_config.urls')),

]
