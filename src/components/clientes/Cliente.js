import React,{useContext} from 'react';
import {Link} from 'react-router-dom';
import Swal from 'sweetalert2';
import clienteAxios from '../../config/axios';
import {CRMContext} from '../../context/CRMContext';


function Cliente({cliente}){
    
    const [auth, guardarAuth] = useContext(CRMContext);

    //extraer valores
    const {_id, nombre, apellido, empresa, email, telefono } = cliente;

    const eliminarCliente = (idCliente) => {
        Swal.fire({
            title: 'Estas seguro?',
            text: "Se eliminará de forma permanente",
            type: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si, Eliminar',
            cancelButtonText:'Cancelar'
          }).then((result) => {
            if (result.value) {
                clienteAxios.delete(`/clientes/${idCliente}`,{headers : {Authorization : `Bearer ${auth.token}`}})
                .then(res => {
                    Swal.fire(
                        'Eliminado!',
                        res.data.mensaje,
                        'success'
                      )
                });

             
            }
          })
    }


    /* uso un arrow function porque si lo haria sin, se ejecuta directamente le codigo por tener el () y lo necesitamos para pasar el id  , esto es en onclick de eliminar*/
    return(
            <li className="cliente">
                <div className="info-cliente">
                    <p className="nombre">{nombre} {apellido}</p>
                    <p className="empresa">{empresa}</p>
                    <p>Email: {email}</p>
                    <p>Tel: {telefono}</p>
                </div>
                <div className="acciones">
                    <Link to={`clientes/editar/${_id}`} className="btn btn-azul">
                        <i className="fas fa-pen-alt"></i>
                           Editar Cliente
                    </Link>

                    <Link to={`pedidos/nuevo/${_id}`} className="btn btn-amarillo">
                        <i className="fas fa-plus"></i>
                           Nuevo Pedido
                    </Link>


                    <button type="button" 
                    className="btn btn-rojo btn-eliminar"
                    onClick={()=> eliminarCliente(_id)} 
                    >
                        
                        <i className="fas fa-times"></i>
                            Eliminar Cliente
                    </button>
                </div>
            </li>       
    )
}

export default Cliente;