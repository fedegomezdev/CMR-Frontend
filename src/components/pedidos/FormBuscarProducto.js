import React from 'react';

function FormBuscarProducto (props){
    return(
        <form onSubmit={props.buscarProducto}>
        <legend>Busca un Producto y agrega una cantidad</legend>

        <div className="campo">
            <label>Productos:</label>
            <input type="text"
             placeholder="Nombre Productos" 
             name="productos"
             onChange={props.leerBusqueda}
             />
        </div>

        <input type="submit"
                className="btn btn-block btn-azul"
                placeholder="Nombre Productos"
                
                />
        </form>
    )

}

export default FormBuscarProducto;