import { useState, useEffect, useLayoutEffect } from "react";
import { View, Image, Text, Pressable, TouchableOpacity, StyleSheet, TextInput, Alert, Modal } from "react-native";
import * as ImagePicker from 'expo-image-picker';
import { getFileInfo,  } from "../../utils/actions";
import {  useMutation } from "@apollo/client";
import { CREATE_CAR } from "../../graphql/mutations";
import { GET_USER, GET_VEHICLES } from "../../graphql/querys";
import { useNavigation } from "@react-navigation/native";
import { Buttons } from "../../Themes/buttons";
import { LinearGradient } from 'expo-linear-gradient';
import ModalSuccesfull from "../../utils/ModalSuccesfull";
import ModalCargando from "../../utils/ModalCargando";
import CardCarPrevius from "../../Components/CarComponents/Car/CardCarPrevius";
import { marcasMotos } from "../../Components/CarComponents/marcasMotos";
import { marcasCarros } from "../../Components/CarComponents/marcasCarros";

const initialForm = {
  marca: 'Mazda',
  referencia: '',
  modelo: '',
  tipo: '',
  cilindraje: '',
  imagen: '',
  user: '',
  id: ''
}
export default function PruebaCarScreen() {
  const navigation = useNavigation()
  const [vehiculo, setVehiculo] = useState('Carro')
  const [marca, setMarca] = useState({ marca: '../../../assets/Mazda.png', src: null })
  const [form, setForm] = useState(initialForm)
  const [image, setImage] = useState(null)
  const [createVehicule, { data, error, loading }] = useMutation(CREATE_CAR, { refetchQueries: [{ query: GET_VEHICLES }, { query: GET_USER }] })
  const [visibleSuccesfull, setVisibleSuccesfull] = useState(false)
  const [visibleModalDetailsCars, setVisibleModalDetailsCars] = useState({ marca: false, referencia: false, modelo: false })
  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,

      base64: true
    });
    const fileInfo = await getFileInfo(result.uri)
    if (!fileInfo?.size) {
      alert("Can't select this file as the size is unknown.")
      return
    }
    if (!result.cancelled && result?.type !== 'image') {
      return Alert.alert('Solo puedes seleccionar imagenes')
    }
    if (!result.cancelled) {
      setImage(result.uri);
      let image = 'data:image/jpg;base64,' + result.base64
      setForm({ ...form, imagen: image })
    }
  };
  const handleSubmit = () => {
    if (form.referencia.length < 1 || form.modelo.length < 1) {
      Alert.alert('Debes colocar la referencia y modelo de tu vehiculo')
      return
    }
    createVehicule({ variables: form })
  }
  useEffect(() => {
    if (image === '') {
      setForm({ ...form, imagen: image })
    }
  }, [image])
  useEffect(() => {
    if (error) {
      Alert.alert('Ha ocurrido un error', error)
    }
  }, [error])

  useEffect(() => {
    if (data) {
      setVisibleSuccesfull(true)
      setTimeout(() => {
        setVisibleSuccesfull(false)
        navigation.navigate('Vehiculo', { screen: 'CarScreen' })
      }, 2000)
    }
  }, [data])
  useLayoutEffect(()=>{
    setVisibleModalDetailsCars({...visibleModalDetailsCars, marca:true})
  },[])

  const handleChange = (itemMarca, src) => {
    setForm({ ...form, marca: itemMarca })
    setMarca({ marca: itemMarca, src: src })
  }
  let logo = vehiculo !== 'Moto' ? marcasCarros.find(el => el.src === marca.src) : marcasMotos.find(el => el.src === marca.src)
  return (
    <LinearGradient
      colors={['#F50057', '#5B0221']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ height: '100%', padding: 20 }}
      
    >
      <View style={{ height: '20%', marginTop: '10%' }}>
        <Text style={{ fontWeight: '700', fontSize: 30, color: 'white', }}>Crea tú vehiculo </Text>
        <Text style={{ fontWeight: '400', fontSize: 16, color: 'white', }}>Edita los datos según tu vehículo</Text>
      </View>

      <CardCarPrevius form={form} image={image} logo={logo} pickImage={pickImage} setVisibleModalDetailsCars={setVisibleModalDetailsCars} visibleModalDetailsCars={visibleModalDetailsCars} />

      <TouchableOpacity disabled={loading} onPress={handleSubmit} style={[Buttons.primary, { width: '100%', marginTop: '20%' }]}>
        <Text style={{ color: 'white', fontSize: 18, fontWeight: "600" }}>Crear vehiculo</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        style={{ backgroundColor: 'rgba(0,0,0,0.5)', }}
        visible={visibleModalDetailsCars.marca}
        onRequestClose={() => {
          setVisibleModalDetailsCars({ ...visibleModalDetailsCars, marca: false });
        }}
      >
        <Pressable onPress={() => setVisibleModalDetailsCars({ ...visibleModalDetailsCars, marca: false })} style={[styles.centeredView, {backgroundColor: 'rgba(0,0,0,0.5)',}]}>
          <View style={styles.modalView2}>
            <View style={{ backgroundColor: 'gray', height: 3, width: '20%', alignSelf: 'center', marginVertical: 10 }} />
            <View style={{ flexDirection: 'column', width: '100%', justifyContent: 'center', alignItems: 'center' }}>
            <Text style={{ fontSize: 18, color: '#7a7a7a', marginBottom: 5 }}>Selecciona la marca de tu auto</Text>
              <View style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20, }}>
                {marcasCarros?.map(el => (
                  <TouchableOpacity key={el.marca} onPressOut={() => { handleChange(el.marca, el.src), setVisibleModalDetailsCars({ ...visibleModalDetailsCars, marca: false }) }} style={{ width: 50, height: 50, margin: 10, backgroundColor: 'white', justifyContent: 'center', alignItems: 'center', borderRadius: 10, elevation: marca.marca === el.marca ? 5 : 0 }}>
                    <Image style={{ width: 40, height: 40 }} source={el.src} />
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        </Pressable>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        style={{ backgroundColor: 'rgba(0,0,0,0.5)', }}
        visible={visibleModalDetailsCars.referencia || visibleModalDetailsCars.modelo}
        onRequestClose={() => {
          setVisibleModalDetailsCars({ ...visibleModalDetailsCars, referencia: false, modelo: false });
        }}
      >
        <Pressable onPress={() => setVisibleModalDetailsCars({ ...visibleModalDetailsCars, referencia: false, modelo: false })} style={styles.centeredView}>
          <View style={styles.modalView2}>
            <View style={{ backgroundColor: 'gray', height: 3, width: '20%', alignSelf: 'center', marginVertical: 10 }} />
            <View style={{ flexDirection: 'column', width: '100%', padding: 20, justifyContent: 'center', }}>
              <Text style={{ fontSize: 16, color: '#7a7a7a', marginBottom: 5 }}>{visibleModalDetailsCars.modelo ? 'Modelo' : 'Referencia'}</Text>
              {visibleModalDetailsCars.modelo ?
                <TextInput
                  onChangeText={(text) => setForm({ ...form, modelo: text })}
                  style={{ backgroundColor: '#f7f7f7', paddingHorizontal: 20, fontSize: 18, width: '100%', height: 50 }}
                  placeholder='2020'
                  keyboardType="numeric"
                  maxLength={4}
                /> :
                <TextInput
                  onChangeText={(text) => setForm({ ...form, referencia: text })}
                  style={{ backgroundColor: '#f7f7f7', paddingHorizontal: 20, fontSize: 18, width: '100%', height: 50 }}
                  placeholder='Mazda 2'
                  maxLength={14}
                />}
            </View>
          </View>
        </Pressable>
      </Modal>
      <Modal
        animationType="fade"
        visible={loading}
        transparent={true}
      >
        <ModalCargando text='Creando vehiculo...' />
      </Modal>
      {visibleSuccesfull &&
        <Modal
          animationType="fade"
          visible={visibleSuccesfull}
          transparent={true}
        >
          <ModalSuccesfull text={'+50 Puntos'} description={'Vehiculo creado!'} />
        </Modal>
      }
      {/* <TouchableOpacity style={styles.ContainerIconAdd}>
        <Icon name="help-outline" color={'white'} size={30} />
      </TouchableOpacity> */}
    </LinearGradient>

  )
}

const styles = StyleSheet.create({
  ContainerIconAdd: {
    position: 'absolute', bottom: 20, zIndex: 999, right: 20, width: 54, height: 54, elevation: 10, borderRadius: 27, backgroundColor: '#f50057', alignItems: 'center', justifyContent: 'center'
  },
  centeredView: {
    justifyContent: "center",
    height: '100%',

  },
  centeredView2: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: "center",
    height: '100%',
    alignItems: 'center',
    width: '100%'
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
  modalView1: {
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: "absolute",
    paddingHorizontal: 10,
    width: '100%',
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
  },
})