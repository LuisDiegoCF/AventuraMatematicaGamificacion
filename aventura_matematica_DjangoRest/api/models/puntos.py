from django.contrib.auth.models import User
from django.db import models


class Puntos(models.Model):
    usuario_id = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='puntos_usuario' # esto es para que en la clase Usuario se pueda acceder a los puntos del usuario
    )

    cantidad_puntos = models.IntegerField()

    fecha_ganado = models.DateTimeField(auto_now_add=True)

    pregunta_id = models.ForeignKey(
        'Pregunta',
        on_delete=models.CASCADE,
        related_name='puntos_pregunta' # esto para que en la clase Pregunta se pueda acceder a los puntos de la pregunta
    )

    def __str__(self):
        return self.cantidad_puntos
