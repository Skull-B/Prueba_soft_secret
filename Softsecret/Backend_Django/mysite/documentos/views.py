from django.shortcuts import render
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .models import Acta, Compromiso, Gestion
from .EndpointDocument import ActaEndpoint, CompromisoEndpoint, GestinarEndpoint
from .permisos import PuedeVerActas


# Vista protegida
class VistaProtegida(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        return Response({
            'message': 'Acceso concedido',
            'username': request.user.correo  # Usamos correo en lugar de username
        })


# ACTAS
class ActalistaView(generics.ListCreateAPIView):
    serializer_class = ActaEndpoint
    permission_classes = [IsAuthenticated, PuedeVerActas]

    def get_queryset(self):
        user = self.request.user

        if user.rol == 'ADMIN':
            queryset = Acta.objects.all()
        else:
            queryset = (
                Acta.objects.filter(creador=user) |
                Acta.objects.filter(compromisos__responsable=user)
            ).distinct()

        estado = self.request.query_params.get('estado')
        titulo = self.request.query_params.get('titulo')
        fecha = self.request.query_params.get('fecha')

        if estado:
            queryset = queryset.filter(estado__icontains=estado)
        if titulo:
            queryset = queryset.filter(titulo__icontains=titulo)
        if fecha:
            queryset = queryset.filter(fecha__date=fecha)

        return queryset


class ActaDetalleView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Acta.objects.all()
    serializer_class = ActaEndpoint
    permission_classes = [IsAuthenticated, PuedeVerActas]


# COMPROMISOS
class CompromisoView(generics.ListCreateAPIView):
    serializer_class = CompromisoEndpoint
    permission_classes = [IsAuthenticated, PuedeVerActas]

    def get_queryset(self):
        user = self.request.user
        if user.rol == 'ADMIN':
            return Compromiso.objects.all()
        return Compromiso.objects.filter(responsable=user)


class CompromisoDetalleView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Compromiso.objects.all()
    serializer_class = CompromisoEndpoint
    permission_classes = [IsAuthenticated, PuedeVerActas]


# GESTIONES
class GestionView(generics.ListCreateAPIView):
    serializer_class = GestinarEndpoint
    permission_classes = [IsAuthenticated, PuedeVerActas]

    def get_queryset(self):
        user = self.request.user
        if user.rol == 'ADMIN':
            return Gestion.objects.all()
        return Gestion.objects.filter(compromiso__responsable=user)
