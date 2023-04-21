import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import { View, Text, Modal, Pressable, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import useAuth from '../../hooks/useAuth';
import ModalProfile from '../../utils/ModalProfile';
import ModalSettings from './ModalSettings';

export default function HeaderProfile({ name, puntos }) {
  const [setting, setSettings] = useState(false)
  const [visibleProfile, setVisibleProfile] = useState(false)
  const { user } = useAuth()
  const navigation = useNavigation()
  return (
    <View style={{ padding: '5%', }}>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => navigation.navigate('Score')} style={{ width: '50%', flexDirection: 'row', alignItems: 'center', height: 40, }}>
          <Icon name="trophy" color={'#E9D200'} size={28} />
          <View style={{ marginLeft: 10, height: '90%', width: '70%', justifyContent: 'center', backgroundColor: '#f50057', borderRadius: 10, alignItems: 'center', }} source={require('../../../assets/Rectangule4.png')}>
            <Text style={{ color: 'white', fontSize: 14, fontWeight: 'bold' }}> {puntos ? puntos : 0}  pts</Text>
          </View>
        </TouchableOpacity>
        <Icon name="settings" onPress={() => setSettings(true)} color={'#828282'} size={28} />

      </View>
      <View style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', }}>
          <TouchableOpacity onPress={() => setVisibleProfile(true)} style={{ backgroundColor: '#BFBFBF', width: 50, borderRadius: 50, height: 50, alignItems: 'center', justifyContent: 'center', marginRight: 8 }}>
            <Text style={{ color: 'white', fontSize: 20 }}>{name?.slice(0, 1)}</Text>
          </TouchableOpacity>
          <View>
            <Text style={{ color: '#373737', fontSize: 20 }}>Bienvenido</Text>
            <Text style={{ color: '#373737', fontSize: 20, lineHeight: 20, fontWeight: 'bold' }}>{name}!</Text>
          </View>
        </View>
        {user?.premium > 0 && <Pressable style={{ backgroundColor: '#FFD4DA', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', borderRadius: 8, paddingHorizontal: 16, paddingVertical: 8 }}>
          <Text style={{ color: '#f50057', fontSize: 16, lineHeight: 20, fontWeight: 'bold', marginRight: 8 }}>Premium
          </Text>
          <Icon name="star" color={'#f50057'} size={16} />

        </Pressable>}
      </View>
      <Modal
        animationType="slide"
        visible={setting}
        transparent={true}
      >
        <ModalSettings setSettings={setSettings} />
      </Modal>
      <Modal
        animationType="fade"
        visible={visibleProfile}
        transparent={true}
      >
        <ModalProfile setVisibleProfile={setVisibleProfile} user={user} id={user?.id} />
      </Modal>
    </View>
  )
}