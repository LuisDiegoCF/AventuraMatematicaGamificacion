from django.db import models


class OpcionesPregunta(models.Model):
    pregunta_id = models.ForeignKey(
        'Pregunta',
        on_delete=models.CASCADE,
        related_name='opciones_pregunta' # esto para que en la clase Pregunta se pueda acceder a las opciones de la pregunta
    )

    contenido_opcion = models.CharField(max_length=100)

    es_correcta = models.BooleanField(default=False)

    def __str__(self):
        return self.contenido_opcion
