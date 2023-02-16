import { useState } from 'react';
import { Modal } from 'react-native';
import { View, TouchableOpacity, Text } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../../Contants/Colors';
import ModalSelectTime from './ModalSelectTime';

let meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

export default function TimeSelectTime({setResumenYear, resumenYear, setMonthActual, setYearActual, yearActual,monthActual}) {
  const [modalVisible, setModalVisible] = useState(false)
  const [tipo, setTipo] = useState(null)
  return (
    <View style={{ backgroundColor: '#f1f1f1', borderRadius: 10, width: '50%', alignSelf: 'center', justifyContent: 'space-around', flexDirection: 'row', paddingVertical: 5, paddingHorizontal: 10, marginTop: 50, marginBottom: 20, alignItems: 'center', }}>
      <TouchableOpacity onPress={()=> {setModalVisible(true), setTipo('mes')}}  style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ color: Colors.secondary, fontWeight: '500', fontSize: 16, marginLeft: 5 }}>{resumenYear ?'Todo el año':meses[monthActual] }</Text>
        <Icon name="chevron-down-outline" color={'gray'} size={24} />
      </TouchableOpacity>

      <TouchableOpacity onPress={()=> {setModalVisible(true), setTipo('año')}} style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ color: Colors.secondary, fontWeight: '500', fontSize: 16, marginLeft: 5 }}>{yearActual}</Text>
        <Icon name="chevron-down-outline" color={'gray'} size={24} />
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <ModalSelectTime tipo={tipo} setModalVisible={setModalVisible} setResumenYear={setResumenYear}setMonthActual={setMonthActual}   setYearActual={setYearActual} yearActual={yearActual} monthActual={monthActual}/>
      </Modal>
    </View>
  )
}