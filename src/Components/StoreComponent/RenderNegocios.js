import { useNavigation } from "@react-navigation/native"
import { useEffect, useState } from "react"
import { TouchableOpacity, Text, FlatList, View,Image, SafeAreaView, ScrollView, ActivityIndicator, Dimensions } from "react-native"
import { Theme } from "../../theme"
import { Negocios } from "../../utils/Negocios"
import { marcasCarros } from "../CarComponents/marcasCarros"



export default function RenderNegocios({filtro}){
    const premium = Negocios.filter(el=> el.premium)
    const normal = Negocios.filter(el=> !el.premium)
    const [loading, setLoading] = useState({image:true, marcas:true})
    const filterPremium = premium.filter(el=>{
       let result =  el.tipo === filtro 
       let result2 = el.nombre.toLocaleLowerCase().includes(filtro.toLocaleLowerCase())
       let result3 = el.marcas.toString().toLocaleLowerCase().includes(filtro.toLocaleLowerCase())
       return result || result2 || result3
    } )
    const filterNormal = normal.filter(el=> el.tipo === filtro|| el.nombre.includes(filtro))
    const [details, setDetails] = useState({visible:false, id:null})
    const navigation = useNavigation()
    const visibleDetails=(id)=>{
        setDetails({visible:true, id:id})
        navigation.navigate('DetailStore',{id})
    }
    
    useEffect(()=>{
        setLoading({image:true, marcas:true})
        
      
    },[filtro])
    const {height} = Dimensions.get('screen')
    return(
        <ScrollView >
        <Text style={[Theme.fonts.descriptionGray,{margin:10}]}>Resultados {filtro}</Text>

        {filterPremium.map(el=>(
            <>
            
            <TouchableOpacity onPress={()=>visibleDetails(el.id)}  style={{margin:10, flexDirection:'row',}} key={el.id}>
            
            <Image onLoadEnd={()=> setLoading({image:false})} style={{width:100,borderRadius:10, height:100}} source={require('../../../assets/taller.jpg')}/>
            <View style={{marginLeft:20,flexShrink:1}}>
            <Text style={Theme.fonts.titleBlue}>{el.nombre}</Text>
            <View style={{flexDirection:'row'}}>
            {el.marcas.map(el=>{
                let src = marcasCarros.find(ele=> ele.marca === el)
                return(
                    <>
                    <Image key={el.id} onLoadEnd={()=> setLoading({marcas:false})}  style={{width:30, height:30, marginHorizontal:2}} source={src.src}/>
                    {loading.marcas && <ActivityIndicator color={Theme.colors.primary}/>}
                    </>

                    )
            })
            }
            
            </View>
            <Text style={Theme.fonts.descriptionGray}>{el.ciudad}, {el.pais}</Text>

            <Text style={Theme.fonts.descriptionGray}>{el.tipo}</Text>
            
            </View>

            </TouchableOpacity>
            <View style={{height:2, backgroundColor:'#f1f1fb', marginHorizontal:10}}/>

            </>

        ))}
        {filterNormal.map(el=>(
            <TouchableOpacity onPress={()=>visibleDetails(el.id)} key={el.id} style={{marginHorizontal:10}}>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text style={Theme.fonts.titleBlue}>{el.nombre}</Text>
            <Text style={Theme.fonts.descriptionGray}>Ver mas</Text>

                </View>
            <View>
            <Text style={Theme.fonts.descriptionGray}>{el.pais}, {el.ciudad}</Text>

            </View>
            <View style={{height:10, backgroundColor:'#f1f1fb', marginTop:10}}/>

           </TouchableOpacity>

        ))}
        
        </ScrollView>
    )
}