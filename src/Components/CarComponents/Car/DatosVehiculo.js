import { View, Text,Image,} from "react-native";
import { Texts } from "../../../Themes/text";
import { Colors } from "../../../Contants/Colors";
import { marcasCarros } from "../marcasCarros";
import { marcasMotos } from "../marcasMotos";


export default function DatosVehiculo({ item, navigation }) {
  const marca = marcasCarros.find(el => el.marca ===  item?.marca)
  const marcaMoto = marcasMotos.find(el => el.marca === item?.marca)
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image style={{ height: 50, width: 50, marginRight: 20 }} source={item?.tipo === 'Carro' ? marca?.src : marcaMoto?.src} />
        <View style={{ justifyContent: 'flex-start' }}>
          <Text style={{ fontSize: 22, fontWeight: 'bold', color: Colors.secondary }}>{item?.referencia}</Text>
          <Text style={[Texts.subtitleRegularBlue, { textAlign: 'left', lineHeight: 15 }]}>{item?.modelo}</Text>
        </View>
      </View>
    </View>
  )
}