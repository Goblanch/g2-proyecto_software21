import React, { useContext } from "react";
import { Helmet } from 'react-helmet';

import { PositionContext } from '../../Pages/Play/PositionContext';
import { CronometroContext } from '../../Pages/Play/CronometroContext';
import { useNavigate } from "react-router-dom";

import Play from "./Play";
import Cronometro from "./Cronometro";
import Swal from 'sweetalert2';
import logo from '../../assets/img/logo.png';

export default function Global() {

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

    const { cronometro, setCronometro } = useContext(CronometroContext);
    const { position, setPosition } = useContext(PositionContext);
    const { vidas, setVidas } = useContext(PositionContext);

    if (cronometro === 1) {

        document.querySelectorAll("#root > .quiz-in-game").forEach((element) => {
            element.querySelectorAll(".option").forEach((childElement) => {
                childElement.setAttribute("disabled", "");
            });
        });

    } 
    
    if(cronometro === 0) {
        if(vidas < 2) {
            Toast.fire({
                icon: 'error',
                title: 'Se ha acabado el tiempo y te has quedado sin vidas...'
            }).then(() => {
                navigate('/app/inicio')
            });
        } else {
            Toast.fire({
                icon: 'error',
                title: 'Se ha acabado el tiempo, pasando siguiente pregunta...'
            }).then(() => {
                document.querySelectorAll("#root > .quiz-in-game").forEach((element) => {
                    element.querySelectorAll(".option").forEach((childElement) => {
                        childElement.removeAttribute("disabled");
                    });
                });

                setCronometro(30);
                setPosition(position + 1);
                setVidas(vidas - 1);
            });
        }
    }

    return (

        <>
            <Helmet>
                <title>Quizgeon - Jugar</title>
            </Helmet>
            <img src={logo} alt="logo" id="logo" />
            <Cronometro />
            <Play />
        </>

    );
}
