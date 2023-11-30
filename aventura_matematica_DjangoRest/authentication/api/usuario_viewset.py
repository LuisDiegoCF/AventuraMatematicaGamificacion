import json

from django.contrib.auth import authenticate
from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from django.http import HttpResponse
from rest_framework import serializers, viewsets
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response

from api.apis.simple_serializer import EstatusSimpleSerializer, LogrosSimpleSerializer
from authentication.repositories import TokenRepository


class UsuarioSerializer(serializers.ModelSerializer):
    lista_estatus = EstatusSimpleSerializer(
        read_only=True,
        many=True,
        source='estatus',
    )

    lista_logros = LogrosSimpleSerializer(
        read_only=True,
        many=True,
        source='logros',
    )

    class Meta:
        model = User
        fields = '__all__'


class UsuarioViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UsuarioSerializer

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated])
    def me(self, request, *args, **kwargs):
        user = User.objects.filter(pk=self.request.user.id).first()
        serializer = self.get_serializer(user)
        return Response(serializer.data)

    @action(detail=False, methods=['post'])
    def login(self, request, *args, **kwargs):
        username = self.request.data.get('username')
        password = self.request.data.get('password')
        user = authenticate(username=username, password=password)
        if user is None:
            return Response({'error': 'Credenciales incorrectas'}, status=401)

        if hasattr(user, 'api_token') and user.api_token is not None:
            token = user.api_token
        else:
            token = TokenRepository.create_token(user)

        request.COOKIES['auth_token'] = token.token
        response = HttpResponse(
            json.dumps(self.get_serializer(user).data)
        )
        response['Content-Type'] = 'application/json'
        response.set_cookie('auth_token', token.token, httponly=True,
                            samesite='None', secure=True,
                            max_age=30 * 60)  # , , samesite='Lax', expires=token_expiration
        return response

    @action(detail=False, methods=['post'], permission_classes=[IsAuthenticated])
    def logout(self, request, *args, **kwargs):
        response = HttpResponse(
            json.dumps({'message': 'success'})
        )
        response['Content-Type'] = 'application/json'
        response.delete_cookie("auth_token")
        return response

    # Sobreescribir el método "create" para encriptar la contraseña
    def create(self, request, *args, **kwargs):
        # Obtener la contraseña proporcionada por el usuario
        password = request.data.get('password')

        # Encriptar la contraseña usando make_password
        hashed_password = make_password(password)

        # Actualizar la solicitud con la contraseña encriptada
        request.data['password'] = hashed_password

        # Llamar al método "create" del padre para crear el usuario con la contraseña encriptada
        return super().create(request, *args, **kwargs)

    # Sobreescribir el método "update" para encriptar la contraseña
    def update(self, request, *args, **kwargs):
        if request.data.get('password'):
            # Obtener la contraseña proporcionada por el usuario
            password = request.data.get('password')

            # Encriptar la contraseña usando make_password
            hashed_password = make_password(password)

            # Actualizar la solicitud con la contraseña encriptada
            request.data['password'] = hashed_password

        # Llamar al método "update" del padre para actualizar el usuario con la contraseña encriptada
        return super().update(request, *args, **kwargs)

    # permission_classes = [IsAuthenticated]
