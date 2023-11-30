from rest_framework import serializers, viewsets

from api.models.puntos import Puntos


class PuntosSerializer(serializers.ModelSerializer):
    usuario = serializers.CharField(source='usuario_id', read_only=True)
    pregunta = serializers.CharField(source='pregunta_id', read_only=True)

    class Meta:
        model = Puntos
        fields = '__all__'


class PuntosViewSet(viewsets.ModelViewSet):
    queryset = Puntos.objects.all()
    serializer_class = PuntosSerializer

    # funcion que retorne los puntos de un usuario en especifico
    def get_queryset(self):
        usuario_id = self.request.query_params.get('usuario_id')
        if usuario_id:
            return Puntos.objects.filter(usuario_id=usuario_id)
        return Puntos.objects.all()

    # http://localhost:8000/puntos/?usuario_id=1
