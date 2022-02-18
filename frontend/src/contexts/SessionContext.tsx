import React, {createContext, ReactChild, ReactChildren, useReducer} from "react";

interface SessionContextState {
    username: string,
    user_id: string,
    token: string,
    loggedIn: boolean,
}

const initialState: SessionContextState = {
    username: "",
    user_id: "",
    token: "",
    loggedIn: false,
}

type Action =
    | { type: "login" } // Can have objects after like the new state -> { type: 'login', new state}
    | { type: "logout" }
    | { type: "refresh" };

function SessionContextReducer(state: SessionContextState, action: Action): SessionContextState {
    switch (action.type) {
        case "login":
            return {...state, loggedIn: true}
        case "logout":
            return {...state, loggedIn: false}
        case "refresh":
            return state
    }
}

type SessionContextProviderType = {
    state: SessionContextState,
    dispatch: React.Dispatch<Action>
}

const SessionContext = createContext<SessionContextProviderType>({
    state: initialState,
    dispatch: () => null
});

export default SessionContext;

interface AuxProps {
    children: ReactChild | ReactChild[] | ReactChildren | ReactChildren[];
}

export const SessionContextProvider = ({children}: AuxProps) => {
    const [state, dispatch] = useReducer(SessionContextReducer, {...initialState});


    return (
        <SessionContext.Provider value={{state, dispatch}}>
            {children}
        </SessionContext.Provider>
    );
};