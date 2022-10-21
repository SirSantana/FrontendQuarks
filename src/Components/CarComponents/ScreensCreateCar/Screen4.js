
import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import { Theme } from "../../../theme";


export default function Screen4({setForm, vehiculo, form, logo, setScreens}){

    return(
        <View style={{height:'60%', alignItems:'center'}}>
            <View style={{elevation:5,flexDirection:'row', justifyContent:'center', alignItems:'center',}}>
                <Image style={{width:200, height:100,resizeMode:'contain'}} source={vehiculo=== 'Carro' ? require(`../../../../assets/Carro.png`):require(`../../../../assets/Moto.png`)}/>
                <Image style={{width:50, height:50}} source={logo?.src}/>
                
                </View>
                <Text style={[Theme.fonts.titleBlue,{ marginTop:'10%'}]}>Agrega la Referencia</Text>
      
      <TextInput
            // placeholder={itemData && itemData?.marca }
            onChangeText={(text)=> setForm({...form, referencia:text})}
            style={[Theme.input.basic,{width:"90%",marginVertical:'5%'}]}
            maxLength={20}
                value={form.referencia}
            />
            <TouchableOpacity  onPress={()=>setScreens(5)} disabled={form.referencia.length<2 ? true: false} style={[Theme.buttons.primary,{width:'50%', marginTop:20, backgroundColor:form.referencia != ''? Theme.colors.primary:'gray'}]}>
        <Text style={Theme.fonts.titleWhite}>Siguiente</Text>

        </TouchableOpacity>
                </View>
    )
}