import React, {createContext, useState} from 'react'

export const PositionContext = createContext("");
export const PositionProvider = ({children}) => {
    // Manejar posiciones del array
    const [position, setPosition] = useState(0);
    // Manejar puntos y manejar vidas
    const [vidas, setVidas] = useState(0);

    return (

        <PositionContext.Provider value={{position, setPosition, vidas, setVidas}}>
            {children}
        </PositionContext.Provider>

    );
}