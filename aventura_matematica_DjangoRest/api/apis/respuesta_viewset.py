from rest_framework import serializers, viewsets

from api.models.respuesta import Respuesta


class RespuestaSerializer(serializers.ModelSerializer):
    usuario = serializers.CharField(source='usuario_id', read_only=True)
    pregunta = serializers.CharField(source='pregunta_id', read_only=True)

    class Meta:
        model = Respuesta
        fields = '__all__'


class RespuestaViewSet(viewsets.ModelViewSet):
    queryset = Respuesta.objects.all()
    serializer_class = RespuestaSerializer

    """
    def get_queryset(self):
        pregunta_id = self.request.query_params.get('pregunta_id')
        if pregunta_id:
            return Respuesta.objects.filter(pregunta_id=pregunta_id)
        return Respuesta.objects.all()
    """

    # http://localhost:8000/respuestas/?pregunta_id=1

    # funcion que retorne las respuestas de una pregunta y un usuario en especifico
    def get_queryset(self):
        pregunta_id = self.request.query_params.get('pregunta_id')
        usuario_id = self.request.query_params.get('usuario_id')
        if pregunta_id and usuario_id:
            return Respuesta.objects.filter(pregunta_id=pregunta_id, usuario_id=usuario_id)
        return Respuesta.objects.all()

    # http://localhost:8000/respuestas/?pregunta_id=1&usuario_id=1
