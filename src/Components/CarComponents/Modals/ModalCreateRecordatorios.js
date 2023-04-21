
import { View, StyleSheet, Text, Pressable, Modal, Alert, ScrollView, TextInput, TouchableOpacity } from "react-native";
import { Colors } from "../../../Contants/Colors";
import Icon from 'react-native-vector-icons/Ionicons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useLayoutEffect, useState, useEffect } from "react";
import { Buttons } from "../../../Themes/buttons";
import { useMutation } from "@apollo/client";
import { CREATE_RECORDATORIO, EDIT_RECORDATORIO } from "../../../graphql/mutations";
import { GET_RECORDATORIOS } from "../../../graphql/querys";
import ModalCargando from "../../../utils/ModalCargando";
import ModalSuccesfull from "../../../utils/ModalSuccesfull";

let initialForm = {
  tipo: '',
  fechaInicial: '',
  fechaFinal: '',
  kilometrajeInicial: '',
  kilometrajeFinal: '',
  vehiculo: '',
  id: ''
}
const tipo = {
  "Seguro": 'Seguro',
  "Aceite": 'Cambio de aceite',
  "Impuestos": 'Impuestos',
  "Tecnicomecanica": 'Revision tecnico mecanica',
  "Recarga Extintor": 'Recarga Extintor',
  'Rotacion Llantas': 'Rotacion Llantas'

}
export default function ModalCreateRecordatorio({ setModalVisible, tipoRecordatorio, idVehiculo, edit, setEdit }) {
  const [visibleSuccesfull, setVisibleSuccesfull] = useState(false)
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [datePickerVisible2, setDatePickerVisible2] = useState(false);
  const [form, setForm] = useState(initialForm)
  const [proxCambio, setProxCambio] = useState(new Date())
  const [createRecordatorio, { loading, data, error }] = useMutation(CREATE_RECORDATORIO, { refetchQueries: [{ query: GET_RECORDATORIOS, variables: { id: idVehiculo } }] })
  const [editRecordatorio, result] = useMutation(EDIT_RECORDATORIO, { refetchQueries: [{ query: GET_RECORDATORIOS, variables: { id: idVehiculo } }] })
  const title1 = {
    "Seguro": 'Ultimo Pago',
    "Aceite": 'Ultimo Cambio',
    "Impuestos": 'Ultimo Pago',
    "Tecnicomecanica": 'Ultima Revision',
    'Recarga Extintor': 'Ultima Recarga',
    'Rotacion Llantas': 'Ultimo Cambio'
  }
  const title2 = {
    "Seguro": 'Proximo Pago',
    "Aceite": 'Proximo Cambio',
    "Impuestos": 'Proximo Pago',
    "Tecnicomecanica": 'Proxima Revision',
    'Recarga Extintor': 'Proxima Recarga',
    'Rotacion Llantas': 'Proximo Cambio'
  }

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };
  const showDatePicker2 = () => {
    setDatePickerVisible2(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };
  const hideDatePicker2 = () => {
    setDatePickerVisible2(false);
  };

  const handleConfirm = (date) => {
    hideDatePicker();
    setSelectedDate(date);
    let seconds = new Date(date).getTime()
    let sec = seconds + 60 * 60 * 24 * 365 * 1000
    setProxCambio(new Date(sec));
    setForm({ ...form, fechaInicial: date, fechaFinal: new Date(sec) })
  };
  const handleConfirm2 = (date) => {
    hideDatePicker2();
    setProxCambio(date);
    setForm({ ...form, fechaFinal: date })
  };
  const handleSubmit = async () => {
    setForm({ ...form, tipo: tipo[tipoRecordatorio], vehiculo: idVehiculo })
    if (edit) {
      editRecordatorio({ variables: form })
      setEdit(false)
    } else {
      delete form.id
      createRecordatorio({ variables: form })
    }
  }
  useLayoutEffect(() => {
    if (tipoRecordatorio, idVehiculo || edit) {
      if (edit) {
        setForm({ ...form, vehiculo: idVehiculo, tipo: tipo[tipoRecordatorio], fechaInicial: new Date(), fechaFinal: tipoRecordatorio === 'Aceite' && new Date(), id: edit })
      } else {
        setForm({ ...form, vehiculo: idVehiculo, tipo: tipo[tipoRecordatorio], fechaInicial: new Date(), fechaFinal: tipoRecordatorio === 'Aceite' && new Date() })
      }
    }
  }, [])
  useEffect(() => {
    if (error) {
      if (error?.message === 'Network request failed') {
        Alert.alert('Ha ocurrido un error', 'Revisa tu conexion a internet')
      } else {
        Alert.alert('Ha ocurrido un error', error?.message)
      }
    }
    if (result?.error) {
      if (result?.error?.message === 'Network request failed') {
        Alert.alert('Ha ocurrido un error', 'Revisa tu conexion a internet')
      } else {
        Alert.alert('Ha ocurrido un error', result?.error?.message)
      }
    }

  }, [error, result.error])

  useEffect(() => {
    if (data) {
      setVisibleSuccesfull(true)
      setTimeout(() => {
        setVisibleSuccesfull(false)
        setModalVisible(false)
      }, 2000)
    }
    if (result?.data) {
      setVisibleSuccesfull(true)
      setTimeout(() => {
        setVisibleSuccesfull(false)
        setModalVisible(false)
      }, 2000)
    }


  }, [data, result?.data])

  let disabled = form.kilometrajeFinal.length === 0 || form.kilometrajeInicial.length === 0 ? true : false
  return (
    <>
      <Pressable onPress={() => { setModalVisible(false), setEdit(false) }} style={styles.centeredView}>
        <ScrollView style={styles.modalView}>
          <View style={{ backgroundColor: 'gray', height: 3, width: '20%', alignSelf: 'center', marginBottom: 10 }} />
          <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', marginTop: 10 }}>
            {
              tipoRecordatorio === 'Aceite' &&
              < >
                <Icon name="water" color={Colors.primary} size={26} />
                <Text style={styles.title}>{edit && 'Editar '}Cambio de Aceite</Text></>
            }{
              tipoRecordatorio === 'Tecnicomecanica' &&
              <>
                <MaterialIcons name={'car-repair'} size={26} color={Colors.primary} />
                <Text style={styles.title}>{edit && 'Editar '}Tecnico Mecanica</Text></>
            }{
              tipoRecordatorio === 'Seguro' &&
              <>
                <FontAwesome5 name="car-crash" size={18} color={Colors.primary} />
                <Text style={styles.title}>{edit && 'Editar '}Seguro</Text></>
            }{
              tipoRecordatorio === 'Impuestos' &&
              <>
                <MaterialCommunityIcons name="file-percent" size={24} color={Colors.primary} />
                <Text style={styles.title}>{edit && 'Editar '}Impuestos</Text></>
            }{
              tipoRecordatorio === 'Recarga Extintor' &&
              <>
                <FontAwesome5 name="fire-extinguisher" size={24} color={Colors.primary} />
                <Text style={styles.title}>{edit && 'Editar '}Recarga Extintor</Text></>
            }{
              tipoRecordatorio === 'Rotacion Llantas' &&
              <>
                <MaterialCommunityIcons name="tire" size={24} color={Colors.primary} />
                <Text style={styles.title}>{edit && 'Editar '}Rotacion Llantas</Text></>
            }

          </View>
          <Text style={[styles.labelText, { marginTop: 20, }]}>{title1[tipoRecordatorio]}</Text>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
            <Pressable onPress={showDatePicker} style={{ backgroundColor: 'white', width: tipoRecordatorio === 'Aceite' ? '48%' : '100%', height: 50, paddingHorizontal: 10, alignItems: 'center', flexDirection: 'row', marginBottom: 10 }}>
              <Icon name="calendar-outline" color={Colors.gray} size={24} />
              <Text style={{ marginLeft: 10 }}>{selectedDate ? selectedDate.toLocaleDateString() : 'No date selected'}</Text>
              <DateTimePickerModal
                date={selectedDate}
                isVisible={datePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                maximumDate={new Date(2025, 11, 31)}
                minimumDate={new Date(2022, 0, 1)}
              />
            </Pressable>


            {tipoRecordatorio === 'Aceite' &&
              <Pressable style={{ backgroundColor: 'white', width: '48%', height: 50, paddingHorizontal: 10, alignItems: 'center', flexDirection: 'row', marginBottom: 10 }}>
                <Icon name="speedometer-outline" color={Colors.gray} size={24} />
                <TextInput onChangeText={(text) => setForm({ ...form, kilometrajeInicial: text.replace(/[.,\s]/g, '').trim() })} placeholder="25.000" maxLength={9} keyboardType='numeric' style={{ width: '60%', marginLeft: 10 }} />
                <View style={{ width: '20%', marginRight: 20 }}>
                  <Text style={styles.labelText}>Km</Text>
                </View>
              </Pressable>
            }
          </View>

          <Text style={[styles.labelText, { marginTop: 5, }]}>{title2[tipoRecordatorio]}</Text>
          {tipoRecordatorio === 'Aceite' ?
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Pressable style={{ backgroundColor: 'white', width: '48%', height: 50, paddingHorizontal: 10, alignItems: 'center', flexDirection: 'row', marginBottom: 10 }}>
                <Icon name="speedometer-outline" color={Colors.gray} size={24} />
                <TextInput onChangeText={(text) => setForm({ ...form, kilometrajeFinal: text.replace(/[.,\s]/g, '').trim() })} placeholder={'30.000'} maxLength={9} keyboardType='numeric' style={{ width: '60%', marginLeft: 10 }} />
                <View style={{ width: '20%', marginRight: 20 }}>
                  <Text style={styles.labelText}>Km</Text>
                </View>
              </Pressable>
            </View>
            :
            <Pressable onPress={showDatePicker2} style={{ backgroundColor: 'white', width: '100%', height: 50, paddingHorizontal: 10, alignItems: 'center', flexDirection: 'row', marginBottom: 10 }}>
              <Icon name="calendar-outline" color={Colors.gray} size={24} />
              <Text style={{ marginLeft: 10 }}>{proxCambio ? proxCambio.toLocaleDateString() : 'No date selected'}</Text>
              <DateTimePickerModal
                date={proxCambio}
                isVisible={datePickerVisible2}
                mode="date"
                onConfirm={handleConfirm2}
                onCancel={hideDatePicker2}
                maximumDate={new Date(2025, 11, 31)}
                minimumDate={new Date(2022, 0, 1)}
              />
            </Pressable>
          }
          <TouchableOpacity
            disabled={tipoRecordatorio === 'Aceite' && disabled ? true : false }
            onPress={handleSubmit}
            style={[Buttons.primary, { width: '100%', marginTop: 20, backgroundColor: tipoRecordatorio === 'Aceite' && disabled ? 'gray' : Colors.primary }]}
          >
            <Text style={{ color: 'white', fontSize: 18, fontWeight: "600" }}>{!edit ? 'Crear Recordatorio' : 'Guardar cambios'}</Text>
          </TouchableOpacity>
        </ScrollView>
        {
          loading &&
          <Modal
            animationType="fade"
            visible={loading}
            transparent={true}
          >
            <ModalCargando text='Creando Recordatorio...' />
          </Modal>

        }
        {
          result?.loading &&
          <Modal
            animationType="fade"
            visible={result?.loading}
            transparent={true}
          >
            <ModalCargando text='Editando Recordatorio...' />
          </Modal>

        }
        {visibleSuccesfull &&
          <Modal
            animationType="fade"
            visible={visibleSuccesfull}
            transparent={true}
          >
            <ModalSuccesfull text={'+5 pts'} description={`Recordatorio ${edit ? 'editado' : 'creado'}`} />
          </Modal>
        }
      </Pressable>

    </>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: "center",
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: '100%',
    width: '100%',

  },
  modalView: {
    //   margin: 20,
    //   backgroundColor: "#f3f3f3",
    //   borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: "absolute",
    bottom: 0,
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#F2F4F9',
  },
  modalView2: {
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: "absolute",
    bottom: 0,
    height: 150,
    paddingHorizontal: 10,
    width: '100%',
    borderTopLeftRadius: 20,
    alignItems: "center",
    borderTopRightRadius: 20,
    backgroundColor: "#f3f3f3",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
  },
  viewDetail: {
    marginTop: 5, flexDirection: 'row', justifyContent: 'space-between', width: '100%'
  },
  label1: {
    color: Colors.gray,
    fontSize: 16
  },
  title: {
    fontSize: 20,
    marginLeft: 10,
    color: Colors.primary
  },
  labelText: {
    marginBottom: 5, fontSize: 16, color: Colors.gray,
  },
  label2: {
    color: Colors.secondary,
    fontWeight: '600',
    fontSize: 16
  }
});