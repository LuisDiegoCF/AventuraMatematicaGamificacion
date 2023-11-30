from django.contrib.auth.models import User
from django.db import models


class Logro(models.Model):

    nombre_logro = models.CharField(max_length=100)

    descripcion_logro = models.CharField(max_length=500)

    usuario_logro = models.ManyToManyField(
        User,
        related_name='logros', # para que en la clase User se pueda acceder a los logros del usuario
        blank=True
    )
    imagen = models.ImageField(upload_to='logros')  # , blank=True

    def __str__(self):
        return self.nombre_logro
