from django.urls import path, include
from rest_framework import routers
from django.conf import settings
from django.conf.urls.static import static
from api.apis.estatus_viewset import EstatusViewSet
from api.apis.logro_viewset import LogroViewSet
from api.apis.nivel_viewset import NivelViewSet
from api.apis.opcionesPregunta_viewset import OpcionesPreguntaViewSet
from api.apis.pregunta_viewset import PreguntaViewSet
from api.apis.puntos_viewset import PuntosViewSet
from api.apis.respuesta_viewset import RespuestaViewSet
from authentication.api.usuario_viewset import UsuarioViewSet

router = routers.DefaultRouter()
router.register(r'logros', LogroViewSet)
router.register(r'estatus', EstatusViewSet)
router.register(r'niveles', NivelViewSet)
router.register(r'opcionesPreguntas', OpcionesPreguntaViewSet)
router.register(r'preguntas', PreguntaViewSet)
router.register(r'puntos', PuntosViewSet)
router.register(r'respuestas', RespuestaViewSet)
router.register(r'usuarios', UsuarioViewSet)

urlpatterns = [
    path('', include(router.urls)),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
