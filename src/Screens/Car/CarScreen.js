import { View, Text, Image, SafeAreaView, Pressable, FlatList, Dimensions, Alert, TouchableOpacity} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Theme } from '../../theme'
import { useNavigation } from '@react-navigation/native'
import { gql, useLazyQuery, useQuery } from '@apollo/client'
import useAuth from '../../hooks/useAuth'
import { marcasCarros } from '../../Components/CarComponents/marcasCarros'
import Vehiculo from '../../Components/CarComponents/Vehiculo'
import { GET_USER } from '../../Context/AuthContext'
import { GET_VEHICLES } from '../../graphql/querys'
import { ActivityIndicator } from 'react-native-paper'
import PruebaCarScreen from './PruebaCarScreen'



export const CarScreen=() =>{
  
    const navigation = useNavigation()
    const {user} = useAuth()
    const [create, setCreate] = useState(false)
    const {data, error, loading} = useQuery(GET_VEHICLES)

  const handleCreate=()=>{
    if(user){
      return navigation.navigate('Crear Vehiculo')
    }
    else{
      return navigation.navigate('Profile')
    }
  }
  
  return (
      <>
        {loading ? <ActivityIndicator color={Theme.colors.primary}/>
        :  
        data?.getCars?.length>0 && user && !create?
        <SafeAreaView style={[Theme.containers.containerParent,]}>
        <View style={{width:'100%',shadowColor: "#000",
        height:"100%",
        paddingTop:'20%',
        justifyContent:'center',
        alignItems:'center',
        elevation: 40,}}>
      <Text style={Theme.fonts.titleBig}>Hola {user.name}! </Text>
      <Text style={[Theme.fonts.titleBig, { lineHeight:20, marginBottom:"5%", fontSize:20, fontWeight:'600'}]}>Selecciona el Vehiculo</Text>

        <FlatList
        style={{marginLeft:20,shadowOpacity: 0.20,
          shadowRadius: 5.46,shadowOffset: {
            width: 4,
            height: 3,
            shadowColor: "#000"
          },}}
        horizontal
        renderItem={({ item })=>
        <TouchableOpacity onPress={() =>  navigation.navigate('Vehiculo', {item:item})} >
         <Vehiculo item={item}/>
        </TouchableOpacity>
          
      }
        data={data?.getCars}
        />
        <Pressable
            onPress={()=> handleCreate()}
            style={[Theme.buttons.primary,{width:'80%'}]}>
                <Text style={{color:'white', fontSize:18, fontWeight:"600"}}>Crear otro Vehiculo</Text>
        </Pressable>
        </View>
        </SafeAreaView>
     :
     <PruebaCarScreen/>
    //   <>
    //       <Image onLoadEnd={()=> setLoadingImage(false)} style={{width:'90%', height:'50%', marginBottom:20}} source={require('../../../assets/CarBack.png')}/>
    //       {loadingImage && <ActivityIndicator color={Theme.colors.primary}/>}

    //     <Text style={[Theme.fonts.titleBlue,{width:'90%', textAlign:'center', fontSize:26}]}>Crea tu Vehiculo</Text>
    // <Text style={[Theme.fonts.descriptionGray]}>Y empieza a llevar tus gastos!</Text>
    // <Text style={[Theme.fonts.descriptionGray]}>Elige tu tipo de Vehiculo, Carro o Moto</Text>


    //   <View style={{  flexDirection:'row', justifyContent:'space-between', width:'60%', marginTop:20}}>
    //       <TouchableOpacity onPress={()=>handleCreate('Carro')} style={Theme.containers.containerBox}>
    //       <Image style={{width:80, height:80}} source={require('../../../assets/carroBlanco.png')}/>
    //       </TouchableOpacity>

    //       {/* <TouchableOpacity onPress={()=>handleCreate("Moto")}style={Theme.containers.containerBox}>
    //       <Image style={{width:80, height:80}} source={require('../../../assets/motoBlanca.png')}/>
    //       </TouchableOpacity> */}
          
    //   </View>
    //   {data?.getCars?.length>0 && user &&
    //       <Pressable onPress={()=> setCreate(false)} style={[Theme.buttons.primary,{width:'90%', marginTop:20}]}>
    //             <Text style={Theme.fonts.titleWhite}>Ver mis Vehiculos</Text>
    //         </Pressable>}
    // </>
      }
        
        </>
    
  )
}