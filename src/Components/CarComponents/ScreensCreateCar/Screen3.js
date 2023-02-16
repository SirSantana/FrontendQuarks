
import { View, Text, TouchableOpacity, Image, TextInput } from "react-native";
import { Colors } from "../../../Contants/Colors";
import { Texts } from "../../../Themes/text";
import { Inputs } from "../../../Themes/inputs";
import { Buttons } from "../../../Themes/buttons";



export default function Screen3({ setForm, vehiculo, form, logo, setScreens }) {

  return (
    <View style={{ height: '60%', alignItems: 'center' }}>
      <View style={{ elevation: 5, flexDirection: 'row', justifyContent: 'center', alignItems: 'center', }}>
        <Image style={{ width: 200, height: 100, resizeMode: 'contain' }} source={vehiculo === 'Carro' ? require(`../../../../assets/Carro.png`) : require(`../../../../assets/Moto.png`)} />
        <Image style={{ width: 50, height: 50 }} source={logo?.src} />

      </View>
      <Text style={[Texts.title2BoldBlue, { marginVertical: '5%' }]}>Agrega la Referencia</Text>

      <TextInput
        // placeholder={itemData && itemData?.marca }
        onChangeText={(text) => setForm({ ...form, referencia: text })}
        style={[Inputs.basic, { width: "90%", marginVertical: '5%' }]}
        maxLength={20}
        value={form.referencia}
      />
      <TouchableOpacity onPress={() => setScreens(4)} disabled={form.referencia.length < 2 ? true : false} style={[Buttons.primary, { width: '90%', marginTop: '5%', backgroundColor: form.referencia != '' ? Colors.primary : 'gray' }]}>
        <Text style={Texts.title2RegularWhite}>Siguiente</Text>

      </TouchableOpacity>
    </View>
  )
}