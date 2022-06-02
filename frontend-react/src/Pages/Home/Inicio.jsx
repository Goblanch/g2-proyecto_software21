import React from 'react';
import '../../assets/css/index.css';
import { useOutletContext } from 'react-router-dom';
import Menu from '../../Components/Menu/Menu';

export default function Inicio() {

    // Cargando contexto global
    const [accountInformation] = useOutletContext();

    return (
        <>
            <Menu user={accountInformation.data.user} rank={accountInformation.data.rank} />
        </>
    );

}