import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../Contants/Colors';


export default function OptionSetting({ setVisible, text,icon }) {
  return (
    <>
      <View style={styles.separador} />
      <TouchableOpacity onPress={() => setVisible(true)} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ fontSize: 16, margin: 10, color: Colors.secondary }}>{text}</Text>
        <Icon name={icon} color={icon=='star'? '#E9D200': Colors.gray} size={24} style={{ marginLeft: 10, alignSelf: 'center' }} />
      </TouchableOpacity>
    </>
  )
}

const styles = StyleSheet.create({
  separador: {
    backgroundColor: 'gray', height: 3, width: '20%', alignSelf: 'center', marginVertical: 10,backgroundColor: '#f3f3f3', width: '90%', height: 2 
  },
})