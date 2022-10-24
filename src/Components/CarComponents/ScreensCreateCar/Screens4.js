
import { View, Text, TouchableOpacity, Image, ActivityIndicator, TextInput } from "react-native";
import { Texts } from "../../../Themes/text";


export default function Screen4({pickImage, image, vehiculo, logo, form}){
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
        <Text style={[Texts.titleBoldBlue,{flexWrap:'wrap'}]}>{form.referencia}</Text>
        <Text onPress={()=> image?setImage(null): pickImage()} style={Texts.subtitleRegularRed}>{image?"Eliminar foto":"Agregar una foto de tu vehiculo"}</Text>


        </View>
            
            </View>
            </View>
    )
}