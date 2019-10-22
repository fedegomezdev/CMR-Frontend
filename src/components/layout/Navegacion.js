import React from 'react';
import {Link} from 'react-router-dom';

function Navegacion(){
    return(
        
    
        <aside className="sidebar col-3">
            <h2>Administración</h2>

            <nav className="navegacion">
                <Link to={"/"} className="clientes"><i className="fas fa-users"></i>Clientes</Link>
                <Link to={"/productos"} className="productos"><i className="fas fa-boxes"></i>Productos</Link>
                <Link to={"/pedidos"} className="pedidos"><i className="fas fa-cash-register"></i>Pedidos</Link>
            </nav>
        </aside>
    )
}

export default Navegacion;