import { View,Text, Image, Pressable, Alert} from "react-native";
import { Theme } from "../../theme";

export default function StoreScreen(){
    return(
        <View style={Theme.containers.containerParent}>

         <Image style={{width:'100%', height:'70%', marginBottom:'5%',resizeMode:'contain'}} source={require('../../../assets/StoreScreen.png')}/>
         <Text style={[Theme.fonts.titleBlue,{width:'90%', textAlign:'center', fontSize:26}]}>Servicios para tú Vehículo</Text>
     <Text style={[Theme.fonts.descriptionGray,{width:'90%', marginBottom:20, textAlign:'center'}]}>Encuentra Talleres, Almacenes, Lavaderos, y más Lugares al servicio de tu Vehículo</Text>

     <Pressable onPress={()=>Alert.alert('Holaa')} style={[Theme.buttons.primary,{width:'90%'}]}>
      <Text style={Theme.fonts.titleWhite}>¡Ver Ahora!</Text>
     </Pressable>

        </View>
    )
}