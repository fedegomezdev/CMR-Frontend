import React,{Fragment, useState} from 'react';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import {withRouter} from 'react-router-dom';

function NuevoProducto(props){


    const [producto, guardarProducto] = useState({
        nombre:'',
        precio:''
    });

    const [archivo, guardarArchivo] = useState('');

    //leer datos del formulario
    const leerInfoProducto = (e) => {
        guardarProducto({
            ...producto,
            [e.target.name] : e.target.value
        })
        console.log(producto)
    }

    //leer archivo imagen
    const leerArchivo = e => {
        guardarArchivo(e.target.files[0]);
    }


    //almacena en la base de datos y sube la imagen al sv
    const agregarProducto = async(e)=> {
        e.preventDefault();


        //crear un formdata
        const formData = new FormData();
        formData.append('nombre', producto.nombre);
        formData.append('precio', producto.precio);
        formData.append('imagen', archivo);

        //almacenar la db
        try {
            const res = await clienteAxios.post('/productos' , formData, {
                headers: {
                    'Content-Type':'multipart/form-data'
                }
            });

            if(res.status === 200){
                Swal.fire(
                    'Se agrega correctamente',
                    res.data.mensaje,
                    'success'
                 )
            }

            //redireccionar
            props.history.push('/productos');


        }catch(error){
            console.log(error);
            Swal.fire({
                type:'error',
                title:'Hubo un error',
                text:'Vuelva a intentarlo'
            })
        }

    }


    return(
        <Fragment>
        <h2>Nuevo Producto</h2>
        <form onSubmit={agregarProducto}>

                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" 
                    placeholder="Nombre Producto" 
                    name="nombre"
                    onChange={leerInfoProducto}
                    />
                </div>

                <div className="campo">
                    <label>Precio:</label>
                    <input type="number" 
                    name="precio" 
                    min="0.00" 
                    step="0.01" 
                    placeholder="Precio" 
                    onChange={leerInfoProducto}
                   />
                </div>
            
                <div className="campo">
                    <label>Imagen:</label>
                    <input type="file"  
                    name="imagen" 
                    onChange={leerArchivo}
                    />
                </div>

                <div className="enviar">
                        <input type="submit" 
                        className="btn btn-azul" 
                        value="Agregar Producto"
                        
                        />
                </div>
            </form>
        </Fragment>       
    )
}

export default withRouter(NuevoProducto);