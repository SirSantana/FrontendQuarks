import { gql } from "@apollo/client";


//GASTO
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
export const GET_GASTOS_MONTH = gql`
  query getGastosMonth($id:ID){
    getGastosMonth(id:$id){
      tipo
      dineroGastado
      id
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


//USER
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
            puntos
            premium
        }
    }
`
export const GET_VEHICLES = gql`
  query getCars{
    getCars{
      tipo
      marca
      id
      imagen
      cilindraje
      referencia
      modelo
      presupuesto
    }
  }
`
export const GET_ONE_USERS = gql`
  query getOneUser($id:ID){
    getOneUser(id:$id){
      name
      premium
      vehiculos
      puntos
    }

  }
`
export const GET_AVATAR_USER = gql`
query getAvatar($id:ID) {
  getAvatar(id:$id) {
            avatar
            name
            ciudad
            celular
            
  }
}
`


//RECORDATORIO
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
export const GET_RECORDATORIOS = gql`
    query getRecordatorios($id:ID){
        getRecordatorios(id:$id){
            tipo
            fechaInicial
            fechaFinal
            kilometrajeInicial
            kilometrajeFinal
            id
        }
    }
`


//NEGOCIOS
export const GET_NEGOCIOS = gql`
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
}
`
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

//PREGUNTAS / COTIZACIONES
export const GET_PREGUNTAS = gql`
query getBusquedaPreguntas($word:String) {
  getBusquedaPreguntas(word:$word) {
   titulo
   marca
   userName
   referencia
   id
   fecha
  }
}
`
export const GET_PREGUNTAS_USER = gql`
query getPreguntasUser {
  getPreguntasUser{
   titulo
   marca
   userName
   referencia
   id
   fecha
   cotizaciones
  }
}
`
export const GET_LAST_PREGUNTAS = gql`
query getLastPreguntas {
  getLastPreguntas {
   titulo
   marca
   userName
   referencia
   id
   fecha
   cotizaciones

  }
}
`

export const GET_COTIZACIONES = gql`
query getCotizaciones($id:ID) {
  getCotizaciones(id:$id) {
   descripcion
   marca
   garantia
   precio
   id
   user
   celular
   stock
   envio
   estado
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

export const GET_SCORE = gql`
  query getScore{
    getScore{
      name
      puntos
      id
      
    }

  }
`