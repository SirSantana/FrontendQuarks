import { useNavigation } from "@react-navigation/native"
import { useEffect, useState } from "react"
import { TouchableOpacity, Text, FlatList, View,Image, SafeAreaView, ScrollView, ActivityIndicator } from "react-native"
import { Theme } from "../../theme"
import { Negocios } from "../../utils/Negocios"
import { marcasCarros } from "../CarComponents/marcasCarros"



export default function RenderNegocios({filtro}){
    const premium = Negocios.filter(el=> el.premium)
    const normal = Negocios.filter(el=> !el.premium)
    const [loading, setLoading] = useState({image:true, marcas:true})
    const filterPremium = premium.filter(el=> el.tipo === filtro)
    const filterNormal = normal.filter(el=> el.tipo === filtro)
    const [details, setDetails] = useState({visible:false, id:null})
    const navigation = useNavigation()
    const visibleDetails=(id)=>{
        setDetails({visible:true, id:id})
        navigation.navigate('DetailStore',{id})
    }

    useEffect(()=>{
        setLoading({image:true, marcas:true})
        
    },[filtro])
    return(
        <ScrollView contentContainerStyle={{flexGrow: 1, height:'100%'}}
        >
        <Text style={[Theme.fonts.descriptionGray,{margin:10}]}>Resultados</Text>
        {filterPremium.map(el=>(
            <>
            <TouchableOpacity onPress={()=>visibleDetails(el.id)} key={el.id} style={{marginHorizontal:10}}>
            <Image onLoadEnd={()=> setLoading({image:false})} style={{width:'100%',borderRadius:10, height:150,marginVertical:10,}} source={require('../../../assets/taller.jpg')}/>
            
            {loading.image && <ActivityIndicator color={Theme.colors.primary}/>}
            <View style={{flexDirection:'row', justifyContent:'space-between'}}>
            <Text style={Theme.fonts.titleBlue}>{el.nombre}</Text>
            <Text style={Theme.fonts.descriptionGray}>Ver mas</Text>

                </View>
            <View>
            <Text style={Theme.fonts.descriptionGray}>{el.pais}, {el.ciudad}</Text>
            <View style={{flexDirection:'row',}}>
            {el.marcas.map(el=>{
                let src = marcasCarros.find(ele=> ele.marca === el)
                console.log(src);
                return(
                    <>
                    <Image key={el.id} onLoadEnd={()=> setLoading({marcas:false})}  style={{width:40, height:40, marginHorizontal:2}} source={src.src}/>
                    {loading.marcas && <ActivityIndicator color={Theme.colors.primary}/>}
                    </>

                    )
            })
            }
            </View>
            </View>
 
            </TouchableOpacity>
            <View style={{height:10, backgroundColor:'#f1f1fb', marginTop:10}}/>

            </>


        ))}

        {filterNormal.map(el=>(
            <TouchableOpacity key={el.id} style={{marginHorizontal:10}}>
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