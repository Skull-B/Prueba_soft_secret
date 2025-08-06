from django.urls import path 
from .views import LoginView, VistaProtegida
from rest_framework_simplejwt.views import TokenRefreshView

urlpatterns = [
    path('login/', LoginView.as_view(), name ='login'),
    path('protegida/', VistaProtegida.as_view(), name='vistaprotegida'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh')
    , 


] 

