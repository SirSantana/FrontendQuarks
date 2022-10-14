import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { View,Text, Image, Pressable, Alert, ActivityIndicator} from "react-native";
import { Theme } from "../../theme";

export default function StoreScreen(){
    const navigation = useNavigation()
    const [loading, setLoading] = useState(true)
    return(
        <View style={Theme.containers.containerParent}>

         <Image onLoadEnd={()=> setLoading(false)} style={{width:'100%', height:'70%', marginBottom:'5%',resizeMode:'contain'}} source={require('../../../assets/StoreScreen.png')}/>
         {loading && <ActivityIndicator color={Theme.colors.primary}/>}
         <Text style={[Theme.fonts.titleBlue,{width:'90%', textAlign:'center', fontSize:26}]}>Servicios para tú Vehículo</Text>
     <Text style={[Theme.fonts.descriptionGray,{width:'90%', marginBottom:20, textAlign:'center'}]}>Encuentra Talleres, Almacenes, Lavaderos, y más Lugares al servicio de tu Vehículo</Text>

     {/* <Pressable onPress={()=>navigation.navigate('IndexStores')} style={[Theme.buttons.primary,{width:'90%'}]}>
      <Text style={Theme.fonts.titleWhite}>¡Ver Ahora!</Text>
     </Pressable> */}
     <Pressable style={[Theme.buttons.primary,{width:'90%'}]}>
      <Text style={Theme.fonts.titleWhite}>Muy pronto!</Text>
     </Pressable>

        </View>
    )
}