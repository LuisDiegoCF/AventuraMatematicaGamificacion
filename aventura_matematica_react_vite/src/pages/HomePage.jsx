import { useEffect, useState } from "react";
import Menu from "../components/Menu";
import { getMe } from "../services/UsuariosService";
import { Container, Table } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { getListaNiveles } from "../services";

const HomePage = () => {
    const navigate = useNavigate();
    const [me, setMe] = useState('');
    const [listaNiveles, setlistaNiveles] = useState([]);

    useEffect(() => {
        loadMe();
        loadNiveles();
    }, []);

    const loadMe = () => {
        getMe().then((response) => {
            setMe(response);
        }).catch((error) => {
            console.log(error);
            navigate('/login');
        });
    }

    const loadNiveles = () => {
        getListaNiveles().then((response) => {
            setlistaNiveles(response);
        }).catch((error) => {
            console.log(error);
        });
    }

    return (
        <>
            <Menu />
            <Container>
                <h1>Bienvenido {me.nombre} {me.apellido}</h1>
                <h2>Niveles</h2>
                <Table striped bordered hover>
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Nombre Nivel</th>
                            <th>Descripcion Nivel</th>
                            <th>Puntos Requeridos</th>
                            <th>Imagen</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listaNiveles.map((encuesta) => (
                            <tr key={encuesta.id} onClick={() => navigate('/encuesta/' + encuesta.id + '/respuestas')}>
                                <td>{encuesta.id}</td>
                                <td>{encuesta.nombre}</td>
                                <td>
                                    <Link to={"/encuestas/" + encuesta.id + "/llenar"} className="btn btn-primary" onClick={(event) => event.stopPropagation()}>Llenar</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Container>
        </>
    );
}

export default HomePage;