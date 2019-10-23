import React,{useState, useEffect, Fragment} from 'react';
import {Link} from 'react-router-dom';

import clienteAxios from '../../config/axios';

import Cliente from './Cliente';

function Clientes(){

    //State
    const [clientes, guardarClientes] = useState([]);

    //Query a la api
    const consultarApi = async() => {
        const clientesConsulta = await clienteAxios.get('/clientes');

        //colocar en el state
        guardarClientes(clientesConsulta.data);
    }

    useEffect( () =>{

        consultarApi();
    }, [clientes] ); //cuando clientes cambie que haga consultarapi, para cuando eliminamos en el componente cliente, se actualize la vista sin el cliente eliminado, porq no podemos usar props.history al mismo componente

    return(
        <Fragment>
            <h2>Clientes</h2>

            <Link to={"/clientes/nuevo"} className="btn btn-verde nvo-cliente"> 
                <i className="fas fa-plus-circle"></i>
                Nuevo Cliente
            </Link>

            <ul className="listado-clientes">
                {clientes.map(cliente => { {/* podria no poner el corchete  y return y poner directo "(""  */ }
                    return(
                    <Cliente 
                        key={cliente._id}
                        cliente={cliente}
                    />
                    )
                })}
            </ul>
        </Fragment>
    )
}

export default Clientes;