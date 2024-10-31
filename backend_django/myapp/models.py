
from datetime import datetime

from django.contrib.auth.models import AbstractUser, Group, Permission
from django.db import models
from django.contrib.admin.models import LogEntry as AdminLogEntry
from django.contrib.auth import get_user_model

User = get_user_model()  


class CustomUser(AbstractUser):
    is_admin = models.BooleanField(default=False)
    is_technician = models.BooleanField(default=False)

   
    groups = models.ManyToManyField(
        Group,
        related_name='custom_users',
        blank=True,
        help_text='The groups this user belongs to.',
        verbose_name='groups',
    )
    user_permissions = models.ManyToManyField(
        Permission,
        related_name='custom_users_permissions',
        blank=True,
        help_text='Specific permissions for this user.',
        verbose_name='user permissions',
    )
    def __str__(self):
        return self.username
    pass


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
    message = models.TextField(max_length=191)
    function = models.CharField(max_length=100)
    timestamp = models.DateTimeField(default=datetime.now)