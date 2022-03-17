import {Route, Routes} from "react-router-dom";
import React, {useEffect, useState} from "react";
import LoginContainer from "../components/LoginContainer";
import QuickLoginSelectPage from "./QuickLoginSelectPage";
import NotFoundPage from "./NotFoundPage"
import LoginPasswordPage from "./LoginPasswordPage";
import ManualLoginPage from "./ManualLoginPage";

export const LoginPage = () => {
    const [username, setUsername] = useState("");

    useEffect(() => {
        console.log(username);
    }, [username]);

    return (
        <Routes>
            <Route path="/" element={<LoginContainer><QuickLoginSelectPage setUsername={setUsername}/></LoginContainer>}/>
            <Route path="/authentication" element={<LoginContainer><LoginPasswordPage username={username}/></LoginContainer>}/>
            <Route path="/login" element={<LoginContainer><ManualLoginPage username={username} setUsername={setUsername}/></LoginContainer>}/>
            {/*<Route path='*' element={<NotFoundPage/>}/>*/}
        </Routes>
    );
};