import { Button, Card, Container, Table } from "react-bootstrap";
import Menu from "../../components/Menu";
import { useEffect, useState } from "react";
import { getPreguntaById } from "../../services";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteOpcionPregunta, getOpcionesPreguntasByPreguntaId } from "../../services/OpcionesPreguntasService";
import { OPCIONESPREGUNTA_CREATE_URL, PREGUNTA_OPCIONES_URL, PREGUNTA_OPCION_CREATE_URL } from "../../navigation/CONSTANTS";

const PreguntaFormOpciones = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [listaOpcionesPreguntaById, setlistaOpcionesPreguntaById] = useState([]);

    useEffect(() => {
        loadListaOpcionesPreguntaById();
    }, []);

    const loadListaOpcionesPreguntaById = () => {
        getOpcionesPreguntasByPreguntaId(id).then((response) => {
            setlistaOpcionesPreguntaById(response);
        }).catch((error) => {
            console.log(error);
        });
    }

    const deleteOpcion = (id) => {
        if (window.confirm("¿Está seguro que desea eliminar el registro?")) {
            deleteOpcionPregunta(id);
            loadListaOpcionesPreguntaById();
        }
    }

    return ( 
        <>
            <Menu />
            <Container>
                
                {/* <div className="d-flex justify-content-center">
                    <Link to={"/preguntas/" + id + "/opciones/create"} className="btn btn-primary">Crear Opcion</Link>
                </div> */}

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
                                {listaOpcionesPreguntaById.map((opcionesPregunta, index) => (
                                    <tr key={index}>
                                        <td>{opcionesPregunta.id}</td>
                                        <td>{opcionesPregunta.pregunta}</td>
                                        <td>{opcionesPregunta.contenido_opcion}</td>
                                        <td>{opcionesPregunta.es_correcta ? "True" : "False"}</td>
                                        <td> 
                                            <Link to={"/opcionPregunta/" + opcionesPregunta.id} className="btn btn-primary">
                                                Editar
                                            </Link> 
                                        </td>
                                        <td>
                                            <Button variant="danger" onClick={() => deleteOpcion(opcionesPregunta.id)}>Eliminar</Button>
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

export default PreguntaFormOpciones;