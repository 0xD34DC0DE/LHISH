import React from 'react';
import './App.css';
import {SessionContextProvider} from "./contexts/SessionContext";
import {UserPage} from "./pages/UserPage";
import {LoginPage} from "./pages/LoginPage";
import SessionSwitch, {SessionConditionalElement} from "./routing/SessionSwitch";

//TODO
// Make non-renderable pages got to a 404 component by having ProtectedRoutes have a prop: PageNotFoundComponent
// otherwise when a route is marked as requires logging false you can still navigate to it

function App() {
    return (
        <SessionContextProvider>
            <SessionSwitch>
                <SessionConditionalElement element={<UserPage/>} loggedIn={true} roles={["USER"]}/>
                <SessionConditionalElement element={<LoginPage/>} loggedIn={false}/>
            </SessionSwitch>
        </SessionContextProvider>
    );
}

export default App;
