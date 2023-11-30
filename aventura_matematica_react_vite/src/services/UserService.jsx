import api from "./interceptors";

export const getUserInfo = () => {
    return new Promise((resolve, reject) => {
        api.get("/authentication/usuarios/me/", {
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true, // es necesario para que envie la cookie de sesion al servidor
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
