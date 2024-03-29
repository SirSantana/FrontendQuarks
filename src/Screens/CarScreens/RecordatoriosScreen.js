import { View, Text, StyleSheet, TouchableOpacity, Modal, ActivityIndicator, Alert } from 'react-native'
import { Colors } from '../../Contants/Colors'
import Icon from 'react-native-vector-icons/Ionicons';
import { MaterialIcons } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_RECORDATORIOS } from '../../graphql/querys';
import { options } from '../../utils/dateEs';
import PriceFormat from '../../utils/priceFormat';
import ModalConfirmDelete from '../../utils/ModalConfirmDelete';
import useAuth from '../../hooks/useAuth';
import ModalPremium from '../../utils/ModalPremium';
import ModalCreateRecordatorio from '../../Components/CarComponents/Modals/ModalCreateRecordatorios';

export default function RecordatoriosScreen({ item }) {
  const [tipoRecordatorio, setTipoRecordatorio] = useState()
  const [modalVisible, setModalVisible] = useState(false)
  const [edit, setEdit] = useState(false)
  const { loading, data, error } = useQuery(GET_RECORDATORIOS, { variables: { id: item } })
  const [visibleDelete, setVisibleDelete] = useState(false)
  const [modalQuarks, setModalQuarks] = useState(false)
  const [premiumModal, setPremiumModal] = useState(false)
  const { user } = useAuth()
  let recordatorios = [[], [], [], [], [], []]
  if (data) {
    data?.getRecordatorios.map(el => {
      if (el.tipo === 'Revision tecnico mecanica') recordatorios[0].push(el)
      if (el.tipo === 'Seguro') recordatorios[1].push(el)
      if (el.tipo === 'Impuestos') recordatorios[2].push(el)
      if (el.tipo === 'Cambio de aceite') recordatorios[3].push(el)
      if (el.tipo === 'Recarga Extintor') recordatorios[4].push(el)
      if (el.tipo === 'Rotacion Llantas') recordatorios[5].push(el)
    })
  }
  useEffect(() => {
    if (data?.getRecordatorios.length <= 0) {
      return setModalQuarks(true)
    }
  }, [data])
  const handleCreateRecordatorio = (tipo, edit) => {
    if (!item) {
      return Alert.alert('Primero debes crear un vehiculo')
    }
    if (!user?.premium > 0) {
      if (tipo === 'Recarga Extintor' || tipo === 'Seguro' || tipo === 'Rotacion Llantas' || tipo === 'Impuestos') {
        return setPremiumModal(true)
      } else {
        if (edit) setEdit(edit)
        setTipoRecordatorio(tipo)
        setModalVisible(true)
      }
    } else {
      if (edit) setEdit(edit)
      setTipoRecordatorio(tipo)
      setModalVisible(true)
    }

  }
  function Dias(el) {
    let fecha = new Date(el?.fechaFinal)
    const dateActual = new Date()
    let diasFaltantes = fecha.getTime() - dateActual.getTime()
    let dias = Math.round(diasFaltantes / (1000 * 60 * 60 * 24))
    return dias
  }

  useEffect(() => {
    if (loading) {
      <ActivityIndicator style={{ flex: 1 }} color={Colors.primary} size='large' />
    }
  }, [loading])
  useEffect(() => {
    if (error) {
      if (error?.message === 'Network request failed') {
        Alert.alert('Ha ocurrido un error', 'Revisa tu conexion a internet')
      } else {
        Alert.alert('Ha ocurrido un error', error?.message)
      }
    }
  }, [error])


  return (
    <View >
      <View style={{ flexDirection: 'column', }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
          <Text style={styles.Title1}>Cambio de Aceite</Text>
          {recordatorios[3].length > 0 &&
            <View style={{ flexDirection: 'row' }}>
              <Icon onPress={() => handleCreateRecordatorio('Aceite', recordatorios[3][0].id)} name="create-outline" color={Colors.primary} size={24} />
              <Icon onPress={() => { setVisibleDelete(true), setEdit(recordatorios[3][0].id) }} name="trash-outline" color={Colors.primary} size={24} />
            </View>
          }
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ backgroundColor: '#FFEBF0', justifyContent: 'center', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, borderTopRightRadius: 20, alignItems: 'center', width: 50, height: 50, }}>
            <Icon name="water" color={Colors.primary} size={24} />
          </View>
          {recordatorios[3].length > 0
            ?
            <View style={{ flexDirection: 'column', marginLeft: '10%' }}>
              <Text style={{ color: Colors.gray, fontSize: 16 }}>Proximo Cambio</Text>
              <Text style={{ color: '#373737', fontWeight: 'bold', fontSize: 18 }}>A los {PriceFormat({ price: recordatorios[3][0]?.kilometrajeFinal })} km</Text>
            </View>
            :
            <TouchableOpacity onPress={() => handleCreateRecordatorio('Aceite')} style={{ flexDirection: 'row', marginLeft: '10%', alignItems: 'center' }}>
              <Icon name="add-outline" color={Colors.primary} size={32} />
              <Text style={{ color: Colors.primary, fontSize: 16 }}>Agregar Cambio de aceite</Text>
            </TouchableOpacity>
          }

        </View>
      </View>
      <View style={{ backgroundColor: '#f3f3f3', width: '100%', height: 2, marginVertical: 15 }} />


      <View style={{ flexDirection: 'column', }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
          <Text style={styles.Title1}>Revision Tecnico mecanica</Text>
          {recordatorios[0].length > 0 && <View style={{ flexDirection: 'row' }}>
            <Icon onPress={() => handleCreateRecordatorio('Tecnicomecanica', recordatorios[0][0].id)} name="create-outline" color={Colors.primary} size={24} />
            <Icon onPress={() => { setVisibleDelete(true), setEdit(recordatorios[0][0].id) }} name="trash-outline" color={Colors.primary} size={24} />
          </View>}

        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ backgroundColor: '#FFEBF0', justifyContent: 'center', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, borderTopRightRadius: 20, alignItems: 'center', width: 50, height: 50, }}>
            <MaterialIcons name={'car-repair'} size={26} color={Colors.primary} />
          </View>
          {recordatorios[0].length > 0
            ?
            <View style={{ flexDirection: 'column', marginLeft: '10%' }}>
              <Text style={{ color: Colors.gray, fontSize: 16, marginBottom: 5 }}>Proxima Revision</Text>
              <Text style={{ color: '#373737', fontWeight: 'bold', fontSize: 18 }}>El {new Date(recordatorios[0][0]?.fechaFinal).toLocaleDateString('es-ES', options)}</Text>
              <Text style={{ color: Dias(recordatorios[0][0]) < 10 ? Colors.primary : Colors.multaColor, fontWeight: '600', fontSize: 16 }}>Faltan {Dias(recordatorios[0][0])} Días</Text>
            </View>
            :
            <TouchableOpacity onPress={() => handleCreateRecordatorio('Tecnicomecanica')} style={{ flexDirection: 'row', marginLeft: '10%', alignItems: 'center' }}>
              <Icon name="add-outline" color={Colors.primary} size={32} />
              <Text style={{ color: Colors.primary, fontSize: 16 }}>Agregar Revisión</Text>
            </TouchableOpacity>
          }


        </View>
      </View>
      <View style={{ backgroundColor: '#f3f3f3', width: '100%', height: 2, marginVertical: 15 }} />

      <View style={{ flexDirection: 'column' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
          <Text style={styles.Title1}>Impuestos <Icon name={'star'} color={'#F6DE0A'} size={20} /></Text>
          {recordatorios[2].length > 0 &&
            <View style={{ flexDirection: 'row' }}>
              <Icon onPress={() => handleCreateRecordatorio('Impuestos', recordatorios[2][0].id)} name="create-outline" color={Colors.primary} size={24} />
              <Icon onPress={() => { setVisibleDelete(true), setEdit(recordatorios[2][0].id) }} name="trash-outline" color={Colors.primary} size={24} />
            </View>}
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ backgroundColor: '#FFEBF0', justifyContent: 'center', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, borderTopRightRadius: 20, alignItems: 'center', width: 50, height: 50, }}>
            <MaterialCommunityIcons name="file-percent" size={24} color={Colors.primary} />
          </View>
          {recordatorios[2].length > 0
            ?
            <View style={{ flexDirection: 'column', marginLeft: '10%' }}>
              <Text style={{ color: Colors.gray, fontSize: 16, marginBottom: 5 }}>Proximo pago</Text>
              <Text style={{ color: '#373737', fontWeight: 'bold', fontSize: 18 }}>El {new Date(recordatorios[2][0]?.fechaFinal).toLocaleDateString('es-ES', options)}</Text>
              <Text style={{ color: Colors.multaColor, fontWeight: '600', fontSize: 16 }}>Faltan {Dias(recordatorios[2][0])} Días</Text>
            </View>
            :
            <TouchableOpacity onPress={() => handleCreateRecordatorio('Impuestos')} style={{ flexDirection: 'row', marginLeft: '10%', alignItems: 'center' }}>
              <Icon name="add-outline" color={Colors.primary} size={32} />
              <Text style={{ color: Colors.primary, fontSize: 16 }}>Agregar Impuestos</Text>
            </TouchableOpacity>
          }
          {/* <View style={{flexDirection:'column',marginLeft:'10%'}}>
        <Text style={{color:Colors.gray, fontSize:'16', marginBottom:5}}>Proximo Pago</Text>
        <Text style={{color:Colors.secondary, fontWeight:'bold', fontSize:'18'}}>El 22-09-2023</Text>
        <Text style={{color:Colors.multaColor, fontWeight:'600', fontSize:'16'}}>Faltan 46 Días</Text>
        </View> */}

        </View>
      </View>
      <View style={{ backgroundColor: '#f3f3f3', width: '100%', height: 2, marginVertical: 15 }} />

      <View style={{ flexDirection: 'column' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
          <Text style={styles.Title1}>Seguro <Icon name={'star'} color={'#F6DE0A'} size={20} /></Text>
          {recordatorios[1].length > 0 &&
            <View style={{ flexDirection: 'row' }}>
              <Icon onPress={() => handleCreateRecordatorio('Seguro', recordatorios[1][0].id)} name="create-outline" color={Colors.primary} size={24} />
              <Icon onPress={() => { setVisibleDelete(true), setEdit(recordatorios[1][0].id) }} name="trash-outline" color={Colors.primary} size={24} />
            </View>
          }

        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ backgroundColor: '#FFEBF0', justifyContent: 'center', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, borderTopRightRadius: 20, alignItems: 'center', width: 50, height: 50, }}>
            <FontAwesome5 name="car-crash" size={18} color={Colors.primary} />
          </View>
          {recordatorios[1].length > 0
            ?
            <View style={{ flexDirection: 'column', marginLeft: '10%' }}>
              <Text style={{ color: Colors.gray, fontSize: 16, marginBottom: 5 }}>Proximo pago</Text>
              <Text style={{ color: '#373737', fontWeight: 'bold', fontSize: 18 }}>El {new Date(recordatorios[1][0]?.fechaFinal).toLocaleDateString('es-ES', options)}</Text>
              <Text style={{ color: Colors.multaColor, fontWeight: '600', fontSize: 16 }}>Faltan {Dias(recordatorios[1][0])} Días</Text>
            </View>
            :
            <TouchableOpacity onPress={() => handleCreateRecordatorio('Seguro')} style={{ flexDirection: 'row', marginLeft: '10%', alignItems: 'center' }}>
              <Icon name="add-outline" color={Colors.primary} size={32} />
              <Text style={{ color: Colors.primary, fontSize: 16 }}>Agregar Seguro</Text>
            </TouchableOpacity>
          }

        </View>
      </View>
      <View style={{ backgroundColor: '#f3f3f3', width: '100%', height: 2, marginVertical: 15 }} />

      <View style={{ flexDirection: 'column', }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
          <Text style={styles.Title1}>Rotacion Llantas <Icon name={'star'} color={'#F6DE0A'} size={20} /></Text>
          {recordatorios[5].length > 0 && <View style={{ flexDirection: 'row' }}>
            <Icon onPress={() => handleCreateRecordatorio('Rotacion Llantas', recordatorios[5][0].id)} name="create-outline" color={Colors.primary} size={24} />
            <Icon onPress={() => { setVisibleDelete(true), setEdit(recordatorios[5][0].id) }} name="trash-outline" color={Colors.primary} size={24} />
          </View>}

        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ backgroundColor: '#FFEBF0', justifyContent: 'center', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, borderTopRightRadius: 20, alignItems: 'center', width: 50, height: 50, }}>
            <MaterialCommunityIcons name="tire" size={24} color={Colors.primary} />
          </View>
          {recordatorios[5].length > 0
            ?
            <View style={{ flexDirection: 'column', marginLeft: '10%' }}>
              <Text style={{ color: Colors.gray, fontSize: 16, marginBottom: 5 }}>Proxima Rotacion</Text>
              <Text style={{ color: '#373737', fontWeight: 'bold', fontSize: 18 }}>El {new Date(recordatorios[5][0]?.fechaFinal).toLocaleDateString('es-ES', options)}</Text>
              <Text style={{ color: Dias(recordatorios[5][0]) < 10 ? Colors.primary : Colors.multaColor, fontWeight: '600', fontSize: 16 }}>Faltan {Dias(recordatorios[5][0])} Días</Text>
            </View>
            :
            <TouchableOpacity onPress={() => handleCreateRecordatorio('Rotacion Llantas')} style={{ flexDirection: 'row', marginLeft: '10%', alignItems: 'center' }}>
              <Icon name="add-outline" color={Colors.primary} size={32} />
              <Text style={{ color: Colors.primary, fontSize: 16 }}>Agregar Rotacion</Text>
            </TouchableOpacity>
          }

        </View>
      </View>
      <View style={{ backgroundColor: '#f3f3f3', width: '100%', height: 2, marginVertical: 15 }} />

      <View style={{ flexDirection: 'column', }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 15 }}>
          <Text style={styles.Title1}>Recarga Extintor <Icon name={'star'} color={'#F6DE0A'} size={20} /></Text>
          {recordatorios[4].length > 0 && <View style={{ flexDirection: 'row' }}>
            <Icon onPress={() => handleCreateRecordatorio('Recarga Extintor', recordatorios[4][0].id)} name="create-outline" color={Colors.primary} size={24} />
            <Icon onPress={() => { setVisibleDelete(true), setEdit(recordatorios[4][0].id) }} name="trash-outline" color={Colors.primary} size={24} />
          </View>}

        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ backgroundColor: '#FFEBF0', justifyContent: 'center', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, borderTopRightRadius: 20, alignItems: 'center', width: 50, height: 50, }}>
            <FontAwesome5 name="fire-extinguisher" size={24} color={Colors.primary} />
          </View>
          {recordatorios[4].length > 0
            ?
            <View style={{ flexDirection: 'column', marginLeft: '10%' }}>
              <Text style={{ color: Colors.gray, fontSize: 16, marginBottom: 5 }}>Proxima Revision</Text>
              <Text style={{ color: '#373737', fontWeight: 'bold', fontSize: 18 }}>El {new Date(recordatorios[4][0]?.fechaFinal).toLocaleDateString('es-ES', options)}</Text>
              <Text style={{ color: Dias(recordatorios[4][0]) < 10 ? Colors.primary : Colors.multaColor, fontWeight: '600', fontSize: 16 }}>Faltan {Dias(recordatorios[4][0])} Días</Text>
            </View>
            :
            <TouchableOpacity onPress={() => handleCreateRecordatorio('Recarga Extintor')} style={{ flexDirection: 'row', marginLeft: '10%', alignItems: 'center' }}>
              <Icon name="add-outline" color={Colors.primary} size={32} />
              <Text style={{ color: Colors.primary, fontSize: 16 }}>Agregar Recarga</Text>
            </TouchableOpacity>
          }

        </View>
      </View>


      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <ModalCreateRecordatorio setModalVisible={setModalVisible} tipoRecordatorio={tipoRecordatorio} idVehiculo={item} edit={edit} setEdit={setEdit} />
      </Modal>
      {visibleDelete &&
        <Modal
          animationType="fade"
          transparent={true}
          visible={visibleDelete}
        >
          <ModalConfirmDelete setEdit={setEdit} setModalVisible={setModalVisible} setVisibleDelete={setVisibleDelete} id={edit} idVehiculo2={item} />
        </Modal>
      }

      {/* <Modal
          animationType="slide"
          visible={modalQuarks}
          transparent={true}
          onRequestClose={() => {
            setModalQuarks(false);
          }}
        >
          <ModalScreenRecordatorio setVisibleModal={setModalQuarks} />
        </Modal> */}
      <Modal
        animationType="fade"
        visible={premiumModal}
        transparent={true}
      >
        <ModalPremium setPremiumModal={setPremiumModal} />
      </Modal>
      {/* <TouchableOpacity onPress={() => setModalQuarks(true)} style={styles.ContainerIconAdd}>
        <Icon name="help-outline" color={'white'} size={30} />
      </TouchableOpacity> */}
    </View>
  )
}

const styles = StyleSheet.create({
  Title1: {
    color: '#373737', fontWeight: '500', fontSize: 18,
  },
  ContainerIconAdd: {
    position: 'absolute', bottom: 20, zIndex: 999, right: 20, width: 54, height: 54, elevation: 10, borderRadius: 27, backgroundColor: '#f50057', alignItems: 'center', justifyContent: 'center'
  },
})