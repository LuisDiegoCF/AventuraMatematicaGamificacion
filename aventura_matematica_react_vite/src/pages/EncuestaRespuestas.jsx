import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getOpcionesPreguntasByPreguntaId, getPreguntasByEncuestaId, getRespuestasByPreguntaId } from "../services";
import Menu from "../components/Menu";
import { Col, Container, ListGroup, Row } from "react-bootstrap";

const EncuestaRespuestas = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [listaPreguntasByEncuestaId, setListaPreguntasByEncuestaId] = useState([]);
    const [listaRespuestasByPreguntaId, setListaRespuestasByPreguntaId] = useState([]);

    useEffect(() => {
        if (id) {
            loadPreguntasByEncuestaId();
        }
    }, []);

    const loadPreguntasByEncuestaId = () => {
        getPreguntasByEncuestaId(id)
            .then((response) => {
                setListaPreguntasByEncuestaId(response);
                loadRespuestasForPreguntas(response);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const loadRespuestasForPreguntas = (preguntas) => {
        const promises = preguntas.map((pregunta) => getRespuestasByPreguntaId(pregunta.id));
        Promise.all(promises)
            .then((responses) => {
                setListaRespuestasByPreguntaId(responses);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    return (
        <>
            <Menu />
            <Container>
                <h1>Encuesta Respuestas</h1>
                {listaPreguntasByEncuestaId.map((pregunta, index) => (
                    <div key={pregunta.id}>
                        <h2>Pregunta: {pregunta.texto}</h2>
                        <ListGroup>
                            {listaRespuestasByPreguntaId[index]?.map((respuesta) => (
                                <ListGroup.Item key={respuesta.id}>
                                    <Row>
                                        <Col>
                                            <p>{respuesta.textoRespuesta}</p>
                                        </Col>
                                        <Col>
                                            <p>{respuesta.usuario}</p>
                                        </Col>
                                    </Row>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                    </div>
                ))}
            </Container>
        </>
    );
}

export default EncuestaRespuestas;
