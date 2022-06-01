import React from 'react';


export default function Admin(){



return (
    <>
    <main>
        <button id="add" className="botones" onClick={() => window.location.href ="/admin/add"}>Añadir pregunta</button>
        <button id="remove" className="botones" onClick={() => window.location.href ="/admin/delete"}>Eliminar pregunta</button>
        <button id="inicio" className="botones" onClick={() => window.location.href ="/inicio"}>Volver al inicio</button>
    </main>
    </>
)
}