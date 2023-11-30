import api from "./interceptors";

export const getMe = (token) => {
    return new Promise((resolve, reject) => {
        api.get("/authentication/usuarios/me/", {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
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


export const getListaUsuarios = (token) => {
    return new Promise((resolve, reject) => {
        api.get("/usuarios/", {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
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

export const postSaveUsuario = (usuario) => {
    return new Promise((resolve, reject) => {
        api.post("/usuarios/", usuario, {
            headers: {
                'Content-Type': 'application/json',
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

export const updateUsuario = (token, id, usuario) => {
    return new Promise((resolve, reject) => {
        api.patch("/usuarios/" + id + "/", usuario, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
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

export const deleteUsuario = (token, id) => {
    return new Promise((resolve, reject) => {
        api.delete("/usuarios/" + id, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
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

export const getUsuarioById = (token, id) => {
    return new Promise((resolve, reject) => {
        api.get("/usuarios/" + id, {
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
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