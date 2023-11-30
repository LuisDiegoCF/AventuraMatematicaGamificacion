import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getListaPreguntas } from "../../services";
import { getOpcionPreguntaById, patchSaveOpcionPregunta, postSaveOpcionPregunta, putSaveOpcionPregunta } from "../../services/OpcionesPreguntasService";
import { OPCIONESPREGUNTAS_LIST_URL } from "../../navigation/CONSTANTS";
import Menu from "../../components/Menu";
import { Form, Button, Card, Container } from "react-bootstrap";

const OpcionesPreguntaFormPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [validated, setValidated] = useState(false);
    const [showAlertError, setShowAlertError] = useState(false);

    const [contenido_opcion, setcontenido_opcion] = useState('');
    const [pregunta_id, setPregunta_id] = useState('');
    const [es_correcta, setes_correcta] = useState(true);
    const [preguntas, setPreguntas] = useState([]);

    useEffect(() => {
        loadPreguntas();
        if (id) {
            loadOpcionPreguntaById(id);
        }
    }, []);

    const loadPreguntas = () => {
        getListaPreguntas().then((response) => {
            setPreguntas(response);
        }).catch((error) => {
            console.log(error);
        });
    }

    const loadOpcionPreguntaById = (id) => {
        getOpcionPreguntaById(id).then((response) => {
            setcontenido_opcion(response.contenido_opcion);
            setes_correcta(response.es_correcta);
            setPregunta_id(response.pregunta_id);
        }).catch((error) => {
            console.log(error);
        });
    }

    const onOpcionesPreguntaFormSubmit = (e) => {
        const form = e.currentTarget;
        let isValid = form.checkValidity();

        e.preventDefault();
        e.stopPropagation();

        setValidated(true);
        if (!isValid) return;
        saveOpcionesPregunta();
    }

    const saveOpcionesPregunta = () => {
        if (id) {
            doUpdate();
        } else {
            doCreate();
        }
    }

    const doUpdate = () => {
        setShowAlertError(false);
        patchSaveOpcionPregunta(id, {
            contenido_opcion,
            es_correcta,
            pregunta_id
        }).then((data) => {
            if (!data.id) {
                setShowAlertError(true);
                return;

            }
            navigate(`/preguntas/${pregunta_id}/opciones`);
        }).catch((error) => {
            console.log(error);
            setShowAlertError(true);
        });
    }

    const doCreate = () => {
        setShowAlertError(false);
        console.log(pregunta_id);
        console.log(contenido_opcion);
        console.log(es_correcta);
        postSaveOpcionPregunta({
            contenido_opcion,
            es_correcta,
            pregunta_id
        }).then((data) => {
            if (!data.id) {
                setShowAlertError(true);
                return;
            }
            navigate(`/preguntas/${pregunta_id}/opciones`);
        }).catch((error) => {
            console.log(error);
            setShowAlertError(true);
        });
    }

    const onChangePregunta = (e) => {
        setPregunta_id(e.target.value);
    }

    return (
        <>
            <Menu />
            <Container>
                <Card>
                    <Card.Body>
                        <Card.Title>Crear Opcion de Pregunta</Card.Title>
                        <div>
                            {showAlertError && <div className="alert alert-danger">
                                Error al guardar la Opcion de Pregunta</div>}
                            <Form noValidate validated={validated} onSubmit={onOpcionesPreguntaFormSubmit}>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Texto Opcion</Form.Label>
                                    <Form.Control type="text" placeholder="Texto Opcion" value={contenido_opcion} onChange={(e) => setcontenido_opcion(e.target.value)} required />
                                    <Form.Control.Feedback type="invalid">
                                        Ingrese un Texto Opcion
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">
                                    <Form.Label>Pregunta</Form.Label>
                                    <Form.Select onChange={onChangePregunta} value={pregunta_id} required>
                                        <option value="">Seleccione una Pregunta</option>
                                        {preguntas.map((pregunta) => (
                                            <option key={pregunta.id} value={pregunta.id}>{pregunta.contenido_pregunta}</option>
                                        ))}
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">
                                        Seleccione una Pregunta
                                    </Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="formBasicEmail">

                                    <Form.Check type="checkbox" label="Es Correcta" checked={es_correcta} onChange={(e) => setes_correcta(e.target.checked)} />
                                </Form.Group>
                                <Button variant="primary" type="submit">
                                    Guardar
                                </Button>
                            </Form>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}
export default OpcionesPreguntaFormPage;