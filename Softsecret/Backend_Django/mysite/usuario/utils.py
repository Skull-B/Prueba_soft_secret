from rest_framework_simplejwt.tokens import AccessToken
from usuario.models import Usuarios  # Ajusta si tu modelo está en otra app

def obtener_usuario_desde_token(request):
    auth_header = request.headers.get("Authorization")
    if not auth_header or not auth_header.startswith("Bearer "):
        return None

    token_str = auth_header.split(" ")[1]
    try:
        token = AccessToken(token_str)

        # Buscar por 'id' o 'user_id'
        usuario_id = token.get("id") or token.get("user_id")
        if not usuario_id:
            return None

        return Usuarios.objects.get(id=usuario_id)
    except Exception:
        return None