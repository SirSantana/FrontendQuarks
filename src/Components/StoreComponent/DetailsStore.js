import { useLayoutEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator, ScrollView, FlatList, Dimensions, Pressable, Linking, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Theme } from "../../theme";
import { Negocios } from "../../utils/Negocios";
import { marcasCarros } from "../CarComponents/marcasCarros";
import RenderNegocios from "./RenderNegocios";
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";
export default function DetailsStore({route}){
    const [store,setStore] = useState(null)
    const [loading, setLoading] = useState({image:true, marcas:true})
    const navigation = useNavigation()

    const sendWhatsapp=(celular)=>{
        let text = 'Buenos dias, encontre su anuncio en Quarks, estoy interesado en...'
        const link = `https://wa.me/${celular}?text=${text}`
        Linking.canOpenURL(link).then((supported)=>{
            if(!supported){
                Alert.alert('Este numero no tiene WhatsApp')
                return
            }
            return Linking.openURL(link)
    })
    }
    useLayoutEffect(()=>{
    const store = Negocios.find(el=> el?.id == route?.params?.id)
        setStore(store)
        navigation.setOptions({
            headerTitle:store.nombre,
        })
    },[])
    const {height, } = Dimensions.get('screen')
    return(
        <ScrollView  contentContainerStyle={{backgroundColor:'white', flexGrow:1}} >

            {store &&
            <View style={{padding:10}}>
            <Text style={Theme.fonts.titleBlue}>{store?.nombre}</Text>
            <Text style={Theme.fonts.descriptionGray}>{store?.direccion}. {store.ciudad}, {store.pais} </Text>
            <Text style={Theme.fonts.descriptionGray}>{store.tipo} de  Autopartes</Text>
            <Image onLoadEnd={()=> setLoading({image:false})} style={{width:'100%',borderRadius:10, height:'30%',marginVertical:10,}} source={require('../../../assets/taller.jpg')}/>
            
            <View style={{height:1, width:'100%', backgroundColor:'#f1f1f1'}}/>
                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-start', padding:10}}>
                <View style={{width:'20%'}}>
                <FontAwesome5 name="car-alt" size={24} color={Theme.colors.primary}  />
               </View >
            {store?.marcas?.map(el=>{
                let src = marcasCarros.find(ele=> ele.marca === el)
                return(
                    <>
                    <Image key={src} onLoadEnd={()=> setLoading({marcas:false})}  style={{width:40, height:40, marginHorizontal:2}} source={src.src}/>
                    {loading.marcas && <ActivityIndicator color={Theme.colors.primary}/>}
                    </>
                    )
            })
            }
                    </View>

                    <View style={{height:1, width:'100%', backgroundColor:'#f1f1f1'}}/>

            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-start', padding:10}}>
            <View style={{width:'20%'}}>
            <MaterialIcons name="place" size={24} color={Theme.colors.primary} />
            </View>
            <Text style={Theme.fonts.descriptionGray}>{store?.direccion}. {store.ciudad}, {store.pais} </Text>
            
            </View>
            <View style={{height:1, width:'100%', backgroundColor:'#f1f1f1'}}/>

            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-start', padding:10}}>
            <View style={{width:'20%'}}>
            <FontAwesome name="whatsapp" size={26} color={Theme.colors.primary} />
            </View>
            <Text style={Theme.fonts.descriptionGray}>+{store?.celular} </Text>
            
            </View>
            <View style={{ width:'100%', backgroundColor:'#f1f1f1'}}/>

            {store.servicios.length>0 &&
            
            <ScrollView  >
                <View style={{flexDirection:'row', alignItems:'center', padding:10}}>

            <View style={{width:'20%'}}>
            <MaterialIcons name="car-repair" size={26} color={Theme.colors.primary} />
            </View>
            <View style={{flexDirection:'column'}}>
            {store.servicios.map(el=>(
            <Text key={el} style={Theme.fonts.descriptionGray}>{el}</Text>
                
            ))}
                </View>
                
            
                </View>
            
            </ScrollView>}
            <View style={{ width:'100%', backgroundColor:'#f1f1f1'}}/>

            {store?.celular &&
            <Pressable onPress={()=> sendWhatsapp(store.celular)} style={[Theme.buttons.primary,{width:'100%', flexDirection:'row'}]}>
            <FontAwesome name="whatsapp" size={26} color={'white'}  style={{marginRight:20}}/>

            <Text style={{color:'white', fontSize:18, fontWeight:"600"}}>Enviar Mensaje</Text>

            </Pressable>}
            </View>


            
            
            
            }

        </ScrollView>
    )
}