import { View, Text, Image, SafeAreaView, Pressable, FlatList, Dimensions, Alert, TouchableOpacity,ActivityIndicator} from 'react-native'
import React, { useEffect, useState } from 'react'
import { Theme } from '../../theme'
import { useNavigation } from '@react-navigation/native'
import { gql, useLazyQuery, useQuery } from '@apollo/client'
import useAuth from '../../hooks/useAuth'
import { marcasCarros } from '../../Components/CarComponents/marcasCarros'
import Vehiculo from '../../Components/CarComponents/Vehiculo'
import { GET_USER } from '../../Context/AuthContext'
import { GET_VEHICLES } from '../../graphql/querys'
import PruebaCarScreen from './PruebaCarScreen'
import { Images } from '../../Themes/images'
import { Containers } from '../../Themes/containers'
import { Texts } from '../../Themes/text'
import { Buttons } from '../../Themes/buttons'
import { Colors } from '../../Themes/colors'



export const CarScreen=() =>{
  
    const navigation = useNavigation()
    const {user} = useAuth()
    const [loadingFoto, setLoading] = useState(true)
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
      :data?.getCars?.length>0 && user ?
<View style={Containers.containerParent}>
        <View style={{shadowColor: "#000",
        paddingTop:'20%',
        height:'85%',
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
        <TouchableOpacity onPress={() =>  navigation.navigate('Vehiculos', {item:item})} >
         <Vehiculo item={item}/>
        </TouchableOpacity>
          
      }
        data={data?.getCars}
        />
        
        </View>
        <Pressable
            onPress={()=> handleCreate()}
            style={[Buttons.primary,{width:'90%'}]}>
                <Text style={Texts.title2RegularWhite}>Crear otro Vehiculo</Text>
        </Pressable>
        </View>
    :
        <View style={Containers.containerParent}>

<Image onLoadEnd={()=> setLoading(false)} style={Images.imagePrincipal} source={require('../../../assets/CarBack.png')}/>
{loadingFoto && <ActivityIndicator color={Colors.primary}/>}

<Text style={Texts.titleBoldBlue}>Crea tú Vehículo!</Text>
<Text style={Texts.subtitleRegularGray}>Y empieza a llevar tus gastos</Text>

<Pressable onPress={()=> handleCreate()} style={[Buttons.primary,{width:'90%',marginTop:'10%'}]}>
 <Text style={Texts.title2RegularWhite}>Crear mi Vehículo</Text>
</Pressable>

</View>
}
        </>
        
    
  )
}