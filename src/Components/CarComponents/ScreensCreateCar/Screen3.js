import { View, Text, TouchableOpacity, Image, } from "react-native";
import { Theme } from "../../../theme";
import { marcasCarros } from "../marcasCarros";
import { marcasMotos } from "../marcasMotos";


export default function Screen3({handleChange, vehiculo, marca}){

    return(
        <View style={{height:'60%'}}>
                <View style={{elevation:5, justifyContent:'center', alignItems:'center',}}>
                <Image  style={{width:200, height:100,resizeMode:'contain'}} source={vehiculo=== 'Carro' ? require(`../../../../assets/Carro.png`):require(`../../../../assets/Moto.png`)}/>
                </View>
               <Text style={[Theme.fonts.titleBlue, {textAlign:'center', marginVertical:'5%'}]}>Selecciona la marca de tu Vehiculo</Text>
                <View style={{flexDirection:'row', flexWrap:'wrap', justifyContent:'center'}}>
                {vehiculo === 'Carro' ?
            marcasCarros.map(el=>(
                <TouchableOpacity key={el.marca} onPressOut={()=>handleChange(el.marca, el.src)} style={{width:60, height:60, margin:10, backgroundColor:marca === el.marca ? '#1b333d': 'white',justifyContent:'center', alignItems:'center', borderRadius:10}}>
                <Image style={{width:40, height:40}} source={el.src}/>
                </TouchableOpacity>
            ))    
            :
            marcasMotos.map(el=>(
                <TouchableOpacity key={el.marca} onPressOut={()=>handleChange(el.marca, el.src)} style={{width:60, height:60, margin:10, backgroundColor:marca === el.marca ? '#1b333d': 'white',justifyContent:'center', alignItems:'center', borderRadius:10}}>
                <Image style={{width:40, height:40}} source={el.src}/>
                </TouchableOpacity>
            ))
            }
                </View>
            </View>
    )
}