from rest_framework import serializers
from .models import Contact, CustomUser

class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = ['id', 'name', 'email', 'phone','address']

class CustomUserSerializer(serializers.ModelField):
    class Meta:
        model = CustomUser
        fields = ['username', 'password']