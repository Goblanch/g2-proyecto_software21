import axios from 'axios';
import React, { useEffect, useState, useContext } from 'react';

import '../../assets/css/quiz.css';
import { FaInfoCircle, FaHeart, FaHeartBroken } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import { PositionContext } from '../../Pages/Play/PositionContext';
import { CronometroContext } from '../../Pages/Play/CronometroContext';

const config = require("../../config.json");
const API_URL = config.API_URL;

export default function Play() {
    const navigate = useNavigate();

    const [questions, setQuestions] = useState(false);
    const {position, setPosition} = useContext(PositionContext);
    const {vidas, setVidas} = useContext(PositionContext);
    const { setCronometro, setReiniciarCronometro } = useContext(CronometroContext);
    

    useEffect(() => {

        axios.post(`${API_URL}/nivel-diario`, { token: window.localStorage.getItem("token") }).then((res) => {

            if (res.data.status) {
                setQuestions(res.data.data);
                setVidas(res.data.data.vidas);
            }

        });


    }, []);

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

    const showRelevantInformation = () => {
        Swal.fire(
            questions.Preguntas[position].pregunta,
            questions.Preguntas[position].inforRelevante,
            'question'
        );
    }

    if (!questions) {

        return <>Cargando preguntas...</>;

    } else {
        // Parseamos las opciones
        let opciones = JSON.parse(questions.Preguntas[position].opciones);

        const corazones = [];
        for (let i = 0; i < vidas; i++) {
            corazones.push(<FaHeart key={i} className='corazones' />);
        }

        if (vidas < 3) {
            for (let i = vidas; i < 3; i++) {
                corazones.push(<FaHeartBroken key={i} className='corazones' />);
            }
        }

        const validarPregunta = (opcion) => {

            setReiniciarCronometro(true);

            axios.post(`${API_URL}/validar-pregunta`, { id: questions.Preguntas[position].id, token: window.localStorage.getItem("token"), respuestaUsuario: opcion }).then((res) => {

                if (res.data.status) {

                    if (opcion === res.data.message) {
                        anadirColores(opcion, res.data.message);
                        
                        Toast.fire({
                            icon: 'success',
                            title: 'Respuesta correcta...'
                        }).then(() => {
                            setReiniciarCronometro(false);
                            setCronometro(30);
                            if (position < questions.Preguntas.length - 1) {
                                setPosition(position + 1);
                                activarBotones();
                                quitarColores(opcion, res.data.message);
                            } else {
                                Toast.fire({
                                    icon: 'success',
                                    title: 'Se han acabado la ronda de preguntas, redirigiendo al menú...'
                                }).then(() => {
                                    return navigate('/app/inicio');
                                });
                            }
                        });
                    } else {
                        
                        anadirColores(opcion, res.data.message);

                        setVidas(vidas - 1);

                        Toast.fire({
                            icon: 'error',
                            title: 'Respuesta incorrecta...'
                        }).then(() => {
                            setReiniciarCronometro(false);
                            setCronometro(30);
                            if (position < questions.Preguntas.length - 1) {
                                setPosition(position + 1);
                                activarBotones();
                                quitarColores(opcion, res.data.message);
                            } else {
                                Toast.fire({
                                    icon: 'success',
                                    title: 'Se han acabado la ronda de preguntas, redirigiendo al menú...'
                                }).then(() => {
                                    return navigate('/app/inicio');
                                });
                            }
                        });
                    }

                    desactivarBotones();

                }

            }).catch(_ => window.location.href = "/");

            const anadirColores = (opcionUsuario, opcionCorrecta) => {
                if (opcionUsuario === opcionCorrecta) {

                    document.getElementById(opcion).style.backgroundColor = "green";
                    document.getElementById(opcion).style.color = "white";

                } else {
                    document.getElementById(opcion).style.backgroundColor = "red";
                    document.getElementById(opcion).style.color = "white";
                    document.getElementById(opcionCorrecta).style.backgroundColor = "green";
                    document.getElementById(opcionCorrecta).style.color = "white";
                }
            }

            const quitarColores = (opcionUsuario, opcionCorrecta) => {
                if (opcionUsuario === opcionCorrecta) {

                    document.getElementById(opcion).style.removeProperty("background-color");
                    document.getElementById(opcion).style.removeProperty("color")

                } else {
                    document.getElementById(opcion).style.removeProperty("background-color");
                    document.getElementById(opcion).style.removeProperty("color")


                    document.getElementById(opcionCorrecta).style.removeProperty("background-color");
                    document.getElementById(opcionCorrecta).style.removeProperty("color")
                }
            }

            const desactivarBotones = () => {
                document.querySelectorAll("#root > .quiz-in-game").forEach((element) => {
                    element.querySelectorAll(".option").forEach((childElement) => {
                        childElement.setAttribute("disabled", "");
                    });
                });
            }

            const activarBotones = () => {
                document.querySelectorAll("#root > .quiz-in-game").forEach((element) => {
                    element.querySelectorAll(".option").forEach((childElement) => {
                        childElement.removeAttribute("disabled");
                    });
                });
            }

        }

        if (vidas === 0) {
            Toast.fire({
                icon: 'error',
                title: 'Ya no te quedan suficientes vidas, inténtalo a la próxima...'
            }).then(() => {
                navigate('/app/inicio');
            });
        }

        return (
            <>
                <div className='inline-lifes'>
                    {corazones} <br />
                </div>
                <div className="question">
                    {questions.Preguntas[position].pregunta} &nbsp;&nbsp;     <FaInfoCircle onClick={() => showRelevantInformation()} />
                </div>
                <form className="quiz quiz-in-game">

                    <input type="button" onClick={() => { validarPregunta("a"); }} value={"A.- " + opciones.a} className="option" id="a" />
                    <input type="button" onClick={() => { validarPregunta("b"); }} value={"B.- " + opciones.b} className="option" id="b" />
                    <input type="button" onClick={() => { validarPregunta("c"); }} value={"C.- " + opciones.c} className="option" id="c" />
                    <input type="button" onClick={() => { validarPregunta("d"); }} value={"D.- " + opciones.d} className="option" id="d" />
                </form>
            </>

        );
    }
}
