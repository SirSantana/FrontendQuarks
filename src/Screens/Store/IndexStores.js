import { useNavigation } from "@react-navigation/native";
import { useEffect, useLayoutEffect, useState } from "react";
import { View, Text, SafeAreaView, ScrollView } from "react-native";
import Buscador from "../../Components/StoreComponent/Buscador";
import RenderNegocios from "../../Components/StoreComponent/RenderNegocios";
import { Theme } from "../../theme";


export default function IndexStores(){
    const navigation = useNavigation()
    const [filtro, setFiltro] = useState('Almacen')

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerTitle:'Busca',
            headerSearchBarOptions:{
                placeholder:'Talleres, Almacenes, Lavaderos y mas',
                onChangeText:(event)=>(
                    setFiltro(event.nativeEvent.text)
                )
            },
        })
    },[])
    console.log('filt',filtro);
    return(
        <SafeAreaView style={{justifyContent:'space-between', backgroundColor:'white'}}>
            
            <Buscador setFiltro={setFiltro} filtro={filtro}/>
            <View style={{height:10, backgroundColor:'#f1f1fb', marginTop:10}}/>

            <ScrollView contentContainerStyle={{paddingBottom:100}}>
            <RenderNegocios filtro={filtro}/>

            </ScrollView>
        </SafeAreaView>
    )
}