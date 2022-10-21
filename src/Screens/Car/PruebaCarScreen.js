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
export default function PruebaCarScreen(vehiculos){
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
        {user &&<TouchableOpacity onPress={()=> turnLeft()}><Image   style={{width:20, height:20, margin:0, transform: [{rotate: '270deg'}]}} source={require('../../../assets/iconTriangule.png')}/></TouchableOpacity>}
                
               <Text style={{fontWeight:'700',fontSize:30, color:Theme.colors.secondary,}}>Creando </Text>
               <Text style={{fontWeight:'700',fontSize:30, color:Theme.colors.secondary, lineHeight:30}}>mi Vehiculo </Text>
                <View style={{height:2, width:"50%", backgroundColor:Theme.colors.secondary}}/>

               </View>
            {
            screens === 1 &&
            <View style={Theme.containers.containerParent}>
            <Image onLoadEnd={()=> setLoadingImage(false)} style={{width:'100%', height:'30%'}} source={require('../../../assets/CarBack.png')}/>
          {loadingImage && <ActivityIndicator color={Theme.colors.secondary}/>}

        <Text style={[Theme.fonts.titleBlue,{width:'90%', textAlign:'center', fontSize:26}]}>Crea tu Vehiculo</Text>
        <Text style={[Theme.fonts.descriptionGray]}>Y empieza a llevar tus gastos!</Text>


        <TouchableOpacity onPress={()=>crearVehiculo() } style={[Theme.buttons.primary,{width:'90%', marginTop:20}]}>
        <Text style={Theme.fonts.titleWhite}>Crear mi Vehiculo</Text>

        </TouchableOpacity>
            </View>
            }


            {
               screens ===2 &&
               <View style={{height:'60%'}}>
               
               <Text style={[Theme.fonts.titleBlue, {textAlign:'center', marginVertical:'5%'}]}>Selecciona el tipo de Vehiculo</Text>

                <TouchableOpacity onPress={()=> {setScreens(3),setVehiculo('Carro'), setForm({...form, tipo:'Carro'})}} style={[styles.containerViewTipo,{marginLeft:0,borderTopRightRadius:20,borderBottomRightRadius:20,borderTopLeftRadius:0,borderBottomLeftRadius:0,}]}>
            <Image onLoadEnd={()=> setLoadingImage(false)} style={{width:200, height:100,resizeMode:'contain'}} source={require('../../../assets/Carro.png')}/>
            {loadingImage && <ActivityIndicator color={Theme.colors.secondary}/>}
            <Text style={[Theme.fonts.titleWhite]}>Carro</Text>

                </TouchableOpacity>
                <TouchableOpacity onPress={()=> {setScreens(3),setVehiculo('Moto'),setForm({...form, tipo:'Moto'})}} style={styles.containerViewTipo}>
                <Text style={[Theme.fonts.titleWhite]}>Moto</Text>
            
            <Image onLoadEnd={()=> setLoadingImage(false)} style={{width:200, height:100,resizeMode:'contain'}} source={require('../../../assets/Moto.png')}/>
            {loadingImage && <ActivityIndicator color={Theme.colors.secondary}/>}

                </TouchableOpacity>
               </View>
            }
            {screens === 3 &&
            <View style={{height:'60%'}}>
                <View style={{elevation:5, justifyContent:'center', alignItems:'center',}}>
            <Image onLoadEnd={()=> setLoadingImage(false)} style={{width:200, height:100,resizeMode:'contain'}} source={vehiculo=== 'Carro' ? require(`../../../assets/Carro.png`):require(`../../../assets/Moto.png`)}/>
                </View>
               <Text style={[Theme.fonts.titleBlue, {textAlign:'center', marginVertical:'5%'}]}>Selecciona la marca de tu Vehiculo</Text>
                <View style={{flexDirection:'row', flexWrap:'wrap', justifyContent:'center'}}>
                {vehiculo === 'Carro' ?
            marcasCarros.map(el=>(
                <TouchableOpacity key={el.marca} onPressOut={()=>handleChange(el.marca, el.src)} style={{width:60, height:60, margin:10, backgroundColor:marca === el.marca ? '#1b333d': 'white',justifyContent:'center', alignItems:'center', borderRadius:10}}>
                <Image style={{width:40, height:40}} source={el.src}/>
                </TouchableOpacity>
            ))    
            :
            marcasMotos.map(el=>(
                <TouchableOpacity key={el.marca} onPressOut={()=>handleChange(el.marca, el.src)} style={{width:60, height:60, margin:10, backgroundColor:marca === el.marca ? '#1b333d': 'white',justifyContent:'center', alignItems:'center', borderRadius:10}}>
                <Image style={{width:40, height:40}} source={el.src}/>
                </TouchableOpacity>
            ))
            }
                </View>
            </View>
            
            }
            {
                screens=== 4 &&

                <View style={{height:'60%', alignItems:'center'}}>
            <View style={{elevation:5,flexDirection:'row', justifyContent:'center', alignItems:'center',}}>
                <Image onLoadEnd={()=> setLoadingImage(false)} style={{width:200, height:100,resizeMode:'contain'}} source={vehiculo=== 'Carro' ? require(`../../../assets/Carro.png`):require(`../../../assets/Moto.png`)}/>
                <Image style={{width:50, height:50}} source={logo?.src}/>
                
                </View>
                <Text style={[Theme.fonts.titleBlue,{ marginTop:'10%'}]}>Agrega la Referencia</Text>
      
      <TextInput
            // placeholder={itemData && itemData?.marca }
            onChangeText={(text)=> setForm({...form, referencia:text})}
            style={[Theme.input.basic,{width:"90%",marginVertical:'5%'}]}
            maxLength={20}
                value={form.referencia}
            />
            <TouchableOpacity  onPress={()=>setScreens(5)} disabled={form.referencia.length<2 ? true: false} style={[Theme.buttons.primary,{width:'50%', marginTop:20, backgroundColor:form.referencia != ''? Theme.colors.primary:'gray'}]}>
        <Text style={Theme.fonts.titleWhite}>Siguiente</Text>

        </TouchableOpacity>
                </View>
            }

{
                screens=== 5 &&

                <View style={{ alignItems:'center', height:'55%',marginBottom:'5%'}}>
            <View style={{width:'90%',backgroundColor:'white',height:'100%', alignItems:'center', borderRadius:20}}>
            <Image style={{width:50, height:50}} source={logo?.src}/>
            <TouchableOpacity onPress={pickImage} underlayColor={'rgba(0,0,0,0)'} style={{width:'100%', height:'60%'}}>
                {image ? <Image source={{ uri: image }} style={{width:'100%', height:'100%',resizeMode:'contain' }} />
                :<Image  onLoadEnd={()=> setLoadingImage(false)} style={{width:'100%', height:'100%',resizeMode:'contain'}} source={vehiculo=== 'Carro' ? require(`../../../assets/Carro.png`):require(`../../../assets/Moto.png`)}/>
                }
                </TouchableOpacity>
            
            <View style={{ alignItems:"center", }}>
            <Text style={[Theme.fonts.titleBlue,{fontSize:40,flexWrap:'wrap', margin:0, textAlign:'left'}]}>{form.referencia}</Text>
            <Text onPress={()=> image?setImage(null): pickImage()} style={[Theme.fonts.descriptionRed]}>{image?"Eliminar foto":"Agregar una foto de tu vehiculo"}</Text>


            </View>
                
                </View>
                </View>
            }

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

const styles = StyleSheet.create({
    containerViewTipo:{
        backgroundColor:Theme.colors.primary,marginVertical:'5%',shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        flexDirection:'row',
        justifyContent:'center',
        alignItems:'center', 
        width:'70%',
        marginLeft:'30%',
         borderTopLeftRadius:20,
          borderBottomLeftRadius:20,
    }
})