import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { NIVELES_LIST_URL } from "../../navigation/CONSTANTS";
import Menu from "../../components/Menu";
import { Alert, Button, Card, Container, Form, FormControl, FormGroup, Image } from "react-bootstrap";
import { getNivelById, patchSaveNivel, postSaveNivel, putSaveNivel } from "../../services/NivelesService";
import { isSuperUser } from "../../utilities/TokenUtilities";

const NivelFormPage = () => {

    const { id } = useParams();
    const navigate = useNavigate();

    const [validated, setValidated] = useState(false);
    const [showAlertError, setShowAlertError] = useState(false);

    const [nombreNivel, setNombreNivel] = useState('');
    const [descripcionNivel, setdescripcionNivel] = useState('');
    const [puntosRequeridos, setpuntosRequeridos] = useState('');
    const [imagen, setimagen] = useState('');
    const [imagenNueva, setImagenNueva] = useState(null);

    useEffect(() => {
        if (id) {
            loadNivelById(id);
        }
    }, [id]);

    const loadNivelById = (id) => {
        getNivelById(id).then((response) => {
            setNombreNivel(response.nombreNivel);
            setdescripcionNivel(response.descripcionNivel);
            setpuntosRequeridos(response.puntosRequeridos);
            setimagen(response.imagen);
        }).catch((error) => {
            console.log(error);
        });
    }

    const onNivelFormSubmit = (e) => {
        const form = e.currentTarget;
        let isValid = form.checkValidity();

        e.preventDefault();
        e.stopPropagation();

        setValidated(true);
        if (!isValid) return;
        saveNivel();
    }

    const saveNivel = () => {
        if (id) {
            doUpdate();
        } else {
            doCreate();
        }
    }

    const doUpdate = () => {
        setShowAlertError(false);
        patchSaveNivel(id, {
            nombreNivel,
            descripcionNivel,
            puntosRequeridos,
            ...(imagenNueva && { imagen: imagenNueva })
        })
            .then((data) => {
                if (!data.id) {
                    setShowAlertError(true);
                    return;
                }
                navigate(NIVELES_LIST_URL);
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    setShowAlertError(true);
                } else {
                    console.log(error);
                }
            });
    }

    const doCreate = () => {
        setShowAlertError(false);
        postSaveNivel({
            nombreNivel,
            descripcionNivel,
            puntosRequeridos
        })
            .then((data) => {
                if (!data.id) {
                    setShowAlertError(true);
                    return;
                }
                console.log("nivel guardado");
                navigate(NIVELES_LIST_URL);
            })
            .catch((error) => {
                if (error.response.status === 401) {
                    setShowAlertError(true);
                } else {
                    console.log(error);
                }
            });
    }

    const handleChangeImagen = (e) => {
        const file = e.target.files[0];
        setImagenNueva(e.target.files[0]);
        setimagen(URL.createObjectURL(file));
    };

    return (
        <>
            <Menu />
            <Container >
                <Card className="mt-3">
                    <Card.Body>
                        <Card.Title>
                            Formulario de Nivel
                        </Card.Title>
                        <div>
                            {showAlertError && <Alert variant="danger">
                                Error al guardar la Nivel
                            </Alert>}
                            <Form noValidate validated={validated} onSubmit={onNivelFormSubmit}>
                                <label>Nombre de la Nivel</label>
                                <Form.Control value={nombreNivel} required
                                    onChange={(e) => {
                                        setNombreNivel(e.target.value);
                                    }} />
                                <Form.Control.Feedback type="invalid">
                                    El nombre de la Nivel es requerido
                                </Form.Control.Feedback>

                                <label>Descripcion de la Nivel</label>
                                <Form.Control value={descripcionNivel} required
                                    onChange={(e) => {
                                        setdescripcionNivel(e.target.value);
                                    }} />
                                <Form.Control.Feedback type="invalid">
                                    La descripcion de la Nivel es requerida
                                </Form.Control.Feedback>

                                <label>Puntos Requeridos</label>
                                <Form.Control value={puntosRequeridos} required
                                    onChange={(e) => {
                                        setpuntosRequeridos(e.target.value);
                                    }} />
                                <Form.Control.Feedback type="invalid">
                                    Los puntos requeridos son requeridos
                                </Form.Control.Feedback>
                                
                                {(id) &&
                                    <>
                                        {
                                            imagen &&
                                            <FormGroup>
                                                <label>Imagen</label>
                                                <FormGroup>
                                                    <Image src={imagen} width="100" height="100" />
                                                </FormGroup>
                                            </FormGroup>
                                        }
                                        <FormGroup>
                                            <label>Subir Imagen</label>
                                            <FormControl
                                                type="file"
                                                accept=".jpg"
                                                className="form-control"
                                                id="foto"
                                                onChange={handleChangeImagen}
                                                data-browse="Seleccionar nueva imagen"
                                                required={id ? false : true}
                                            />
                                            <Form.Control.Feedback type="invalid">Necesitas una foto</Form.Control.Feedback>
                                        </FormGroup>
                                    </>
                                }

                                <div className="mt-3">
                                    <Button type="submit">Guardar Nivel</Button>
                                </div>
                            </Form>
                        </div>
                    </Card.Body>
                </Card>
            </Container>
        </>
    );
}

export default NivelFormPage;