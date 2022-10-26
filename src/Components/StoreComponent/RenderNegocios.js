import { useNavigation } from "@react-navigation/native"
import { useEffect, useState } from "react"
import { TouchableOpacity, Text, FlatList, View,Image, SafeAreaView, ScrollView, ActivityIndicator, Dimensions } from "react-native"
import { Theme } from "../../theme"
import { Negocios } from "../../utils/Negocios"
import { marcasCarros } from "../CarComponents/marcasCarros"
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { GET_NEGOCIOS } from "../../graphql/querys"
import { useQuery } from "@apollo/client"
import { Colors } from "../../Themes/colors"


export default function RenderNegocios({filtro}){
    const premium = Negocios.filter(el=> el.premium)
    const normal = Negocios.filter(el=> !el.premium)
    const [loadingImage, setLoading] = useState({image:true, marcas:true})
    const  {data, loading, error} = useQuery(GET_NEGOCIOS)

    // const filterPremium = premium.filter(el=>{
    //    let result =  el.tipo === filtro 
    //    let result2 = el.nombre.toLocaleLowerCase().includes(filtro.toLocaleLowerCase())
    //    let result3 = el.marcas.toString().toLocaleLowerCase().includes(filtro.toLocaleLowerCase())
    //    return result || result2 || result3
    // } )
    // const filterNormal = normal.filter(el=>{
    //     let r1 = el.tipo === filtro
    //     let r2 = el.nombre.toLocaleLowerCase().includes(filtro.toLocaleLowerCase())
    //    let r3 = el.marcas.toString().toLocaleLowerCase().includes(filtro.toLocaleLowerCase())
    //     let r4 = el.servicios.toString().toLocaleLowerCase().search(filtro.toLocaleLowerCase())
    //     return r1 || r2 || r3 || r4
    // }) 
    const [details, setDetails] = useState({visible:false, id:null})
    const navigation = useNavigation()
    const visibleDetails=(id)=>{
        setDetails({visible:true, id:id})
        navigation.navigate('DetailStore',{id})
    }

    const filterNormal = data?.getNegocios?.filter(el=>{
        let f1 = el.tipo === filtro
        let f2 = el.nombre.toLocaleLowerCase().includes(filtro.toLocaleLowerCase())
        let f3 = el?.marcas?.toString().toLocaleLowerCase().includes(filtro.toLocaleLowerCase())
        let f4 = el?.repuestos?.toString().toLocaleLowerCase().includes(filtro.toLocaleLowerCase())

        return f1 || f2 || f4||f3 
    })
    useEffect(()=>{
        setLoading({image:true, marcas:true})
    },[])
    const {height} = Dimensions.get('screen')
    return(
        <ScrollView >
        <Text style={[Theme.fonts.descriptionGray,{margin:10, fontSize:20}]}>Resultados {filtro}</Text>

        {/* {filterPremium.map(el=>(
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
                    <Image key={el.id}  style={{width:30, height:30, marginHorizontal:2}} source={src.src}/>
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

        ))} */}
        {loading ? <ActivityIndicator color={Colors.primary}/>
        :
        filterNormal?.map(el=>(
            <TouchableOpacity onPress={()=>visibleDetails(el.id)} key={el.id} style={{marginHorizontal:10}}>
                <View style={{flexDirection:'row', justifyContent:'space-between'}}>
                    <View style={{flexDirection:'row', alignItems:'center'}}>

                <MaterialCommunityIcons style={{marginRight:10}} name="car-cog" size={24} color='#f50057' />
                <View>
                <Text style={Theme.fonts.titleBlue}>{el.nombre}</Text>
                <Text style={Theme.fonts.descriptionGray}>{el?.ciudad}, {el?.pais}</Text>
                <Text style={Theme.fonts.descriptionGray}>{el?.direccion}</Text>
                {el?.celular&&<Text style={Theme.fonts.descriptionGray}>{el?.celular.slice(2, el?.celular.lenght)}</Text>}


                <View style={{flexDirection:'row', flexWrap:'wrap'}}>
                {el?.marcas?.map(el=>{
                let src = marcasCarros.find(ele=> ele.marca === el)
                return(
                    <>
                    <Image key={el.id} style={{width:30, height:30, marginHorizontal:2}} source={src?.src}/>
                    </>
                    )
            })
            } 
                
                </View>
                </View>
                
                </View>
                

                </View>
            
            <View style={{height:2, backgroundColor:'#f1f1fb', marginTop:10}}/>

           </TouchableOpacity>

        ))
         }
         
        </ScrollView>
    )
}