
import {View, Text, TextInput, Pressable, Image, Alert, Modal, ScrollView, TouchableOpacity} from 'react-native'
import { useMutation, gql } from '@apollo/client'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useFormik } from 'formik'
import * as Yup  from 'yup'
import { Theme } from '../../theme'
import { useNavigation } from '@react-navigation/native'
import useAuth from '../../hooks/useAuth';
import GET_USER from '../../Context/AuthContext'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ModalCargando from '../../utils/ModalCargando';
import {useEffect, useState} from 'react'
import { client } from '../../../apollo';
import { SIGN_IN_MUTATION } from '../../graphql/mutations';
import { MaterialIcons } from '@expo/vector-icons';
import { Buttons } from '../../Themes/buttons';
import { Texts } from '../../Themes/text';
import { Containers } from '../../Themes/containers';
import { Inputs } from '../../Themes/inputs';
import { Colors } from '../../Themes/colors';

const initialForm = {
  email:'',
  password:''
}
const validationSchema ={
  email: Yup.string().required('Debes colocar un email').email('Debe ser un Email Valido'),
  password: Yup.string().required('Debes colocar una password')

}
export default function SignInScreen(){
  const navigation = useNavigation()
  const {login} = useAuth()
  const [visiblePassword, setVisiblePassword] = useState(false)
  const [signIn, {data, error, loading}] = useMutation(SIGN_IN_MUTATION, {refetchQueries:[{query:GET_USER}]})

    const formik = useFormik({
        initialValues:initialForm,
      validateOnChange:false,
      validationSchema:Yup.object(validationSchema),
      onSubmit:(formValue)=>{
        signIn({variables:formValue})
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
        login(data?.signIn.user)
          AsyncStorage.setItem('token',JSON.stringify(data.signIn.token)).then(()=> navigation.navigate('Perfil'))
      }
    },[data])
    return(
      <ScrollView contentContainerStyle={{flexGrow: 1}}
  keyboardShouldPersistTaps='handled' >
        <View style={Containers.containerParent}>
          <Image style={{width:40, height:40}} source={require('../../../assets/LogoQuarks1PNG.png')}/>
          <Text style={Texts.titleBoldRed}>Inicia Sesion</Text>

          <View style={{width:'90%', marginTop:'5%'}}>

          {formik.errors.email && <Text style={{color:'red'}}>{formik.errors.email}</Text>}
            <TextInput
            autoCapitalize='none'
            placeholder='Correo'
            value={formik.values.email}
            onChangeText={(text)=> formik.setFieldValue('email', text)}
            style={Inputs.basic}
            

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
          <MaterialIcons onPress={()=> setVisiblePassword(false)} name="visibility" size={24} color={Colors.secondary} />
          :
          <MaterialIcons onPress={()=> setVisiblePassword(true)} name="visibility-off" size={24} color={Colors.secondary} />

        }
          </View>
            
            <TouchableOpacity
            onPress={formik.handleSubmit}
            disabled={loading}
            style={Buttons.primary}>
                <Text style={Texts.title2RegularWhite}>Iniciar Sesion</Text>
            </TouchableOpacity>
            <TouchableOpacity
            disabled={loading}
            onPress={()=> navigation.navigate('SignUp')}
            style={Buttons.withoutBorder}>
                <Text style={Texts.title2RegularRed}>No tienes una cuenta? Registrate</Text>
            </TouchableOpacity>
            
                <Text onPress={()=> navigation.navigate('ForgotPassword')} style={{color:'#1b333d', fontSize:16, fontWeight:"600", textAlign:'center'}}>Olvidaste tu contraseña?</Text>
          </View>
            
          {loading &&
         <Modal
         animationType="fade"
         visible={loading}
         transparent={true}

       >
          <ModalCargando text='Ingresando...'/>
       </Modal>
         }
        </View>
        </ScrollView>
    )
}