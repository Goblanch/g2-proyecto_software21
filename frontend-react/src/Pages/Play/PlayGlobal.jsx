import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PositionProvider } from './PositionContext';
import { CronometroProvider } from './CronometroContext';

import tokenValidation from '../../Components/Functions/TokenValidation';
import Global from '../../Components/Play/Global';

export default function PlayGlobal() {

    const navigate = useNavigate();

    useEffect(() => {

        // Verificar que el usuario tenga los intentos diarios.
        tokenValidation(window.localStorage.getItem("token")).then(async (res) => {

            if (res.data.intentoDiario === 0) {

                return navigate('/app/inicio');

            }

        });

    }, []);

    return (
        <>
            <PositionProvider>
                <CronometroProvider>
                    <Global />
                </CronometroProvider>
            </PositionProvider>

        </>
    );
}