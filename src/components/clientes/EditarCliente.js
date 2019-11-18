import React, {Fragment, useState, useEffect, useContext} from 'react'
import clienteAxios from '../../config/axios';
import Swal from 'sweetalert2';
import {withRouter} from 'react-router-dom';
import {CRMContext} from '../../context/CRMContext';


function EditarCliente(props){ 
    //obtengo el id
    const {id} = props.match.params;
    console.log(id);

    const [auth, guardarAuth] = useContext(CRMContext);

    const [cliente, datosCliente] = useState({
        nombre:'',
        apellido:'',
        email:'',
        telefono:'',
        empresa:''
    });


    //Query a la api
    const consultarApi = async () => {
        const clienteConsulta = await clienteAxios.get(`/clientes/${id}`);

        //colocar en el state
        datosCliente(clienteConsulta.data);
    }  


    //cuando el componente carga
    useEffect( ()=> {
        consultarApi();
    }, []);



    //leer los datos del formulario
    const actualizarState = e =>  {
        //almacenar lo q el usuario escribe en el state
        datosCliente({
            //obtener una copia del state actual para que cuando escribamos algo, no se borren los valores previos
            ...cliente,
            [e.target.name]:e.target.value
        })
    }

    //peticion por axios para actualizar
    const actualizarCliente = (e) => {
        e.preventDefault();

        //enviar peticios
        clienteAxios.put(`/clientes/${cliente._id}`, cliente)
        .then(res => {
            if(res.data.code === 11000){ //data.code existe si hay algun error, en este caso el 11000 es un error de mongo
                console.log('Error de duplicado de mongo')
                Swal.fire({
                    type:'error',
                    title:'Hubo un error',
                    text:'Cliente ya registrado'
                })
            }else {
                console.log(res.data);
                Swal.fire(
                    'Se actualizo correctamente',
                    'Cliente Actualizado',
                    'success'
                  )
            }
            //redireccion
            props.history.push('/');

        })

    }



    //validar formulario
    const validarCliente = () => {
        const {nombre,apellido,email,telefono,empresa} = cliente;

        let valido = !nombre.length || !apellido.length || !email.length || !telefono.length || !empresa.length;

        //devuelve un true or false, y dependiendo de eso , va a ser tru o false el disabled del boton
        return valido;
    }


    if(!auth.auth && (localStorage.getItem('token') === auth.token)) {props.history.push('/inciar-sesion')};


    return(
        <Fragment>

        <h2>Editar Cliente</h2>

        <form onSubmit={actualizarCliente}> 
                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" 
                    placeholder="Nombre Cliente" 
                    name="nombre"
                    onChange={actualizarState}
                    value={cliente.nombre}
                    />
                </div>

                <div className="campo">
                    <label>Apellido:</label>
                    <input type="text" 
                    placeholder="Apellido Cliente" 
                    name="apellido"
                    onChange={actualizarState}
                    value={cliente.apellido}
                    />
                </div>
            
                <div className="campo">
                    <label>Empresa:</label>
                    <input type="text" 
                    placeholder="Empresa Cliente" 
                    name="empresa"
                    onChange={actualizarState}
                    value={cliente.empresa}
                    />
                </div>

                <div className="campo">
                    <label>Email:</label>
                    <input type="email" 
                    placeholder="Email Cliente" 
                    name="email"
                    onChange={actualizarState}
                    value={cliente.email}
                    />
                </div>

                <div className="campo">
                    <label>Teléfono:</label>
                    <input type="text" 
                    placeholder="Teléfono Cliente"
                    name="telefono"
                    onChange={actualizarState}
                    value={cliente.telefono}
                    />
                </div>

                <div className="enviar">
                        <input type="submit" 
                        className="btn btn-azul" 
                        value="Guardar Cambios"
                        disabled={validarCliente()}   
                        /> {/* se ejecuta directamente si uso (), sino espera algun cmabio o algo */}
                </div>

            </form>


        </Fragment>
    )
}
//HOC, toma un componente y retorna uno nuevo
export default withRouter(EditarCliente);