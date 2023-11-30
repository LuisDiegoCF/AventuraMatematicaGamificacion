from rest_framework import serializers, viewsets

from api.apis.simple_serializer import UsuarioSimpleSerializer
from api.models.logro import Logro


class LogroSerializer(serializers.ModelSerializer):
    lista_usuarios = UsuarioSimpleSerializer(
        read_only=True,
        many=True,
        source='usuario_logro',
    )
    imagen = serializers.ImageField(max_length=None, use_url=True)

    class Meta:
        model = Logro
        fields = '__all__'


class LogroViewSet(viewsets.ModelViewSet):
    queryset = Logro.objects.all()
    serializer_class = LogroSerializer

    # funcion que retorne los logros de un usuario en especifico
    def get_queryset(self):
        usuario_id = self.request.query_params.get('usuario_id')
        if usuario_id:
            return Logro.objects.filter(usuario_id=usuario_id)
        return Logro.objects.all()

    # http://localhost:8000/logros/?usuario_id=1
