import React,{useState, useEffect, Fragment} from 'react';

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
    }, [] );

    return(
        <Fragment>
            <h2>Clientes</h2>

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