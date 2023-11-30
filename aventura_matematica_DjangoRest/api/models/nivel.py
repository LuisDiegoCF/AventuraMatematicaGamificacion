from django.db import models


class Nivel(models.Model):
    nombreNivel = models.CharField(max_length=100)
    descripcionNivel = models.CharField(max_length=500)
    puntosRequeridos = models.IntegerField()
    # quiero que la imagen no sea requerida
    imagen = models.ImageField(upload_to='nivel', null=True, blank=True)

    def __str__(self):
        return self.nombreNivel
