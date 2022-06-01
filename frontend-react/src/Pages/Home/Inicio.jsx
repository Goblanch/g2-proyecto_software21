import React, {useState} from 'react';
import '../../assets/css/index.css';

export default function Inicio() {

    const [admin, setAdmin] = useState(false);

    //Validando token

    if (!window.localStorage.getItem("token")) {
        return window.location.href = "/auth/login";
    }

    
    //Botón cerrar sesión

    function cerrarSesion(e) {
        e.preventDefault();
        window.localStorage.removeItem("token");
        return window.location.href = "/auth/login";

    }

    //Botón gestionar preguntas

    function gestionarPreguntas(e) {
        e.preventDefault();
        if(admin){
            return window.location.href = "/admin";
        }

    }

    //Código html

    return (
        <>
            <header>
                <div></div>
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
                <button id="admin" className="botones" onClick={gestionarPreguntas}>Gestionar preguntas</button>
            </main>
            <button id="logout" className="botones" value="Cerrar sesión" onClick={cerrarSesion}>Cerrar sesión</button>
        </>)

}