import React, {Fragment, useState} from 'react'
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';
import {withRouter} from 'react-router-dom';

function EditarCliente(props){ 
    //obtengo el id
    const {id} = props.match.params;
    console.log(id);


    const [cliente, guardarCliente] = useState({
        nombre:'',
        apellido:'',
        email:'',
        telefono:'',
        empresa:''
    });

    //leer los datos del formulario
    const actualizarState = e =>  {
        //almacenar lo q el usuario escribe en el state
        guardarCliente({
            //obtener una copia del state actual para que cuando escribamos algo, no se borren los valores previos
            ...cliente,
            [e.target.name]:e.target.value
        })
    }

    //validar formulario
    const validarCliente = () => {
        const {nombre,apellido,email,telefono,empresa} = cliente;

        let valido = !nombre.length || !apellido.length || !email.length || !telefono.length || !empresa.length;

        //devuelve un true or false, y dependiendo de eso , va a ser tru o false el disabled del boton
        return valido;
    }



    return(
        <Fragment>

        <h2>Nuevo Cliente</h2>

        <form> 
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" 
                    placeholder="Nombre Cliente" 
                    name="nombre"
                    onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input type="text" 
                    placeholder="Apellido Cliente" 
                    name="apellido"
                    onChange={actualizarState}
                    />
                </div>
            
                <div className="campo">
                    <label>Empresa:</label>
                    <input type="text" 
                    placeholder="Empresa Cliente" 
                    name="empresa"
                    onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input type="email" 
                    placeholder="Email Cliente" 
                    name="email"
                    onChange={actualizarState}
                    />
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input type="text" 
                    placeholder="Teléfono Cliente"
                    name="telefono"
                    onChange={actualizarState}
                    />
                </div>

                <div className="enviar">
                        <input type="submit" 
                        className="btn btn-azul" 
                        value="Agregar Cliente"
                        disabled={validarCliente()}   
                        /> {/* se ejecuta directamente si uso (), sino espera algun cmabio o algo */}
                </div>

            </form>


        </Fragment>
    )
}
//HOC, toma un componente y retorna uno nuevo
export default withRouter(EditarCliente);