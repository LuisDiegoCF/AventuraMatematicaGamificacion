import { Alert, Button, Card, Container, Form, FormControl, FormGroup } from "react-bootstrap";
import Menu from "../../components/Menu";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getUsuarioById, postSaveUsuario, updateUsuario } from "../../services";
import { USUARIOS_LIST_URL } from "../../navigation/CONSTANTS";
import { borrarDatosUsuario, getAuthToken, isSuperUser, setDatosUsuario } from "../../utilities/TokenUtilities";
import { getUserId } from "../../utilities/TokenUtilities";

const UsuarioFormPage = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [validated, setValidated] = useState(false);
    const [showAlertError, setShowAlertError] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const [userName, setuserName] = useState('');
    const [firstName, setfirstName] = useState('');
    const [lastName, setlastName] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [superUser, setSuperUser] = useState(false);

    useEffect(() => {
        if (id) {
            loadUsuarioById();
        } else {
            setShowPassword(true);
        }
    }, []);

    const loadUsuarioById = () => {
        getUsuarioById(getAuthToken(), id).then((response) => {
            const usuario = response;
            setuserName(usuario.username);
            setfirstName(usuario.first_name);
            setlastName(usuario.last_name);
            setemail(usuario.email);
            setSuperUser(usuario.is_superuser);
        });
    }

    const onUsuarioFormSubmit = (e) => {
        const form = e.currentTarget;
        let isValid = form.checkValidity();

        // esto es para que no se recargue la página
        e.preventDefault();
        // esto es para que no se propague el evento
        e.stopPropagation();

        setValidated(true);
        if (!isValid) return;
        saveUsuario();
    }

    const saveUsuario = () => {
        if (id) {
            doUpdate();
        } else {
            doCreate();
        }
    }

    const doUpdate = () => {
        setShowAlertError(false);
        updateUsuario(getAuthToken(), id, {
            username: userName,
            first_name: firstName,
            last_name: lastName,
            email: email,
            ...(isSuperUser() && { is_superuser: superUser }),
            // password: password
        })
            .then((data) => {
                if (!data.id) {
                    setShowAlertError(true);
                    return;
                }

                if (superUser) {
                    setDatosUsuario(true, data.id);
                } else {
                    if (getUserId() === data.id) {
                        borrarDatosUsuario();
                    }
                }

                navigate(USUARIOS_LIST_URL);
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    setShowAlertError(true);
                } else {
                    console.log(error);
                }
            });
    }

    const doCreate = () => {
        setShowAlertError(false);
        postSaveUsuario({
            username: userName,
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password
        })
            .then((data) => {
                if (!data.id) {
                    setShowAlertError(true);
                    return;
                }
                navigate(USUARIOS_LIST_URL);
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    setShowAlertError(true);
                } else {
                    console.log(error);
                }
            });
    }

    return (
        <>
            <Menu />
            <Container>
                <Card className="mt-3">
                    <Card.Body>
                        <Card.Title>
                            Formulario de usuario
                        </Card.Title>
                        <div>
                            {showAlertError && <Alert variant="danger">
                                Error al enviar datos, por favor intente nuevamente
                            </Alert>}
                            <Form noValidate onSubmit={onUsuarioFormSubmit} validated={validated}>

                                <FormGroup>
                                    <label>userName</label>
                                    <FormControl value={userName} required
                                        onChange={(e) => {
                                            setuserName(e.target.value);
                                        }} />
                                    <Form.Control.Feedback type="invalid">Necesitas un userName</Form.Control.Feedback>
                                </FormGroup>

                                <FormGroup>
                                    <label>First Name</label>
                                    <FormControl value={firstName} required
                                        onChange={(e) => {
                                            setfirstName(e.target.value);
                                        }} />
                                    <Form.Control.Feedback type="invalid">Necesitas firstName</Form.Control.Feedback>
                                </FormGroup>

                                <FormGroup>
                                    <label>Last Name</label>
                                    <FormControl value={lastName} required
                                        onChange={(e) => {
                                            setlastName(e.target.value);
                                        }} />
                                    <Form.Control.Feedback type="invalid">Necesitas lastName</Form.Control.Feedback>
                                </FormGroup>

                                <FormGroup>
                                    <label>Email</label>
                                    <FormControl value={email} required
                                        onChange={(e) => {
                                            setemail(e.target.value);
                                        }} />
                                    <Form.Control.Feedback type="invalid">Necesitas email</Form.Control.Feedback>
                                </FormGroup>

                                {showPassword && <FormGroup>
                                    <label>Password</label>
                                    <FormControl type="password" required
                                        onChange={(e) => {
                                            setpassword(e.target.value);
                                        }} />
                                    <Form.Control.Feedback type="invalid">Necesitas password</Form.Control.Feedback>
                                </FormGroup>}


                                {isSuperUser() && (
                                    <FormGroup>
                                        <label>Super User</label>
                                        <FormGroup>
                                            <input className="form-check-input" type="checkbox"
                                                name="isSuperUser"
                                                checked={superUser}
                                                onChange={(e) => setSuperUser(e.target.checked)}
                                            />
                                        </FormGroup>
                                    </FormGroup>
                                )}

                                <div className="mt-3">
                                    <Button type="submit">Guardar Usuario</Button>
                                </div>
                            </Form>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}

export default UsuarioFormPage;