import axios from 'axios';
import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { Link, useOutletContext } from 'react-router-dom';
import Swal from 'sweetalert2';

const config = require("../../config.json");
const API_URL = config.API_URL;

export default function Admin() {

    const [data, setData] = useState(false);

    // Cargando contexto global
    const [accountInformation] = useOutletContext();

    // Verificar que tenga rango administrador.
    if (accountInformation.data.rank !== "1") {
        return window.location.href = "/app";
    }

    useEffect(() => {

        axios.post(`${API_URL}/preguntas`, { token: window.localStorage.getItem("token") }).then((res) => {

            setData(res.data.data);

        }).catch((err) => {
            setData(false);
        });

    }, []);

    const columns = [
        {
            name: "ID",
            selector: (row) => row.id,
            sortable: true
        },
        {
            name: "Pregunta",
            selector: (row) => row.pregunta,
            sortable: true
        },
        {
            name: "Dificultad",
            selector: (row) => row.dificultad,
            sortable: true
        },
        {
            name: "Moderación",
            selector: (row) => <><button className='btn-mod btn-borrar' onClick={(e) => { e.preventDefault(); deleteQuestion(row.id) }}>Borrar</button><button className='btn-mod btn-ver' onClick={(e) => { e.preventDefault(); viewAnswers(row.id) }}>Ver</button></>
        }
    ];

    const addQuestion = () => {
        Swal.fire({
            title: 'Introduce la pregunta',
            html: `<input type="text" id="pregunta" class="swal2-input" placeholder="Pregunta">
            <input type="text" id="A" class="swal2-input" placeholder="Opción A">
            <input type="text" id="B" class="swal2-input" placeholder="Opción B">
            <input type="text" id="C" class="swal2-input" placeholder="Opción C">
            <input type="text" id="D" class="swal2-input" placeholder="Opción D">
            <input type="text" id="inforRelevante" class="swal2-input" placeholder="Información Relevante">
            <P class="respuesta-correcta">Elige la respuesta correcta y dificultad</P>
            <select id="respuesta">
                <option value="a">A</option>
                <option value="b">B</option>
                <option value="c">C</option>
                <option value="d">D </option>
            </select><select id="dificultad">
            <option value="0">Fácil</option>
            <option value="1">Normal</option>
            <option value="2">Difícil</option>
        </select>`,
            confirmButtonText: 'Añadir',
            focusConfirm: false,
            preConfirm: () => {
                const pregunta = Swal.getPopup().querySelector('#pregunta').value
                const A = Swal.getPopup().querySelector('#A').value
                const B = Swal.getPopup().querySelector('#B').value
                const C = Swal.getPopup().querySelector('#C').value
                const D = Swal.getPopup().querySelector('#D').value
                const respuestaCorrecta = Swal.getPopup().querySelector("#respuesta").value
                const inforRelevante = Swal.getPopup().querySelector("#inforRelevante").value
                const dificultad = Swal.getPopup().querySelector("#dificultad").value
                if (!pregunta || !A || !B || !C || !D || !respuestaCorrecta || !dificultad || !inforRelevante) {
                    Swal.showValidationMessage(`Por favor, rellena todos los campos`);
                } else {
                    let opciones = { "a": A, "b": B, "c": C, "d": D };
                    console.log(opciones)
                    return { token: window.localStorage.getItem("token"), pregunta: pregunta, opciones: opciones, respuestaCorrecta: respuestaCorrecta, inforRelevante: inforRelevante, dificultad: dificultad }
                }
            }
        }).then((result) => {
            if (result.value) {

                axios.post(`${API_URL}/add-pregunta`, result.value).then((res) => {
                    axios.post(`${API_URL}/preguntas`, { token: window.localStorage.getItem("token") }).then((res) => {

                        setData(res.data.data);

                    }).catch((err) => {
                        setData(false);
                    });

                    Swal.fire(`!Pregunta añadida con el ID: ${res.data.id}!`, '', 'success');
                }).catch(err => Swal.fire('Hubo un error al tratar de añadir la pregunta...', '', 'info'));

            }
        })

    }


    const deleteQuestion = (id) => {
        Swal.fire({
            title: '¿Estás seguro que quieres borrar esta pregunta?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Borrar',
            confirmButtonColor: '#d33',
        }).then((result) => {
            if (result.isConfirmed) {
                axios.post(`${API_URL}/delete-pregunta`, { token: window.localStorage.getItem("token"), id: id }).then((res) => {

                    axios.post(`${API_URL}/preguntas`, { token: window.localStorage.getItem("token") }).then((res) => {

                        setData(res.data.data);

                    }).catch((err) => {
                        setData(false);
                    });

                    Swal.fire('¡Borrado!', '', 'danger');
                }).catch(err => Swal.fire('Hubo un error al tratar de borrarlo...', '', 'info'));


            } else if (result.isDenied) {
                Swal.fire('No se ha borrado', '', 'info');
            }
        })
    }

    const viewAnswers = (id) => {

        axios.post(`${API_URL}/pregunta-id`, { token: window.localStorage.getItem("token"), id: id }).then(res => {
            let respuestas = JSON.parse(res.data.data[0].opciones);
            Swal.fire({
                title: '<strong>' + res.data.data[0].pregunta + '</strong>',
                icon: 'info',
                html: '<p>A: ' + respuestas.a + '</p><p>B: ' + respuestas.b + '</p><p>C: ' + respuestas.c + '</p><p>D: ' + respuestas.d + '</p><p><strong>Respuesta correcta: ' + res.data.data[0].respuestaCorrecta.toUpperCase() + '</strong></p>'
            });
        }).catch(err => {
            Swal.fire(
                'Hubo un error al tratar de conseguir las respuestas.'
            );
        });

    }

    if (!data) {

        return <p>Cargando...</p>;

    } else {

        return (
            <>
                <div class="add-pregunta">
                <button className="button" onClick={(e) => { e.preventDefault(); addQuestion(); }}>Añadir pregunta</button>
                </div>
                <main className="datatable">

                    <DataTable
                        responsive={true}
                        columns={columns}
                        data={data}
                        defaultSortFieldId={1}
                        pagination
                        collapse
                    />

                </main>
                <Link id="inicio" className="volver" to={"/app/inicio"}>Volver al inicio</Link>
            </>
        );
    }
}