import { createBrowserRouter } from "react-router-dom";
import AboutPage from "../pages/AboutPage";
import LoginPage from "../pages/auth/LoginPage";
import UsuariosListPage from "../pages/usuarios/UsuariosListPage";
import UsuariosFormPage from "../pages/usuarios/UsuariosFormPage";
import PreguntaListPage from "../pages/preguntas/PreguntaListPage";
import PreguntaFormPage from "../pages/preguntas/PreguntaFormPage";
import OpcionesPreguntasListPage from "../pages/opcionesPreguntas/OpcionesPreguntasListPage";
import OpcionesPreguntaFormPage from "../pages/opcionesPreguntas/OpcionesPreguntasFormPage";
import PreguntaFormOpciones from "../pages/preguntas/PreguntaFormOpciones";
import PreguntaFormOpcion from "../pages/preguntas/PreguntaFormOpcion";
import HomePage from "../pages/HomePage";
import { ABOUT_URL, HOME_URL, LOGIN_URL, NIVELES_LIST_URL, NIVEL_CREATE_URL, NIVEL_EDIT_URL, OPCIONESPREGUNTAS_LIST_URL, OPCIONESPREGUNTA_CREATE_URL, OPCIONESPREGUNTA_EDIT_URL, PREGUNTAS_LIST_URL, PREGUNTA_CREATE_URL, PREGUNTA_EDIT_URL, PREGUNTA_OPCIONES_URL, PREGUNTA_OPCION_CREATE_URL, PREGUNTA_OPCION_EDIT_URL, USUARIOS_LIST_URL, USUARIO_CREATE_URL, USUARIO_EDIT_URL } from "./CONSTANTS";
import NivelListPage from "../pages/niveles/NivelListPage";
import NivelFormPage from "../pages/niveles/NivelFormPage";

export const router = createBrowserRouter([
    {
        path: HOME_URL,
        element: <HomePage/>,
    },
    {
        path: ABOUT_URL,
        element: <AboutPage/>,
    },
    {
        path: LOGIN_URL,
        element: <LoginPage/>,
    },


    {
        path: USUARIOS_LIST_URL,
        element: <UsuariosListPage/>
    },
    {
        path: USUARIO_CREATE_URL,
        element: <UsuariosFormPage/>
    },
    {
        path: USUARIO_EDIT_URL,
        element: <UsuariosFormPage/>
    },


    {
        path: NIVELES_LIST_URL,
        element: <NivelListPage/>
    },
    {
        path: NIVEL_CREATE_URL,
        element: <NivelFormPage/>
    },
    {
        path: NIVEL_EDIT_URL,
        element: <NivelFormPage/>
    },


    {
        path: PREGUNTAS_LIST_URL,
        element: <PreguntaListPage/>
    },
    {
        path: PREGUNTA_CREATE_URL,
        element: <PreguntaFormPage/>
    },
    {
        path: PREGUNTA_EDIT_URL,
        element: <PreguntaFormPage/>
    },
    {
        path: PREGUNTA_OPCIONES_URL,
        element: <PreguntaFormOpciones/>
    },
    {
        path: PREGUNTA_OPCION_CREATE_URL,
        element: <PreguntaFormOpcion/>
    },
    {
        path: PREGUNTA_OPCION_EDIT_URL,
        element: <PreguntaFormOpcion/>
    },


    {
        path: OPCIONESPREGUNTAS_LIST_URL,
        element: <OpcionesPreguntasListPage/>
    },
    {
        path: OPCIONESPREGUNTA_CREATE_URL,
        element: <OpcionesPreguntaFormPage/>
    },
    {
        path: OPCIONESPREGUNTA_EDIT_URL,
        element: <OpcionesPreguntaFormPage/>
    },
]);