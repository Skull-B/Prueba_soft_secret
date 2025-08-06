from django.urls import path
from .views import ActaDetalleView , ActalistaView , VistaProtegida , CompromisoView, CompromisoDetalleView , GestionView

urlpatterns = [
    path('protegida/', VistaProtegida.as_view(), name='vistaprotegida'),

    # Actas
    path('actas/', ActalistaView.as_view(), name='actalista'),
    path('actas/<int:pk>/', ActaDetalleView.as_view(), name='actadetalle'),

    # Compromisos
    path('compromisos/', CompromisoView.as_view(), name='compromiso'),
    path('compromisos/<int:pk>/', CompromisoDetalleView.as_view(), name='compromisodetalle'),

    # Gestiones
    path('gestiones/', GestionView.as_view(), name='gestion'),
]