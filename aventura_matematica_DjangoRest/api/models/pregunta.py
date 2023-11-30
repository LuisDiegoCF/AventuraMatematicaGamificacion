from django.db import models


class Pregunta(models.Model):
    TEXTUAL = 1
    NUMERICA = 2
    OPCION_MULTIPLE = 3

    TIPO_CHOICES = (
        (TEXTUAL, 'Textual'),
        (NUMERICA, 'Numerica'),
        (OPCION_MULTIPLE, 'Opcion Multiple'),
    )

    tipo = models.CharField(
        choices=TIPO_CHOICES,
        max_length=50
    )

    nivel_id = models.ForeignKey(
        'Nivel',
        on_delete=models.CASCADE,
        related_name='preguntas'  # esto para que en la clase Nivel se pueda acceder a las preguntas del nivel
    )

    contenido_pregunta = models.CharField(max_length=500)

    puntos_para_pregunta = models.IntegerField()

    def __str__(self):
        return self.contenido_pregunta
