import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import StorageFunction from "server_api/storage";
import AppContext from './context/AppContext';

const Auth = () => {
    const { allUsers, setAllUsers, loggedUser, setLoggedUser, applications, setApplication } = useContext(AppContext);
    const navigate = useNavigate();

    const [loggedUserFlag, setLoggedUserFlag] = useState(true);


    useEffect(() => {
        if (loggedUserFlag) {
            getUserSession();
        }
    }, [loggedUserFlag]);

    useEffect(() => {
        loggedUserFlag && getUserSession();
    }, [loggedUserFlag]);

    const getUserSession = async () => {
        const loggedUser_ = await StorageFunction.getData('ilm_userLoggedData');
        if (loggedUser_) {
            // alert("You must be logged in")
            setLoggedUser(loggedUser_);
            setLoggedUserFlag(false);
        } else {
            navigate('/login');
        }
    };

    const getUsersData = async () => {
        const allUsers_ = await StorageFunction.getData('ilm_allUsers');
        if (allUsers_) {
            setAllUsers(allUsers_);
        }
    }

    const getUserApplicationssData = async () => {
        const applications_ = await StorageFunction.getData('ilm_userapplicationData');
        if (applications_) {
            setApplication(applications_);
        }
    }

    return { getUserSession, getUsersData, getUserApplicationssData, allUsers, setAllUsers, loggedUser, setLoggedUser, loggedUserFlag, setLoggedUserFlag }
}

export default Auth;