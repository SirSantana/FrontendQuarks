import AsyncStorage from "@react-native-async-storage/async-storage"
import { useNavigation } from "@react-navigation/native"
import { StyleSheet, View, Text, Pressable, Dimensions, Modal, TouchableOpacity } from "react-native"
import { Colors } from "../../Contants/Colors"
import useAuth from "../../hooks/useAuth"
import Icon from 'react-native-vector-icons/Ionicons';
import { useState } from "react"
// import Sugerencias from "./Sugerencias"
import EditProfile from "./EditProfile"
import OptionSetting from "../../utils/OptionSetting"
import ModalPremium from "../../utils/ModalPremium"


export default function ModalSettings({ setSettings }) {
  const { logout, user } = useAuth()
  const navigation = useNavigation()
  const { height } = Dimensions.get('window')
  const [visibleSugerencia, setVisibleSugerencia] = useState(false)
  const [visibleEdit, setVisibleEdit] = useState(false)
  const [premiumModal, setPremiumModal] = useState(false)


  const handleLogout = () => {
    AsyncStorage.clear().then(() => logout())
    navigation.reset({
      index: 0,
      routes: [{ name: 'Vehiculo' }]
    })
  }
  return (
    <Pressable onPress={() => setSettings(false)} style={[styles.centeredView, { height: height, justifyContent: 'center' }]}>
      <View style={styles.modalView2}>
        <View style={[styles.separador]} />
        <Text style={{ fontSize: 16, margin: 10, fontWeight: 'bold', color: user?.premium > 0 ? "#E9D200" : Colors.secondary }}>Cuenta nivel {user?.premium <= 0 && 'Gratuito'} {user?.premium === 1 && 'Premium'} {user?.premium === 2 && 'Premium +'} </Text>
        <OptionSetting setVisible={setPremiumModal} text={user?.premium > 0 ? 'Ya eres premium' : 'Conviertete en Premium'} icon={'star'} />
        {/* <OptionSetting setVisible={setVisibleProfile} text={'Ver perfil'} icon={'send-outline'} /> */}
        <OptionSetting setVisible={setVisibleEdit} text={'Editar perfil'} icon={'create-outline'} />
        <OptionSetting setVisible={setVisibleSugerencia} text={'Enviar Sugerencias'} icon={'send-outline'} />
        <View style={[styles.separador, { backgroundColor: '#f3f3f3', width: '90%', height: 2 }]} />
        {user?.email &&
          <TouchableOpacity onPress={handleLogout} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 16, margin: 10, color: Colors.primary }} >Cerrar Sesion </Text>
            <Icon name="log-out-outline" color={Colors.primary} size={24} style={{ marginLeft: 10, alignSelf: 'center' }} />
          </TouchableOpacity>
        }

      </View>
      {/* <Modal
        animationType="fade"
        visible={visibleSugerencia}
        transparent={true}
      >
        <Sugerencias setVisibleSugerencia={setVisibleSugerencia} />
      </Modal> */}
      <Modal
        animationType="slide"
        visible={visibleEdit}
        transparent={true}
      >
        <EditProfile user={user} setVisibleEdit={setVisibleEdit} />
      </Modal>
      <Modal
        animationType="fade"
        visible={premiumModal}
        transparent={true}
      >
        <ModalPremium setPremiumModal={setPremiumModal} />
      </Modal>

    </Pressable>

  )
}

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: "center",
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: '100%',
  },
  separador: {
    backgroundColor: 'gray', height: 3, width: '20%', alignSelf: 'center', marginVertical: 10
  },
  modalView2: {
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: "absolute",
    bottom: 0,
    paddingHorizontal: 10,
    paddingBottom: 10,
    width: '100%',
    borderTopLeftRadius: 20,
    alignItems: "center",
    borderTopRightRadius: 20,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
  },
})