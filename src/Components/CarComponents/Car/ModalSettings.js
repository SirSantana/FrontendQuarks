import { useNavigation } from "@react-navigation/native"
import { StyleSheet, View, Text, Pressable, Dimensions, Modal, Alert, TouchableOpacity, Image } from "react-native"
import Icon from 'react-native-vector-icons/Ionicons';
import { useState, useEffect } from "react"
import { Colors } from "../../../Contants/Colors";
import { Buttons } from "../../../Themes/buttons";
import { useMutation } from "@apollo/client";
import { DELETE_CAR } from "../../../graphql/mutations";
import { GET_VEHICLES } from "../../../graphql/querys";
import ModalCargando from "../../../utils/ModalCargando";
import ModalSuccesfull from "../../../utils/ModalSuccesfull";
import CardShareCar from "./CardShareCar";


export default function ModalSettings({ setSettings, item }) {
  const navigation = useNavigation()
  const { height } = Dimensions.get('window')
  const [visibleDelete, setVisibleDelete] = useState(false)
  const [deleteCar, { loading, error, data }] = useMutation(DELETE_CAR, { refetchQueries: [{ query: GET_VEHICLES }] })
  const [visibleSuccesfull, setVisibleSuccesfull] = useState(false)
  const [visibleShareCard, setVisibleShareCard] = useState(false)

  const confirmDelete = () => {
    deleteCar({ variables: { id: item.id } })
    setVisibleDelete(false)
  }
  useEffect(() => {
    if (error) {
      if (error?.message === 'Network request failed') {
        Alert.alert('Ha ocurrido un error', 'Revisa tu conexion a internet')
      } else {
        Alert.alert('Ha ocurrido un error', error?.message)
      }
    }
  }, [error])

  useEffect(() => {
    if (data) {
      setVisibleSuccesfull(true)
      setVisibleDelete(false)
      setSettings(false)
      setTimeout(() => {
        setVisibleSuccesfull(false)
        navigation.navigate('Profile', { screen: 'ProfileScreen' })
      }, 2000)
    }
  }, [data])
  return (
    <Pressable onPress={() => setSettings(false)} style={[styles.centeredView, { height: height, justifyContent: 'center' }]}>
      <View style={styles.modalView2}>

        <View style={[styles.separador]} />

        <TouchableOpacity onPress={() => setVisibleShareCard(true)} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 16, margin: 10, color: Colors.secondary }}>Tarjeta de tú vehículo</Text>
          <Icon name="camera-outline" color={Colors.gray} size={24} style={{ marginLeft: 10, alignSelf: 'center' }} />
        </TouchableOpacity>

        <View style={[styles.separador, { backgroundColor: '#f3f3f3', width: '90%', height: 2 }]} />
        <TouchableOpacity onPress={() => { navigation.navigate('Creando mi Vehiculo', { tipo: item?.tipo, itemData: item }), setSettings(false) }} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 16, margin: 10, color: Colors.secondary }}>Editar vehiculo</Text>
          <Icon name="create-outline" color={Colors.gray} size={24} style={{ marginLeft: 10, alignSelf: 'center' }} />
        </TouchableOpacity>

        {/* <View style={[styles.separador, { backgroundColor: '#f3f3f3', width: '90%', height: 2 }]} />
        <TouchableOpacity onPress={() => { navigation.navigate('Vehiculo', { screen: 'Vehiculos',params:{crear:'Crear'}}), setSettings(false) }} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 16, margin: 10, color: Colors.secondary }}>Crear otro vehiculo</Text>
          <Icon name="car-sport-outline" color={Colors.gray} size={24} style={{ marginLeft: 10, alignSelf: 'center' }} />
        </TouchableOpacity> */}

        <View style={[styles.separador, { backgroundColor: '#f3f3f3', width: '90%', height: 2 }]} />
        <TouchableOpacity onPress={() => { setVisibleDelete(true) }} style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
          <Text style={{ fontSize: 16, margin: 10, color: Colors.primary }}>Eliminar vehiculo</Text>
          <Icon name="trash-outline" color={Colors.primary} size={24} style={{ marginLeft: 10, alignSelf: 'center' }} />
        </TouchableOpacity>


        <Modal
          animationType="fade"
          visible={visibleDelete}
          transparent={true}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Image style={{ width: 30, height: 30 }} source={require('../../../../assets/Logo1.png')} />
              <Text style={{ marginVertical: 20 }}>¿Estas seguro de eliminar tu vehiculo?</Text>
              <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '100%' }}>
                <Pressable disabled={loading} onPress={confirmDelete} style={[Buttons.primary, { width: "45%" }]}><Text style={{ color: 'white', fontWeight: '600' }}>Eliminar</Text></Pressable>
                <Pressable onPress={() => setVisibleDelete(false)} style={[Buttons.primaryOutlined, { width: "45%" }]}><Text style={{ color: Colors.primary, fontWeight: '600' }}>Regresar</Text></Pressable>
              </View>
            </View>
          </View>
        </Modal>

      </View>
      <Modal
        animationType="fade"
        visible={loading}
        transparent={true}
      >
        <ModalCargando text='Eliminando vehiculo...' />
      </Modal>
      <Modal
        style={{ marginHorizontal: 20 }}
        animationType="slide"
        visible={visibleShareCard}
        transparent={true}
      >
        <CardShareCar vehiculo={item} setVisibleShareCard={setVisibleShareCard} />
      </Modal>
      {visibleSuccesfull &&
        <Modal
          animationType="fade"
          visible={visibleSuccesfull}
          transparent={true}
        >
          <ModalSuccesfull text={'Eliminado'} description={`Correctamente`} />
        </Modal>}
    </Pressable>

  )
}

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: "center",
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: '100%',
  },
  separador: {
    backgroundColor: 'gray', height: 3, width: '20%', alignSelf: 'center', marginVertical: 10
  },
  modalView2: {
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: "absolute",
    bottom: 0,
    paddingHorizontal: 10,
    paddingBottom: 10,
    width: '100%',
    borderTopLeftRadius: 20,
    alignItems: "center",
    borderTopRightRadius: 20,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
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
})