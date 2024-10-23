# serializers.py

from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError

User = get_user_model()

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True)
    
class SignUpSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(write_only=True)
    password2 = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ('username', 'email', 'password1', 'password2')

    def validate(self, data):
        # Check if passwords match
        if data['password1'] != data['password2']:
            raise ValidationError("Passwords do not match")
        
        # Check if username already exists
        if User.objects.filter(username=data['username']).exists():
            raise ValidationError("Username already exists")

        # Check if email already exists
        if User.objects.filter(email=data['email']).exists():
            raise ValidationError("Email already exists")

        return data

    def create(self, validated_data):
        # Remove password2 as it's not needed for User creation
        validated_data.pop('password2')
        
        # Create the user
        user = User(username=validated_data['username'], email=validated_data['email'])
        user.set_password(validated_data['password1'])  # Hash the password
        user.save()
        return user
