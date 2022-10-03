import { useNavigation } from "@react-navigation/native";
import { useEffect } from "react";
import { View, Text, SafeAreaView } from "react-native";
import Buscador from "../../Components/StoreComponent/Buscador";
import RenderNegocios from "../../Components/StoreComponent/RenderNegocios";
import { Theme } from "../../theme";



export default function IndexStores(){
    const navigation = useNavigation()

    useEffect(()=>{
        navigation.setOptions({
            headerTitle:'Busca',
            headerSearchBarOptions:{
                placeholder:'Talleres, Almacenes, Lavaderos y mas',

            }
        })
    },[])
    return(
        <SafeAreaView style={{justifyContent:'space-between', backgroundColor:'white'}}>
            <Buscador/>

            <RenderNegocios/>
        </SafeAreaView>
    )
}