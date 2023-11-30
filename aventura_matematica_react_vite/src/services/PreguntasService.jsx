import api from "./interceptors";

export const getListaPreguntas = () => {
    return new Promise((resolve, reject) => {
        api.get("/preguntas/", {
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

export const postSavePregunta = (pregunta) => {
    return new Promise((resolve, reject) => {
        api.post("/preguntas/", pregunta, {
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

export const putSavePregunta = (id, pregunta) => {
    return new Promise((resolve, reject) => {
        api.put("/preguntas/" + id + "/", pregunta, {
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

export const patchSavePregunta = (id, pregunta) => {
    return new Promise((resolve, reject) => {
        api.patch("/preguntas/" + id + "/", pregunta, {
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

export const deletePregunta = (id) => {
    return new Promise((resolve, reject) => {
        api.delete("/preguntas/" + id + "/", {
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

export const getPreguntaById = (id) => {
    return new Promise((resolve, reject) => {
        api.get("/preguntas/" + id + "/", {
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

export const getPreguntasByEncuestaId = (id) => {
    return new Promise((resolve, reject) => {
        api.get("/preguntas/?encuesta_id=" + id, {
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

