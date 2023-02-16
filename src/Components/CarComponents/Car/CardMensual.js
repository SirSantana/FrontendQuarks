import { View, Text, TouchableOpacity, } from "react-native";
import { Colors } from "../../../Contants/Colors";

export default function CardMensual({ navigation, id, dineroGastado, setModalVisible2 }) {

  return (
    <TouchableOpacity onPress={() => navigation.navigate('Gastos', { id: id })} style={{ width: '90%', padding: 30, height: 120, flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.primary, marginVertical: '5%', borderRadius: 20 }}>
      <View style={{ width: '100%', height: '100%', justifyContent: 'space-between', alignItems: 'flex-start', }}>
        <Text style={{ color: 'white', fontSize: 40, fontWeight: 'bold', }}>$ {dineroGastado.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</Text>
        <Text style={{ color: '#FFEBF0', fontSize: 18 }}>Este Mes</Text>
      </View>
    </TouchableOpacity>
  )
}