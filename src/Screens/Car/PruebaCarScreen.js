import { useLayoutEffect, useState, useEffect } from "react";
import { View,Image, ActivityIndicator,Text, Pressable, TouchableOpacity, SafeAreaView, StyleSheet, TextInput, Alert, Modal } from "react-native";
import { marcasCarros } from "../../Components/CarComponents/marcasCarros";
import { marcasMotos } from "../../Components/CarComponents/marcasMotos";
import { Theme } from "../../theme";
import * as ImagePicker from 'expo-image-picker';
import { getFileInfo, isLessThanTheMB } from "../../utils/actions";
import ModalSuccesfull from "../../utils/ModalSuccesfull";
import { gql, useMutation, useQuery } from "@apollo/client";
import { CREATE_CAR, UPDATE_CAR } from "../../graphql/mutations";
import { GET_VEHICLES } from "../../graphql/querys";
import { useNavigation } from "@react-navigation/native";
import useAuth from "../../hooks/useAuth";
import Screen1 from "../../Components/CarComponents/ScreensCreateCar/Screen1";
import Screen2 from "../../Components/CarComponents/ScreensCreateCar/Screen2";
import Screen3 from "../../Components/CarComponents/ScreensCreateCar/Screen3";
import Screen4 from "../../Components/CarComponents/ScreensCreateCar/Screen4";
import Screen5 from "../../Components/CarComponents/ScreensCreateCar/Screens5";


const initialForm ={
    marca:'',
    referencia:'',
    modelo:'',
    tipo:'',
    cilindraje:'',
    imagen:'',
    user:'',
    id:''
  }
export default function PruebaCarScreen(){
    const [loadingImage, setLoadingImage] = useState(true)
    const [screens, setScreens] = useState(1)
    const navigation = useNavigation()
    const [vehiculo, setVehiculo] = useState('Carro')
    const [marca, setMarca] = useState({marca:null, src:null})
    const [form, setForm] = useState(initialForm)
    const [image, setImage] = useState(null)
    const [createVehicule, {data, error, loading}] = useMutation(CREATE_CAR, {refetchQueries:[{query:GET_VEHICLES}]})
    const [visibleSuccesfull, setVisibleSuccesfull] = useState(false)
    const {user} = useAuth()
    
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          quality: 1,
          
          base64:true
        });
        // setForm({...form, binaryImage:binaryImage.data.toString()})
      const fileInfo = await getFileInfo(result.uri)
      if (!fileInfo?.size) {
        alert("Can't select this file as the size is unknown.")
        return
      }
        if (!result.cancelled) {
          const isLt15MB = isLessThanTheMB(fileInfo.size, 2)
            if (!isLt15MB) {
              Alert.alert(`Elige una imagen con un tamaño inferior a 2MB!`)
              return
            }
          setImage(result.uri);
          setForm({...form, imagen:result.base64})
        }
      };
      const handleSubmit=()=>{
          createVehicule({variables:form})
    }
   
    useEffect(()=>{
       if(error){
          Alert.alert('Ha ocurrido un error', error)
      }
    },[error])
          
    useEffect(()=>{
      if(data){
          setVisibleSuccesfull(true)
          setTimeout(()=>{
          setVisibleSuccesfull(false)
          navigation.navigate('Mi Vehiculo',{data:data.createCar})
          },5000)
        }
     },[ data])
    const handleChange=(itemMarca, src)=>{
        setForm({...form, marca:itemMarca})
        setMarca({marca:itemMarca, src:src})
        setScreens(4)
      }
      const crearVehiculo=()=>{
        if(user){
            setScreens(2)
        }else{
            navigation.navigate('Profile')
        }
        setLoadingImage(true)
      }
      const turnLeft =()=>{
        if(screens >1){
            setScreens(screens-1)
        }else{
            navigation.navigate('Mi Vehiculo')
        }
      }
      let logo = vehiculo !== 'Moto'? marcasCarros.find(el=> el.src === marca.src) : marcasMotos.find(el=> el.src === marca.src)
      
      return(
        <SafeAreaView style={{height:'100%', backgroundColor:'#f1f1fb', marginTop:20}}>

            <View style={{height:'20%', padding:20}}>
        {user &&<TouchableOpacity onPress={()=> turnLeft()}><Image   style={{width:30, height:30, margin:0, transform: [{rotate: '270deg'}]}} source={require('../../../assets/iconTriangule.png')}/></TouchableOpacity>}
                
               <Text style={{fontWeight:'700',fontSize:30, color:Theme.colors.secondary,}}>Creando </Text>
               <Text style={{fontWeight:'700',fontSize:30, color:Theme.colors.secondary, lineHeight:30}}>mi Vehiculo </Text>
                <View style={{height:2, width:"50%", backgroundColor:Theme.colors.secondary}}/>

               </View>
               
            {screens === 1 &&<Screen1 crearVehiculo={crearVehiculo}/>}

            {screens === 2 &&<Screen2 setScreens={setScreens} setVehiculo={setVehiculo} setForm={setForm} form={form}/>}
           
            {screens === 3 &&<Screen3 handleChange={handleChange} vehiculo={vehiculo} marca={marca}/>}
            
            {screens === 4 &&<Screen4 setForm={setForm} vehiculo={vehiculo} form={form} logo={logo} setScreens={setScreens}/>}

            {screens === 5 &&<Screen5 pickImage={pickImage} image={image} vehiculo={vehiculo} logo={logo} form={form}/>}

            <View style={{justifyContent:'center', alignItems:'center', flexDirection:'row', width:'100%'}}>
            <Text style={[Theme.fonts.titleRed,{width:'50%', textAlign:'center'}]} onPress={()=>setScreens(screens-1)}>Volver</Text>
            </View>
            {screens === 5
            ?
            <TouchableOpacity onPress={()=> handleSubmit()} style={[Theme.buttons.primary,{width:'90%', marginHorizontal:'5%', marginVertical:10}]}>
            <Text style={{color:'white', fontSize:18, fontWeight:"600"}}>Guardar Vehiculo</Text>

            </TouchableOpacity>
        :
        <View style={{width:'100%',marginVertical:'5%', justifyContent:'center', alignItems:'center',}}>
                <View style={{flexDirection:'row', alignItems:'center' }}>
                    <View style={{width:20, height:20, backgroundColor:screens>=1 ? Theme.colors.primary : 'gray'}}/>
                    <View style={{width:20, height:2,backgroundColor:screens>=1 ? Theme.colors.primary : 'gray'}}/>

                    <View style={{width:20, height:20, backgroundColor:screens>=2 ? Theme.colors.primary : 'gray'}}/>
                    <View style={{width:20, height:2,backgroundColor:screens>=2 ? Theme.colors.primary : 'gray'}}/>
                    
                    <View style={{width:20, height:20, backgroundColor:screens>=3 ? Theme.colors.primary : 'gray'}}/>
                    <View style={{width:20, height:2,backgroundColor:screens>=3 ? Theme.colors.primary : 'gray'}}/>
                    
                    <View style={{width:20, height:20, backgroundColor:screens>=4 ? Theme.colors.primary : 'gray'}}/>
                    <View style={{width:20, height:2,backgroundColor:screens>=4 ? Theme.colors.primary : 'gray'}}/>
                    

                
                </View>

            </View>
        }
         {visibleSuccesfull &&
         <Modal
         animationType="fade"
         visible={visibleSuccesfull}
         transparent={true}

       >
          <ModalSuccesfull text={'Felicidades!'} description={'Vehiculo Creado'}/>
       </Modal>
         }
            
        </SafeAreaView>
    )
}

