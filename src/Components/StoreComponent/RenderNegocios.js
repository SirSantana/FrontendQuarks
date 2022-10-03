import { TouchableOpacity, Text, FlatList, View } from "react-native"
import { Theme } from "../../theme"
import { Negocios } from "../../utils/Negocios"



export default function RenderNegocios(){
    const premium = Negocios.filter(el=> el.premium)
    console.log('hola');
    const renderPremium =(item)=>{
        return(
            <TouchableOpacity style={{backgroundColor:'#ebebeb', marginHorizontal:10, marginVertical:2, padding:10, borderRadius:10,}}>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text style={Theme.fonts.titleBlue}>{item.nombre}</Text>
            <Text style={Theme.fonts.descriptionGray}>Ver mas</Text>

                </View>
            <View>
            <Text style={Theme.fonts.descriptionGray}>{item.pais}, {item.ciudad}</Text>

            </View>

           </TouchableOpacity>
        )
    }
    return(
        <>
        <Text style={[Theme.fonts.descriptionGray,{margin:10}]}>Resultados</Text>

        <FlatList
        style={{width:'100%'}}
           renderItem={({item})=> renderPremium(item)}
           data={premium}/>
        </>
    )
}