import React, {createContext, useState} from 'react'

export const CronometroContext = createContext();
export const CronometroProvider = ({children}) => {
    const [cronometro, setCronometro] = useState(30);
    const [reiniciarCronometro, setReiniciarCronometro] = useState(false);

    return (

        <CronometroContext.Provider value={{cronometro, setCronometro, reiniciarCronometro, setReiniciarCronometro}}>
            {children}
        </CronometroContext.Provider>

    );
}