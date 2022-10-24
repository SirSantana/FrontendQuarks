import { View, Text,ActivityIndicator, TextInput,Modal, StyleSheet,ScrollView, TouchableOpacity, Image, Pressable, Alert, SafeAreaView, StatusBar, Dimensions  } from "react-native";
import { Colors } from "../../../Themes/colors";
import { Texts } from "../../../Themes/text";
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Buttons } from "../../../Themes/buttons";
import { GET_RECORDATORIOS } from "../../../graphql/querys";
import { useEffect, useState, useLayoutEffect } from "react";
import { gql, useQuery, useLazyQuery } from '@apollo/client'
import FormRecordatorio from "../../Profile/FormRecordatorio";
import useAuth from "../../../hooks/useAuth";
import ModalDetailsRecordatorio from "../../Profile/ModalDetailsRecordatorio";
import { Containers } from "../../../Themes/containers";
import { MaterialCommunityIcons } from '@expo/vector-icons';


export default function Recordatorios({id}){
    const [visibleCreate, setVisibleCreate] = useState(false)
    const  result = useQuery(GET_RECORDATORIOS, {variables:{id:id}})
    const [modalVisible, setModalVisible] = useState(false)
    const [details, setDetails] = useState(null)
    const [recordatorios, setRecordatorios] = useState(null)
    const {user} = useAuth()

    const handleDetails=(el)=>{
        setModalVisible(true)
        setDetails(el?.id)
    }
    useEffect(()=>{
      if(result?.error){
        Alert.alert('Ha ocurrido un error')
    }
    },[result?.error])

    useEffect(()=>{
      if(result?.data){
        setRecordatorios(result?.data?.getRecordatorios)

      }
    },[result?.data])

   

    return(
        <ScrollView style={{width:'100%', marginVertical:'5%'}}>
            <View style={{borderRadius:10,marginBottom:5, justifyContent:'center'}}>
              <View style={{justifyContent:'space-between', flexDirection:'row', alignItems:'center'}}>
              <Text style={Texts.title2BoldBlue}>Recordatorios</Text>
              <Text onPress={()=> setVisibleCreate(true)}  style={Texts.subtitleRegularRed}>+ Crear Recordatorio</Text>
              
              {/* <Text onPress={()=> navigation.navigate('Gastos', {id:item.id})} style={Theme.fonts.descriptionBlue}>Ver Todo</Text> */}
              </View>
            {result.loading && <ActivityIndicator color={Colors.primary}/>}
            {recordatorios?.length=== 0 && <Pressable onPress={()=> setVisibleCreate(true)} style={[Containers.containerGasto,{justifyContent:'center'}]}>
            <Text style={Texts.subtitleRegularRed}>Sin Recordatorios</Text>
            
                </Pressable>}
            { recordatorios?.map(el=>{
          let fecha = new Date(el.fecha) 
          const dateActual = new Date()
          let diasFaltantes = fecha.getTime() - dateActual.getTime()
          let dias = Math.round(diasFaltantes / (1000*60*60*24))

              return(
        <Pressable onPress={()=> handleDetails(el)} key={el.id} style={Containers.containerGasto}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
            <View style={{ flexDirection:'row', alignItems:'center'}}>
              <MaterialCommunityIcons name="file-eye-outline" size={24} color={Colors.secondary} style={{marginRight:5}} />
            <Text style={Texts.subtitleRegularBlue}>{el.titulo.slice(0,20)}</Text>
            </View>
            </View>
            <View style={{justifyContent:'center', alignItems:'flex-end'}}>
            <Text style={[Texts.subtitleRegularGray,{lineHeight:20, color:dias <5 &&Colors.primary}]}>Faltan {dias} dias</Text>
            <Text style={[Texts.subtitleRegularGray,{lineHeight:20}]}>{fecha.toLocaleDateString()}</Text>

              </View> 
      
          </Pressable>
              )
            }) 
            
            }
           
            </View>
            
            
            
            <Modal
          animationType="fade"
          visible={visibleCreate}
          transparent={true}
        >
        <FormRecordatorio setVisibleCreate={setVisibleCreate} name={user?.name} id={id}/> 
        </Modal>

        <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible} 
        
      >
          <ModalDetailsRecordatorio id={details} setModalVisible={setModalVisible} idVehiculo={id}/>
      </Modal>
          </ScrollView>
    )
}