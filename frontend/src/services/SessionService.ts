import axios, {AxiosError} from "axios";
import AccountView from "../views/AccountView";
import jwtDecode from "jwt-decode";

type TokenResponse = {
    token: string,
    error: ""
}

type JwtToken = {
    role: string,
    username: string,
    email: string,
    sub: string
}

export const authenticate = async (username: string, password: string, onError: (reason: any) => void) => {
    return await axios.post<TokenResponse>("http://localhost:8080/authenticate", {username, password})
        .then(value => {
            if (value.data.error) {
                onError(value.data.error);
                return "";
            }
            return value.data.token;
        }).catch(reason => {
            console.error(reason);
            return ""
        });
}

export const checkUsernameExists = async (username: string) => {
    return await axios.get<Boolean>(`http://localhost:8080/user/exists/${username}`)
        .then(value => {
            return value.data;
        }).catch(reason => {
            console.error(reason);
            return false;
        });
}

export const decodeJwt = (token: string): AccountView => {
    const decodedToken = jwtDecode<JwtToken>(token);
    return {role: decodedToken.role, username: decodedToken.username, email: decodedToken.email, id: decodedToken.sub}
}