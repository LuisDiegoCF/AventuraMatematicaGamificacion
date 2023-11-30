import { useEffect, useState } from "react";
import Menu from "../components/Menu";
import { getPreguntasByEncuestaId, getOpcionesPreguntasByPreguntaId, postSaveRespuesta, patchSaveEncuesta, getEncuestaById } from "../services";
import { Alert, Button, Card, Container, Form } from "react-bootstrap";
import { Link, useNavigate, useParams } from "react-router-dom";
import { HOME_URL, PREGUNTAS_LIST_URL } from "../navigation/CONSTANTS";
import { getMe } from "../services/UsuariosService";

const EncuestaPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [validated, setValidated] = useState(false);
    const [showAlertError, setShowAlertError] = useState(false);

    const [listaPreguntasByEncuestaId, setListaPreguntasByEncuestaId] = useState([]);
    const [listaOpcionesByPreguntaId, setListaOpcionesByPreguntaId] = useState([]);

    const [preguntasRespuestas, setPreguntasRespuestas] = useState({});
    const [listaUsuariosParticiparon, setListaUsuariosParticiparon] = useState([]);
    const [me, setMe] = useState([]);

    useEffect(() => {
        loadMe();
        loadListaParticipantesRespondieron();
        if (id) {
            loadPreguntasByEncuestaId();
        }
    }, []);

    const loadMe = () => {
        getMe().then((response) => {
            setMe(response);
        }).catch((error) => {
            console.log(error);
        });
    };

    const loadListaParticipantesRespondieron = () => {
        getEncuestaById(id).then((response) => {
            setListaUsuariosParticiparon(response.usuariosRespondieron);
        }).catch((error) => {
            console.log(error);
        });
    };

    const loadPreguntasByEncuestaId = () => {
        getPreguntasByEncuestaId(id)
            .then((response) => {
                setListaPreguntasByEncuestaId(response);
                // Obtener las opciones de las preguntas
                response.forEach((pregunta) => {
                    getOpcionesByPreguntaId(pregunta.id);
                });
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const getOpcionesByPreguntaId = (preguntaId) => {
        getOpcionesPreguntasByPreguntaId(preguntaId)
            .then((response) => {
                setListaOpcionesByPreguntaId((prevLista) => ({
                    ...prevLista,
                    [preguntaId]: response,
                }));
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const onPreguntaFormSubmit = (e) => {
        const form = e.currentTarget;
        let isValid = form.checkValidity();

        e.preventDefault();
        e.stopPropagation();

        setValidated(true);
        if (!isValid) return;
        savePregunta();
        saveEncuesta();
        navigate(HOME_URL);
    };

    const savePregunta = () => {
        const preguntasRespuestasArray = Object.keys(preguntasRespuestas).map((preguntaId) => ({
            pregunta_id: preguntaId,
            textoRespuesta: preguntasRespuestas[preguntaId],
        }));
        preguntasRespuestasArray.forEach((preguntaRespuesta) => {
            console.log(preguntaRespuesta.pregunta_id + ' ' + preguntaRespuesta.textoRespuesta);
            postSaveRespuesta({
                pregunta_id: parseInt(preguntaRespuesta.pregunta_id),
                textoRespuesta: preguntaRespuesta.textoRespuesta.toString(),
                usuario_id: me.id,
            })
                .then((response) => {
                    console.log(response);
                })
                .catch((error) => {
                    console.log(error);
                    setShowAlertError(true);
                    return;
                });
        });
    };

    const saveEncuesta = () => {
        // agrega mi id a la lista de usuarios que respondieron
        listaUsuariosParticiparon.push(me.id);
        patchSaveEncuesta(id, {
            usuariosRespondieron: listaUsuariosParticiparon,
        })
            .then((response) => {
                console.log(response + ' encuesta actualizada');
            })
            .catch((error) => {
                console.log(error);
                setShowAlertError(true);
                return;
            });
    };

    const handleRespuestaChange = (preguntaId, opcionTexto) => {
        setPreguntasRespuestas((prevRespuestas) => ({
            ...prevRespuestas,
            [preguntaId]: opcionTexto,
        }));
    };

    const handleRespuestaChange3 = (preguntaId, isChecked, opcionTexto) => {
        setPreguntasRespuestas((prevRespuestas) => {
            if (isChecked) {
                return {
                    ...prevRespuestas,
                    [preguntaId]: [...(prevRespuestas[preguntaId] || []), opcionTexto],
                };
            } else {
                const updatedRespuestas = prevRespuestas[preguntaId].filter(
                    (texto) => texto !== opcionTexto
                );
                return {
                    ...prevRespuestas,
                    [preguntaId]: updatedRespuestas,
                };
            }
        });
    };

    return (
        <>
            <Menu />
            <Container>
                <h1>Encuesta</h1>
                <h2>Preguntas</h2>
                <Form onSubmit={onPreguntaFormSubmit} noValidate validated={validated}>
                    {listaPreguntasByEncuestaId.length === 0 && (
                        <Alert variant="info">No hay preguntas para mostrar</Alert>
                    )}
                    {listaPreguntasByEncuestaId.map((pregunta) => (
                        <Card key={pregunta.id}>
                            <Card.Body>
                                <Card.Title>{pregunta.texto}</Card.Title>
                            </Card.Body>
                            {pregunta.tipo === 1 && (
                                <Form.Group controlId={`pregunta-${pregunta.id}`}>
                                    <Form.Control
                                        type="text"
                                        placeholder="Ingrese su respuesta"
                                        onChange={(e) =>
                                            handleRespuestaChange(pregunta.id, e.target.value)
                                        }
                                        required
                                    />
                                </Form.Group>
                            )}
                            {pregunta.tipo === 2 && (
                                <Form.Group controlId={`pregunta-${pregunta.id}`}>
                                    <Form.Control
                                        type="number"
                                        placeholder="Ingrese su respuesta"
                                        onChange={(e) =>
                                            handleRespuestaChange(pregunta.id, e.target.value)
                                        }
                                        required
                                    />
                                </Form.Group>
                            )}
                            {pregunta.tipo === 3 && (
                                <Form.Group controlId={`pregunta-${pregunta.id}`}>
                                    {listaOpcionesByPreguntaId[pregunta.id]?.map((opcion) => (
                                        <Form.Check
                                            key={opcion.id}
                                            type="checkbox"
                                            id={`opcion-${opcion.id}`}
                                            label={opcion.textoOpcion}
                                            onChange={(e) =>
                                                handleRespuestaChange3(pregunta.id, e.target.checked, opcion.textoOpcion)
                                            }
                                        />
                                    ))}
                                </Form.Group>
                            )}
                        </Card>
                    ))}
                    {showAlertError && (
                        <Alert variant="danger" onClose={() => setShowAlertError(false)} dismissible>
                            <Alert.Heading>Error</Alert.Heading>
                            <p>Ocurrió un error al guardar la Encuesta.</p>
                        </Alert>
                    )}
                    <Button variant="primary" type="submit" display={listaPreguntasByEncuestaId.length === 0 ? 'none' : 'block'}>
                        Guardar
                    </Button>
                </Form>
            </Container>
        </>
    );
};

export default EncuestaPage;
