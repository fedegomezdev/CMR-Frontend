import React,{useState, useEffect, Fragment} from 'react';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import {withRouter} from 'react-router-dom';
import Spinner from '../layout/Spinner.js';



function EditarProducto(props){


    //obtener id
    const {id} = props.match.params;

    const [producto, guardarProducto] = useState({
        nombre:'',
        precio:'',
        imagen:''
    });

    const [archivo, guardarArchivo] = useState('');

    //consultar a la api
    const consultarApi = async()=>{
        const productoConsulta = await clienteAxios.get(`/productos/${id}`);
        console.log(productoConsulta.data);
        guardarProducto(productoConsulta.data);
    }

    useEffect(()=> {
        consultarApi();
    }, [] );

    //editar producto en la db
    const editarProducto = async e => {
        e.preventDefault();

        
        //crear un formdata
        const formData = new FormData();
        formData.append('nombre', producto.nombre);
        formData.append('precio', producto.precio);
        formData.append('imagen', archivo);

        //almacenar la db
        try {
            const res = await clienteAxios.put(`/productos/${id}` , formData, {
                headers: {
                    'Content-Type':'multipart/form-data'
                }
            });

            if(res.status === 200){
                Swal.fire(
                    'Se Editó correctamente',
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

    //extraer
    const {nombre, precio, imagen} = producto;

    if (!nombre) return <Spinner/>

    return(
    
        <Fragment>
        <h2>Editar Producto</h2>
        <form onSubmit={editarProducto}>

                <legend>Llena todos los campos</legend>

                <div className="campo">
                    <label>Nombre:</label>
                    <input type="text" 
                    placeholder="Nombre Producto" 
                    name="nombre"
                    defaultValue={nombre}
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
                    defaultValue={precio}
                    onChange={leerInfoProducto}
                   />
                </div>
            
                <div className="campo">
                    <label>Imagen:</label>
                    {imagen ? <img src={`http://localhost:4000/${imagen}`} alt="imagen" width="300" />  : null }
                    <input type="file"  
                    name="imagen" 
                    onChange={leerArchivo}
                    />
                </div>

                <div className="enviar">
                        <input type="submit" 
                        className="btn btn-azul" 
                        value="Editar Producto"
                        
                        />
                </div>
            </form>
        </Fragment>       
        
        
    )
}

export default withRouter(EditarProducto);