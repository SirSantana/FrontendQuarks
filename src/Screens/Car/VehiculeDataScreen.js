import { View, Text, Image, Button, TouchableOpacity, Pressable,StyleSheet, Modal, Alert, Dimensions, ActivityIndicator, TouchableHighlight, ScrollView, } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { marcasCarros } from '../../Components/CarComponents/marcasCarros';
import { Theme } from '../../theme';

import { useNavigation } from '@react-navigation/native';
import ModalCreateGasto from '../../Components/CarComponents/ModalCreateGasto';
import { gql, useLazyQuery, useQuery } from '@apollo/client';
import { marcasMotos } from '../../Components/CarComponents/marcasMotos';
import ModalCargando from '../../utils/ModalCargando';
import { GET_ALL_GASTOS, GET_GASTOS } from '../../graphql/querys';
import ModalImage from '../../utils/ModalImage';
import { Texts } from '../../Themes/text';

import ImageVehiculo from '../../Components/CarComponents/ImageVehiculo';
import DatosVehiculo from '../../Components/CarComponents/DatosVehiculo';
import CardMensual from '../../Components/CarComponents/CardMensual';
import GastosRecientes from '../../Components/CarComponents/GastosRecientes';
import Recordatorios from '../../Components/CarComponents/Recordatorios/Index';


export default function VehiculeDataScreen({route}) {
  const navigation = useNavigation()
  const item = route?.params?.item
  const marca = marcasCarros.find(el=> el.marca === item?.marca)
  const marcaMoto = marcasMotos.find(el=> el.marca === item?.marca)
  const [loadingImage, setLoading] = useState({image:true, marcas:true})
  const [image, setImage] = useState({visible:false, image:null})
  const {height} = Dimensions.get('screen')
const [modalVisible2, setModalVisible2] = useState(false);

const  result = useQuery(GET_GASTOS,{variables:{id:item.id}})

const [getAll, {loading,data, error}] = useLazyQuery(GET_ALL_GASTOS)


let yearsData = [[],[],[],[],[],[],[],[],[],[],[],[]]

let monthActual = new Date().getMonth()
let yearActual = new Date().getFullYear()

let dataMonthActual
if(data?.getAllGastos){
  dataMonthActual = data.getAllGastos.filter(el=>{
    let fecha = new Date(el.fecha).getMonth()
    let year = new Date(el.fecha).getFullYear()
    if(year === yearActual){
      yearsData[0].push(el)
    }else if(year === 2023){
      yearsData[1].push(el)
    }
    return fecha === monthActual && year === yearActual
  })
}
useLayoutEffect(()=>{
    if(item?.id){
        getAll({variables:{id:item?.id}})
    }
  },[])
  let dineroGastado=0
  if(dataMonthActual){
    dataMonthActual.map(el=> dineroGastado+= Number(el.dineroGastado))
  }

  return (
      <>
        <ScrollView contentContainerStyle={{flexGrow: 1}}
  keyboardShouldPersistTaps='handled'>
         
          <ImageVehiculo item={item} setLoading={setLoading} setImage={setImage} navigation={navigation}/> 
           {loadingImage.image && <ActivityIndicator color={Theme.colors.primary}/>}

          
            <View style={{backgroundColor:'#fbfbfb', borderRadius:20, padding:'5%'}}>
            
            <DatosVehiculo item={item} marca={marca} navigation={navigation}/> 

            <CardMensual navigation={navigation} id={item.id} dineroGastado={dineroGastado} setModalVisible2={setModalVisible2}/>

            <GastosRecientes navigation={navigation} prevGastos={result?.data?.getPrevGastos} loading={result?.loading} id={item.id} setModalVisible2={setModalVisible2}/>
            <View style={{width:'100%', height:1, backgroundColor:'gray'}}/>
            <Recordatorios id={item.id}/>
            </View>


    </ScrollView>
    {modalVisible2 &&
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible2}
      >
          <ModalCreateGasto setModalVisible2={setModalVisible2} id={item.id} />
      </Modal>}
      {image &&
      <Modal
      animationType="fade"
      visible={image.visible}
      transparent={true}
     
      >
          <ModalImage image={image.image} setImage={setImage}/>
      </Modal>}
      </>
  )
}
