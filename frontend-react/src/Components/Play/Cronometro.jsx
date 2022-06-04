import React, {useContext, useEffect} from 'react';

import { CronometroContext } from '../../Pages/Play/CronometroContext';

export default function Cronometro() {

    // Cronometro
    const {cronometro, setCronometro, reiniciarCronometro}  = useContext(CronometroContext);

    useEffect(() => {
        
        const cuentaAtras = () => {
            setTimeout(() => {
                setCronometro(cronometro - 1);                
            }, 1000);
        }

        if(cronometro === 0 || reiniciarCronometro) {
            return () => {
                clearTimeout(cuentaAtras);
            }
        }

        cuentaAtras();
    }, [cronometro])
    
    

    return (
        <div className="cronometro">Te quedan: {cronometro} segundos</div>
    );
}
