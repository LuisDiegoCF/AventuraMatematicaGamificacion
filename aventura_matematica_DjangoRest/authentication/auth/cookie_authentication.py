from rest_framework import authentication

from authentication.models import ApiToken


class CookieAuthentication(authentication.BaseAuthentication):
    def authenticate(self, request):
        # leer la cookie y obtener una variable token

        token = request.COOKIES.get('auth_token')
        if not token:
            return None

        # buscar el usuario que tenga ese token
        api_token = ApiToken.objects.filter(token=token).first()
        if not api_token:
            return None
        user = api_token.user

        return user, None
