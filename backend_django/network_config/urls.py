from django.urls import path
from .views import (
    TestRouter1Config,
    TestRouter2Config,
    TestRouter3Config,
    TestRouter4Config,
    TestJuniper1Config,
    TestJuniper2Config,
    TestJuniper3Config,
    TestJuniper4Config,
)

urlpatterns = [
    path('r1/', TestRouter1Config.as_view(), name='test-router-1'),
    path('r2/', TestRouter2Config.as_view(), name='test-router-2'),
    path('r3/', TestRouter3Config.as_view(), name='test-router-3'),
    path('r4/', TestRouter4Config.as_view(), name='test-router-4'),
    path('j1/', TestJuniper1Config.as_view(), name='test-juniper-1'),
    path('j2/', TestJuniper2Config.as_view(), name='test-juniper-2'),
    path('j3/', TestJuniper3Config.as_view(), name='test-juniper-3'),
    path('j4/', TestJuniper4Config.as_view(), name='test-juniper-4'),
]
