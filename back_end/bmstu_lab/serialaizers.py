from rest_framework import serializers
from rest_framework.serializers import ModelSerializer, Serializer, CharField

from bmstu_lab.models import Soft, Payment
from django.contrib.auth.models import User

class UserSerializer(ModelSerializer):

    class Meta:
        model = User
        fields = ['username', 'first_name', 'last_name', 'email', 'date_joined']

class LoginRequestSerializer(Serializer):
    model = User
    username = CharField(required=True)
    password = CharField(required=True)

class SoftSerializer(serializers.ModelSerializer):
    class Meta:
        model = Soft
        fields = ["id", "name", "description", "img", "price", "number"]


class PaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Payment
        fields = ["id_field", "date_open", "date_pay", "date_close", "status", "soft", "user"]



