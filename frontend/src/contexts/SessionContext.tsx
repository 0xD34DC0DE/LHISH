import React, {createContext, ReactChild, ReactChildren, useReducer} from "react";

interface SessionContextState {
    user_id: string,
    username: string,
    role: string;
    token: string,
    loggedIn: boolean,
}

const initialState: SessionContextState = {
    user_id: "",
    username: "",
    role: "",
    token: "",
    loggedIn: false,
}

type Action =
    | { type: "login", userId: string, password: string } // Can have objects after like the new state -> { type: 'login', new state}
    | { type: "logout" }
    | { type: "refresh" };

function SessionContextReducer(session: SessionContextState, action: Action): SessionContextState {
    switch (action.type) {
        case "login":
            return {...session, loggedIn: true, role: "user"}
        case "logout":
            return {...session, loggedIn: false}
        case "refresh":
            return session
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