import {Route, Routes} from "react-router-dom";
import React, {useEffect, useState} from "react";
import LoginContainer from "../components/LoginContainer";
import QuickLoginSelectPage from "./QuickLoginSelectPage";
import NotFoundPage from "./NotFoundPage"
import LoginPasswordPage from "./LoginPasswordPage";
import ManualLoginPage from "./ManualLoginPage";
import UserRegistrationPage from "./UserRegistrationPage";

export const LoginPage = () => {
    const [username, setUsername] = useState("");

    return (
        <Routes>
            <Route path="/" element={<LoginContainer><QuickLoginSelectPage setUsername={setUsername}/></LoginContainer>}/>
            <Route path="/authentication" element={<LoginContainer><LoginPasswordPage username={username}/></LoginContainer>}/>
            <Route path="/login" element={<LoginContainer><ManualLoginPage username={username} setUsername={setUsername}/></LoginContainer>}/>
            <Route path="/register" element={<LoginContainer><UserRegistrationPage/></LoginContainer>}/>
            {/*<Route path='*' element={<NotFoundPage/>}/>*/}
        </Routes>
    );
};