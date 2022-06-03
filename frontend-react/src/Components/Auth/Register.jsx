import React, { useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import '../../assets/css/colored_toasts.css';


// Importando archivo de configuración
const config = require("../../config.json");
const API_URL = config.API_URL;

export default function Register() {

    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");

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

        if(user && password === verifyPassword) {

            let data = {
                user: user,
                password: password
            }

            axios.post(`${API_URL}/register`, data).then(async (res) => {

                if (res.data.status) {
                    window.localStorage.setItem("token", res.data.data.token);

                    await Toast.fire({
                        icon: 'success',
                        title: 'Registrado correctamente, cargando...'
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

        } else {
            Toast.fire({
                icon: 'error',
                title: "Las contraseñas no coinciden. y/o te falta rellenar todos los campos."
            });
        }
    }

    return (
        <>
            <section className="signup">
                <form onSubmit={handleSubmit}>
                    <div className="field">
                        <input 
                            type="text" 
                            placeholder="Nombre de usuario" 
                            className="user-value-register" 
                            required 
                        
                            value={user}
                            onChange={(e) => setUser(e.target.value)}
                        />
                    </div>
                    <div className="field">
                        <input 
                            type="password" 
                            placeholder="Contraseña" 
                            className="password-value-register" 
                            required 
                        
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="field">
                        <input 
                            type="password" 
                            placeholder="Confirmar contraseña" className="confirm-password-value" 
                            required 
                            
                            value={verifyPassword}
                            onChange={(e) => setVerifyPassword(e.target.value)}
                        />
                    </div>
                    <div className="field btn">
                        <div className="btn-layer"></div>
                        <input type="submit" value="Registrar" id="registrar-boton" />
                    </div>
                </form>
            </section>

        </>
    );
}
