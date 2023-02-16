import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../../Contants/Colors';


export default function IconsAction({ icon,text, id, navigate}) {

  const navigation = useNavigation()
  return (
    <TouchableOpacity onPress={() => navigation.navigate(navigate, { id:id })} style={{ flexDirection: 'column', width: '33%', justifyContent: 'center', display: 'flex', alignItems: 'center' }}>
      <View style={{ padding: 10, borderRadius: 25, backgroundColor: 'white', width: 50, height: 50, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <Icon name={icon} color={Colors.primary} size={24} />
      </View>
      <Text style={{ color: 'white', fontWeight: '500' }}>{text}</Text>
    </TouchableOpacity>
  )
}