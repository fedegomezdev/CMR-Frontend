import React,{useState} from 'react'

const CRMContext = React.createContext([ {} , () => {} ]); //un objeto(el state), y una funcion(guardartoken)

const CRMProvider = (props)=>{

    const [auth, guardarAuth] = useState({
        token:'',
        auth: false
    })
                                    //de esa forma todo lo q esta entre el crmcontextprovider, (props.childer) se le va a pasar
    return(
        <CRMContext.Provider value={[auth, guardarAuth]}>
            {props.children}
        </CRMContext.Provider>
    )

}

export {CRMContext, CRMProvider}; 