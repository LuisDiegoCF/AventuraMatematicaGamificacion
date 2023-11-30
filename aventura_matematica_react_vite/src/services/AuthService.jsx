import axios from "axios";
import { BASE_URL } from "./CONSTANTS"

export const postLogin = (username, password) => {
    return new Promise((resolve, reject) => {
        axios.post(BASE_URL + "/authentication/usuarios/login/", {
            username,
            password,
        },{
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
export const postLogout = () => {
    return new Promise((resolve, reject) => {
        axios.post(BASE_URL + "/authentication/usuarios/logout/", {},{
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