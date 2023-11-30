import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { deleteOpcionPregunta, getListaOpcionesPreguntas } from "../../services";
import Menu from "../../components/Menu";
import { Button, Card, Container, Table } from "react-bootstrap";

const OpcionesPreguntasListPage = () => {
    const navigate = useNavigate();
    const [listaOpcionesPreguntas, setlistaOpcionesPreguntas] = useState([]);

    useEffect(() => {
        loadOpcionesPreguntas();
    }, []);

    const loadOpcionesPreguntas = () => {
        getListaOpcionesPreguntas().then((response) => {
            setlistaOpcionesPreguntas(response);
        }).catch((error) => {
            console.log(error);
        });
    }

    const eliminarOpcionPregunta = (id) => {
        if (window.confirm("¿Está seguro que desea eliminar la opción de pregunta?")) {
            console.log("Eliminar opción de pregunta con id: " + id);
        }
        deleteOpcionPregunta(id).then(() => {
            loadOpcionesPreguntas();
        }).catch((error) => {
            console.log(error);
        });
    }

    return ( 
        <>
            <Menu />
            <Container>
                <Card>
                    <Card.Header>
                        <Card.Title>Lista de Opciones de Pregunta</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Pregunta Id</th>
                                    <th>Contenido Opcion</th>
                                    <th>Opcion Correcta</th>
                                    <th>Editar</th>
                                    <th>Eliminar</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listaOpcionesPreguntas.map((opcionesPregunta, index) => (
                                    <tr key={index}>
                                        <td>{opcionesPregunta.id}</td>
                                        <td>{opcionesPregunta.pregunta}</td>
                                        <td>{opcionesPregunta.contenido_opcion}</td>
                                        <td>{opcionesPregunta.es_correcta ? "True" : "False"}</td>
                                        <td>
                                            <Link to={"/opcionesPreguntas/" + opcionesPregunta.id}>
                                                <Button variant="primary">Editar</Button>
                                            </Link>
                                        </td>
                                        <td>
                                            <Button variant="danger" onClick={() => eliminarOpcionPregunta(opcionesPregunta.id)}>Eliminar</Button>
                                        </td>
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

export default OpcionesPreguntasListPage;