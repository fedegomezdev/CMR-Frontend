import React, {Fragment, useState} from 'react'


function NuevoCliente(){


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
        console.log(cliente);
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
                    <input type="email" 
                    placeholder="Teléfono Cliente"
                    name="telefono"
                    onChange={actualizarState}
                    />
                </div>

                <div className="enviar">
                        <input type="submit" 
                        className="btn btn-azul" 
                        value="Agregar Cliente"
                        onChange={actualizarState}
                        />
                </div>

            </form>


        </Fragment>
    )
}

export default NuevoCliente;