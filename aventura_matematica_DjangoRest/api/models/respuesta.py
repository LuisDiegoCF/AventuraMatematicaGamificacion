from django.contrib.auth.models import User
from django.db import models


class Respuesta(models.Model):
    usuario_id = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='respuestas_usuario' # esto es para que en la clase Usuario se pueda acceder a las respuestas del usuario
    )

    pregunta_id = models.ForeignKey(
        'Pregunta',
        on_delete=models.CASCADE,
        related_name='respuestas_pregunta' # esto es para que en la clase Pregunta se pueda acceder a las respuestas de la pregunta
    )

    contenido_respuesta = models.CharField(max_length=500)

    es_correcta = models.BooleanField(default=False)

    def __str__(self):
        return self.contenido_respuesta
