import { Alert, Button, Card, Container, Form, FormControl, FormGroup } from "react-bootstrap";
import Menu from "../../components/Menu";
import { useState } from "react";
import { postLogin } from "../../services";
import { useNavigate } from "react-router-dom";
import { HOME_URL } from "../../navigation/CONSTANTS";
import { useDispatch } from "react-redux";
import { userLogin } from "../../redux/slices/userSlice";

const LoginPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [validated, setValidated] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showAlertError, setShowAlertError] = useState(false)

    const onLoginSubmit = (e) => {
        const form = e.currentTarget;

        let isValid = form.checkValidity();

        e.preventDefault();
        e.stopPropagation();

        setValidated(true);

        if (!isValid) return;
        doLogin();
    }

    const doLogin = () => {
        setShowAlertError(false);
        postLogin(username, password)
            .then((data) => {
                if(!data.id) {
                    setShowAlertError(true);
                    return;
                }
                saveUsername();
                navigate(HOME_URL);
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    setShowAlertError(true);
                } else {
                    console.log(error);
                }
            });
    }
    const saveUsername = () => {
        dispatch(userLogin(username));
    }
    return (
        <>
            <Menu />
            <Container>
                <Card className="mt-3">
                    <Card.Body>
                        <Card.Title>
                            Inicio de Sesión
                        </Card.Title>
                        <div>
                            {showAlertError && <Alert variant="danger">
                                Usuario o contraseña incorrectas
                            </Alert>}
                            <Form noValidate onSubmit={onLoginSubmit} validated={validated}>
                                <FormGroup>
                                    <label>Usuario</label>
                                    <FormControl value={username} required
                                        onChange={(e) => {
                                            setUsername(e.target.value);
                                        }} />
                                    <Form.Control.Feedback type="invalid">Necesitas un usuario</Form.Control.Feedback>
                                </FormGroup>
                                <FormGroup>
                                    <label>Contraseña</label>
                                    <FormControl value={password} required
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                        }}
                                        type="password" />
                                    <Form.Control.Feedback type="invalid">Necesitas una contraseña</Form.Control.Feedback>
                                </FormGroup>
                                <div className="mt-3">
                                    <Button type="submit">Iniciar Sesión</Button>
                                </div>
                            </Form>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}

export default LoginPage;