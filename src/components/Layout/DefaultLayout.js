import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { isObjectEmpty } from "utils/isObjectEmpty";
import AppContext from "server_api/context/AppContext";

const DefaultLayout = ({ children }) => {
    const { loggedUser } = useContext(AppContext);

    const navigate = useNavigate();

    useEffect(() => {
        if (!isObjectEmpty(loggedUser)) {
            navigate('/login')
        }
    }, []);
    return (
        <div>
            <main>{children}</main>
        </div>
    )

}



export default DefaultLayout