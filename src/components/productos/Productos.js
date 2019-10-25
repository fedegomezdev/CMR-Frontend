import React,{Fragment, useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import clienteAxios from '../../config/axios';
import Producto from './Producto';


function Productos(){


    const [productos, guardarProductos] = useState([]);

    const consultarApi = async () =>{
        const resultado = await clienteAxios.get('/productos');
        guardarProductos(resultado.data);
    }


    //consulto api cuando cargue
    useEffect(()=> {
        consultarApi();
    }, [productos]); //para que se reinicie la pantalla cuando cambia algo en productos, ejemplo eliminar en el componente producto


    return(
        <Fragment>
            <main className="caja-contenido col-9">
            <h2>Productos</h2>

            <Link to={'/productos/nuevo'} className="btn btn-verde nvo-cliente">
                 <i className="fas fa-plus-circle"></i>
                Nuevo Producto
            </Link>

            <ul className="listado-productos">
                {productos.map(product => (
                    <Producto producto={product} key={product._id}/>
                ))}
            </ul>
        </main>
        </Fragment>
   
    )
}

export default Productos;