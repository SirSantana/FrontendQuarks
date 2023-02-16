import { View, Text, StyleSheet, Pressable, Image, TouchableOpacity, Linking } from 'react-native'
import { Buttons } from '../Themes/buttons';
import { Colors } from '../Contants/Colors';

export default function ModalPremium({ setPremiumModal }) {
  const sendEmail = () => {
    let to = 'quarkscolombia@gmail.com'
    let subject = 'Cuenta Premium'
    let body = 'Estoy interesado en adquirir el nivel premium...'
    Linking.openURL(`mailto:${to}?subject=${subject}&body=${body}`)
  }
  return (
    <Pressable onPress={() => setPremiumModal(false)} style={styles.centeredView}>
      <View style={styles.modalView}>
        <Image style={{ width: 30, height: 30 }} source={require('../../assets/Logo1.png')} />
        <Text style={{ marginVertical: 20, textAlign: 'center' }}>Esta caracteristica y otras mas, solo estan disponibles para los usuarios Premium.</Text>
        <Text style={{ marginVertical: 20, marginTop: 5, textAlign: 'center' }}><Text style={{ fontWeight: 'bold' }}> Por solo $ 1.670 pesos mensuales.</Text> Contacta para conocer este y otro beneficios mas que te ayudaran a ahorrar un buen dinero.</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
          <TouchableOpacity onPress={sendEmail} style={[Buttons.primary, { width: "45%" }]}><Text style={{ color: 'white', fontWeight: '600' }}>Contactar</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => setPremiumModal(false)} style={[Buttons.primaryOutlined, { width: "45%" }]}>
            <Text style={{ color: Colors.primary, fontWeight: '600' }}>Regresar</Text>
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
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: '100%'
  },
  modalView: {
    margin: 20,
    backgroundColor: '#f3f3f3',
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    // shadowOpacity: 0.25,
    // shadowRadius: 4,
    // elevation: 5
    // position: "absolute",
    // bottom: 0,
    // height: 250,
    // width:'100%',
    // borderTopLeftRadius: 20,
    // justifyContent: "center",
    // alignItems: "center",
    // borderTopRightRadius: 20,
    // backgroundColor: "white"
  },
});