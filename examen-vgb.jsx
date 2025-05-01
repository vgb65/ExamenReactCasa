import { useState } from "react";

function Tareas() {
    return (
        <>
            <button>Todas</button>
            <button>Completadas</button>
            <button>Pendientes</button>
            <br></br>
            <button>añadir</button>
            <>
                <li>Victor</li>
                <li>Garcia Baez</li>
            </>
        </>
    );
}

export default function Gestor() {
    return (
        <>
            <>
                <h1>Gestor de Elementos</h1>
            </>
            <>
                <Tareas />
            </>
        </>
    );
}