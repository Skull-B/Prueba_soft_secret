from rest_framework import serializers
from .models import Usuarios
from django.contrib.auth.hashers import check_password

class LoginSerializer(serializers.Serializer):
    correo = serializers.EmailField()
    contrasena = serializers.CharField(write_only=True)

    def validate(self, data):
        correo = data.get('correo')
        contrasena = data.get('contrasena')

        try:
            usuario = Usuarios.objects.get(correo=correo)
        except Usuarios.DoesNotExist:
            raise serializers.ValidationError("Usuario no encontrado")

        if not check_password(contrasena, usuario.password):
            raise serializers.ValidationError("Contraseña incorrecta")

        # Aquí retornamos el OBJETO, no un dict
        return usuario
