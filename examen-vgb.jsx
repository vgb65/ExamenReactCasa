import { useState } from "react";

// componente elemento
/**
 * se encarga de mostrar los elementos de la lista 
 * y de usar renderizado condicional para hacer que si el
 * elemento supera los 10 caracteres se recorte y ponga "..."
 */
function Elemento({ id, texto, completado, toggle }) {
    // recortar texto si es mas largo de 10 caracteres 
    const textoCorto = texto.length > 10 ? texto.substring(0, 10) + "..." : texto;

    return (
        <li>
            {/* onChange se ejecuta cuando cambia el estado del checkbox */}
            <input type="checkbox" checked={completado} onChange={() => toggle(id)} />
            {textoCorto}
        </li>
    );
}

// componente principal 
function Tareas() {
    // creamos el estado inicial con mi nombre y apellido y con el valor de completado a false
    // el useState devuelve un array con el valor del estado y una funcion para actualizarlo
    const [elementos, setElementos] = useState([
        { id: 1, texto: "Victor", completado: false },
        { id: 2, texto: "Garcia", completado: false },
        { id: 3, texto: "Baez", completado: false },
        { id: 4, texto: "VictorGarciaBaez", completado: false }
    ]);

    // creamos el "filtro" para seleccionar todos los elementos de la lista
    // por defecto mostramos todos los elementos
    const [filtro, setFiltro] = useState("todos");

    // se usa el useState para crear nuevos elementos en la lista
    /**
     * nuevoTexto está vacio y setNuevoTexto actualiza el estado 
     * con la informacion del input
     */
    const [nuevoTexto, setNuevoTexto] = useState("");

    
    const toggleElemento = (id) => {
        // map se usa aquí para actualizar el estado de un elemento específico
        // lo usamos para crear un nuevo array con los elementos actualizados
        setElementos(elementos.map(elem =>
            elem.id === id ? { ...elem, completado: !elem.completado } : elem
        ));
    };

    // marcar o desmarcar todos
    const marcarTodos = (marcar) => {
        /* usamos map para crear un nuevo array donde todos los elementos tienen
           el mismo valor de completado */
        setElementos(elementos.map(elem => ({ ...elem, completado: marcar })));
    };

    // añadir nuevo elemento
    const agregarElemento = () => {
        // uso trim() elimina espacios en blanco al inicio y al final del string
        if (nuevoTexto.trim() !== "") {
            const newId = elementos.length + 1;
            /* actualizamos el estado de elementos añadiendo el nuevo elemento con
            ...elementos que copia todos los elementos existentes */
            setElementos([...elementos, {
                id: newId,
                texto: nuevoTexto,
                completado: false
            }]);
            setNuevoTexto("");
        }
    };

    // filtrar elementos segun el boton seleccionado
    // filter crea un nuevo array con los elementos que cumplan una condicion
    const elementosMostrados = elementos.filter(elem => {
        // si el filtro es "completados" mostramos solo los elementos completados
        if (filtro === "completados") return elem.completado;
        // si el filtro es "pendientes" mostramos solo los elementos no completados
        if (filtro === "pendientes") return !elem.completado;
        // si no mostramos todos los elementos
        return true;
    });

    // comprobar si todos estan marcados
    // every comprueba si todos los elementos del array cumplen una condicion
    const todosMarcados = elementos.length > 0 && elementos.every(e => e.completado);

    return (
        <>
            <>
                <button onClick={() => setFiltro("todos")}>Todas</button>
                <button onClick={() => setFiltro("completados")}>Completadas</button>
                <button onClick={() => setFiltro("pendientes")}>Pendientes</button>
            </>

            <>
                <input
                    type="text"
                    value={nuevoTexto}
                    // onChange actualiza el estado con el valor actual del input
                    onChange={(e) => setNuevoTexto(e.target.value)}
                    placeholder="Nuevo elemento"
                />
                <button onClick={agregarElemento}>Añadir</button>
            </>

            <>
                <label>
                    <input
                        type="checkbox"
                        checked={todosMarcados}
                        // cambia el estado de todos los elementos segun el checkbox
                        onChange={(e) => marcarTodos(e.target.checked)}
                    />
                    Marcar/Desmarcar todos
                </label>
            </>
            <ul>
                {/* map recorre el array y crea un componente Elemento por cada item */}
                {elementosMostrados.map(elem => (
                    <Elemento
                        key={elem.id}
                        id={elem.id}
                        texto={elem.texto}
                        completado={elem.completado}
                        toggle={toggleElemento}
                    />
                ))}
            </ul>
        </>
    );
}

// componente principal que engloba toda la aplicacion
export default function Gestor() {
    return (
        <>
            <h1>Gestor de Elementos</h1>
            <Tareas />
        </>
    );
}