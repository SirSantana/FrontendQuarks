import { useNavigation } from '@react-navigation/native';
import { TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet, Pressable, Image, ActivityIndicator } from 'react-native'
import { Colors } from '../../../Contants/Colors';
import { Buttons } from '../../../Themes/buttons';

export default function ModalQuarksito({ setVisibleModal, visibleModal, name }) {
  const navigation = useNavigation()
  return (
    <Pressable onPress={() => setVisibleModal({ ...visibleModal, modal1: false })} style={styles.centeredView}>
      <View style={styles.modalView}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: '10%' }}>
          <Image onLoadStart={() => <ActivityIndicator color={Colors.primary} />} style={{ width: 40, height: 40 }} source={require('../../../../assets/Logo1.png')} />
          <Text style={styles.titleBlue}>Quarksito dice...</Text>
        </View>
        <Text style={styles.descriptionBlue}>Hola {name}, yo soy <Text style={{ color: Colors.primary }}>quarksito</Text> te ayudaré en lo que necesites.</Text>
        <Text style={styles.descriptionBlue}>Para que puedas llevar tus gastos y agregar tus recordatorios, <Text style={{ color: Colors.primary }}>primero debemos crear tu vehículo.</Text></Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: '5%' }}>
          <TouchableOpacity onPress={() => setVisibleModal({ ...visibleModal, modal1: false })} style={{ width: '48%' }}>
            <Text style={{ color: Colors.secondary }}>Después lo haré</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => { navigation.navigate('Vehiculo', { screen: 'Crear vehiculo' }), setVisibleModal({ ...visibleModal, modal1: false }) }} style={[Buttons.primary, { width: '48%' }]}>
            <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Vamos allá!</Text>
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
    padding: 40,
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