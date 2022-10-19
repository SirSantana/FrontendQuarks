import { useState } from "react";
import { View,Image, ActivityIndicator,Text, Pressable, TouchableOpacity, SafeAreaView, StyleSheet, TextInput } from "react-native";
import { marcasCarros } from "../../Components/CarComponents/marcasCarros";
import { marcasMotos } from "../../Components/CarComponents/marcasMotos";
import { Theme } from "../../theme";


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
    const [vehiculo, setVehiculo] = useState('Carro1')
    const [marca, setMarca] = useState({marca:null, src:null})

    const [form, setForm] = useState(initialForm)

    const handleChange=(itemMarca, src)=>{
        setForm({...form, marca:itemMarca})
        setMarca({marca:itemMarca, src:src})
        setScreens(4)
      }
      let logo = vehiculo !== 'Moto'? marcasCarros.find(el=> el.src === marca.src) : marcasMotos.find(el=> el.src === marca.src)
      return(
        <SafeAreaView style={{height:'100%', backgroundColor:'#f1f1fb', marginTop:20}}>
            <View style={{height:'20%', padding:20}}>
               <Text style={{fontWeight:'700',fontSize:30, color:Theme.colors.secondary,}}>Creando </Text>
               <Text style={{fontWeight:'700',fontSize:30, color:Theme.colors.secondary, lineHeight:30}}>mi Vehiculo </Text>
                <View style={{height:2, width:"50%", backgroundColor:Theme.colors.secondary}}/>
                <Text style={[Theme.fonts.descriptionGray]}>Tipo de Vehiculo</Text>

               </View>
            {
            screens === 1 &&
            <View style={Theme.containers.containerParent}>
            <Image onLoadEnd={()=> setLoadingImage(false)} style={{width:'100%', height:'30%'}} source={require('../../../assets/CarBack.png')}/>
          {loadingImage && <ActivityIndicator color={Theme.colors.secondary}/>}

        <Text style={[Theme.fonts.titleBlue,{width:'90%', textAlign:'center', fontSize:26}]}>Crea tu Vehiculo</Text>
        <Text style={[Theme.fonts.descriptionGray]}>Y empieza a llevar tus gastos!</Text>

        <TouchableOpacity onPress={()=> {setScreens(2),setLoadingImage(true)}} style={[Theme.buttons.primary,{width:'90%', marginTop:20}]}>
        <Text style={Theme.fonts.titleWhite}>Crear mi Vehiculo</Text>

        </TouchableOpacity>
            </View>
            }


            {
               screens ===2 &&
               <View style={{height:'60%'}}>
               
               <Text style={[Theme.fonts.titleBlue, {textAlign:'center', marginVertical:'5%'}]}>Selecciona el tipo de Vehiculo</Text>

                <TouchableOpacity onPress={()=> {setScreens(3),setVehiculo('Carro1')}} style={[styles.containerViewTipo,{marginLeft:0,borderTopRightRadius:20,borderBottomRightRadius:20,borderTopLeftRadius:0,borderBottomLeftRadius:0,}]}>
            <Image onLoadEnd={()=> setLoadingImage(false)} style={{width:200, height:100,resizeMode:'contain'}} source={require('../../../assets/Carro1.png')}/>
            {loadingImage && <ActivityIndicator color={Theme.colors.secondary}/>}
            <Text style={[Theme.fonts.titleWhite]}>Carro</Text>

                </TouchableOpacity>
                <TouchableOpacity onPress={()=> {setScreens(3),setVehiculo('Moto')}} style={styles.containerViewTipo}>
                <Text style={[Theme.fonts.titleWhite]}>Moto</Text>
            
            <Image onLoadEnd={()=> setLoadingImage(false)} style={{width:200, height:100,resizeMode:'contain'}} source={require('../../../assets/Moto.png')}/>
            {loadingImage && <ActivityIndicator color={Theme.colors.secondary}/>}

                </TouchableOpacity>
               </View>
            }
            {screens === 3 &&
            <View style={{height:'60%'}}>
                <View style={{elevation:5, justifyContent:'center', alignItems:'center',}}>
            <Image onLoadEnd={()=> setLoadingImage(false)} style={{width:200, height:100,resizeMode:'contain'}} source={vehiculo=== 'Carro1' ? require(`../../../assets/Carro1.png`):require(`../../../assets/Moto.png`)}/>
                </View>
               <Text style={[Theme.fonts.titleBlue, {textAlign:'center', marginVertical:'5%'}]}>Selecciona la marca de tu Vehiculo</Text>
                <View style={{flexDirection:'row', flexWrap:'wrap', justifyContent:'center'}}>
                {vehiculo === 'Carro1' ?
            marcasCarros.map(el=>(
                <Pressable key={el.marca} onPressIn={()=>handleChange(el.marca, el.src)} style={{width:60, height:60, margin:10, backgroundColor:marca === el.marca ? '#1b333d': 'white',justifyContent:'center', alignItems:'center', borderRadius:10}}>
                <Image style={{width:40, height:40}} source={el.src}/>
                </Pressable>
            ))    
            :
            marcasMotos.map(el=>(
                <Pressable key={el.marca} onPressIn={()=>handleChange(el.marca, el.src)} style={{width:60, height:60, margin:10, backgroundColor:marca === el.marca ? '#1b333d': 'white',justifyContent:'center', alignItems:'center', borderRadius:10}}>
                <Image style={{width:40, height:40}} source={el.src}/>
                </Pressable>
            ))
            }
                </View>
            </View>
            
            }
            {
                screens=== 4 &&

                <View style={{height:'60%', alignItems:'center'}}>
            <View style={{elevation:5,flexDirection:'row', justifyContent:'center', alignItems:'center',}}>
                <Image onLoadEnd={()=> setLoadingImage(false)} style={{width:200, height:100,resizeMode:'contain'}} source={vehiculo=== 'Carro1' ? require(`../../../assets/Carro1.png`):require(`../../../assets/Moto.png`)}/>
                <Image style={{width:50, height:50}} source={logo?.src}/>
                
                </View>
                <Text style={[Theme.fonts.titleBlue,{ marginTop:'10%'}]}>Agrega la Referencia / Nombre</Text>
      
      <TextInput
            // placeholder={itemData && itemData?.marca }
            onChangeText={(text)=> setForm({...form, referencia:text.trim()})}
            style={[Theme.input.basic,{width:"90%",marginVertical:'5%'}]}
            maxLength={15}

            />
                </View>
            }


            <View style={{justifyContent:'center', alignItems:'center'}}>
            <Text style={Theme.fonts.titleBlue} onPress={()=>setScreens(screens-1)}>Volver</Text>
            </View>

            <View style={{width:'100%',marginVertical:'5%', justifyContent:'center', alignItems:'center',}}>
                <View style={{flexDirection:'row' }}>
                <Image onLoadEnd={()=> setLoadingImage(false)}  style={{width:20,marginHorizontal:10, height:20,resizeMode:'contain',tintColor:screens!==1 ? 'gray': null}} source={require('../../../assets/Logo.png')}/>
                <Image onLoadEnd={()=> setLoadingImage(false)} style={{width:20,marginHorizontal:10, height:20,resizeMode:'contain',tintColor:screens!==2 ? 'gray': null}} source={require('../../../assets/Logo.png')}/>
                <Image onLoadEnd={()=> setLoadingImage(false)} style={{width:20,marginHorizontal:10, height:20,resizeMode:'contain',tintColor:screens!==3 ? 'gray': null}} source={require('../../../assets/Logo.png')}/>
                <Image onLoadEnd={()=> setLoadingImage(false)} style={{width:20,marginHorizontal:10, height:20,resizeMode:'contain',tintColor:screens!==4 ? 'gray':null}} source={require('../../../assets/Logo.png')}/>
                <Image onLoadEnd={()=> setLoadingImage(false)} style={{width:20,marginHorizontal:10, height:20,resizeMode:'contain',tintColor:screens!==5 ? 'gray': null}} source={require('../../../assets/Logo.png')}/>

                </View>

            </View>
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