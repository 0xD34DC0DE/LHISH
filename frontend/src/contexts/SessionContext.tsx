import React, {createContext, ReactChild, ReactChildren, useReducer} from "react";
import axios from "axios";
import {authenticate, decodeJwt} from "../services/SessionService";

interface SessionContextState {
    user_id: string,
    username: string,
    email: string
    role: string;
    token: string,
    loggedIn: boolean,
}

const initialState: SessionContextState = {
    user_id: "",
    username: "",
    email: "",
    role: "",
    token: "",
    loggedIn: false,
}

type Action =
    | { type: "login", token: string } // Can have objects after like the new state -> { type: 'login', new state}
    | { type: "logout" }
    | { type: "refresh" };

function SessionContextReducer(session: SessionContextState, action: Action): SessionContextState {
    switch (action.type) {
        case "login":
            sessionStorage.setItem("jwt", action.token);
            if (action.token != "") {
                return {...session, loggedIn: true, ...decodeJwt(action.token)};
            } else {
                return {...initialState, loggedIn: false};
            }
        case "logout":
            sessionStorage.setItem("jwt", "");
            return {...initialState}
        case "refresh":
            const token = sessionStorage.getItem("jwt");
            if (token && token != "") {
                return {...session, loggedIn: true, ...decodeJwt(token)};
            }
            return {...initialState}
    }
}

type SessionContextProviderType = {
    session: SessionContextState,
    dispatch: React.Dispatch<Action>
}

const SessionContext = createContext<SessionContextProviderType>({
    session: initialState,
    dispatch: () => null
});

export default SessionContext;

interface AuxProps {
    children: ReactChild | ReactChild[] | ReactChildren | ReactChildren[];
}

export const SessionContextProvider = ({children}: AuxProps) => {
    const [session, dispatch] = useReducer(SessionContextReducer, {...initialState});

    return (
        <SessionContext.Provider value={{session: session, dispatch}}>
            {children}
        </SessionContext.Provider>
    );
};