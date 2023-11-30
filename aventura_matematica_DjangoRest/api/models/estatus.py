from django.contrib.auth.models import User
from django.db import models


class Estatus(models.Model):
    nombre_estatus = models.CharField(max_length=50)
    puntos_requeridos = models.IntegerField()

    usuario_estatus = models.ManyToManyField(
        User,
        related_name='estatus',  # para que en la clase User se pueda acceder a los estatus del usuario
        blank=True,

    )
    imagen = models.ImageField(upload_to='estatus')  # , blank=True

    def __str__(self):
        return self.nombre_estatus
