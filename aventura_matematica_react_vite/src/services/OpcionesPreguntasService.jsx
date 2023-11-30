import api from "./interceptors";

export const getListaOpcionesPreguntas = () => {
    return new Promise((resolve, reject) => {
        api.get("/opcionesPreguntas/", {
            withCredentials: true,
        })
            .then((response) => {
                console.log(response);
                resolve(response.data);
            })
            .catch((error) => {
                if (error.response.status !== 401) {
                    console.log(error);                    
                }
                reject(error);
            });
    });
}

export const postSaveOpcionPregunta = (opcionPregunta) => {
    return new Promise((resolve, reject) => {
        api.post("/opcionesPreguntas/", opcionPregunta, {
            withCredentials: true,
        })
            .then((response) => {
                console.log(response.data);
                resolve(response.data);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
}

export const putSaveOpcionPregunta = (id, opcionPregunta) => {
    return new Promise((resolve, reject) => {
        api.put("/opcionesPreguntas/" + id + "/", opcionPregunta, {
            withCredentials: true,
        })
            .then((response) => {
                console.log(response.data);
                resolve(response.data);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
}

export const patchSaveOpcionPregunta = (id, opcionPregunta) => {
    return new Promise((resolve, reject) => {
        api.patch("/opcionesPreguntas/" + id + "/", opcionPregunta, {
            withCredentials: true,
        })
            .then((response) => {
                console.log(response.data);
                resolve(response.data);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
}

export const deleteOpcionPregunta = (id) => {
    return new Promise((resolve, reject) => {
        api.delete("/opcionesPreguntas/" + id + "/", {
            withCredentials: true,
        })
            .then((response) => {
                console.log(response.data);
                resolve(response.data);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
}

export const getOpcionPreguntaById = (id) => {
    return new Promise((resolve, reject) => {
        api.get("/opcionesPreguntas/" + id + "/", {
            withCredentials: true,
        })
            .then((response) => {
                //console.log(response);
                resolve(response.data);
            })
            .catch((error) => {
                if (error.response.status !== 401) {
                    console.log(error);                    
                }
                reject(error);
            });
    });
}

export const getOpcionesPreguntasByPreguntaId = (id) => {
    return new Promise((resolve, reject) => {
        api.get("/opcionesPreguntas/?pregunta_id=" + id, {
            withCredentials: true,
        })
            .then((response) => {
                //console.log(response);
                resolve(response.data);
            })
            .catch((error) => {
                if (error.response.status !== 401) {
                    console.log(error);                    
                }
                reject(error);
            });
    });
}



