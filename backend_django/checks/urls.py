from django.urls import path
from .views import (
    router_interfaces_r1,
    router_interfaces_r2,
    router_interfaces_r3,
    router_interfaces_r4,
    router_interfaces_j1,
    router_interfaces_j2,
    router_interfaces_j3,
    router_interfaces_j4,

)

urlpatterns = [
    path('router/r1/', router_interfaces_r1, name='router_r1'),
    path('router/r2/', router_interfaces_r2, name='router_r2'),
    path('router/r3/', router_interfaces_r3, name='router_r3'),
    path('router/r4/', router_interfaces_r4, name='router_r4'),
    path('router/j1/', router_interfaces_j1, name='router_j1'),
    path('router/j2/', router_interfaces_j2, name='router_j2'),
    path('router/j3/', router_interfaces_j3, name='router_j3'),
    path('router/j4/', router_interfaces_j4, name='router_j4'),

]
