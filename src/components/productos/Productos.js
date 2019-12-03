import React,{Fragment, useState, useEffect, useContext} from 'react';
import {Link, withRouter} from 'react-router-dom';
import clienteAxios from '../../config/axios';
import Producto from './Producto';
import Spinner from '../layout/Spinner.js';

import {CRMContext} from '../../context/CRMContext';

function Productos(props){


    const [productos, guardarProductos] = useState([]);

    const [auth, guardarAuth] = useContext(CRMContext);

    const consultarApi = async () =>{
        const resultado = await clienteAxios.get('/productos', {
            headers: {
                Authorization : `Bearer ${auth.token}`
            }
        });
        guardarProductos(resultado.data);
    }


    //consulto api cuando cargue
    useEffect(()=> {
        
        if(auth.token !== '') {
            try {
            consultarApi();
        } catch (error) {
             // Error con authorizacion
             if(error.response.status = 500) {
                props.history.push('/iniciar-sesion');
            }
        }
       
        } else {
            props.history.push('/iniciar-sesion')
        }
    }, [productos]); //para que se reinicie la pantalla cuando cambia algo en productos, ejemplo eliminar en el componente producto


    if(!auth.auth){
        props.history.push('/iniciar-sesion');
    }

    //spinner de carga
    if (!productos.length){ 
        return( 
            <Fragment>
            <main className="caja-contenido col-9">
            <h2>Productos</h2>

            <Link to={'/productos/nuevo'} className="btn btn-verde nvo-cliente">
                 <i className="fas fa-plus-circle"></i>
                Nuevo Producto
            </Link>
            <Spinner/> 
            </main>
            </Fragment>
        )} else{ 
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

    
}

export default withRouter(Productos);