import { Texts } from "../../Themes/text";
import { View, Text,FlatList, TextInput, TouchableOpacity, Image, Pressable, Alert, SafeAreaView, StatusBar, Dimensions  } from "react-native";
import { Colors } from "../../Themes/colors";
import { Feather } from '@expo/vector-icons';


export default function DatosVehiculo({item, marca, navigation}){

    return(
        <View style={{flexDirection:'row',alignItems:'center', justifyContent:'space-between'}}>
          <View style={{flexDirection:'row', alignItems:'center'}}>
          <Image  style={{height: 50, width:50, marginRight:20}} source={item.tipo === 'Carro' ?  marca?.src : marcaMoto?.src}/>
          <View style={{justifyContent:'flex-start'}}>
          <Text style={Texts.titleBoldBlue}>{item?.referencia}</Text>
          <Text style={[Texts.subtitleRegularBlue, {textAlign:'left', lineHeight:15}]}>{item?.modelo}</Text>
          </View>
          </View>
          <TouchableOpacity  onPress={()=> navigation.navigate('Creando mi Vehiculo',{tipo:item?.tipo, itemData:item})} style={{width:50, height:50,elevation:10, borderRadius:50, backgroundColor:Colors.primary,alignItems:'center', justifyContent:'center'}}>
          <Feather  name="edit" size={25} color="white" />
          </TouchableOpacity> 
            </View>
    )
}