import { View, Text, StyleSheet, Pressable, Image, Modal, Dimensions, FlatList, TextInput, TouchableOpacity, Alert, Button, } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useEffect, useLayoutEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { FontAwesome5 } from '@expo/vector-icons';
import {  useMutation } from "@apollo/client";
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Colors } from '../../../Contants/Colors';
import { Buttons } from '../../../Themes/buttons';
import Icon from 'react-native-vector-icons/Ionicons';
import ModalSuccesfull from '../../../utils/ModalSuccesfull';
import ModalCargando from '../../../utils/ModalCargando';
import { CREATE_GASTO, UPDATE_GASTO } from '../../../graphql/mutations';
import { GET_ALL_GASTOS} from '../../../graphql/querys';
import useAuth from '../../../hooks/useAuth';
import ModalPremium from '../../../utils/ModalPremium';

let tiposGastos = [
  { tipo: 'Lavada', icon: "local-car-wash", color: Colors.lavadaColor, premium: false },
  { tipo: 'Tanqueada', icon: "fuel", color: Colors.tanqueadaColor, premium: false },
  { tipo: 'Repuestos', icon: "car-wrench", color: Colors.repuestosColor, premium: false },
  { tipo: 'Parqueadero', icon: "car-brake-parking", color: Colors.parqueaderoColor, premium: false },
  { tipo: 'Mantenimiento', icon: "car-repair", color: Colors.mantenimientoColor, premium: true },
  { tipo: 'Peaje', icon: "highway", color: Colors.peajeColor, premium: true },
  { tipo: 'Multa', icon: "local-police", color: Colors.multaColor, premium: true },
  { tipo: 'Otros', icon: "add", color: Colors.primary, premium: true },
]
let initialForm = {
  dineroGastado: '',
  fecha: '',
  tipo: '',
  lugar: '',
  imagen: '',
  description: '',
  vehiculo: '',
  id: '',
}
export default function ModalCreateGasto({ setModalVisible2, id, item }) {
  const [selectedDate, setSelectedDate] = useState(item ? new Date(item.fecha) : new Date());
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [form, setForm] = useState(initialForm)
  const [image, setImage] = useState(null);
  const [moreOptions, setMoreOptions] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);
  const [tipoGasto, setTipoGasto] = useState("fuel")
  const [updateGasto, result] = useMutation(UPDATE_GASTO)
  const [visibleSuccesfull, setVisibleSuccesfull] = useState(false)
  const [premiumModal, setPremiumModal] = useState(false)
  const { user } = useAuth()

  const [createGasto, { loading, error, data }] = useMutation(CREATE_GASTO, {
    update(cache, { data }) {
      let cah = cache.readQuery({ query: GET_ALL_GASTOS, variables: { id: id } })
      if (cah !== null) {
        cache.writeQuery({
          query: GET_ALL_GASTOS,
          variables: { id: id },
          data: {
            getAllGastos: [...cah.getAllGastos, data?.createGasto]
          }
        })
      }
    }
  }
  )

  const showDatePicker = () => {
    setDatePickerVisible(true);
  };
  const hideDatePicker = () => {
    setDatePickerVisible(false);
  };

  const handleConfirm = (date) => {
    hideDatePicker();
    setSelectedDate(date);
    setForm({ ...form, fecha: date })
  };
  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
      base64: true
    });
    // setForm({...form, binaryImage:binaryImage.data.toString()})

    if (!result.cancelled && result.type === 'image') {
      Alert.alert('Archivo seleccionado')
      setImage(result.uri);
      let image = 'data:image/jpg;base64,' + result.base64
      setForm({ ...form, imagen: image })
    }
    if (!result.cancelled && result?.type !== 'image') {
      return Alert.alert('Solo puedes seleccionar imagenes')
    }

  };
  const handleSubmit = () => {
    if (item) {
      for (let property in form) {
        if (form[property]?.length === 0 && property != "id") {
          delete form[property]
        }
      }
      setForm({ ...form })
      updateGasto({ variables: { ...form, id: item.id } })
      setForm(initialForm)
    } else {
      createGasto({ variables: { ...form, vehiculo: id } })
    }

  }

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

  useEffect(() => {
    if (data) {
      setVisibleSuccesfull(true)
      setTimeout(() => {
        setVisibleSuccesfull(false)
        setModalVisible2(false)
      }, 2000)
    }
    if (result?.data) {
      setVisibleSuccesfull(true)
      setTimeout(() => {
        setVisibleSuccesfull(false)
        setModalVisible2(false)
      }, 2000)
    }
  }, [data, result?.data])

  
  function RenderIcons({ item }) {
    const press = () => {
      if(!user?.premium > 0 ){
        if(item.premium){
          setPremiumModal(true)
          setModalVisible(false)
        }else{
          setPremiumModal(false)
          setTipoGasto(item.icon)
        setForm({ ...form, tipo: item.tipo })
        setModalVisible(false)
        }
      }else{
        setTipoGasto(item.icon)
        setForm({ ...form, tipo: item.tipo })
        setModalVisible(false)
      } 
    }
    let width = Dimensions.get('screen').width / 5
    return (
      <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: width }}>
        <TouchableOpacity onPress={() => press()} style={{ opacity: item?.premium&& !user?.premium>0 && 0.6, width: 50, height: item.premium ? 70 : 50, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', elevation: 2, borderRadius: 10, backgroundColor: 'white', padding: 10 }}>
          {item.premium && <Icon name={'star'} color={'#F6DE0A'} size={20} />}
          {item.icon === 'fuel' || item.icon === 'car-brake-parking' || item.icon === "car-wrench" || item.icon === 'highway' ?
            <MaterialCommunityIcons name={item.icon} size={32} color={item.color} />
            : <MaterialIcons name={item.icon} size={32} color={item.color} />}
        </TouchableOpacity>
        <Text style={{ color: 'black', marginTop: 5, marginBottom: 10, fontSize: 12 }}>{item.tipo.slice(0, 9)}</Text>
      </View>
    )

  }
  return (
    <>
      <Pressable style={styles.centeredView}>
        <KeyboardAwareScrollView
          resetScrollToCoords={{ x: 0, y: 0 }}
          keyboardShouldPersistTaps='always'
          style={{ marginTop: '20%' }}>
          <View style={styles.modalView}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
              <View>
                <Text style={{ color: Colors.secondary, fontSize: 22, fontWeight: 'bold' }}>{item ? 'Edita' : 'Añade'} tu {tiposGastos.map(el => el.icon === tipoGasto && el.tipo)}</Text>
                <Text style={{ color: Colors.gray, fontSize: 16, }}>Completa los datos</Text>
              </View>
              {tipoGasto === 'fuel' || tipoGasto === 'car-brake-parking' || tipoGasto === "car-wrench" || tipoGasto === 'highway' ?
                <MaterialCommunityIcons name={tipoGasto} size={40} color={Colors.secondary} />
                : <MaterialIcons name={tipoGasto} size={40} color={Colors.secondary} />}
            </View>
            <Text style={styles.labelText}>Tipo</Text>
            <Pressable onPress={() => setModalVisible(true)} style={{ backgroundColor: 'white', width: '100%', height: 50, paddingHorizontal: 5, alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between', marginBottom: 10 }}>
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                {tipoGasto === 'fuel' || tipoGasto === 'car-brake-parking' || tipoGasto === "car-wrench" || tipoGasto === 'highway' ?
                  <MaterialCommunityIcons name={tipoGasto} size={30} color={Colors.gray} />
                  : <MaterialIcons name={tipoGasto} size={30} color={Colors.gray} />}
                <Text style={{ marginLeft: 10, }}>{tiposGastos.map(el => el.icon === tipoGasto && el.tipo)}</Text>
              </View>
              <Icon name="caret-down-outline" color={Colors.primary} size={24} />
            </Pressable>


            <Text style={styles.labelText}>Fecha</Text>
            <Pressable onPress={showDatePicker} style={{ backgroundColor: 'white', width: '100%', height: 50, paddingHorizontal: 10, alignItems: 'center', flexDirection: 'row', marginBottom: 10 }}>
              <Icon name="calendar-outline" color={Colors.gray} size={24} />
              <Text style={{ marginLeft: 10 }}>{selectedDate ? selectedDate.toLocaleDateString() : 'No date selected'}</Text>
              <DateTimePickerModal
                date={selectedDate}
                isVisible={datePickerVisible}
                mode="date"
                onConfirm={handleConfirm}
                onCancel={hideDatePicker}
                maximumDate={new Date(2023, 11, 31)}
                minimumDate={new Date(2022, 0, 1)}
              />
            </Pressable>


            <Text style={styles.labelText}>Dinero Gastado</Text>
            <Pressable style={{ backgroundColor: 'white', width: '100%', height: 50, paddingHorizontal: 10, alignItems: 'center', flexDirection: 'row', marginBottom: 10 }}>
              <Icon name="cash-outline" color={Colors.gray} size={24} />

              <TextInput maxLength={9} keyboardType='numeric' placeholder={item?.dineroGastado} style={{ width: '90%', marginLeft: 10 }} onChangeText={(text) => setForm({ ...form, dineroGastado: text.replace(/[.,\s]/g, '').trim() })} />
            </Pressable>

            <Pressable onPress={() => setMoreOptions(!moreOptions)} style={{ marginBottom: 10, flexDirection: 'row', alignItems: 'center', }}>
              <Text style={{ fontSize: 18, color: Colors.primary }}>Mas opciones</Text>
              {moreOptions ?
                <Icon name="caret-up-outline" color={Colors.primary} size={24} />
                : <Icon name="caret-down-outline" color={Colors.primary} size={24} />
              }
            </Pressable>

            {moreOptions &&
              <>
                <Text style={styles.labelText}>Tienda</Text>
                <Pressable style={{ backgroundColor: 'white', width: '100%', height: 50, paddingHorizontal: 5, alignItems: 'center', flexDirection: 'row', marginBottom: 10 }}>
                  <FontAwesome5 name="store" size={20} color={Colors.gray} style={{ marginLeft: 5 }} />
                  <TextInput maxLength={20} placeholder={item?.lugar} multiline style={{ width: '80%', marginHorizontal: 10 }} onChangeText={(text) => setForm({ ...form, lugar: text.trim() })} />
                </Pressable>

                <Text style={styles.labelText}>Descripcion</Text>
                <Pressable style={{ backgroundColor: 'white', width: '100%', height: 80, paddingHorizontal: 5, alignItems: 'center', flexDirection: 'row', marginBottom: 20 }}>
                  <Icon style={{ marginLeft: 10 }} name="newspaper-outline" color={Colors.gray} size={24} />
                  <TextInput maxLength={100} placeholder={item?.description} multiline style={{ width: '80%', marginHorizontal: 10 }} onChangeText={(text) => setForm({ ...form, description: text.trim() })} />
                </Pressable>


                <View style={{ flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'flex-end', marginBottom: 20 }}>
                  {item?.imagen && !image && <Image source={{ uri: 'data:image/png;base64,' + item?.imagen }} style={{ width: 50, height: 50 }} />}

                  {image ? <Image source={{ uri: image }} style={{ width: 50, height: 50, marginRight: 20 }} />
                    : <Icon style={{ marginLeft: 10 }} name="camera-outline" color={Colors.gray} size={24} />
                  }
                  <Pressable onPress={pickImage}>
                    <Text style={[styles.labelText, { marginLeft: 10, color: Colors.primary }]}>{image || item?.imagen ? "Cambiar" : "Agregar Recibo/Factura"}</Text>
                  </Pressable>
                  {image && <Icon name="close" color={Colors.primary} size={24} onPress={() => setImage(null)} />}

                </View>
              </>

            }
            {item ?
              <Pressable
                disabled={loading && true}
                style={[Buttons.primary, { width: '100%', backgroundColor: form === initialForm ? 'gray' : Colors.primary }]}
                onPress={handleSubmit}
              >
                <Text style={{ color: 'white', fontSize: 18, fontWeight: "600" }}>Editar Gasto</Text>
              </Pressable>
              :
              <Pressable
                disabled={form.dineroGastado === initialForm.dineroGastado ? true : false || loading && true}
                style={[Buttons.primary, { width: '100%', backgroundColor: form.dineroGastado === initialForm.dineroGastado ? 'gray' : Colors.primary }]}
                onPress={handleSubmit}
              >
                <Text style={{ color: 'white', fontSize: 18, fontWeight: "600" }}>{item ? 'Editar Gasto' : 'Confirmar Gasto'}</Text>
              </Pressable>
            }

            <Button onPress={() => setModalVisible2(false)} title='Cancelar' />
            <Modal
              animationType="slide"
              transparent={true}
              style={{ backgroundColor: 'rgba(0,0,0,0.5)', }}
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}
            >
              <Pressable onPress={() => setModalVisible(false)} style={styles.centeredView}>
                <View style={styles.modalView2}>
                  <View style={{ backgroundColor: 'gray', height: 3, width: '20%', alignSelf: 'center', marginVertical: 10 }} />
                  <View style={{ flexDirection: 'column', width: '100%', }}>
                    <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginVertical: 20, }}>
                      {tiposGastos?.map(el => (
                        <RenderIcons key={el.icon} item={el} />
                      ))}
                    </View>
                  </View>
                </View>
              </Pressable>
            </Modal>
            <Modal
              animationType="fade"
              visible={result?.loading}
              transparent={true}
            >
              <ModalCargando text='Editando Gasto...' />
            </Modal>
            <Modal
              animationType="fade"
              visible={loading}
              transparent={true}
            >
              <ModalCargando text='Creando Gasto...' />
            </Modal>
          </View>

        </KeyboardAwareScrollView>
        {visibleSuccesfull &&
          <Modal
            animationType="fade"
            visible={visibleSuccesfull}
            transparent={true}
          >
            <ModalSuccesfull text={data ? '+2 pts' : 'Correctamente'} description={data ? 'Gasto creado' : 'Gasto editado'} />
          </Modal>
        }
        <Modal
          animationType="fade"
          visible={premiumModal}
          transparent={true}
        >
          <ModalPremium setPremiumModal={setPremiumModal} />
        </Modal>
      </Pressable>
    </>

  )
}

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: "center",
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: '100%',
  },
  labelText: {
    marginBottom: 5, color: Colors.gray
  },
  modalView: {
    width: '90%',
    margin: 20,
    backgroundColor: "#f3f3f3",
    borderRadius: 20,
    padding: 20,
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
  modalView2: {

    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: "absolute",
    bottom: 0,
    paddingHorizontal: 10,
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
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "red",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    color: 'red',
    marginBottom: 15,
    textAlign: "center"
  }
});