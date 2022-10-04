import { useLayoutEffect, useState } from "react";
import { View, Text, Image, ActivityIndicator, ScrollView, FlatList, Dimensions } from "react-native";
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


    useLayoutEffect(()=>{
    const store = Negocios.find(el=> el?.id == route?.params?.id)
        setStore(store)
        navigation.setOptions({
            headerTitle:store.nombre,
        })
    },[])
    const {height, } = Dimensions.get('screen')
    return(
        <View style={{backgroundColor:'white', padding:10}}>

            {store &&
            <ScrollView contentContainerStyle={{flexGrow: 1, height:height}}>
            <Text style={Theme.fonts.titleBlue}>{store?.nombre}</Text>
            <Text style={Theme.fonts.descriptionGray}>{store?.direccion}. {store.ciudad}, {store.pais} </Text>
            <Text style={Theme.fonts.descriptionGray}>{store.tipo} de  Autopartes</Text>
            <Image onLoadEnd={()=> setLoading({image:false})} style={{width:'100%',borderRadius:10, height:'30%',marginVertical:10,}} source={require('../../../assets/taller.jpg')}/>
            
            <View style={{height:1, width:'100%', backgroundColor:'#f1f1f1'}}/>
                <View style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-start', padding:10}}>
                <View style={{width:'20%'}}>
                <FontAwesome5 name="car-alt" size={24} color={Theme.colors.primary}  />
               </View >
            {store.marcas.map(el=>{
                let src = marcasCarros.find(ele=> ele.marca === el)
                return(
                    <>
                    <Image key={el.id} onLoadEnd={()=> setLoading({marcas:false})}  style={{width:40, height:40, marginHorizontal:2}} source={src.src}/>
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
            <Text style={Theme.fonts.descriptionGray}>+57 {store?.celular} </Text>
            
            </View>
            <View style={{height:1, width:'100%', backgroundColor:'#f1f1f1'}}/>

            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'flex-start', padding:10}}>
            <View style={{width:'20%'}}>
            <MaterialIcons name="car-repair" size={26} color={Theme.colors.primary} />
            </View>
            <View style={{flexDirection:'column'}}>
            {store.servicios.map(el=>(
            <Text key={el} style={Theme.fonts.descriptionGray}>{el}</Text>
                
            ))}
                </View>
                
            
            
            </View>
            </ScrollView>


            
            
            
            }

        </View>
    )
}