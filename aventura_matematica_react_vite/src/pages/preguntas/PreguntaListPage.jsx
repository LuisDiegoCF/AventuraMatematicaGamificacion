import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deletePregunta, getListaPreguntas } from "../../services";
import Menu from "../../components/Menu";
import { Button, Card, Container, Table } from "react-bootstrap";

const PreguntaListPage = () => {
    const navigate = useNavigate();
    const [listaPreguntas, setlistaPreguntas] = useState([]);

    useEffect(() => {
        loadPreguntas();
    }, []);

    const loadPreguntas = () => {
        getListaPreguntas().then((response) => {
            setlistaPreguntas(response);
        }).catch((error) => {
            console.log(error);
        });
    }

    const eliminarPregunta = (id) => {
        if (window.confirm("¿Está seguro que desea eliminar la pregunta?")) {
            console.log("Eliminar pregunta con id: " + id);
        }
        deletePregunta(id).then(() => {
            loadPreguntas();
        }).catch((error) => {
            console.log(error);
        });
    }

    const tipo = (tipo) => {
        switch (tipo) {
            case 1:
                return "Texto";
            case 2:
                return "Numérica";
            case 3:
                return "Opción Múltiple";
            default:
                return "Desconocido";
        }
    }

    return (
        <>
            <Menu />
            <Container>
                <Card>
                    <Card.Header>
                        <Card.Title>Lista de preguntas</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Tipo</th>
                                    <th>nivel ID</th>
                                    <th>Contenido Pregunta</th>
                                    <th>Puntos a ganar</th>
                                    <th>Editar</th>
                                    <th>Eliminar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listaPreguntas.map((pregunta) => (
                                    <tr key={pregunta.id}>
                                        <td>{pregunta.id}</td>
                                        <td>{tipo(pregunta.tipo)}</td>
                                        <td>{pregunta.nivel_id}</td>
                                        <td>{pregunta.contenido_pregunta}</td>
                                        <td>{pregunta.puntos_para_pregunta}</td>
                                        <td>
                                            <Link to={"/preguntas/" + pregunta.id}>
                                                <Button variant="primary">Editar</Button>
                                            </Link>
                                        </td>
                                        <td>
                                            <Button variant="danger" onClick={() => eliminarPregunta(pregunta.id)}>Eliminar</Button>
                                        </td>

                                        {pregunta.tipo === 3 &&
                                            <td>
                                                <Link to={"/preguntas/" + pregunta.id + "/opciones"}>
                                                    <Button variant="primary">Ver opciones</Button>
                                                </Link>
                                            </td>
                                        }
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}

export default PreguntaListPage;