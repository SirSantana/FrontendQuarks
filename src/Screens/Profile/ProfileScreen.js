import { gql, useMutation, useQuery } from '@apollo/client'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useNavigation } from '@react-navigation/native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { View, Text, Pressable, BackHandler, Modal,TouchableOpacity, ScrollView,TextInput, Dimensions, Image, SafeAreaView, Button, Linking } from 'react-native'
import { client } from '../../../apollo'
import EditProfile from '../../Components/Profile/EditProfile'
import Recordatorios from '../../Components/Profile/Recordatorios'
import UserInfo from '../../Components/Profile/UserInfo'
import useAuth from '../../hooks/useAuth'
import { Theme } from '../../theme'
import SignInScreen from './SiginScreen'
import { Feather } from '@expo/vector-icons';
import Sugerencias from '../../Components/Profile/Sugerencias'
import { CHANGE_PASSWORD } from '../../graphql/mutations'



export const ProfileScreen = () => {
  const navigation = useNavigation()
  const{user, logout} = useAuth()
  const [visibleEdit, setVisibleEdit] = useState(false)
  const [visibleSugerencia, setVisibleSugerencia] = useState(false)
  // const [changePassword, {data, error,loading}] = useMutation(CHANGE_PASSWORD)

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
    <SafeAreaView style={{flexGrow:1}}>
      {user ?
      <>
      <View style={[Theme.containers.containerParent]}>

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

       <Recordatorios name={user?.name}/>
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

      </>
     :
     <View style={Theme.containers.containerParent}>

     <Image style={{width:'100%', height:'70%', marginBottom:'5%'}} source={require('../../../assets/Citydriver.png')}/>
     <Text style={[Theme.fonts.titleBlue,{width:'90%', textAlign:'center', fontSize:26}]}>Crea tu Perfil Gratis!</Text>
     <Text style={[Theme.fonts.descriptionGray,{width:'90%', marginBottom:20, textAlign:'center'}]}>No te demoraras mas de 2 minutos.</Text>

     <Pressable onPress={()=>navigation.navigate('SignUp')} style={[Theme.buttons.primary,{width:'90%'}]}>
      <Text style={Theme.fonts.titleWhite}>Registrate</Text>
     </Pressable>

     </View>
      
      }
    
      </SafeAreaView>
  )
}
