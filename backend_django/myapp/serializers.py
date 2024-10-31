from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.core.exceptions import ValidationError
from myapp.models import CustomUser

User = get_user_model()

class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True, max_length=191)
    password = serializers.CharField(required=True, max_length=191)
class SignUpSerializer(serializers.ModelSerializer):
    password1 = serializers.CharField(write_only=True, max_length=191)
    password2 = serializers.CharField(write_only=True, max_length=191)

    class Meta:
        model = CustomUser
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

        # Determine role based on email
        email = validated_data['email']
        
        # Check for admin status
        is_admin = email.endswith('@esprit.tn')
        is_technician = not is_admin  # Automatically set technician status

        # Create the user
        user = User(
            username=validated_data['username'],
            email=email,
            is_active=True,  # Set the user as active
            is_staff=is_admin,  # Set staff status if admin
            is_superuser=is_admin  # Set superuser status if admin
        )
        
        # Set custom fields if they exist in the model
        if hasattr(user, 'is_admin'):
            user.is_admin = is_admin
        if hasattr(user, 'is_technician'):
            user.is_technician = is_technician  # Set technician status

        user.set_password(validated_data['password1'])  # Hash the password
        user.save()
        return user