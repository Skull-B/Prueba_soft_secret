from rest_framework import serializers
from .models import Acta, Compromiso, Gestion

class CompromisoEndpoint(serializers.ModelSerializer):
    class Meta:
        model = Compromiso
        fields = '__all__'
class ActaEndpoint(serializers.ModelSerializer):
    compromiso = CompromisoEndpoint(many=True , read_only=True)
    class Meta:
        model = Acta
        fields = ['id', 'titulo', 'estado', 'fecha', 'creador', 'compromiso', 'Archivo']

class GestinarEndpoint(serializers.ModelSerializer):
    class Meta:
        model = Gestion
        fields = '__all__'

