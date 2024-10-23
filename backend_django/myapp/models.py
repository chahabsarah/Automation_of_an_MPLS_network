
from django.db import models
from datetime import datetime

class Router(models.Model):
    host = models.CharField(max_length=100)
    port = models.IntegerField()
    username = models.CharField(max_length=100)
    password = models.CharField(max_length=100)

class NetworkConfiguration(models.Model):
    clientname = models.CharField(max_length=100)
    interface = models.CharField(max_length=100)
    ip_address = models.CharField(max_length=100)
    vrf=models.CharField(max_length=100)
    members_target=models.CharField(max_length=100)
    route_distinguisher=models.CharField(max_length=100)
    subnet = models.CharField(max_length=100)
    status = models.CharField(max_length=10, default='pending')
    router_key = models.CharField(max_length=100 ) 

class SignUp(models.Model):
    username = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    password1 = models.CharField(max_length=100)
    password2 = models.CharField(max_length=100)

class ErrorLog(models.Model):
    level = models.CharField(max_length=50)
    message = models.TextField()
    function = models.CharField(max_length=100)
    timestamp = models.DateTimeField(default=datetime.now)