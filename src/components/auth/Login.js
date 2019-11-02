import React,{useState, useContext} from 'react'
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import {withRouter} from 'react-router-dom';

import {CRMContext} from '../../context/CRMContext';

function Login(props) {

    //auth y token
    const [ auth , guardarAuth ] = useContext(CRMContext);
    //state con los datos del form  
    const [ credenciales, guardarCredenciales] = useState({});


    //guardamos en el state lo q escribe
    const leerDatos = (e) => {
        guardarCredenciales({
            ...credenciales,
            [e.target.name] : e.target.value
        })
    }

    //iniciar sesion
    const iniciarSesion = async e => {
        e.preventDefault();

        //autenticar usuario
        try {
            const respuesta= await clienteAxios.post('/iniciar-sesion', credenciales);

            //extraer token y colocarlo en localstorage
            const {token} = respuesta.data;
            localStorage.setItem('token', token);

            //guardar token
            guardarAuth({
                token,
                auth: true
            })

            //alerta
            Swal.fire({
                type:'success',
                title:'Sesión iniciada',
                text:'Credenciales Correctas'
            })

            //redireccionar
            props.history.push('/');

        } catch (error) {
            console.log(error);
            Swal.fire({
                type:'error',
                title:'Hubo un error',
                text: error.response.data.mensaje
            })
        }
    } 


    return(
        <div className="login">
            <h2>Login</h2>
            <div className="contenedor-formulario">
                <form onSubmit={iniciarSesion}>
                    <div className="campo">
                        <label>Email</label>
                        <input 
                            type="text"
                            name="email"
                            onChange={leerDatos}
                            placeholder="Email"
                            required
                            />
                    </div>
                    <div className="campo">
                        <label>Password</label>
                        <input 
                            type="password"
                            name="password"
                            onChange={leerDatos}
                            placeholder="Password"
                            required
                            />
                    </div>
                    <input type="submit" value="Iniciar Sesion" className="btn btn-verde btn-block" />
                </form>
            </div>
        </div>
    )
}

export default withRouter(Login);