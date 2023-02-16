import { useEffect, useState } from "react";
import { View, ScrollView, Modal, TouchableOpacity, StyleSheet } from "react-native"
import HeaderProfile from "../../Components/ProfileComponents/HeaderProfile";
import OptionsMenu from "../../Components/ProfileComponents/OptionsMenu";
import CarCardPreviusView from "../../Components/ProfileComponents/CarProfile/CarCardPreviusView";
import Icon from 'react-native-vector-icons/Ionicons';
import ModalQuarksito from "../../Components/ProfileComponents/HomeProfile/ModalQuarksito";
import ModalQuarksitoCarProfile from "../../Components/ProfileComponents/CarProfile/ModalQuarksitoCarProfile";
import useAuth from "../../hooks/useAuth";
import { LinearGradient } from 'expo-linear-gradient';
import Leyes from "../../Components/ProfileComponents/LeyesProfile/Leyes";
import ModalLeyes from "../../Components/ProfileComponents/LeyesProfile/LeyesModal";

export default function ProfileScreenIndex() {
  const [tab, setTab] = useState('vehiculo')
  const [visibleModal, setVisibleModal] = useState({ modal1: false, modal2: false, modal3: false })
  const { user } = useAuth()

  const handlerHelper = () => {
    if (tab === 'home') setVisibleModal({ ...visibleModal, modal1: true })
    if (tab === 'vehiculo') setVisibleModal({ ...visibleModal, modal2: true })
    if (tab === 'leyes') setVisibleModal({ ...visibleModal, modal3: true })
  }
  useEffect(() => {
    if (user?.puntos === 100) {
       setVisibleModal({ ...visibleModal, modal1: true })
    }
  }, [user])
  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          height: "100%",
          backgroundColor: 'white'
        }}
      >
        <View style={{ backgroundColor: '#f7f7f7', paddingBottom: 20, borderBottomRightRadius: 20, borderBottomLeftRadius: 20 }}>
          <HeaderProfile name={user?.name} puntos={user?.puntos} />
        </View>
        <LinearGradient
          colors={['#F50057', '#5B0221']}
          start={{ x: 0, y: 0 }}
          end={{ x: 0, y: 1 }}
          style={{borderTopRightRadius:20, borderTopLeftRadius:20, height:'100%'}}

        >
          <OptionsMenu setTab={setTab} tab={tab} />

          {tab === 'vehiculo' && <CarCardPreviusView />}
          {tab === 'leyes' && <Leyes />}
        </LinearGradient>
      </ScrollView>
      <Modal
        animationType="fade"
        visible={visibleModal.modal1}
        transparent={true}
      >
        <ModalQuarksito setVisibleModal={setVisibleModal} visibleModal={visibleModal} name={user?.name} />
      </Modal>
      <Modal
        animationType="fade"
        visible={visibleModal.modal2}
        transparent={true}

      >
        <ModalQuarksitoCarProfile setVisibleModal={setVisibleModal} visibleModal={visibleModal} name={user?.name} />
      </Modal>
      <Modal
        animationType="fade"
        visible={visibleModal.modal3}
        transparent={true}
      >
        <ModalLeyes setVisibleModal={setVisibleModal} visibleModal={visibleModal} name={user?.name} />
      </Modal>
      <TouchableOpacity onPress={handlerHelper} style={styles.ContainerIconAdd}>
        <Icon name="help-outline" color={'white'} size={30} />
      </TouchableOpacity>
    </>
  )
}
const styles = StyleSheet.create({
  ContainerIconAdd: {
    position: 'absolute', bottom: 20, zIndex: 999, right: 20, width: 54, height: 54, elevation: 10, borderRadius: 27, backgroundColor: '#f50057', alignItems: 'center', justifyContent: 'center'
  }
})