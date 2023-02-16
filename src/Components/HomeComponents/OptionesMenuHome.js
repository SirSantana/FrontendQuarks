import { View, TouchableOpacity, Text } from "react-native"
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from "../../Contants/Colors";


export default function OptionsMenuHome({ tab, setTab }) {
  return (
    <View style={{ backgroundColor: '#f7f7f7', margin: "5%", elevation: 2, paddingHorizontal: 20, flexDirection: 'row', height: 60, justifyContent: 'space-around', alignItems: 'center', borderRadius: 10 }}>
      <TouchableOpacity style={{justifyContent:'center',width:'33%', alignItems:'center'}} onPress={() => setTab('comunidad')} >
        <View style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }}>
          <Icon name={tab === 'comunidad' ? 'people' : "people-outline"} color={tab === 'comunidad' ? Colors.primary : '#7a7a7a'} size={24} />
        </View>
        <Text style={{color:tab === 'comunidad'?Colors.primary:'#7a7a7a'}}>Comunidad</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{justifyContent:'center',width:'33%', alignItems:'center'}} onPress={() => setTab('search')} >
        <View style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }}>
          <Icon name={tab === 'search' ? 'search' : "search-outline"} color={tab === 'search' ? Colors.primary : '#7a7a7a'} size={24} />
        </View>
        <Text style={{color:tab === 'search'?Colors.primary:'#7a7a7a'}}>Cotizar</Text>
      </TouchableOpacity>
      <TouchableOpacity style={{justifyContent:'center',width:'33%', alignItems:'center'}} onPress={() => setTab('cotizaciones')} >
        <View style={{ width: 40, height: 40, justifyContent: 'center', alignItems: 'center' }}>
          <Icon name={tab === 'cotizaciones' ? 'document-text' : "document-text-outline"} color={tab === 'cotizaciones' ? Colors.primary : '#7a7a7a'} size={24} />
        </View>
        <Text style={{color:tab === 'cotizaciones'?Colors.primary:'#7a7a7a'}}>Tus cotiza...</Text>
      </TouchableOpacity>
    </View>
  )
}