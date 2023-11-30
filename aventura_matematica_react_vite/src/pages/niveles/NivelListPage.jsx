import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Menu from "../../components/Menu";
import { Card, Container, Table } from "react-bootstrap";
import { deleteNivel, getListaNiveles } from "../../services";

const NivelListPage = () => {
    const navigate = useNavigate();
    const [listaNiveles, setlistaNiveles] = useState([]);

    useEffect(() => {
        loadNiveles();
    }, []);

    const loadNiveles = () => {
        getListaNiveles().then((response) => {
            setlistaNiveles(response);
        }).catch((error) => {
            console.log(error);
        });
    }

    const eliminarNivel = (id) => {
        if (window.confirm("¿Está seguro que desea eliminar el nivel?")) {
            console.log("Eliminar nivel con id: " + id);
        }
        deleteNivel(id).then(() => {
            loadNiveles();
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
                        <Card.Title>Lista de Niveles</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Table striped bordered hover>
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Nombre Nivel</th>
                                    <th>Lista Preguntas</th>
                                    <th>Descripcion Nivel</th>
                                    <th>Puntos Requeridos</th>
                                    <th>Imagen</th>
                                </tr>
                            </thead>
                            <tbody>
                                {listaNiveles.map((nivel) => (
                                    <tr key={nivel.id}>
                                        <td>{nivel.id}</td>
                                        <td>{nivel.nombreNivel}</td>
                                        <td>{nivel.lista_preguntas.map((nivelPregunta) => {
                                            return nivelPregunta.contenido_pregunta + ", ";
                                        })}</td>
                                        <td>{nivel.descripcionNivel}</td>
                                        <td>{nivel.puntosRequeridos}</td>
                                        <td>
                                            <img src={nivel.imagen} alt={nivel.nombreNivel} width="50" height="50" />
                                        </td>
                                        <td>
                                            <Link className="btn btn-primary" to={'/niveles/' + nivel.id}>
                                                Editar
                                            </Link>
                                        </td>
                                        <td>
                                            <button className="btn btn-danger" onClick={() => {
                                                eliminarNivel(nivel.id);
                                            }}>
                                                Eliminar
                                            </button>
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

export default NivelListPage;