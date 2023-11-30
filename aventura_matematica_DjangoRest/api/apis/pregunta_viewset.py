from rest_framework import serializers, viewsets

from api.apis.simple_serializer import OpcionesSimpleSerializer
from api.models.pregunta import Pregunta


class PreguntaSerializer(serializers.ModelSerializer):
    nivel = serializers.CharField(source='nivel_id', required=False)
    lista_opciones = OpcionesSimpleSerializer(
        read_only=True,
        many=True,
        source='opciones_pregunta',
    )

    class Meta:
        model = Pregunta
        fields = '__all__'


class PreguntaViewSet(viewsets.ModelViewSet):
    queryset = Pregunta.objects.all()
    serializer_class = PreguntaSerializer

    # funcion que retorne las preguntas de un nivel en especifico
    def get_queryset(self):
        nivel_id = self.request.query_params.get('nivel_id')
        if nivel_id:
            return Pregunta.objects.filter(nivel_id=nivel_id)
        return Pregunta.objects.all()

    # http://localhost:8000/preguntas/?nivel_id=1
