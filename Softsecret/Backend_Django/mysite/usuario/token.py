from rest_framework_simplejwt.tokens import RefreshToken

class CustomRefreshToken(RefreshToken):
    @classmethod
    def for_user(cls, user):
        token = super().for_user(user)

        # Eliminar el user_id por defecto
        if "user_id" in token.payload:
            del token.payload["user_id"]

        # Agregar el id personalizado
        token["id"] = user.id
        token["correo"] = user.correo
        token["rol"] = user.rol

        return token
