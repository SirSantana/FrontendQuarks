import Icon from 'react-native-vector-icons/Ionicons';
import { View, TouchableOpacity, Text } from "react-native";
import { Colors } from '../../Contants/Colors';


export default function OptionsMenu({ setTab, tab }) {
  return (
    <View style={{ backgroundColor: '#f7f7f7', elevation: 10, marginTop: 20, paddingHorizontal: 20, flexDirection: 'row', height: 60, justifyContent: 'space-around', alignItems: 'center', marginHorizontal: '5%', borderRadius: 20 }}>
      <TouchableOpacity style={{ justifyContent: 'center', width: '33%', alignItems: 'center' }} onPress={() => setTab('vehiculo')} >
        <View style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 25 }}>
          <Icon name={tab === 'vehiculo' ? 'car-sport' : "car-sport-outline"} color={tab === 'vehiculo' ? Colors.primary : '#7a7a7a'} size={24} />
        </View>
        <Text style={{ color: tab === 'vehiculo' ? Colors.primary : '#7a7a7a' }}>Tus vehiculos</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{ justifyContent: 'center',alignItems: 'center' }} onPress={() => setTab('leyes')} >
        <View style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center', borderRadius: 25 }}>
          <Icon name={tab === 'leyes' ? 'document' : "document-text-outline"} color={tab === 'leyes' ? Colors.primary : '#7a7a7a'} size={24} />
        </View>
        <Text style={{ color: tab === 'leyes' ? Colors.primary : '#7a7a7a' }}>Leyes</Text>
      </TouchableOpacity>
    </View>
  )
}