import AllGastos from "../../Components/Gastos/AllGastos";
import {Text, View, Pressable, Modal, StyleSheet, ScrollView, ActivityIndicator} from 'react-native'
import { gql, useLazyQuery } from "@apollo/client";
import { useLayoutEffect, useState } from "react";
import ModalCargando from "../../utils/ModalCargando";
import { Theme } from "../../theme";
import MesGastos from "../../Components/Gastos/MesGastos";
import AñoGastos from "../../Components/Gastos/AñoGastos";
import { GET_ALL_GASTOS } from "../../graphql/querys";



export default function GastosScreen({route}){
    const [getAll, {loading,data, error}] = useLazyQuery(GET_ALL_GASTOS)
    const [tiempo, setTiempo] = useState('Todo')
    const id = route?.params?.id
    let yearsData = [[],[],[],[],[],[],[],[],[],[],[],[]]
    
    let monthActual = new Date().getMonth()
    let yearActual = new Date().getFullYear()
    
    let dataMonthActual
    if(data?.getAllGastos){
      dataMonthActual = data.getAllGastos.filter(el=>{
        let fecha = new Date(el.fecha).getMonth()
        let year = new Date(el.fecha).getFullYear()
        if(year === 2022){
          yearsData[0].push(el)
          console.log('Hola121');

        }else if(year === 2023){
          console.log('Hola');
          yearsData[1].push(el)
        }
        return fecha === monthActual && year === yearActual
      })
    }
    console.log(yearsData);
   useLayoutEffect(()=>{
        if(id){
            getAll({variables:{id:id}})
        }
      },[])
    return(
      
      <View style={{backgroundColor: "#f1f1fb", alignItems:'center'}}>
        <View style={{backgroundColor:"white",marginBottom:20,paddingHorizontal:10, height:50, width:'90%', flexDirection:'row', justifyContent:'space-between', alignItems:'center', borderRadius:10,shadowRadius: 5.46,
        shadowOpacity: 0.3,
        shadowOffset: {
          width: 2,
          height: 2,
          shadowColor: "#000",
        }}}>
            <Pressable onPress={()=> setTiempo('Todo')} style={[Theme.containers.containerTiempo, {backgroundColor:tiempo === 'Todo' ? Theme.colors.primary: null}]}>
            <Text style={[Theme.fonts.descriptionBlue,{color:tiempo === 'Todo' ? 'white': null}]}>Todo</Text>
            </Pressable>
            <Pressable onPress={()=> setTiempo('EsteMes')} style={[Theme.containers.containerTiempo, {backgroundColor:tiempo === 'EsteMes' ?Theme.colors.primary: null}]}>
            <Text style={[Theme.fonts.descriptionBlue,{color:tiempo === 'EsteMes' ? 'white': null}]}>Este Mes</Text>
            </Pressable>
            <Pressable onPress={()=> setTiempo('EsteAño')} style={[Theme.containers.containerTiempo, {backgroundColor:tiempo === 'EsteAño' ? Theme.colors.primary: null}]}>
            <Text style={[Theme.fonts.descriptionBlue,{color:tiempo === 'EsteAño' ? 'white': null}]}>Este Año</Text>
            </Pressable>

        </View>

        {data?.getAllGastos && tiempo === 'Todo' &&
        <ScrollView contentContainerStyle={{flexGrow:1}} style={styles.viewTime}>
        <AllGastos data={data?.getAllGastos}/>
        </ScrollView>
        }

        {data?.getAllGastos && tiempo === 'EsteMes' &&
        <ScrollView contentContainerStyle={{flexGrow:1}} style={styles.viewTime}>
        <MesGastos data={dataMonthActual}/>
        </ScrollView>
        }

        {data?.getAllGastos && tiempo === 'EsteAño' &&
        <ScrollView contentContainerStyle={{flexGrow:1}} style={styles.viewTime}>
          <AñoGastos data={yearsData} />
        </ScrollView>
        }

    {loading && <ActivityIndicator color={Theme.colors.primary}/>}

        </View>
    )
}

const styles = StyleSheet.create({
  viewTime:{
    width:'90%', marginHorizontal:20,shadowOpacity: 0.3,marginBottom:60,
    shadowRadius: 5.46,
    shadowOffset: {
      width: 2,
      height: 2,
      shadowColor: "#000",
    }
  }
})