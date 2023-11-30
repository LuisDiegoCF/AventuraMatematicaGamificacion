from rest_framework import serializers, viewsets

from api.apis.simple_serializer import PreguntasSimpleSerializer
from api.models.nivel import Nivel


class NivelSerializer(serializers.ModelSerializer):
    lista_preguntas = PreguntasSimpleSerializer(
        read_only=True,
        many=True,
        source='preguntas',
    )

    class Meta:
        model = Nivel
        fields = '__all__'
        extra_kwargs = {
            'imagen': {'required': False},
        }


class NivelViewSet(viewsets.ModelViewSet):
    queryset = Nivel.objects.all()
    serializer_class = NivelSerializer
