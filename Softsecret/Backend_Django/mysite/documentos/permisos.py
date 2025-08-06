from rest_framework.permissions import BasePermission

class PuedeVerActas(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        # Si es admin, siempre tiene acceso
        if getattr(request.user, 'rol', None) == "ADMIN":
            return True

        # Si el objeto tiene un creador
        if hasattr(obj, 'creador') and obj.creador == request.user:
            return True

        # Si el objeto tiene un responsable
        if hasattr(obj, 'responsable') and obj.responsable == request.user:
            return True

        # Si el objeto tiene un compromiso con responsable
        if hasattr(obj, 'compromiso') and getattr(obj.compromiso, 'responsable', None) == request.user:
            return True

        return False
