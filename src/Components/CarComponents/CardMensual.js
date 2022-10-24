import { View, Text,FlatList, TextInput, TouchableOpacity, Image, Pressable, Alert, SafeAreaView, StatusBar, Dimensions  } from "react-native";
import { Texts } from "../../Themes/text";
import { Colors } from "../../Themes/colors";
import { Ionicons } from '@expo/vector-icons';

export default function CardMensual({navigation, id, dineroGastado, setModalVisible2}){

    return(
        <TouchableOpacity onPress={()=> navigation.navigate('Gastos', {id:id})} style={{width:'80%', height:150, maxHeight:'30%',flexDirection:'row',alignItems:'center', backgroundColor:Colors.primary, marginVertical:'5%', borderRadius:20}}>
            <View style={{width:'70%',height:'100%', justifyContent:'space-between', alignItems:'flex-start', paddingLeft:'5%', paddingVertical:'5%'}}>
            <Text style={Texts.title2RegularWhite}>Este Mes</Text>
            
            <Text style={Texts.titleBoldWhite}>$ {dineroGastado.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</Text>
            <Text style={Texts.subtitleRegularWhite}>Ver Gastos</Text>
            </View>
            <TouchableOpacity onPress={()=> setModalVisible2(true)} style={{width:50, height:50,elevation:10, borderRadius:50, backgroundColor:'white',alignItems:'center', justifyContent:'center'}}>
            <Ionicons name="add" size={40} color={Colors.primary} />
          </TouchableOpacity> 
            </TouchableOpacity>
    )
}