import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DataTable from 'react-data-table-component';
import { Link, useOutletContext } from 'react-router-dom';

const config = require("../../config.json");
const API_URL = config.API_URL;

export default function Estadisticas() {

    const [globalStats, setGlobalStats] = useState(false);
    const [userStats, setUserStats] = useState(false);

    // Cargando contexto global
    const [accountInformation] = useOutletContext();

    useEffect(() => {

        // Sacar estadísticas globales
        axios.get(`${API_URL}/estadisticas-globales`).then((res) => {

            if (res.data.status) {

                setGlobalStats(res.data.data);

            }

        }).catch(_ => window.location.href = '/');

        // Sacar estadísticas del usuario
        axios.get(`${API_URL}/estadisticas/${accountInformation.data.user}`).then((res) => {

            if (res.data.status) {
                setUserStats(res.data.data[0].numAcierto);
            }

        }).catch(_ => window.location.href = '/');
        
    }, []);

    const columns = [
        {
            name: "Usuario",
            selector: (row) => row.user
        },
        {
            name: "Puntos",
            selector: (row) => row.numAcierto
        }
    ]

    if (!globalStats || !userStats) {
        return <p>Cargando...</p>;
    } else {
        return (
            <>
                <h1>Estadísticas</h1>
                <p className='p-stats'>Tienes {userStats} puntos.</p>
                <main className="datatable">

                    <DataTable
                        responsive={true}
                        columns={columns}
                        data={globalStats}
                        defaultSortFieldId={"Puntos"}
                        pagination
                        collapse
                    />

                </main>
                <Link id="inicio" className="botones" to={"/app/inicio"}>Volver al inicio</Link>
            </>
        );
    }
}
