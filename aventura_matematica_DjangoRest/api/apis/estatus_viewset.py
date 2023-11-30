from rest_framework import serializers, viewsets

from api.apis.simple_serializer import UsuarioSimpleSerializer
from api.models.estatus import Estatus


class EstatusSerializer(serializers.ModelSerializer):
    lista_usuarios = UsuarioSimpleSerializer(
        read_only=True,
        many=True,
        source='usuario_estatus',
    )
    imagen = serializers.ImageField(max_length=None, use_url=True)

    class Meta:
        model = Estatus
        fields = '__all__'


class EstatusViewSet(viewsets.ModelViewSet):
    queryset = Estatus.objects.all()
    serializer_class = EstatusSerializer
