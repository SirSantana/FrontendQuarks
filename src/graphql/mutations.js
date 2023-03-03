import { gql } from "@apollo/client"


export const UPLOAD_FILE = gql`
mutation uploadFile($file:String) {
  uploadFile(file:$file)
}
  `
//CAR
export const CREATE_CAR = gql`
mutation createCar($marca:String, $tipo:String, $referencia:String, $modelo:String, $cilindraje:String, $user:ID, $imagen:String) {
  createCar(input: {marca:$marca, tipo:$tipo, referencia:$referencia,modelo:$modelo, cilindraje:$cilindraje, user:$user, imagen:$imagen}) {
    tipo
    referencia
    modelo
    cilindraje
    marca
    imagen
    id
  }
}
`
export const DELETE_CAR = gql`
mutation deleteCar($id:ID!) {
  deleteCar(id:$id)
}
`
export const UPDATE_CAR = gql`
mutation updateCar($marca:String, $tipo:String, $referencia:String, $modelo:String, $cilindraje:String, $user:ID, $imagen:String, $id:ID) {
  updateCar(input: {marca:$marca, tipo:$tipo, referencia:$referencia,modelo:$modelo, cilindraje:$cilindraje, user:$user, imagen:$imagen, id:$id}) {
    tipo
    referencia
    modelo
    cilindraje
    marca
    imagen
    id
  }
}
`


//GASTO
export const CREATE_GASTO = gql`
  mutation createGasto($dineroGastado:String, $tipo:String,$lugar:String, $description:String, $imagen:String, $fecha:Date, $vehiculo:ID,){
    createGasto(input:{dineroGastado:$dineroGastado,tipo:$tipo,lugar:$lugar, description:$description, imagen:$imagen, fecha:$fecha, vehiculo:$vehiculo}){
      tipo
      dineroGastado
      fecha
      id
      lugar
      vehiculo
    }
  }
`
export const CREATE_PRESUPUESTO = gql`
  mutation createPresupuesto($id:ID!, $presupuesto:String){
    createPresupuesto(id:$id, presupuesto:$presupuesto){
      id
    }
  }
`
export const UPDATE_GASTO = gql`
  mutation updateGasto($dineroGastado:String, $tipo:String,$lugar:String, $description:String, $imagen:String, $fecha:Date, $vehiculo:ID, $id:ID){
    updateGasto(input:{dineroGastado:$dineroGastado,tipo:$tipo,lugar:$lugar, description:$description, imagen:$imagen, fecha:$fecha, vehiculo:$vehiculo, id:$id}){
      tipo
      dineroGastado
      fecha
      id
      description
      lugar
      imagen
    }
  }
`
export const DELETE_GASTO = gql`
  mutation deleteGasto($id:ID!, $idVehiculo:ID!){
    deleteGasto(id:$id, idVehiculo:$idVehiculo)
    
  }
`

//USER/LOGIM/REGISTER
export const EDIT_USER = gql`
    mutation editUser($name:String, $apellido:String, $avatar:String, $ciudad:String, $pais:String){
        editUser(input:{name:$name, apellido:$apellido, avatar:$avatar, ciudad:$ciudad, pais:$pais}){
                name
                apellido
                pais
                avatar
                ciudad
                id
                role
        }
    }
`
export const SIGN_IN_MUTATION = gql`
mutation signIn($email: String!, $password:String!) {
    signIn(input:{email: $email, password:$password}) {
      user {
        email
        id
        name
        role
      }
      token
    }
  }
`
export const SIGN_UP = gql`
mutation signUp($email: String!, $password:String!, $name:String!,  $confirmPassword:String!) {
  signUp(input:{email: $email, password:$password, name:$name, confirmPassword:$confirmPassword,}) {
    user {
      email
      name
      id
    }
    token
  }
}
`
export const SEND_MESSAGE_PASSWORD = gql`
mutation sendMessagePassword($email:String!, $codigo:Int){
  sendMessagePassword(email:$email, codigo:$codigo)
}
`
export const CHANGE_PASSWORD = gql`
  mutation changePassword($email:String,$password:String, $confirmPassword:String){
    changePassword(email:$email,password:$password, confirmPassword:$confirmPassword)
  }
`

//RECORDATORIO
export const CREATE_RECORDATORIO = gql`
    mutation createRecordatorio($tipo:String, $fechaInicial:Date, $fechaFinal:Date, $kilometrajeInicial:String,$kilometrajeFinal:String, $vehiculo:ID){
        createRecordatorio(input:{tipo:$tipo, fechaInicial:$fechaInicial, fechaFinal:$fechaFinal,kilometrajeInicial:$kilometrajeInicial,kilometrajeFinal:$kilometrajeFinal,vehiculo:$vehiculo}){
            tipo
            kilometrajeInicial
            kilometrajeFinal
            fechaInicial
            fechaFinal
            id
        }
    }
`
export const EDIT_RECORDATORIO = gql`
    mutation editRecordatorio($tipo:String, $fechaInicial:Date, $fechaFinal:Date, $kilometrajeInicial:String,$kilometrajeFinal:String, $id:ID){
      editRecordatorio(input:{tipo:$tipo, fechaInicial:$fechaInicial, fechaFinal:$fechaFinal,kilometrajeInicial:$kilometrajeInicial,kilometrajeFinal:$kilometrajeFinal,id:$id}){
            tipo
            kilometrajeInicial
            kilometrajeFinal
            fechaInicial
            fechaFinal
            id
        }
    }
`
export const DELETE_RECORDATORIO = gql`
  mutation deleteRecordatorio($id:ID!){
    deleteRecordatorio(id:$id)
  }
`


export const CREATE_MENSAJE = gql`
  mutation($texto:String, $fecha:Date, $marca:String){
    createMensaje(input:{texto:$texto, fecha:$fecha, marca:$marca}){
      texto
    user
    marca
    fecha
    }
  }
`
export const CREATE_PREGUNTA = gql`
mutation createPregunta($marca:String, $celular:String, $referencia:String, $titulo:String, $user:ID, $imagen:String ) {
    createPregunta(input: {marca:$marca, celular:$celular, referencia:$referencia, titulo:$titulo, user:$user, imagen:$imagen}) {
        titulo
        marca
        userName
        referencia
        id
        fecha
    }
  }
`


export const RECURRENT_USER=gql`
mutation userRecurrent{
  userRecurrent
}
`