import React, {useContext} from 'react';
import './App.css';
import SessionContext, {SessionContextProvider} from "./contexts/SessionContext";


interface ProtectedRouteProps {
    requiresLoggedIn: boolean, // Find a way to make it a prop that doesn't require a value -> like the disabled prop
    path: string,
    role: string | string []
    element: React.ReactNode
}

const ProtectedRoute = ({path}: ProtectedRouteProps) => {
/*
* TODO use <Routes>
* then filter children of <Routes>
* (instances of <Route> using ProtectedRouteProps) based on context role and login state)
*/
}

const ProtectedRoutes: React.FunctionComponent = ({children}) => {
    const {state, dispatch} = useContext(SessionContext);

    return (
        <>

        </>
    );
}

function App() {
    return (
        <SessionContextProvider>
            <ProtectedRoutes>

            </ProtectedRoutes>
        </SessionContextProvider>
    );
}

export default App;
