import api from "./interceptors";

export const getListaNiveles = () => {
    return new Promise((resolve, reject) => {
        api.get("/niveles/", {
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

export const postSaveNivel = (nivel) => {
    return new Promise((resolve, reject) => {
        api.post("/niveles/", nivel, {
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

export const putSaveNivel = (id, nivel) => {
    return new Promise((resolve, reject) => {
        api.put("/niveles/" + id + "/", nivel, {
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

export const patchSaveNivel = (id, nivel) => {
    const formData = new FormData();
    formData.append("nombreNivel", nivel.nombreNivel);
    formData.append("descripcionNivel", nivel.descripcionNivel);
    formData.append("puntosRequeridos", nivel.puntosRequeridos);
    
    if (nivel.imagen !== undefined) {
        formData.append("imagen", nivel.imagen);
    }

    return new Promise((resolve, reject) => {
        api.patch("/niveles/" + id + "/",
            formData,
            {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
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

export const patchSaveNivelSinImagen = (id, nivel) => {
    return new Promise((resolve, reject) => {
        api.patch("/niveles/" + id + "/", nivel, {
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

export const deleteNivel = (id) => {
    return new Promise((resolve, reject) => {
        api.delete("/niveles/" + id + "/", {
            withCredentials: true,
        })
            .then((response) => {
                console.log(response.data);
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

export const getNivelById = (id) => {
    return new Promise((resolve, reject) => {
        api.get("/niveles/" + id + "/", {
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