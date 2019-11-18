import React,{Fragment, useState , useEffect, useContext} from 'react';
import clienteAxios from '../../config/axios';
import FormBuscarProducto from './FormBuscarProducto';
import Swal from 'sweetalert2';
import FormCantidadProducto from './FormCantidadProducto';
import {withRouter} from 'react-router-dom';
import {CRMContext} from '../../context/CRMContext';


function NuevoPedido(props){


    //extraer id
    const {id} = props.match.params;

    const [auth, guardarAuth] = useContext(CRMContext);

    const [cliente, guardarCliente] = useState({});
    const [busqueda, guardarBusqueda]= useState('');
    const [productos, guardarProductos] = useState([]);
    const [total, guardarTotal] = useState(0);


    
    useEffect(()=> {
        if(auth.token !== ''){
            const consultarApi = async () =>{
                try{ 
                    const resultado = await clienteAxios.get(`clientes/${id}`, {
                        headers : {
                            Authorization : `Bearer ${auth.token}`
                        }
                    });
                    guardarCliente(resultado.data);
                }catch(error){
                    if(error.response.status = 500) {
                        props.history.push('/iniciar-sesion');
                }
                }
            }
            consultarApi();
        }else {
            props.history.push('/iniciar-sesion')
        }
        //actualizar total
        actualizarTotal();

    },[productos] );


    const buscarProducto = async (e) => {
        e.preventDefault();
        //obtenerproductos
        const resultadoBusqueda = await clienteAxios.post(`/productos/busqueda/${busqueda}`,{headers : {Authorization : `Bearer ${auth.token}`}})


        if(resultadoBusqueda.data[0]){
            let productoResultado = resultadoBusqueda.data[0];

            //agregar la llave producto (copia de id)
            productoResultado.producto = resultadoBusqueda.data[0]._id ;
            productoResultado.cantidad = 0;

            guardarProductos([...productos, productoResultado])

        }else{
            Swal.fire({
                type:'error',
                title:'Sin Resultados',
                text:'No hay resultados'
            })
        }
    }

    //almacenar busqueda en el state
    const leerBusqueda = (e) => {
        guardarBusqueda(e.target.value);
    }


    const restarProductos = (index) => { //le paso el index para ver en que posicion del array esta , para poder idenfiticar a cual toco click
        //copiar arreglo original
        const todosProductos = [...productos];

        //validar si esta en 0
        if(todosProductos[index].cantidad === 0) return;
        
        //decrementar
        todosProductos[index].cantidad--;

        //almacenar en state
        guardarProductos(todosProductos)
    }


    const sumarProductos = (index) => {
        const todosProductos = [...productos];
        todosProductos[index].cantidad++;
        guardarProductos(todosProductos);
    }


    const actualizarTotal = () => {
        if(productos.length === 0){
            guardarTotal(0);        //por si alguien agrega productos y despues elimina sin vaciar las cantidades, para q asi se mantenga actualizad
            return;
        }
        //calcular el nuevo totaal
        let nuevoTotal = 0;


        //recorrer productos, cantidades y pprecio
        productos.map(producto => nuevoTotal += (producto.cantidad * producto.precio));

        //almacenar el total
        guardarTotal(nuevoTotal);
    }


    const eliminarProductoPedido = id => {
        const todosProductos = productos.filter(producto => producto.producto !== id); //los que sean diferente al id del que toco, los mantiene 

        guardarProductos(todosProductos);
    }


    //guardar en la db el pedido
    const realizarPedido = async (e) => {
        e.preventDefault();

        //extraer id
        const {id} = props.match.params;

        //contruir el ojbjeto de forma que la estructure en la api
        const pedido = {
            "cliente": id,
            "pedido": productos,
            "total": total 
        }
        const resultado = await clienteAxios.post(`/pedidos/nuevo/${id}`, pedido,{headers : {Authorization : `Bearer ${auth.token}`}});

        if(resultado.status === 200){
            Swal.fire({
                type:'success',
                title:'Correcto',
                text: resultado.data.mensaje
            })
        }else {
            Swal.fire({
                type:'error',
                title:'Hubo un error',
                text:'Vuelva a intentarlo'
            })
        }

        //redireccionar
        props.history.push('/pedidos');
    } 

    if(!auth.auth && (localStorage.getItem('token') === auth.token)) {props.history.push('/inciar-sesion')};


    return(
        <Fragment>
        <h2>Nuevo Pedido</h2>

        <div className="ficha-cliente">
            <h3>Datos de Cliente</h3>
            <p>{cliente.nombre} {cliente.apellido}</p> 
            <p>{cliente.telefono}</p>
        </div>

            <FormBuscarProducto
                buscarProducto={buscarProducto}
                leerBusqueda={leerBusqueda}
            />

            <ul className="resumen">
                
            {productos.map( (producto, index) => ( 
                <FormCantidadProducto 
                key={producto.producto} 
                producto={producto}
                sumarProductos={sumarProductos}
                restarProductos={restarProductos}
                eliminarProductoPedido={eliminarProductoPedido}
                index={index}
                />
            ) )}

            </ul>
            
            <p className="total">Total a pagar <span>$ {total} </span></p>

           {
               total > 0 ? (
                   <form onSubmit={realizarPedido}>
                       <input type="submit" className="btn btn-verde btn-block" value="Realizar Pedido"/>
                   </form>
               ) : null
           }
        </Fragment>
    )
}

export default withRouter(NuevoPedido);