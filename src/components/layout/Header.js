import React,{useContext} from 'react';
import {CRMContext} from '../../context/CRMContext';
import {withRouter} from 'react-router-dom';

function Header(props){

    const [auth, guardarAuth] = useContext(CRMContext);
    console.log(auth);

    const cerrarSesion = () =>{
        guardarAuth({
            auth: false,
            token:''
        })
        localStorage.setItem('token', '');

        props.history.push('/iniciar-sesion');
    }


    return(
        <header className="barra">
            <div className="contenedor">
                <div className="contenido-barra">
                 <h1>CRM - Administrador de Clientes</h1>

                {auth.auth ? (<button type="button" onClick={cerrarSesion} className='btn btn-rojo'> 
                 <i> Cerrar Sesión</i> </button>) : null}    
                 

                </div> 
            </div>
        </header>
    )
}

export default withRouter(Header);