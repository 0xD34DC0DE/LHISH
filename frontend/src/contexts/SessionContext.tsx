import React, {createContext, ReactChild, ReactChildren} from "react";


type SessionContextType = {
    username: string,
    user_id: string,
    token: string
}

const sessionContextValue: SessionContextType = {
    username: "",
    user_id: "",
    token: ""
}

const SessionContext = createContext<SessionContextType>(sessionContextValue);

export default SessionContext;

interface AuxProps {
    children: ReactChild | ReactChild[] | ReactChildren | ReactChildren[];
}

export const SessionContextProvider = ({children}: AuxProps) => {
    return (
        <SessionContext.Provider value={sessionContextValue}>
            {children}
        </SessionContext.Provider>
    );
};