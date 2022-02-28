import {Route, Routes} from "react-router-dom";
import React, {useState} from "react";
import LoginContainer from "../components/LoginContainer";
import QuickLoginSelectPage from "./QuickLoginSelectPage";
import NotFoundPage from "./NotFoundPage"
import LoginPasswordPage from "./LoginPasswordPage";
import ManualLoginPage from "./ManualLoginPage";

export const LoginPage = () => {
    const [userId, setUserId] = useState("");

    const getUserId = () => userId;

    return (
        <Routes>
            <Route path="/" element={<LoginContainer><QuickLoginSelectPage setUserId={setUserId}/></LoginContainer>}/>
            <Route path="/authentication" element={<LoginContainer><LoginPasswordPage userId={userId}/></LoginContainer>}/>
            <Route path="/login" element={<LoginContainer><ManualLoginPage/></LoginContainer>}/>
            <Route path='*' element={<NotFoundPage/>}/>
        </Routes>
    );
};