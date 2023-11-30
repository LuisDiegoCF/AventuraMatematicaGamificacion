from django.contrib.auth.models import User
from rest_framework import serializers

from api.models.estatus import Estatus
from api.models.logro import Logro
from api.models.opcionesPregunta import OpcionesPregunta
from api.models.pregunta import Pregunta


class UsuarioSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name']


class EstatusSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estatus
        fields = ['id', 'nombre_estatus']


class LogrosSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Logro
        fields = ['id', 'nombre_logro']


class PreguntasSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pregunta
        fields = ['id', 'contenido_pregunta', 'puntos_para_pregunta', 'tipo']


class OpcionesSimpleSerializer(serializers.ModelSerializer):
    class Meta:
        model = OpcionesPregunta
        fields = ['id', 'contenido_opcion', 'es_correcta']
