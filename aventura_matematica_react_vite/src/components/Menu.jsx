import { Container, Nav, NavDropdown, Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { getAuthToken } from "../utilities/TokenUtilities";
import { getUserInfo, postLogout } from "../services";
import { useDispatch, useSelector } from "react-redux";
import { userLogin, userLogout } from "../redux/slices/userSlice";
import { HOME_URL, LOGIN_URL, NIVELES_LIST_URL, NIVEL_CREATE_URL, OPCIONESPREGUNTAS_LIST_URL, OPCIONESPREGUNTA_CREATE_URL, PREGUNTAS_LIST_URL, PREGUNTA_CREATE_URL, USUARIOS_LIST_URL, USUARIO_CREATE_URL } from "../navigation/CONSTANTS";

const Menu = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const username = useSelector((state) => state.user.username);

    useEffect(() => {
        if (username == null) return;
        if (!username) {
            getLoggedInUser();
        }
    }, [username]);

    const getLoggedInUser = () => {
        getUserInfo(getAuthToken())
            .then((data) => {
                dispatch(userLogin(data.username));
            }
            ).catch((error) => {
                logout();
                console.log(error);
            });
    }

    const logout = () => {
        postLogout().then(() => {
            dispatch(userLogout());
            navigate(LOGIN_URL);
        }).catch((error) => {
            console.log(error);
        });
    }
    return (
        <Navbar bg="dark" variant="dark" expand="lg">
            <Container fluid>
                <Navbar.Brand href={HOME_URL}>Proyecto</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {username &&
                            <>
                                <NavDropdown title="Usuarios" id="basic-nav-dropdown">
                                    <NavDropdown.Item href={USUARIOS_LIST_URL}>
                                        Lista usuarios
                                    </NavDropdown.Item>
                                    <NavDropdown.Divider />
                                    <NavDropdown.Item href={USUARIO_CREATE_URL}>
                                        Crear usuario
                                    </NavDropdown.Item>
                                </NavDropdown>

                                <NavDropdown title="Niveles" id="basic-nav-dropdown">
                                    <NavDropdown.Item href={NIVELES_LIST_URL}>
                                        Lista niveles
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href={NIVEL_CREATE_URL}>
                                        Crear nivel
                                    </NavDropdown.Item>
                                </NavDropdown>

                                <NavDropdown title="Preguntas" id="basic-nav-dropdown">
                                    <NavDropdown.Item href={PREGUNTAS_LIST_URL}>
                                        Lista preguntas
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href={PREGUNTA_CREATE_URL}>
                                        Crear pregunta
                                    </NavDropdown.Item>
                                </NavDropdown>

                                <NavDropdown title="OpcionesPreguntas" id="basic-nav-dropdown">
                                    <NavDropdown.Item href={OPCIONESPREGUNTAS_LIST_URL}>
                                        Lista opcionesPreguntas
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href={OPCIONESPREGUNTA_CREATE_URL}>
                                        Crear opcionPregunta
                                    </NavDropdown.Item>
                                </NavDropdown>

                                {/*
                                    <NavDropdown title="Respuestas" id="basic-nav-dropdown">
                                    <NavDropdown.Item href={RESPUESTAS_LIST_URL}>
                                        Lista respuestas
                                    </NavDropdown.Item>
                                    <NavDropdown.Item href={RESPUESTA_CREATE_URL}>
                                        Crear respuesta
                                    </NavDropdown.Item>
                                </NavDropdown>    
                                */}
                                <NavDropdown title={username} id="basic-nav-dropdown">
                                    <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                                </NavDropdown>
                            </>}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
}

export default Menu;