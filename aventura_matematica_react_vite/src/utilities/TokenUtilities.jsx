import { LOGIN_URL } from "../navigation/CONSTANTS";


export const getAuthToken = () => {
    const token = localStorage.getItem("token");

    // si no hay token hacer el refresh
    // if (token==null) {
    //     const refresh = localStorage.getItem("refresh");
        
    // }

    return token;
}
export const setAuthToken = (token, refresh) => {
    localStorage.setItem("token", token);
    localStorage.setItem("refresh", refresh);
    console.log("login");
}

export const setDatosUsuario = (is_superuser, id) => {
    localStorage.setItem("is_superuser", is_superuser);
    localStorage.setItem("id", id);
}

export const borrarDatosUsuario = () => {
    localStorage.removeItem("is_superuser");
    localStorage.removeItem("id");
}

export const validateLogin = (navigate) => {
    const token = getAuthToken();
    if (token==null) {
        navigate(LOGIN_URL);
        return false;
    }
    return true;
}

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    localStorage.removeItem("is_superuser");
    localStorage.removeItem("id");
    console.log(localStorage.getItem("token"));
}

export const isSuperUser = () => {
    const is_superuser = localStorage.getItem("is_superuser");
    return is_superuser === "true";
}

export const getUserId = () => {
    const id = parseInt(localStorage.getItem("id"));
    return id;
}
