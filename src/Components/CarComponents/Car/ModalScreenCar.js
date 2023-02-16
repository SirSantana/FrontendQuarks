import { TouchableOpacity } from 'react-native';
import { Modal, View, Text, StyleSheet, Pressable, Image, ActivityIndicator } from 'react-native'
import { Colors } from '../../../Contants/Colors';
import { Buttons } from '../../../Themes/buttons';

export default function ModalScreenCar({ setVisibleModal, visibleModal, setModalVisible2 }) {
  const handleModal = () => {
    setModalVisible2(true)
    setVisibleModal(false)
  }
  return (
    <Pressable onPress={() => setModalVisible2(false)} style={styles.centeredView}>
      <View style={styles.modalView}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: '10%' }}>
          <Image onLoadStart={() => <ActivityIndicator color={Colors.primary} />} style={{ width: 40, height: 40 }} source={require('../../../../assets/Logo1.png')} />
          <Text style={styles.titleBlue}>Quarksito dice...</Text>
        </View>
        <Text style={styles.descriptionBlue}>En esta seccion <Text style={{ color: Colors.primary }}>encontrarás este pequeño menu.</Text> Te dirigira a crear un gasto, a ver tus gastos diarios, mensuales y anuales. Y tus recordatorios.</Text>
        <Image onLoadStart={() => <ActivityIndicator color={Colors.primary} />} style={{ width: '100%', height: 130 }} source={require('../../../../assets/menuModal.jpg')} />

        <Text style={styles.descriptionBlue}>Antes que nada,  <Text style={{ color: Colors.primary }}>¿por qué no vamos a crear tu primer gasto?,</Text> para que empieces con el pie derecho a llevar tu contabilidad!</Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: '5%' }}>
          <TouchableOpacity onPress={handleModal} style={[Buttons.primary, { width: '48%' }]}>
            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Entendido</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#f7f7f7',
    borderRadius: 20,
    justifyContent: 'space-between',
    paddingTop: '10%',
    width: '90%',
    padding: 20,
    shadowColor: "#000",
    flexDirection: 'column',
    shadowOffset: {
      width: 0,
      height: 2
    },
  },
  titleBlue: {
    marginLeft: 20,
    fontSize: 16,
    fontWeight: "600",
    color: Colors.secondary,
  },
  descriptionBlue: {
    color: '#464646',
    fontSize: 16,
    marginBottom: 10
  }

});