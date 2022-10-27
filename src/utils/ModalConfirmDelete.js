import { gql, useMutation } from '@apollo/client';
import {Modal, View, Text, StyleSheet, Pressable, Image,TouchableOpacity, Alert} from 'react-native'
import { Theme } from '../theme';
import ModalCargando from './ModalCargando';
import { useEffect, useState } from 'react';
import { DELETE_GASTO, DELETE_RECORDATORIO } from '../graphql/mutations';
import { GET_ALL_GASTOS, GET_GASTOS, GET_RECORDATORIOS } from '../graphql/querys';
import ModalSuccesfull from './ModalSuccesfull';



export default function ModalConfirmDelete({setVisibleDelete, id, idVehiculo, setModalVisible,idVehiculo2 }){
  const [visibleSuccesfull, setVisibleSuccesfull] = useState(false)
  
  const [deleteGasto, {data, loading, error}] = useMutation(DELETE_GASTO,{
    update(cache, {data}){
  const {getAllGastos} = cache.readQuery({
    query:GET_ALL_GASTOS,
    variables:{id:idVehiculo},
  })
  const {getPrevGastos} = cache.readQuery({
    query:GET_GASTOS,
    variables:{id:idVehiculo}
  })
   cache.writeQuery({
    query:GET_ALL_GASTOS,
    variables:{id:idVehiculo},
    data:{
      getAllGastos:getAllGastos.filter(el=> el.id !== data.deleteGasto)
    }
  })
  cache.writeQuery({
    query:GET_GASTOS,
    variables:{id:idVehiculo},
    data:{
      getPrevGastos:getPrevGastos.filter(el=> el.id !== data.deleteGasto)
    }
  })
}})
  const [deleteRecordatorio, result] = useMutation(DELETE_RECORDATORIO, {refetchQueries:[{query:GET_RECORDATORIOS, variables:{id:idVehiculo2}}]})

  const Delete=()=>{
    if(idVehiculo2){
      console.log('hola');
      deleteRecordatorio({variables:{id:id}})

    }else{
      console.log('hola222');

      deleteGasto({variables:{id:id, idVehiculo:idVehiculo}})
    }
  }
  useEffect(() => {
    if(data || result?.data){
      setVisibleSuccesfull(true)
      setTimeout(()=>{
        setModalVisible(false)
        setVisibleDelete(false)
      },3000)
    }
  }, [data,result?.data])
  useEffect(()=>{
    if(error){
      if(error?.message === 'Network request failed'){
        Alert.alert('Ha ocurrido un error', 'Revisa tu conexion a internet')
      }else{
        Alert.alert('Ha ocurrido un error',error?.message)
      }
    }
    if(result?.error){
      if(result?.error.message === 'Network request failed'){
        Alert.alert('Ha ocurrido un error', 'Revisa tu conexion a internet')
      }else{
        Alert.alert('Ha ocurrido un error',result?.error?.message)
      }
    }
    
  },[error, result?.error])
  
    return(
        
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <Image  style={{width:30, height:30}} source={require('../../assets/LogoQuarks1PNG.png')}/>
              <Text style={[Theme.fonts.descriptionRed,{marginVertical:20}]}>¿Estas seguro de eliminarlo?</Text>
              <View style={{flexDirection:'row', justifyContent:'space-between', width:'100%'}}>
              <TouchableOpacity onPress={()=> setVisibleDelete(false)} style={[Theme.buttons.primaryOutlined,{width:"45%"}]}><Text style={Theme.fonts.descriptionRed}>Regresar</Text></TouchableOpacity>
              <TouchableOpacity disabled={loading} onPress={()=>Delete()}  style={[Theme.buttons.primary,{width:"45%"}]}><Text style={Theme.fonts.description}>Eliminar</Text></TouchableOpacity>
              
              </View>
          </View>
          {loading || result?.loading &&
          <Modal
          style={{backgroundColor:'rgba(0,0,0,0.5)'}}
          animationType="slide"
          transparent={true}
          visible={result?.loading || loading}
        >
            <ModalCargando text={'Eliminando Recordatorio...'}/>
          </Modal>
          }
          {visibleSuccesfull &&
         <Modal
         animationType="fade"
         visible={visibleSuccesfull}
         transparent={true}

       >
          <ModalSuccesfull text={'Eliminado'} description={data?'Gasto Eliminado':'Recordatorio Eliminado'}/>
       </Modal>
         }
        </View>
    )
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      backgroundColor:'rgba(0,0,0,0.5)',
      width:'100%'
    },
    modalView: {
      margin: 20,
      backgroundColor: '#f3f3f3',
      borderRadius: 20,
      padding: 20,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      // shadowOpacity: 0.25,
      // shadowRadius: 4,
      // elevation: 5
      // position: "absolute",
      // bottom: 0,
      // height: 250,
      // width:'100%',
      // borderTopLeftRadius: 20,
      // justifyContent: "center",
      // alignItems: "center",
      // borderTopRightRadius: 20,
      // backgroundColor: "white"
    },
  
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });