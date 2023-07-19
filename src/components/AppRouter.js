import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';

import DefaultLayout from 'components/Layout/DefaultLayout';
import AuthLayout from 'components/Layout/AuthLayout';
import NotFound from 'pages/notfound';
import Dashboard from 'pages/dashboard';
import Login from 'pages/login';
import Register from 'pages/register';
import UserManage from 'pages/usermanage';

import AppContext from 'server_api/context/AppContext';
import Auth from 'server_api/auth';
import { isObjectEmpty } from 'utils/isObjectEmpty';

const AppRouter = () => {


    return (
        <Router>
            <Root />
        </Router>
    );
}

export default AppRouter;

const Root = () => {

    const [loggedUser, setLoggedUser] = useState({});
    const [allUsers, setAllUsers] = useState();
    const [applications, setApplication] = useState();

    return (
        <AppContext.Provider value={{ loggedUser, setLoggedUser, allUsers, setAllUsers, applications, setApplication }}>
            <LayoutContainer>
                <Routes>
                    <Route index path="/*" element={<Dashboard />} />
                    <Route exact path="/login" element={<Login />} />
                    <Route exact path="/register" element={<Register />} />
                    <Route exact path="/usermanage" element={<UserManage />} />
                    <Route component={NotFound} />
                </Routes>
            </LayoutContainer>
        </AppContext.Provider>
    )
}


const LayoutContainer = ({ children }) => {
    const { getUserSession, getUsersData, getUserApplicationssData, loggedUser, loggedUserFlag, setLoggedUserFlag } = Auth();

    let LayoutComponent

    useEffect(() => {
        getUserSession(loggedUserFlag, setLoggedUserFlag);
    }, [loggedUserFlag]);

    useEffect(() => {
        getUsersData();
        getUserApplicationssData();
    }, []);

    if ((!loggedUserFlag) && (!isObjectEmpty(loggedUser))) {
        LayoutComponent = AuthLayout;
    } else {
        LayoutComponent = DefaultLayout;
    }

    return (
        <LayoutComponent>{children}</LayoutComponent>
    );
}
