import { View, Text, TouchableOpacity } from 'react-native';
import { Colors } from '../../Contants/Colors';


export default function SliderButton({setTab, tab}) {
  return (
    <View style={{
      flexDirection: "row",
      paddingTop: 20
    }}>
      <TouchableOpacity
        style={{
          borderBottomColor: tab === 'Gastos' ? Colors.secondary : "#FFF",
          borderBottomWidth: 4,
          paddingVertical: 6
        }}
        onPress={() => setTab('Gastos')}
      >
        <Text style={{
          fontWeight: "bold",
          color: tab === 'Gastos' ? Colors.secondary : "#9ca1a2",
        }}>GASTOS</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={{
          borderBottomColor: tab === 'Carros' ? Colors.secondary : "#FFF",
          borderBottomWidth: 4,
          paddingVertical: 6,
          marginLeft: 30
        }}
        onPress={() => setTab('Carros')}
      >
        <Text style={{
          fontWeight: "bold",
          color: tab === 'Carros' ? Colors.secondary : "#9ca1a2",
        }}>TUS VEHICULOS</Text>
      </TouchableOpacity>
    </View>
  )
}