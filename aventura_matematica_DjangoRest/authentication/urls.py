from django.urls import include
from django.urls import path
from rest_framework import routers

from authentication.api.usuario_viewset import UsuarioViewSet

router = routers.DefaultRouter()
router.register(r'usuarios', UsuarioViewSet)

urlpatterns = [
    path('', include(router.urls)),
]
