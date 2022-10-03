import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View,Text, FlatList, Pressable, TouchableOpacity, SafeAreaView } from "react-native";
import { SearchBar } from "react-native-screens";
import { Theme } from "../../theme";
import { Negocios } from "../../utils/Negocios";

let filtros = [
    'Talleres', 'Almacenes', 'CDA', 'Lavaderos','Accesorios',
]
export default function Buscador(){
    const [filtro, setFiltro] = useState('Almacenes')

    
   
    const render =(item)=>{
        return(
            <TouchableOpacity onPress={()=> setFiltro(item)} style={{borderRadius:10,justifyContent:'center', alignItems:'center', backgroundColor: filtro === item ?  Theme.colors.primary: '#f1f1f1',height:50, padding:10,marginHorizontal:10}}>
            <Text style={[Theme.fonts.description,{color:filtro === item ? 'white':'gray'}]}>{item}</Text>
           </TouchableOpacity>
        )
    }
    
    return(
        <SafeAreaView >
           <Text style={[Theme.fonts.descriptionBlue,{margin:10}]}>Filtros de Busqueda</Text>
           <FlatList
           horizontal
           renderItem={({item})=> render(item)}
           data={filtros}/>

           
        </SafeAreaView>
    )
}