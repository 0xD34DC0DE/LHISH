import React from 'react';
import './App.css';
import {SessionContextProvider} from "./contexts/SessionContext";
import {UserPage} from "./pages/UserPage";
import {LoginPage} from "./pages/LoginPage";
import SessionSwitch, {SessionConditionalElement} from "./routing/SessionSwitch";
import {AdminPage} from "./pages/AdminPage";

function App() {
    return (
        <SessionContextProvider>
            <SessionSwitch>
                <SessionConditionalElement element={<UserPage/>} loggedIn={true} roles={["USER"]}/>
                <SessionConditionalElement element={<LoginPage/>} loggedIn={false}/>
                <SessionConditionalElement element={<AdminPage/>} loggedIn={true} roles={["ADMIN"]}/>
            </SessionSwitch>
        </SessionContextProvider>
    );
}

export default App;
