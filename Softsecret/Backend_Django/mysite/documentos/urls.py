from django.urls import path
from .views import ActaDetalleView , ActalistaView , VistaProtegida , CompromisoView, CompromisoDetalleView , GestionView

urlpatterns = [
    path('protegida/', VistaProtegida.as_view(), name='vistaprotegida'),
    # Actas
    path('Actas/', ActalistaView.as_view(), name='actalista'),
    path('Actas/<int:pk>', ActaDetalleView.as_view(), name='actadetalle'),
    # Compromisios
    path('Compromisos/', CompromisoView.as_view(), name='compromiso'),
    path('Compromisos/<int:pk>', CompromisoDetalleView.as_view(), name='compromisodetalle'),
    # Gestiones
    path('Gestiones/', GestionView.as_view(), name='gestion'),
    
]