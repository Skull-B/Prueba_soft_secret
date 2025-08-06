from rest_framework.permissions import BasePermission

class PuedeVerActas(BasePermission):
    def has_permission(self, request, view):
        return request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        
        if getattr(request.user, 'rol', None) == "ADMIN":
            return True

      
        if hasattr(obj, 'creador') and obj.creador == request.user:
            return True


        if hasattr(obj, 'responsable') and obj.responsable == request.user:
            return True

        if hasattr(obj, 'compromiso') and getattr(obj.compromiso, 'responsable', None) == request.user:
            return True

        return False
