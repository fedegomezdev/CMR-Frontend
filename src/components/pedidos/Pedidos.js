import React, { useState, useEffect, Fragment, useContext } from "react";
import clienteAxios from "../../config/axios";
import DetallePedidos from './DetallesPedidos';
import {withRouter} from 'react-router-dom';
import { CRMContext } from "../../context/CRMContext";


function Pedidos(props) {

  const [auth, guardarAuth] = useContext(CRMContext);

  const [pedidos, guardarPedidos] = useState([]);



  useEffect(() => {
    if(auth.token !== '') {
      const consultarApi = async () => {
        try{
            const resultado = await clienteAxios.get("/pedidos",{
              headers: {
                Authorization : `Bearer ${auth.token}`
              }
            });
          guardarPedidos(resultado.data);
        } catch(error){
          
            if(error.response.status = 500){
              props.history.push('/iniciar-sesion')
            }
        }
    };

    consultarApi();
  } else {
    props.history.push('/iniciar-sesion')
  }
  });

  
  if(!auth.auth){
    props.history.push('/iniciar-sesion');
  }

  return (
    <Fragment>
      <h2>Pedidos</h2>
      <ul className="listado-pedidos">
      {pedidos.map(pedido => (
          <DetallePedidos
            key={pedido._id}
            pedido={pedido}
          />  
      ))}
      </ul>
    </Fragment>
  );
}

export default withRouter(Pedidos);
