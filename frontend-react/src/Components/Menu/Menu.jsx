import React from 'react';
import {Link, useNavigate} from 'react-router-dom';
import logo from '../../assets/img/logo.png';
import Swal from 'sweetalert2';
import '../../assets/css/colored_toasts.css';

// Importamos esto para poder validar el intento diario, ya que en el contexto no se actualiza si no se re-renderiza de nuevo la página.
import tokenValidation from '../../Components/Functions/TokenValidation';
import axios from 'axios';

const config = require("../../config.json");
const API_URL = config.API_URL;

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

    const displaySettings = () => {

        Swal.fire({
            title: 'Cambiar contraseña.',
            html: `<input type="password" id="contrasenaActual" class="swal2-input" placeholder="Contraseña actual.">
            <input type="password" id="nuevaContrasena" class="swal2-input" placeholder="Nueva contraseña">
            `,
            confirmButtonText: 'Cambiar',
            focusConfirm: false,
            preConfirm: () => {
                const contrasenaActual = Swal.getPopup().querySelector('#contrasenaActual').value;
                const nuevaContrasena =  Swal.getPopup().querySelector('#nuevaContrasena').value;

                if(!contrasenaActual || !nuevaContrasena) {
                    Swal.showValidationMessage(`Por favor, rellena todos los campos`);
                } else {
                    
                    return {
                        token: window.localStorage.getItem("token"),
                        user: props.user,
                        antiguaContrasena: contrasenaActual,
                        nuevaContrasena: nuevaContrasena
                    }

                }
            }
        }).then((result) => {

            if(result.value) {
                axios.post(`${API_URL}/cambiar-contrasena`, result.value).then((res) => {
                    if(res.data.status) {
                        
                        window.localStorage.removeItem("token");
                        window.localStorage.setItem("token", res.data.token);
                        Swal.fire('Se ha actualizado la contraseña.').then(() => {
                            window.location.href = "/";
                        });

                    }
                }).catch(err => {
                   
                    Swal.fire(err.response.data.message)
                });
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
                <Link className="botones" to={'/app/estadisticas'}>Estadísticas</Link>
                <button onClick={(e) => {e.preventDefault(); displaySettings();}} className="botones">Ajustes</button>
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
