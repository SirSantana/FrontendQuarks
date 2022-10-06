
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useState } from 'react';
import {Text, View, Pressable, Image, FlatList} from 'react-native'
import { Theme } from '../../theme'
import ModalDetailsGasto from './ModalDetailsGasto';


export default function GastosIndividuales({tipos, setIdItem, setModalVisible}){
    let tipoGastos = ['Mantenimiento', 'Parqueadero', 'Tanqueada', 'Repuestos', 'Lavada']
   
    const handleDetails = (id)=>{
        setIdItem(id)
        setModalVisible(true)
    }
    
    return(
        <>
        {tipoGastos.map(item=>{
            let tipoGasto;
            if(item === 'Tanqueada'){tipoGasto = 'fuel'}
            if(item=== 'Parqueadero'){tipoGasto = 'car-brake-parking'}
            if(item === 'Lavada'){tipoGasto = 'local-car-wash'}
            if(item === 'Repuestos'){tipoGasto = 'car-wrench'}
            if(item === 'Mantenimiento'){tipoGasto = 'car-repair'}
            return(
                <View key={item.id} style={{backgroundColor:'white', borderRadius:10,marginVertical:10, padding:10,width:'100%',}}>
    
          <View style={{justifyContent:'space-between', alignItems:'center',  flexDirection:'row'}}>
          <View style={{flexDirection:'row', alignItems:'center'}}>
          {tipoGasto === 'fuel' || tipoGasto === 'car-brake-parking' || tipoGasto === "car-wrench"?
               <MaterialCommunityIcons name={tipoGasto} size={32} color={Theme.colors.secondary}  />
              : <MaterialIcons name={tipoGasto} size={32} color={Theme.colors.secondary} />}
          <Text style={[Theme.fonts.descriptionBlue,{marginLeft:10}]}>{item}</Text>
          </View>
          <View style={{flexDirection:'row', alignItems:'center'}}>
          <Image style={{width:20,marginLeft:10, height:20}} source={require('../../../assets/iconTriangule.png')}/>
          {/* <Text style={Theme.fonts.descriptionRed}>$ {totalGastos.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</Text> */}
          </View>
          </View>
          <View style={{height:1, backgroundColor:Theme.colors.secondary, marginVertical:5}}/>
          
          {tipos[item].map(el=>{
               let fecha = new Date(el.fecha).toLocaleDateString()
               return(
                 <Pressable key={el.id} onPress={()=> handleDetails(el.id)}  style={{flexDirection:'row',justifyContent:'space-between', alignItems:'center'}}>
                     <View style={{flexDirection:'row', alignItems:'center'}}>
                     <MaterialCommunityIcons name="file-eye-outline" size={24} color="black" style={{marginRight:5}} />
                     <Text>{fecha}</Text>
                     </View>
                     <Text style={Theme.fonts.descriptionRed}>$ {el.dineroGastado.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</Text>
                 </Pressable>     
               )
          })}
          </View>
    
            )
        })}
        </>
    )
}