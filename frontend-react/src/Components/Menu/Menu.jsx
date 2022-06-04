import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import logo from '../../assets/img/logo.png';
import Swal from 'sweetalert2';
import '../../assets/css/colored_toasts.css';

// Importamos esto para poder validar el intento diario, ya que en el contexto no se actualiza si no se re-renderiza de nuevo la página.
import tokenValidation from '../../Components/Functions/TokenValidation';

export default function Menu(props) {   
    

    const logout = () => {

        if(window.localStorage.getItem("token")) {
            window.localStorage.removeItem("token");
            return window.location.href = "/auth/login";
        }

    }

    const navigate = useNavigate();

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-right',
        iconColor: 'white',
        customClass: {
            popup: 'colored-toast'
        },
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true
    });

    const validarIntento = (e) => {
        
        e.preventDefault();

        tokenValidation(window.localStorage.getItem("token")).then(async (res) => {
            
            if(res.data.intentoDiario === 0) {

                await Toast.fire({
                    icon: 'error',
                    title: 'Ya no te quedan intentos diarios.'
                });

            } else {
                // Una vez validado el intento, le vamos a quitar el intento que tiene.
                return navigate('/app/play');
            }
        });

    }

    return (
        <>

            <header>
                <img src={logo} alt="logo" />
                <div>Bienvenido {props.user}</div>
            </header>

            <main>
                <button onClick={(e) => {validarIntento(e);}} className="jugar">
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
