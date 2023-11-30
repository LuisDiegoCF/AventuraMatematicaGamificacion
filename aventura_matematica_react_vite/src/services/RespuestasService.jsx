import api from "./interceptors";

export const getListaRespuestas = () => {
    return new Promise((resolve, reject) => {
        api.get("/respuestas/", {
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

export const postSaveRespuesta = (respuesta) => {
    return new Promise((resolve, reject) => {
        api.post("/respuestas/", respuesta, {
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

export const putSaveRespuesta = (id, respuesta) => {
    return new Promise((resolve, reject) => {
        api.put("/respuestas/" + id + "/", respuesta, {
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

export const patchSaveRespuesta = (id, respuesta) => {
    return new Promise((resolve, reject) => {
        api.patch("/respuestas/" + id + "/", respuesta, {
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

export const deleteRespuesta = (id) => {
    return new Promise((resolve, reject) => {
        api.delete("/respuestas/" + id + "/", {
            withCredentials: true,
        })
            .then((response) => {
                console.log(response);
                resolve(response);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
}

export const getRespuestaById = (id) => {
    return new Promise((resolve, reject) => {
        api.get("/respuestas/" + id + "/", {
            withCredentials: true,
        })
            .then((response) => {
                console.log(response);
                resolve(response.data);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
}

export const getRespuestasByPreguntaId = (id) => {
    return new Promise((resolve, reject) => {
        api.get("/respuestas/?pregunta_id=" + id, {
            withCredentials: true,
        })
            .then((response) => {
                console.log(response);
                resolve(response.data);
            })
            .catch((error) => {
                console.log(error);
                reject(error);
            });
    });
}


