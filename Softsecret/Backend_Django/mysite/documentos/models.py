from django.db import models
from usuario.models import Usuarios # usuario.models from Usuarios
from django.core.exceptions import ValidationError

# Create your models here.


class Acta(models.Model):

    ESTADOS_CHOICES = (
        ('Pendiente', 'Pendiente'),
        ('Aprobada', 'Aprobada'),
        ('Rechazada', 'Rechazada'),
    )

    titulo = models.CharField(max_length=100)
    estado = models.CharField(max_length=20, choices=ESTADOS_CHOICES, default='Pendiente')
    fecha = models.DateTimeField()
    creador = models.ForeignKey(Usuarios, on_delete=models.CASCADE, related_name='creador')
    Archivo = models.FileField(upload_to='actas/' , blank=True, null=True)

    
    def __str__(self):
        return self.titulo

class Compromiso(models.Model):
    acta = models.ForeignKey(Acta, on_delete=models.CASCADE, related_name='compromisos')
    descripcion = models.TextField()
    responsable = models.ForeignKey(Usuarios, on_delete=models.CASCADE, related_name='responsable')
    fecha = models.DateTimeField()

    def __str__(self):
        
        return f"{self.descripcion} - {self.responsable}"
      

class Gestion(models.Model):
    compromiso = models.ForeignKey(Compromiso, on_delete=models.CASCADE, related_name='gestiones')
    fecha = models.DateTimeField()
    descripcion = models.TextField()
    Archivo = models.FileField(upload_to='gestiones/')
    
    def clean(self):
        
        ext = self.Archivo.name.split('.')[-1]
        if ext not in ['pdf', 'jpg']:
            raise ValidationError('El archivo debe ser PDF o JPG')
        
        if self.Archivo.size > 5 * 1024 * 1024:
            raise ValidationError('El archivo debe ser menor de 5MB')


    def __str__(self):
        return f"Gestion para {self.compromiso.descripcion} - {self.fecha}"