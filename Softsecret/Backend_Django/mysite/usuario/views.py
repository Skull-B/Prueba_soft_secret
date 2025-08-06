from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from .EndpointUser import LoginSerializer


class LoginView(APIView):
    def post(self, request):
        serializer = LoginSerializer(data=request.data)

        if serializer.is_valid():
            usuario = serializer.validated_data

            refresh = RefreshToken.for_user(usuario)

            return Response({
                "mensaje": "Login Correcto",
                "usuario": {
                    "id": usuario.id,
                    "nombre": usuario.first_name,   
                    "apellido": usuario.last_name,  
                    "correo": usuario.correo,       
                    "rol": usuario.rol             
                },
                "token": {
                    "refresh": str(refresh),
                    "access": str(refresh.access_token)
                }
            }, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class VistaProtegida(APIView):
    def get(self, request):
        return Response({
            "mensaje": "Vista Protegida"
        }, status=status.HTTP_200_OK)
