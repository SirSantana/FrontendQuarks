import React, { useEffect, useState } from 'react'
import { Theme } from '../../theme'
import {View, Text, TextInput, Pressable, Image, Alert, Modal, Dimensions, TouchableOpacity} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import * as Yup  from 'yup'
import { useFormik } from 'formik'
import { gql, useMutation } from '@apollo/client'
import AsyncStorage from '@react-native-async-storage/async-storage'
import useAuth from '../../hooks/useAuth'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ModalCargando from '../../utils/ModalCargando'
import { client } from '../../../apollo'
import { SIGN_UP } from '../../graphql/mutations'
import { MaterialIcons } from '@expo/vector-icons';
import { Buttons } from '../../Themes/buttons'
import { Texts } from '../../Themes/text'
import { Containers } from '../../Themes/containers'
import { Inputs } from '../../Themes/inputs'



const initialForm = {
  name:'',
  apellido:'',
  email:'',
  password:'',
  confirmPassword:'',

}
const validationSchema ={
  name:Yup.string().required('Debes colocar un nombre'),
  apellido:Yup.string().required('Debes colocar un apellido'),
  email: Yup.string().required('Debes colocar un email').email('Debe ser un email valido'),
  password: Yup.string().required('Debes colocar una password').min(6, 'Debe tener minimo 6 caracteres'),
  confirmPassword:Yup.string()
  .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir'),

}

export const SignUpScreen = () => {
  const [signUp, {data, error, loading}] = useMutation(SIGN_UP)
  const [visiblePassword, setVisiblePassword] = useState(false)


  const {login} = useAuth()
  const navigation = useNavigation()
  const formik = useFormik({
    initialValues:initialForm,
    validateOnChange:false,
    validationSchema:Yup.object(validationSchema),
    onSubmit:(formValue)=>{
    signUp({variables:formValue})
  },

})
useEffect(()=>{
  if(error){
      if(error?.message === 'Network request failed'){
        Alert.alert('Ha ocurrido un error', 'Revisa tu conexion a internet')
      }else{
        Alert.alert('Ha ocurrido un error',error?.message)
      }
    }
},[error])


useEffect(()=>{
  if(data){
    client.resetStore()
    AsyncStorage.setItem('token',JSON.stringify(data.signUp.token)).then(()=>navigation.navigate('Perfil'))
    login(data?.signUp?.user)
  }
},[data])

    return(
      <KeyboardAwareScrollView 
      contentContainerStyle={{flexGrow: 1}}>
        <View style={Containers.containerParent}>
          <Image style={{width:40, height:40}} source={require('../../../assets/LogoQuarks1PNG.png')}/>
          <Text style={Texts.titleBoldRed}>Registrate</Text>

          <View style={{width:'90%', marginTop:'5%'}}>

          {formik.errors.name && <Text style={{color:'red'}}>{formik.errors.name}</Text>}

          <TextInput
          value={formik.values.name}
            placeholder='Nombre'
            style={Inputs.basic}
            onChangeText={(text)=> formik.setFieldValue('name', text)}
            maxLength={15}

            />
            
          {formik.errors.apellido && <Text style={{color:'red'}}>{formik.errors.apellido}</Text>}
            <TextInput
          value={formik.values.apellido}
            placeholder='Apellido'
            maxLength={15}

            style={Inputs.basic}
            onChangeText={(text)=> formik.setFieldValue('apellido', text)}
            />
          {formik.errors.email && <Text style={{color:'red'}}>{formik.errors.email}</Text>}
            
            <TextInput
            autoCapitalize='none'
          value={formik.values.email}
            placeholder='Email'
            style={Inputs.basic}
            onChangeText={(text)=> formik.setFieldValue('email', text)}
            />
          {formik.errors.password && <Text style={{color:'red'}}>{formik.errors.password}</Text>}
          <View style={Containers.containerInputPassword}>
          <TextInput
            placeholder='Contraseña'
            value={formik.values.password}
            onChangeText={(text)=> formik.setFieldValue('password', text)}
            secureTextEntry={visiblePassword ? false:true}
            style={Inputs.password}
           
            />
            {visiblePassword ? 
          <MaterialIcons onPress={()=> setVisiblePassword(false)} name="visibility" size={24} color={Theme.colors.secondary} />
          :
          <MaterialIcons onPress={()=> setVisiblePassword(true)} name="visibility-off" size={24} color={Theme.colors.secondary} />

        }
          </View>

            
          {formik.errors.confirmPassword && <Text style={{color:'red'}}>{formik.errors.confirmPassword}</Text>}
          <View style={Containers.containerInputPassword}>
          <TextInput
            placeholder='Confirmar Contraseña'
            value={formik.values.confirmPassword}
            onChangeText={(text)=> formik.setFieldValue('confirmPassword', text)}
            secureTextEntry={visiblePassword ? false:true}
            style={Inputs.password}
           
            />
            {visiblePassword ? 
          <MaterialIcons onPress={()=> setVisiblePassword(false)} name="visibility" size={24} color={Theme.colors.secondary} />
          :
          <MaterialIcons onPress={()=> setVisiblePassword(true)} name="visibility-off" size={24} color={Theme.colors.secondary} />

        }
          </View>
            
            <TouchableOpacity
            onPress={formik.handleSubmit}
            style={[Buttons.primary,{width:'100%'}]}>
                <Text style={Texts.title2RegularWhite}>Registrate</Text>
            </TouchableOpacity>
            <TouchableOpacity
            onPress={()=> navigation.navigate('SignIn')}
            style={Buttons.withoutBorder}>
                <Text style={Texts.title2RegularRed}>Ya tienes una cuenta? Inicia Sesion</Text>
            </TouchableOpacity>
          </View>
            
          {loading &&
         <Modal
         animationType="fade"
         visible={loading}
         transparent={true}

       >
          <ModalCargando text='Registrando...'/>
       </Modal>
         }
        </View>
        </KeyboardAwareScrollView>
    )
}
