from rest_framework import serializers, viewsets

from api.models.opcionesPregunta import OpcionesPregunta


class OpcionesPreguntaSerializer(serializers.ModelSerializer):
    pregunta = serializers.CharField(source='pregunta_id', required=False)

    class Meta:
        model = OpcionesPregunta
        fields = '__all__'


class OpcionesPreguntaViewSet(viewsets.ModelViewSet):
    queryset = OpcionesPregunta.objects.all()
    serializer_class = OpcionesPreguntaSerializer

    # funcion que retorne las opciones de una pregunta en especifico
    def get_queryset(self):
        pregunta_id = self.request.query_params.get('pregunta_id')
        if pregunta_id:
            return OpcionesPregunta.objects.filter(pregunta_id=pregunta_id)
        return OpcionesPregunta.objects.all()

    # http://localhost:8000/opcionesPregunta/?pregunta_id=1
