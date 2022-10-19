import { useMutation } from "@apollo/client";
import { useEffect, useState } from "react";
import { SafeAreaView, TouchableOpacity, View, Image, Text, TextInput, Alert, Modal } from "react-native";
import { CHANGE_PASSWORD, SEND_MESSAGE_PASSWORD } from "../../graphql/mutations";
import { Theme } from "../../theme";
import ModalCargando from "../../utils/ModalCargando";
import { MaterialIcons } from '@expo/vector-icons';
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";

const initialForm={
    password:'',
    confirmPassword:''
}

export default function ForgotPasswordScreen(){
    const [email, setEmail] = useState('')
    const [sendCheck, setSendCheck] = useState(false)
    const [ sendMessagePassword,{loading, data, error}] = useMutation(SEND_MESSAGE_PASSWORD)
    const [ changePassword,result] = useMutation(CHANGE_PASSWORD)
    const navigation = useNavigation()

    const [errorMail, setErrorMail] = useState(false)
    const [codigo, setCodigo] = useState(Math.floor(1000 + Math.random() * 9000))
    const [visibleChange, setVisibleChange] = useState(false)
    const [numero1, setNumero1] = useState('')
    const [numero2, setNumero2] = useState('')
    const [numero3, setNumero3] = useState('')
    const [numero4, setNumero4] = useState('')
    const [changePassword1, setChangePassword1] = useState(initialForm)
  const [visiblePassword, setVisiblePassword] = useState(false)

    const code = []

    const sendEmail=()=>{
        if(email.match(/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/)){
            if(codigo !== null){

                sendMessagePassword({variables:{email:email, codigo:codigo}})
                setSendCheck(true)
            }
            
        }else{
            setErrorMail('Digita un correo valido')
            setEmail('')

        }
    }
    useEffect(()=>{
        if(error){
            Alert.alert(error?.message)
        }
    },[error])
    useEffect(()=>{
        if(result?.error){
            Alert.alert(result?.error?.message)
        }
    },[result.error])

    useEffect(()=>{
        if(data?.sendMessagePassword){
            Alert.alert('Mensaje Enviado')

        }
    },[data])
    useEffect(()=>{
        if(result?.data){
            Alert.alert('Contraseña Actualizada')
            navigation.navigate('SignIn')
        }
    },[result?.data])
    
    const verify =()=>{
        code.push(numero1)
        code.push(numero2)
        code.push(numero3)
        code.push(numero4)

        if(code.toString().replace(/,/g, "") == codigo){
            setVisibleChange(true)
            console.log('doce',code);
        }else{
            Alert.alert('Codigo invalido')
            
        }
    }

    const resetPassword=()=>{
        if(changePassword1.password.length <6){
            Alert.alert('La contraseña debe tener minimo 6 caracteres')
        }else{
            changePassword({variables:{email:email,confirmPassword:changePassword1.confirmPassword, password:changePassword1.password}})
        }
    }

    return(
        <KeyboardAwareScrollView contentContainerStyle={{flexGrow:1}}>
        {!sendCheck ?
        <View style={[Theme.containers.containerParent,]}>
        <Image style={{width:40, height:40}} source={require('../../../assets/LogoQuarks1PNG.png')}/>
          <Text style={{fontSize:30, fontWeight:"700", color:'#f50057' }}>Cambia tu contraseña</Text>
          <Text style={Theme.fonts.descriptionBlue}>Te enviaremos un codigo a tu correo</Text>
         
         <View style={{marginVertical:20,width:'100%', justifyContent:'center', alignItems:'center'}}>
         
         {errorMail && <Text style={{color:'red'}}>{errorMail}</Text>}
            <TextInput
            autoCapitalize='none'
            placeholder='tucorreo@gmail.com'
            style={[Theme.input.basic,{width:'90%'}]}
            onChangeText={(text)=> setEmail(text.trim())}
            />
         </View>
         <TouchableOpacity
         disabled={loading  || !email}
         onPress={()=>sendEmail()}
            style={{width:'90%',backgroundColor:email !== '' || loading ? Theme.colors.primary: 'gray', height:50, borderRadius:10,justifyContent:'center', alignItems:'center'}}>
                <Text style={{color:'white', fontSize:18, fontWeight:"600"}}>Enviar correo</Text>
        </TouchableOpacity>
        </View>
    :
            <View style={[Theme.containers.containerParent,]}>
                <Text style={Theme.fonts.descriptionBlue}>Digita el codigo que hemos enviado a tu correo</Text>
                <View style={{width:'100%', alignItems:'center', marginVertical:10,justifyContent:'center', flexDirection:'row'}}>
                <TextInput
                onChangeText={(text)=>setNumero1(text)}
                        maxLength={1} keyboardType='numeric'
                        style={Theme.input.inputCode}
            />
             <TextInput
             onChangeText={(text)=>setNumero2(text)}
            maxLength={1} keyboardType='numeric'
            style={Theme.input.inputCode}
            />
             <TextInput
             onChangeText={(text)=>setNumero3(text)}
           maxLength={1} keyboardType='numeric'
           style={Theme.input.inputCode}
            />
             <TextInput
             onChangeText={(text)=>setNumero4(text)}
           maxLength={1} keyboardType='numeric'
            style={Theme.input.inputCode}
            />
                </View>
                <TouchableOpacity
                
                disabled={visibleChange}
                onPress={()=> verify()}
            style={{width:'90%',backgroundColor:visibleChange?'gray':Theme.colors.primary, height:50, borderRadius:10,justifyContent:'center', alignItems:'center'}}>
                <Text style={{color:'white', fontSize:18, fontWeight:"600"}}>Verificar</Text>
        </TouchableOpacity>
        
            {visibleChange &&
            <>
                <Text style={{color:Theme.colors.primary, fontSize:18, fontWeight:"600", marginTop:20}}>Perfecto, ya puedes cambiar tu contraseña</Text>

        <View style={[Theme.containers.containerInputPassword,{maxHeight:50,width:'90%',marginTop:20}]}>
          <TextInput
          onChangeText={(text)=> setChangePassword1({...changePassword1, password:text})}
            placeholder=' Contraseña'
            secureTextEntry={visiblePassword ? false:true}
            style={[Theme.input.inputPassword,{height:50}]}
           
            />
            {visiblePassword ? 
          <MaterialIcons onPress={()=> setVisiblePassword(false)} name="visibility" size={24} color={Theme.colors.secondary} />
          :
          <MaterialIcons onPress={()=> setVisiblePassword(true)} name="visibility-off" size={24} color={Theme.colors.secondary} />

        }
            </View>
            <View style={[Theme.containers.containerInputPassword,{maxHeight:50, width:'90%'}]}>
          <TextInput
          onChangeText={(text)=> setChangePassword1({...changePassword1, confirmPassword:text})}
            placeholder='Confirmar Contraseña'
            secureTextEntry={visiblePassword ? false:true}
            style={[Theme.input.inputPassword,{height:50}]}

           
            />
            {visiblePassword ? 
          <MaterialIcons onPress={()=> setVisiblePassword(false)} name="visibility" size={24} color={Theme.colors.secondary} />
          :
          <MaterialIcons onPress={()=> setVisiblePassword(true)} name="visibility-off" size={24} color={Theme.colors.secondary} />

        }
            </View>
            <TouchableOpacity
            disabled={result?.loading || changePassword1.password === '' || changePassword1.confirmPassword==='' || changePassword1.confirmPassword !== changePassword1.password}
                onPress={()=> resetPassword()}
            style={{width:'90%',backgroundColor:changePassword1.password !== '' && changePassword1.confirmPassword!==''  && changePassword1.confirmPassword === changePassword1.password
            ? Theme.colors.primary: 'gray', height:50, borderRadius:10,justifyContent:'center', alignItems:'center'}}>
                <Text style={{color:'white', fontSize:18, fontWeight:"600"}}>Cambiar Contraseña</Text>
        </TouchableOpacity>
            </> 
            
            
            }


            </View>}
        
        {loading &&
         <Modal
         animationType="fade"
         visible={loading}
         transparent={true}

       >
          <ModalCargando text='Verificando...'/>
       </Modal>
         }
         {result?.loading &&
         <Modal
         animationType="fade"
         visible={result?.loading}
         transparent={true}

       >
          <ModalCargando text='Guardando Cambios...'/>
       </Modal>
         }
        </KeyboardAwareScrollView>
      
    )
}