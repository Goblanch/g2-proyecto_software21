import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../../assets/css/colored_toasts.css';

// Importando archivo de configuración
const config = require("../../config.json");
const API_URL = config.API_URL;

export default function Login() {

    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");

    const Toast = Swal.mixin({
        toast: true,
        position: 'top-right',
        iconColor: 'white',
        customClass: {
            popup: 'colored-toast'
        },
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: true
    });

    const handleSubmit = (e) => {

        e.preventDefault();

        if (user && password) {

            let data = {

                user: user,
                password: password

            }

            axios.post(`${API_URL}/login`, data).then(async(res) => {

                if (res.data.status) {
                    window.localStorage.setItem("token", res.data.data.token);

                    await Toast.fire({
                        icon: 'success',
                        title: 'Sesión iniciada, cargando...'
                    }).then(() => {
                        return window.location.href = '/app';
                    });
                }

            }).catch(async (err) => {
                await Toast.fire({
                    icon: 'error',
                    title: err.response.data.message
                });
            });
        }

    }

    return (
        <>
            <section className="login">
                <form onSubmit={handleSubmit}>
                    <div className="field">
                        <input
                            type="text"
                            placeholder="Nombre de usuario"
                            className="user-value-login"
                            required

                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                        />
                    </div>
                    <div className="field">
                        <input
                            type="password"
                            placeholder="Contraseña"
                            className="password-value-login"
                            required

                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="field btn">
                        <div className="btn-layer"></div>
                        <input type="submit" value="Iniciar sesión" id="login-boton" />
                    </div>
                </form>
            </section>

        </>
    )
}
