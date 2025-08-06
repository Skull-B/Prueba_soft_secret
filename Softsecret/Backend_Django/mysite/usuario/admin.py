from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Usuarios
from django.contrib.auth.forms import UserCreationForm, UserChangeForm

class UsuariosAdmin(UserAdmin):
    model = Usuarios
    add_form = UserCreationForm
    form = UserChangeForm
    list_display = ('correo', 'first_name', 'last_name', 'rol', 'is_staff')
    search_fields = ('correo',)
    ordering = ('correo',)
    fieldsets = (
        (None, {'fields': ('correo', 'password')}),
        ('Personal info', {'fields': ('first_name', 'last_name', 'rol')}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'is_superuser')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('correo', 'first_name', 'last_name', 'rol', 'password1', 'password2', 'is_staff', 'is_active')}
        ),
    )

admin.site.register(Usuarios, UsuariosAdmin)