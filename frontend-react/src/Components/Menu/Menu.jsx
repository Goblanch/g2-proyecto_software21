import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../../assets/img/logo.png'
export default function Menu(props) {

    const logout = () => {

        if(window.localStorage.getItem("token")) {
            window.localStorage.removeItem("token");
            return window.location.href = "/auth/login";
        }

    }

    // console.log(typeof(props.rank));

    return (
        <>

            <header>
                <img src={logo} alt="logo" />
                <div>Bienvenido {props.user}</div>
            </header>

            <main>
                <button className="jugar">
                    JUGAR
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span></button>
                <button className="botones">Estadísticas</button>
                <button className="botones">Ajustes</button>
                {props.rank === "1" ? (
                    <Link id="admin" to={"/app/admin/"} className="botones">Gestionar preguntas</Link>
                ) : (
                    <></>
                )}
            </main>
            <button onClick={logout} className="botones">Cerrar sesión</button>

        </>
    );

}
