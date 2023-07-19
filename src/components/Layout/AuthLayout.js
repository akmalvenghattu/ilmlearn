import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { isObjectEmpty } from "utils/isObjectEmpty";
import AppContext from "server_api/context/AppContext";
import Header from "../Header";

const AuthLayout = ({ children }) => {
    const { loggedUser } = useContext(AppContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (!isObjectEmpty(loggedUser)) {
            navigate('/')
        } else {
            navigate('/login')
        }
    }, [loggedUser]);
    return (
        <div>
            {loggedUser && <Header />}
            <main>{children}</main>
        </div>
    )
}

export default AuthLayout;