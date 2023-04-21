import { View, Text, StyleSheet, Pressable, Image, TouchableOpacity, Modal, TextInput, Alert } from 'react-native'
import { Buttons } from '../Themes/buttons';
import { Colors } from '../Contants/Colors';
import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { INTERESADO_PREMIUM } from '../graphql/mutations';

export default function ModalPremium({ setPremiumModal }) {
  const [interesado, setInteresado] = useState(false)
  const [celular, setCelular] = useState(null)
  const [interesadoPremium, { loading, error, data }] = useMutation(INTERESADO_PREMIUM)

  const handleSendPremium = () => {
    if (!celular) {
      Alert.alert('Debes agregar tu numero')
    }
    interesadoPremium({ variables: {celular} })
  }
  if(error){
    Alert.alert('Ha ocurrido un error, revisa tu conexion')
  }
  useEffect(()=>{
    if(loading){
      Alert.alert('Enviando...')
    }
  },[loading])
  useEffect(()=>{
    if(data){
      Alert.alert('Se ha enviado correctamente, pronto te escribiremos')
      setInteresado(false)
      setPremiumModal(false)
    }
  },[data])
  
  // const sendEmail = () => {
  //   let to = 'quarkscolombia@gmail.com'
  //   let subject = 'Cuenta Premium'
  //   let body = 'Estoy interesado en adquirir el nivel premium, mi numero de celular es...'
  //   Linking.openURL(`mailto:${to}?subject=${subject}&body=${body}`)
  // }
  return (
    <Pressable onPress={() => setPremiumModal(false)} style={styles.centeredView}>
      <View style={styles.modalView}>
        <Image style={{ width: 30, height: 30 }} source={require('../../assets/Logo1.png')} />
        <Text style={{ marginVertical: 20, textAlign: 'center' }}>Esta caracteristica y otras mas, solo estan disponibles para los usuarios Premium.</Text>
        <Text style={{ marginVertical: 20, marginTop: 5, textAlign: 'center' }}><Text style={{ fontWeight: 'bold' }}> Por solo $ 1.670 pesos mensuales.</Text> Contacta para conocer este y otro beneficios mas que te ayudaran a ahorrar un buen dinero.</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
          <TouchableOpacity onPress={() => setInteresado(true)} style={[Buttons.primary, { width: "45%" }]}><Text style={{ color: 'white', fontWeight: '600' }}>Estoy interesado</Text></TouchableOpacity>
          <TouchableOpacity onPress={() => setPremiumModal(false)} style={[Buttons.primaryOutlined, { width: "45%" }]}>
            <Text style={{ color: Colors.primary, fontWeight: '600' }}>Regresar</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal
        animationType="slide"
        visible={interesado}
        transparent={true}
        onRequestClose={() => {
          setInteresado(false);
        }}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>

            <Text style={{ fontSize: 16, color: '#373737', textAlign: 'center' }}>Danos tu numero de celular, nosotros de contactaremos pronto!</Text>
            <TextInput onChangeText={(e) => setCelular(e)} maxLength={10} keyboardType='numeric' placeholder={'Ejem: 3143551942'} style={{ width: '90%', borderRadius: 5, marginLeft: 10, borderColor: '#373737', borderWidth: 1, paddingHorizontal: 10, height: 40, marginVertical: 20 }} />
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '90%', alignSelf:'center' }}>
              <TouchableOpacity onPress={handleSendPremium} style={[Buttons.primary, { width: "45%" }]}><Text style={{ color: 'white', fontWeight: '600' }}>Enviar</Text></TouchableOpacity>
              <TouchableOpacity onPress={() => setInteresado(false)} style={[Buttons.primaryOutlined, { width: "45%" }]}>
                <Text style={{ color: Colors.primary, fontWeight: '600' }}>Regresar</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>
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