import { View, StyleSheet, Text, Pressable, Image, Modal, ScrollView, ActivityIndicator, Alert } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useLazyQuery } from "@apollo/client";
import { useLayoutEffect, useState, useEffect } from "react";
import { Colors } from "../../../Contants/Colors";
import { GET_ONE_GASTO } from "../../../graphql/querys";
import { options } from "../../../utils/dateEs";
import ModalCreateGasto from "./ModalCreateGasto";
import ModalImage from "../../../utils/ModalImage";
import Icon from 'react-native-vector-icons/Ionicons';
import ModalConfirmDelete from "../../../utils/ModalConfirmDelete";


export default function ModalDetailsGasto({ id, setModalVisible }) {
  const [getOne, { loading, data, error }] = useLazyQuery(GET_ONE_GASTO)
  const [modalVisible2, setModalVisible2] = useState(false)
  const [visibleDelete, setVisibleDelete] = useState(false)
  const [loadingImage, setLoading] = useState({ image: true, marcas: true })
  const [image, setImage] = useState({ visible: false, image: null })

  useLayoutEffect(() => {
    if (id) {
      getOne({ variables: { id: id } })
    }
  }, [])
  const getOneGasto = data?.getOneGasto

  let fecha = new Date(getOneGasto?.fecha)
  let tipoGasto;

  if (getOneGasto) {
    if (getOneGasto.tipo === 'Tanqueada') { tipoGasto = 'fuel' }
    if (getOneGasto.tipo === 'Parqueadero') { tipoGasto = 'car-brake-parking' }
    if (getOneGasto.tipo === 'Lavada') { tipoGasto = 'local-car-wash' }
    if (getOneGasto.tipo === 'Repuestos') { tipoGasto = 'car-wrench' }
    if (getOneGasto.tipo === 'Mantenimiento') { tipoGasto = 'car-repair' }
    if (getOneGasto.tipo === 'Peaje') { tipoGasto = 'highway' }
    if (getOneGasto.tipo === 'Multa') { tipoGasto = 'local-police' }
    if (getOneGasto.tipo === 'Otros') { tipoGasto = 'add' }
  }
  const handleEdit = () => {
    setModalVisible2(true)
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
  return (
    <>
      <Pressable onPress={() => setModalVisible(false)} style={styles.centeredView}>
        <ScrollView style={styles.modalView}>
          {loading &&
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <ActivityIndicator style={{ width: 80, height: 80, }} color={Colors.primary} />
            </View>
          }
          {getOneGasto &&
            <>
              <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                <Icon onPress={() => setVisibleDelete(true)} name="trash-outline" color={'#f50057'} size={30} />
                {tipoGasto === 'fuel' || tipoGasto === 'car-brake-parking' || tipoGasto === "car-wrench" || tipoGasto === 'highway' ?
                  <MaterialCommunityIcons name={tipoGasto} size={50} color={Colors.primary} />
                  : <MaterialIcons name={tipoGasto} size={50} color={Colors.primary} />}
                <Icon onPress={handleEdit} name="create-outline" color={'#f50057'} size={30} />

              </View>
              <View style={{ marginTop: 20 }}>
                <View style={styles.viewDetail}>
                  <Text style={styles.label1}>Tipo</Text>
                  <Text style={styles.label2}>{getOneGasto.tipo}</Text>
                </View>
                <View style={styles.viewDetail}>
                  <Text style={styles.label1} >Fecha</Text>
                  <Text style={styles.label2}>{fecha.toLocaleDateString('es-ES', options)}</Text>
                </View>
                <View style={styles.viewDetail}>
                  <Text style={styles.label1}>Dinero Gastado</Text>
                  <Text style={styles.label2}>$ {getOneGasto.dineroGastado.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</Text>
                </View>

                {getOneGasto?.description &&
                  <View style={[styles.viewDetail, { width: '100%', alignItems: 'center', justifyContent: 'space-between' }]}>
                    <Text style={styles.label1}>Descripcion</Text>
                    <Text style={[styles.label2, { flexShrink: 1, marginLeft: 10 }]}> {getOneGasto.description}</Text>
                  </View>
                }
                {getOneGasto?.lugar &&
                  <View style={styles.viewDetail}>
                    <Text style={styles.label1}>Lugar</Text>
                    <Text style={styles.label2}>{getOneGasto.lugar}</Text>
                  </View>
                }
                {getOneGasto?.imagen &&
                  <Pressable onPress={() => setImage({ image: getOneGasto.imagen, visible: true })} style={[styles.viewDetail, { flexDirection: 'column' }]}>
                    <Text style={styles.label1}>Factura</Text>
                    {loadingImage.image && <ActivityIndicator />}
                    <Image resizeMode='contain' onLoadEnd={() => setLoading({ image: false })} style={{
                      width: '100%',
                      height: 300, borderBottomLeftRadius: 20, borderBottomRightRadius: 20, marginTop: 10,
                    }} source={{ uri: getOneGasto.imagen }} />
                  </Pressable>
                }
              </View>
            </>
          }
        </ScrollView>
      </Pressable>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible2}
      >
        <ModalCreateGasto setModalVisible2={setModalVisible2} id={id} item={getOneGasto} />
      </Modal>
      {visibleDelete &&
        <Modal
          animationType="fade"
          transparent={true}
          visible={visibleDelete}
        >
          <ModalConfirmDelete setVisibleDelete={setVisibleDelete} id={id} idVehiculo={getOneGasto?.vehiculo} setModalVisible={setModalVisible} />
        </Modal>
      }
      {image &&
        <Modal
          animationType="fade"
          visible={image.visible}
          transparent={true}

        >
          <ModalImage image={image.image} setImage={setImage} />
        </Modal>}
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
    backgroundColor: 'white',
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
    marginTop: 20, flexDirection: 'row', justifyContent: 'space-between', width: '100%'
  },
  label1: {
    color: Colors.gray,
    fontSize: 16
  },
  label2: {
    color: Colors.secondary,
    fontWeight: '600',
    fontSize: 16
  }
});