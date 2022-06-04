import React, { useContext } from "react";
import { Helmet } from 'react-helmet';

import { PositionContext } from '../../Pages/Play/PositionContext';
import { CronometroContext } from '../../Pages/Play/CronometroContext';

import Play from "./Play";
import Cronometro from "./Cronometro";
import Swal from 'sweetalert2';
import logo from '../../assets/img/logo.png';

export default function Global() {

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
    const {vidas, setVidas} = useContext(PositionContext);

    if (cronometro === 0) {
        Toast.fire({
            icon: 'error',
            title: 'Se ha acabado el tiempo, pasando siguiente pregunta...'
        }).then(() => {
            setCronometro(30);
            setPosition(position + 1);
            setVidas(vidas - 1);
        });
    }

    return (

        <>
            <Helmet>
                <title>Quizgeon - Jugar</title>
            </Helmet>
            <img src={logo} alt="logo" id="logo"/>
            <Cronometro />
            <Play />
        </>

    );
}
