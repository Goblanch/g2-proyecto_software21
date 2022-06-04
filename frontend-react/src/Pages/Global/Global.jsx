import React, {useState, useEffect} from 'react';
import {Outlet} from 'react-router-dom';
import tokenValidation from '../../Components/Functions/TokenValidation';

export default function Global() {

    const [accountInformation, setAccountInformation] = useState();
    
    useEffect(() => {
        tokenValidation(window.localStorage.getItem("token")).then((res) => {
            setAccountInformation(res);
        }).catch((err) => {
            setAccountInformation(false);
        });
    }, []);

    if(!window.localStorage.getItem("token") || accountInformation === false) {
        window.location.href = "/";
    }

    if(window.location.pathname === "/app" || window.location.pathname === "/app/") {
        return window.location.href = "/app/inicio";
    }

    if(accountInformation === undefined) {
        return <p>Cargando...</p>;
    } else {

        return (
            <>
            
                <Outlet context={[accountInformation, setAccountInformation]} />
            
            </>
        );

    }
}