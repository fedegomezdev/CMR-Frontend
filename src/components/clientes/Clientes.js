import React, { useState, useEffect, Fragment, useContext } from "react";
import { Link, withRouter } from "react-router-dom";

import clienteAxios from "../../config/axios";

import Cliente from "./Cliente";

import Spinner from "../layout/Spinner";

//importar context
import { CRMContext } from "../../context/CRMContext";

function Clientes(props) {
  //State
  const [clientes, guardarClientes] = useState([]);

  //utilizar valores del context
  const [auth, guardarAuth] = useContext(CRMContext);




  useEffect( () => {

    if(auth.token !== '') {
        // Query a la API
        const consultarAPI = async () => {
            try {
                const clientesConsulta = await clienteAxios.get('/clientes', {
                    headers: {
                        Authorization : `Bearer ${auth.token}`
                    }
                });

                // colocar el resultado en el state
                guardarClientes(clientesConsulta.data);

            } catch (error) {
                // Error con authorizacion
                if(error.response.status = 500) {
                    props.history.push('/iniciar-sesion');
                }
            }
        }
        consultarAPI();
    } else {
        props.history.push('/iniciar-sesion');
    }
}, [clientes] ); //cuando clientes cambie que haga consultarapi, para cuando eliminamos en el componente cliente, se actualize la vista sin el cliente eliminado, porq no podemos usar props.history al mismo componente


  if(!auth.auth){
      props.history.push('/iniciar-sesion');
  }


  if (!clientes.length) return <Spinner />;

  return (
    <Fragment>
      <h2>Clientes</h2>

      <Link to={"/clientes/nuevo"} className="btn btn-verde nvo-cliente">
        <i className="fas fa-plus-circle"></i>
        Nuevo Cliente
      </Link>

      <ul className="listado-clientes">
        {clientes.map(cliente => {
          {
            /* podria no poner el corchete  y return y poner directo "(""  */
          }
          return <Cliente key={cliente._id} cliente={cliente} />;
        })}
      </ul>
    </Fragment>
  );
}

export default withRouter(Clientes);
