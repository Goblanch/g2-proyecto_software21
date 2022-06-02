import React, {useState} from 'react';

import '../../assets/css/auth.css';
import {Outlet, Link} from 'react-router-dom';

export default function Auth() {

    const [checked, setChecked] = useState(true);

    if(window.location.pathname === "/auth/" || window.location.pathname === "/auth") {
        return window.location.href = "/auth/login";
    }

    return (
        <>
            <div className="wrapper">
                <div className="title-text">
                    <div className="title">Identifícate</div>
                </div>
                <div className="form-container">
                    <div className="slide-controls">
                        <input type="radio" name="slide" id="login" readOnly checked={checked} />
                            <input type="radio" name="slide" id="signup" readOnly checked={!checked}/>
                                <Link to={'/auth/login'} onClick={() => (!checked) ? setChecked(!checked) : ""} className="slide login">Iniciar sesión</Link>
                                <Link to={'/auth/register'} onClick={() => (checked) ? setChecked(!checked): ""} className="slide signup">Registro</Link>
                                <div className="slider-tab"></div>
                            </div>
                            <div className="form-inner">
                                <Outlet />
                            </div>
                    </div>
                </div>
            </>
            );
}
