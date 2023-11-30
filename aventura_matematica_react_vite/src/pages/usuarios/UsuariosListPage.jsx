import { Card, Container, Table } from "react-bootstrap";
import Menu from "../../components/Menu";
import { useEffect, useState } from "react";
import { deleteUsuario, getListaUsuarios } from "../../services";
import { getAuthToken, isSuperUser, validateLogin } from "../../utilities/TokenUtilities";
import { Link, useNavigate } from "react-router-dom";
import { HOME_URL } from "../../navigation/CONSTANTS";

const UsuariosListPage = () => {
    const navigate = useNavigate();
    const [listaUsuarios, setListaUsuarios] = useState([]);

    useEffect(() => {
        // const loginValid = validateLogin(navigate);
        // if (!isSuperUser()){
        //     navigate(HOME_URL);
        //     return;
        // }
        // if (!loginValid) return;
        loadUsuarios();
    }, []);

    const loadUsuarios = () => {
        getListaUsuarios(getAuthToken()).then((response) => {
            setListaUsuarios(response);
        }).catch((error) => {
            console.log(error);
        });
    };

    const eliminarUsuario = (id) => {
        if (!window.confirm('¿Estas seguro de eliminar este usuario?')) {
            return;
        }
        deleteUsuario(getAuthToken(), id).then(() => {
            loadUsuarios();
        }).catch((error) => {
            console.log(error);
        });
    };

    return (
        <>
            <Menu />
            <Container>
                <Card>
                    <Card.Header>
                        <Card.Title>Reuniones</Card.Title>
                    </Card.Header>
                    <Card.Body>
                        <Card.Title>
                            Listado de usuarios
                        </Card.Title>
                        <Table>
                            <thead>
                                <tr>
                                    <th>username</th>
                                    <th>first_name</th>
                                    <th>last_name</th>
                                    <th>email</th>
                                    <th></th>
                                    <th></th>
                                </tr>
                            </thead>
                            <tbody>
                                {listaUsuarios.map((usuario) => {
                                    return (
                                        <tr key={usuario.id}>
                                            <td>{usuario.username}</td>
                                            <td>{usuario.first_name}</td>
                                            <td>{usuario.last_name}</td>
                                            <td>{usuario.email}</td>
                                            <td>
                                                <Link className="btn btn-primary" to={'/usuarios/' + usuario.id}>
                                                    Editar
                                                </Link>
                                            </td>
                                            <td>
                                                <button className="btn btn-danger" onClick={() => {
                                                    eliminarUsuario(usuario.id);
                                                }}>
                                                    Eliminar
                                                </button>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </Table>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}

export default UsuariosListPage;