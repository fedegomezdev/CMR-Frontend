import React, { useState, useEffect, Fragment } from "react";
import clienteAxios from "../../config/axios";
import DetallePedidos from './DetallesPedidos';

function Pedidos() {
  const [pedidos, guardarPedidos] = useState([]);

  useEffect(() => {
    const consultarApi = async () => {
      const resultado = await clienteAxios.get("/pedidos");
      guardarPedidos(resultado.data);
    };

    consultarApi();
  });

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

export default Pedidos;
