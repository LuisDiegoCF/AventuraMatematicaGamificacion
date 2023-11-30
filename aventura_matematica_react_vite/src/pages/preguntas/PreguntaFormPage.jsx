import { useNavigate, useParams } from "react-router-dom";
import Menu from "../../components/Menu";
import { useEffect, useState } from "react";
import { PREGUNTAS_LIST_URL } from "../../navigation/CONSTANTS";
import { getListaNiveles, getPreguntaById, postSavePregunta, putSavePregunta } from "../../services";
import { Alert, Button, Card, Container, Form } from "react-bootstrap";


const PreguntaFormPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [validated, setValidated] = useState(false);
    const [showAlertError, setShowAlertError] = useState(false);

    const [tipo, settipo] = useState('');
    const [nivel_id, setnivel_id] = useState('');
    const [contenido_pregunta, setcontenido_pregunta] = useState('');
    const [puntos_para_pregunta, setpuntos_para_pregunta] = useState('');
    const [niveles, setniveles] = useState([]);

    useEffect(() => {
        loadniveles();
        if (id) {
            loadPreguntaById(id);
        }
    }, []);

    const loadniveles = () => {
        getListaNiveles().then((response) => {
            setniveles(response);

            if (response.length > 0 && !id) {
                setnivel_id(response[0].id);
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    const loadPreguntaById = (id) => {
        getPreguntaById(id).then((response) => {
            settipo(response.tipo);
            setcontenido_pregunta(response.contenido_pregunta);
            setnivel_id(response.nivel_id);
            setpuntos_para_pregunta(response.puntos_para_pregunta);
        }).catch((error) => {
            console.log(error);
        });
    }

    const onPreguntaFormSubmit = (e) => {
        const form = e.currentTarget;
        let isValid = form.checkValidity();

        e.preventDefault();
        e.stopPropagation();

        setValidated(true);
        if (!isValid) return;
        savePregunta();
    }

    const savePregunta = () => {
        if (id) {
            doUpdate();
        } else {
            doCreate();
        }
    }

    const doUpdate = () => {
        setShowAlertError(false);
        console.log(tipo.toString());
        putSavePregunta(id, {
            tipo: tipo,
            contenido_pregunta: contenido_pregunta,
            nivel_id: nivel_id,
            puntos_para_pregunta
        })
            .then((data) => {
                if (!data.id) {
                    setShowAlertError(true);
                    return;
                }
                navigate(PREGUNTAS_LIST_URL);
            })
            .catch((error) => {
                console.log(error);
                setShowAlertError(true);
            });
    }

    const doCreate = () => {
        setShowAlertError(false);
        postSavePregunta({
            tipo: tipo,
            contenido_pregunta: contenido_pregunta,
            nivel_id: nivel_id,
            puntos_para_pregunta
        })
            .then((data) => {
                if (!data.id) {
                    setShowAlertError(true);
                    return;
                }
                navigate(PREGUNTAS_LIST_URL);
            })
            .catch((error) => {
                console.log(error);
                setShowAlertError(true);
            });
    }

    const onChangenivel = (e) => {
        setnivel_id(e.target.value);
    }

    return (
        <>
            <Menu />
            <Container>
                <Card>
                    <Card.Body>
                        <Card.Title>
                            Formulario de Pregunta
                        </Card.Title>
                        <div>
                            {showAlertError && (
                                <Alert variant="danger">
                                    Error al guardar la pregunta
                                </Alert>
                            )}
                            <Form noValidate validated={validated} onSubmit={onPreguntaFormSubmit}>
                                <label>Tipo</label>
                                <Form.Group className="mb-3">
                                    <Form.Control as="select" value={tipo} 
                                    onChange={(e) => {
                                        settipo(e.target.value);
                                    }} required>
                                        <option value="">Seleccione un tipo</option>
                                        <option value="1">Textual</option>
                                        <option value="2">Numerica</option>
                                        <option value="3">Opcion Multiple</option>
                                    </Form.Control>
                                </Form.Group>

                                <label>Contenido pregunta</label>
                                <Form.Group className="mb-3">
                                    <Form.Control type="text" value={contenido_pregunta} onChange={(e) => setcontenido_pregunta(e.target.value)} required />
                                </Form.Group>

                                <label>nivel</label>
                                <Form.Group className="mb-3">
                                    <Form.Control as="select" value={nivel_id} required
                                        onChange={onChangenivel}>
                                        {niveles.map((nivel) => (
                                            <option key={nivel.id} value={nivel.id}>
                                                {nivel.id}
                                            </option>
                                        ))}
                                    </Form.Control>
                                </Form.Group>

                                <label>Puntos a ganar</label>
                                <Form.Group className="mb-3">
                                    <Form.Control type="number" value={puntos_para_pregunta} onChange={(e) => setpuntos_para_pregunta(e.target.value)} required />
                                </Form.Group>
                                
                                <Button variant="primary" type="submit">
                                    Guardar
                                </Button>
                                <Button variant="secondary" onClick={() => navigate(PREGUNTAS_LIST_URL)}>
                                    Cancelar
                                </Button>
                            </Form>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}

export default PreguntaFormPage;