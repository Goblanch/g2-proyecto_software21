import React, { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Importando archivo de configuración
const config = require("../../config.json");
const API_URL = config.API_URL;

export default function Register() {

    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");
    const [verifyPassword, setVerifyPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();

        if(user && password === verifyPassword) {

            let data = {
                user: user,
                password: password
            }

            axios.post(`${API_URL}/register`, data).then((res) => {

                if(res.data.status) {
                    window.localStorage.setItem("token", res.data.data.token);
    
                    return window.location.href = '/app';
                } 

            }).catch((err) => {
                notify(err.response.data.message);
            });

        } else {
            notify("Las contraseñas no coinciden. y/o te falta rellenar todos los campos.");
        }
    }

    const notify = (error) => {
        toast(error);
    };

    return (
        <>
            <ToastContainer />
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
