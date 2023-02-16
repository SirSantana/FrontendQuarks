


import { TouchableOpacity } from 'react-native';
import {  View, Text, StyleSheet, Pressable, Image, ActivityIndicator } from 'react-native'
import { Colors } from '../../../Contants/Colors';
import { Buttons } from '../../../Themes/buttons';

export default function ModalScreenRecordatorio({ setVisibleModal,}) {
  
  return (
    <Pressable onPress={() => setVisibleModal(false)} style={styles.centeredView}>
      <View style={styles.modalView}>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: '10%' }}>
          <Image onLoadStart={() => <ActivityIndicator color={Colors.primary} />} style={{ width: 40, height: 40 }} source={require('../../../../assets/Logo1.png')} />
          <Text style={styles.titleBlue}>Quarksito dice...</Text>
        </View>
        <Text style={styles.descriptionBlue}>En esta seccion <Text style={{ color: Colors.primary }}></Text>Podras crear y revisar tus recordatorios.</Text>
        <Text style={styles.descriptionBlue}>Antes que nada,  <Text style={{ color: Colors.primary }}>¿por qué no vamos a crear tu primer recordatorio?,</Text> </Text>
        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginTop: '5%' }}>
          <TouchableOpacity onPress={() => setVisibleModal(false)} style={[Buttons.primary, { width: '48%' }]}>
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