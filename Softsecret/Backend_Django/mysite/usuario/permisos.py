from rest_framework.permissions import BasePermission
from rest_framework_simplejwt.tokens import AccessToken

class TokenValido(BasePermission):
    def has_permission(self, request, view):
        auth_header = request.headers.get("Authorization")
        if not auth_header or not auth_header.startswith("Bearer "):
            return False
        token_str = auth_header.split(" ")[1]
        try:
            token = AccessToken(token_str)
            request.token_data = {
                "id": token.get("id"),
                "correo": token.get("correo"),
                "rol": token.get("rol")
            }
            return True
        except Exception:
            return False