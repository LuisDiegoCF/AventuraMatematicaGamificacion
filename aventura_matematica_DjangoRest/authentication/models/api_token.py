from django.db import models


class ApiToken(models.Model):
    token = models.CharField(max_length=50)
    user = models.OneToOneField(
        'auth.User',
        on_delete=models.CASCADE,
        related_name='api_token'
    )

    def __str__(self):
        return self.token
