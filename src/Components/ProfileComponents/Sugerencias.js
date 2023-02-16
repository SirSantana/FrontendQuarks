import { View, Text, StyleSheet, Pressable, Image, Button, Linking } from 'react-native'
import { Colors } from '../../Contants/Colors'


export default function Sugerencias({ setVisibleSugerencia }) {
  const sendEmail = () => {
    let to = 'quarkscolombia@gmail.com'
    let subject = 'Sugerencias o Errores para Quarks'
    let body = 'Cuentanos...'
    Linking.openURL(`mailto:${to}?subject=${subject}&body=${body}`)
  }
  return (
    <Pressable onPress={() => setVisibleSugerencia(false)} style={styles.centeredView}>
      <View style={styles.modalView}>
        <Image style={{ width: 30, height: 30 }} source={require('../../../assets/Logo1.png')} />
        <Text style={{ fontSize: 20, color: Colors.primary, fontWeight: '600' }}>Sugerencias o Errores</Text>
        <Text style={{ marginVertical: 10, fontSize: 14, textAlign: 'center', color: Colors.gray }}>Es muy importante que nos hagas saber si encuentras fallas, errores o sugerencias que tengas para ofrecerte un mejor servicio. Gracias!</Text>
        <Button onPress={() => sendEmail()} title='Enviar Email' />
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
    backgroundColor: '#f3f3f3',
    borderRadius: 20,
    padding: 35,
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

  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
});