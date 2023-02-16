import { useMutation } from '@apollo/client';
import { Modal, View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native'
import { useEffect, useState } from 'react';
import { GET_ALL_GASTOS, GET_RECORDATORIOS } from '../graphql/querys';
import { DELETE_GASTO, DELETE_RECORDATORIO } from '../graphql/mutations';
import { Buttons } from '../Themes/buttons';
import ModalCargando from './ModalCargando';
import ModalSuccesfull from './ModalSuccesfull';
import { Colors } from '../Contants/Colors';



export default function ModalConfirmDelete({ setEdit, setVisibleDelete, id, idVehiculo, setModalVisible, idVehiculo2 }) {
  const [visibleSuccesfull, setVisibleSuccesfull] = useState(false)

  const [deleteGasto, { data, loading, error }] = useMutation(DELETE_GASTO, {
    update(cache, { data }) {
      const { getAllGastos } = cache.readQuery({
        query: GET_ALL_GASTOS,
        variables: { id: idVehiculo },
      })
      cache.writeQuery({
        query: GET_ALL_GASTOS,
        variables: { id: idVehiculo },
        data: {
          getAllGastos: getAllGastos.filter(el => el.id !== data.deleteGasto)
        }
      })

    }
  })
  const [deleteRecordatorio, result] = useMutation(DELETE_RECORDATORIO, { refetchQueries: [{ query: GET_RECORDATORIOS, variables: { id: idVehiculo2 } }] })

  const Delete = () => {
    if (idVehiculo2) {
      deleteRecordatorio({ variables: { id: id } })
      setEdit(false)
    } else {
      deleteGasto({ variables: { id: id, idVehiculo: idVehiculo } })
    }
  }
  useEffect(() => {
    if (data || result?.data) {
      setVisibleSuccesfull(true)
      setTimeout(() => {
        setModalVisible(false)
        setVisibleDelete(false)
      }, 2000)
    }
  }, [data, result?.data])
  useEffect(() => {
    if (error) {
      if (error?.message === 'Network request failed') {
        Alert.alert('Ha ocurrido un error', 'Revisa tu conexion a internet')
      } else {
        Alert.alert('Ha ocurrido un error', error?.message)
      }
    }
    if (result?.error) {
      if (result?.error.message === 'Network request failed') {
        Alert.alert('Ha ocurrido un error', 'Revisa tu conexion a internet')
      } else {
        Alert.alert('Ha ocurrido un error', result?.error?.message)
      }
    }

  }, [error, result?.error])

  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Image style={{ width: 30, height: 30 }} source={require('../../assets/Logo1.png')} />
        <Text style={{ marginVertical: 20 }}>¿Estas seguro de eliminarlo?</Text>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
          <TouchableOpacity disabled={loading || result?.loading} onPress={() => Delete()} style={[Buttons.primary, { width: "45%" }]}><Text style={{ color: 'white', fontWeight: '600' }}>Eliminar</Text></TouchableOpacity>
          <TouchableOpacity disabled={loading || result?.loading} onPress={() => setVisibleDelete(false)} style={[Buttons.primaryOutlined, { width: "45%" }]}><Text style={{ color: Colors.primary, fontWeight: '600' }}>Regresar</Text></TouchableOpacity>
        </View>
      </View>
      {loading &&
        <Modal
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          animationType="slide"
          transparent={true}
          visible={loading}
        >
          <ModalCargando text={'Eliminando Gasto...'} />
        </Modal>
      }
      {result?.loading &&
        <Modal
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          animationType="slide"
          transparent={true}
          visible={loading}
        >
          <ModalCargando text={'Eliminando recordatorio...'} />
        </Modal>
      }
      {visibleSuccesfull &&
        <Modal
          animationType="fade"
          visible={visibleSuccesfull}
          transparent={true}

        >
          <ModalSuccesfull text={'Exitoso'} description={data ? 'Gasto Eliminado' : 'Recordatorio Eliminado'} />
        </Modal>
      }
    </View>
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