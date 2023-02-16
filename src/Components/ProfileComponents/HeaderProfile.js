import { useState } from 'react';
import { View, Text, Modal, Pressable } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ModalSettings from './ModalSettings';

export default function HeaderProfile({ name, puntos }) {
  const [setting, setSettings] = useState(false)

  return (
    <View style={{ padding: '5%' }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <View style={{ width: '50%', flexDirection: 'row', alignItems: 'center', height: 40, }}>
          <Icon name="trophy" color={'#E9D200'} size={28} />
          <View style={{ marginLeft: 10, height: '90%', width: '70%', justifyContent: 'center', backgroundColor: '#f50057', borderRadius: 10, alignItems: 'center', }} source={require('../../../assets/Rectangule4.png')}>
            <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}> {puntos}  pts</Text>
          </View>
        </View>
        <Pressable onPress={() => setSettings(true)} style={{ backgroundColor: '#BFBFBF', width: 50, borderRadius: 50, height: 50, alignItems: 'center', justifyContent: 'center' }}>
          <Text style={{ color: 'white', fontSize: 20 }}>M</Text>
        </Pressable>
      </View>
      <View style={{ marginTop: 20 }}>
        <Text style={{ color: '#464646', fontSize: 28, fontWeight: 'bold' }}>Hola {name}!</Text>
        <Text style={{ color: '#7a7a7a', fontSize: 16, }}>Bienvenido de nuevo</Text>
      </View>
      <Modal
        animationType="slide"
        visible={setting}
        transparent={true}
      >
        <ModalSettings setSettings={setSettings} />
      </Modal>
    </View>
  )
}