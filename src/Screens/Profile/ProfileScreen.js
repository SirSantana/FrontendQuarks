import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { View, Text, Pressable, BackHandler, Modal,TouchableOpacity, ScrollView,TextInput, Dimensions, Image, SafeAreaView, Button, Linking, ActivityIndicator } from 'react-native'
import { Colors } from 'react-native-paper'
import EditProfile from '../../Components/Profile/EditProfile'
import Recordatorios from '../../Components/Profile/Recordatorios'
import Sugerencias from '../../Components/Profile/Sugerencias'
import UserInfo from '../../Components/Profile/UserInfo'
import { Feather } from '@expo/vector-icons';

import useAuth from '../../hooks/useAuth'
import { Theme } from '../../theme'
import { Buttons } from '../../Themes/buttons'
import { Containers } from '../../Themes/containers'
import { Images } from '../../Themes/images'
import { Texts } from '../../Themes/text'



export const ProfileScreen = () => {
  const navigation = useNavigation()
  const{user, logout} = useAuth()
  const [loading, setLoading] = useState(true)
  const [visibleEdit, setVisibleEdit] = useState(false)
  const [visibleSugerencia, setVisibleSugerencia] = useState(false)
  
  const handleLogout=()=>{
    AsyncStorage.clear().then(()=> logout())
    navigation.reset({
      index: 0,
      routes: [{ name: 'Profile' }]
 })
  }

  useLayoutEffect(()=>{
    if(user){
      navigation.setOptions({
        headerRight:()=>(
          <Feather onPress={handleLogout} name="log-out" size={24} color="white" />
          
        ),
      })   
    }
      
  },[user])
  return (
    user ?
    <View style={[Containers.containerParent,{height:'100%'}]}>

    <UserInfo user={user}/>

    <TouchableOpacity onPress={()=> setVisibleEdit(true)} style={{width:'90%', height:40,borderRadius:10, backgroundColor:"#b1b1b1", alignItems:'center', justifyContent:'center'}}>
      <Text style={Theme.fonts.description}>Editar Perfil</Text>
    </TouchableOpacity>

    <Modal
       animationType="fade"
       visible={visibleEdit}
       transparent={true}
     >
      <EditProfile user={user} setVisibleEdit={setVisibleEdit}/>
     </Modal>
     <Image onLoadEnd={()=> setLoading(false)} style={{width:'90%', height:'50%'}} source={require('../../../assets/Citydriver.png')}/>
     {loading && <ActivityIndicator color={Colors.primary}/>}


     {/* <Recordatorios name={user?.name}/> */}
      {visibleSugerencia&&
    <Modal
       animationType="fade"
       visible={visibleSugerencia}
       transparent={true}
     >
      <Sugerencias setVisibleSugerencia={setVisibleSugerencia} />
     </Modal>
      }

     <TouchableOpacity onPress={()=> setVisibleSugerencia(true)}  style={{width:'90%', height:40,borderRadius:10, backgroundColor:"#b1b1b1", alignItems:'center', justifyContent:'center'}}>
      <Text style={Theme.fonts.description}>Enviar Sugerencias</Text>
    </TouchableOpacity>
     
    </View>

  :
     <View style={Containers.containerParent}>

     <Image onLoadEnd={()=> setLoading(false)} style={Images.imagePrincipal} source={require('../../../assets/Citydriver.png')}/>
     {loading && <ActivityIndicator color={Colors.primary}/>}
     <Text style={Texts.titleBoldBlue}>Crea tu Perfil Gratis!</Text>
     <Text style={Texts.subtitleRegularGray}>No te demoraras mas de 2 minutos.</Text>

     <Pressable onPress={()=>navigation.navigate('SignUp')} style={[Buttons.primary,{width:'90%', marginTop:'10%'}]}>
      <Text style={Texts.title2RegularWhite}>Registrate</Text>
     </Pressable>

     </View>
    
  )
}
