import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { View,Text, Image, Pressable, Alert, ActivityIndicator} from "react-native";
import { Theme } from "../../theme";
import { Buttons } from "../../Themes/buttons";
import { Texts } from "../../Themes/text";

export default function StoreScreen(){
    const navigation = useNavigation()
    const [loading, setLoading] = useState(true)
    return(
        <View style={Theme.containers.containerParent}>

         <Image onLoadEnd={()=> setLoading(false)} style={{width:'100%', height:'70%', marginBottom:'5%',resizeMode:'contain'}} source={require('../../../assets/StoreScreen.png')}/>
         {loading && <ActivityIndicator color={Theme.colors.primary}/>}
         <Text style={Texts.titleBoldBlue}>Servicios para tú Vehículo!</Text>
     <Text style={Texts.subtitleRegularGray}>Encuentra Talleres, Almacenes, Lavaderos, y más</Text>

     
     <Pressable style={[Buttons.primary,{width:'90%',marginTop:'10%'}]}>
      <Text style={Texts.title2RegularWhite}>Muy pronto!</Text>
     </Pressable>

        </View>
    )
}