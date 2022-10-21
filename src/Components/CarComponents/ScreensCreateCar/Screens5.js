
import { useState } from "react";
import { View, Text, TouchableOpacity, Image, ActivityIndicator, TextInput } from "react-native";
import { Theme } from "../../../theme";


export default function Screen5({pickImage, image, vehiculo, logo, form}){
    return(
        
        <View style={{ alignItems:'center', height:'55%',marginBottom:'5%'}}>
        <View style={{width:'90%',backgroundColor:'white',height:'100%', alignItems:'center', borderRadius:20}}>
        <Image style={{width:50, height:50}} source={logo?.src}/>
        <TouchableOpacity onPress={pickImage} underlayColor={'rgba(0,0,0,0)'} style={{width:'100%', height:'60%'}}>
            {image ? <Image source={{ uri: image }} style={{width:'100%', height:'100%',resizeMode:'contain' }} />
            :<Image style={{width:'100%', height:'100%',resizeMode:'contain'}} source={vehiculo=== 'Carro' ? require(`../../../../assets/Carro.png`):require(`../../../../assets/Moto.png`)}/>
            }
            </TouchableOpacity>
        
        <View style={{ alignItems:"center", }}>
        <Text style={[Theme.fonts.titleBlue,{fontSize:40,flexWrap:'wrap', margin:0, textAlign:'left'}]}>{form.referencia}</Text>
        <Text onPress={()=> image?setImage(null): pickImage()} style={[Theme.fonts.descriptionRed]}>{image?"Eliminar foto":"Agregar una foto de tu vehiculo"}</Text>


        </View>
            
            </View>
            </View>
    )
}