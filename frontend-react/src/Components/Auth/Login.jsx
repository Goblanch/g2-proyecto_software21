import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Importando archivo de configuración
const config = require("../../config.json");
const API_URL = config.API_URL;

export default function Login() {

    const [user, setUser] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {

        e.preventDefault();

        if(user && password) {
            let data = {
            
                user: user,
                password: password
    
            }
    
            axios.post(`${API_URL}/login`, data).then((res) => {
    
                if(res.data.status) {
                    window.localStorage.setItem("token", res.data.data.token);
    
                    return window.location.href = '/app'; 
                }
    
            }).catch((err) => {
                notify(err.response.data.message);
            });
        }

    }
    
    const notify = (error) => {
        toast(error);
    };

    return (
        <>
            <ToastContainer />
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
                <div className="signup-link">¿No eres miembro? <Link to={"/auth/register"}>Regístrate</Link></div>
            </section>

        </>
    )
}
