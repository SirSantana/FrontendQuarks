import { gql } from "@apollo/client";

export const GET_ONE_GASTO = gql`
  query getOneGasto($id:ID){
    getOneGasto(id:$id){
      tipo
      dineroGastado
      fecha
      id
      imagen
      description
      lugar
      vehiculo
    }
  }
`
export const GET_MENSAJES = gql`
  query getMensajes($marca:String){
    getMensajes(marca:$marca){
      texto
    user
    fecha
    marca
    avatar
    name
    }
  }  
`
export const GET_RECORDATORIO = gql`
    query getOneRecordatorio($id:ID){
        getOneRecordatorio(id:$id){
            titulo
            description
            fecha
            id
        }
    }
`
export const GET_RECORDATORIOS =gql`
    query getRecordatorios($id:ID){
        getRecordatorios(id:$id){
            titulo
            description
            fecha
            id
        }
    }
`
export const GET_USER = gql`
    query getUser{
        getUser{
            name
            apellido
            email
            vehiculos
            avatar
            role
            ciudad 
            pais
            id
        }
    }
`
export const GET_VEHICLES= gql`
  query getCars{
    getCars{
      tipo
      marca
      id
      imagen
      cilindraje
      referencia
      modelo
    }
  }
`
export const GET_ALL_GASTOS = gql`
  query getAllGastos($id:ID){
    getAllGastos(id:$id){
      tipo
      dineroGastado
      fecha
      id
      vehiculo
    }
  }
`
export const GET_GASTOS = gql`
  query getPrevGastos($id:ID){
    getPrevGastos(id:$id){
      tipo
      dineroGastado
      fecha
      id
      vehiculo
    }
  }
`
export const GET_ONE_USERS = gql`
  query getOneUser($id:ID){
    getOneUser(id:$id){
      name
      email
    }

  }
`

export const GET_NEGOCIOS= gql`
query getNegocios{
  getNegocios{
    nombre
    marcas
    tipo
    ciudad
    pais
    id
    direccion
    celular
    repuestos
  }
}`

export const GET_ONE_NEGOCIO = gql`
  query getOneNegocio($id:ID){
    getOneNegocio(id:$id){
      nombre
    marcas
    tipo
    ciudad
    pais
    celular
    direccion
    }

  }
`