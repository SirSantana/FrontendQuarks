import { View, Text, Modal, Alert, StyleSheet, Pressable, TextInput, Image, ActivityIndicator,TouchableOpacity} from "react-native"
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { Colors } from "../../Contants/Colors"
import Icon from 'react-native-vector-icons/Ionicons';
import { Buttons } from "../../Themes/buttons";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import {  useState } from "react";
import * as ImagePicker from 'expo-image-picker';
import { GET_VEHICLES } from "../../graphql/querys";
import { CREATE_PREGUNTA } from "../../graphql/mutations";
import {  useMutation, useQuery } from "@apollo/client";
import SelectCar from "./SelectCar";

const initialForm = {
  celular: '',
  marca: '',
  referencia: '',
  titulo: '',
  imagen: ''
}

export default function SectionCotizar() {
  const [image, setImage] = useState(null);
  const [form, setForm] = useState(initialForm)
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisibleMarca, setModalVisibleMarca] = useState(false);
  const { loading, data, error } = useQuery(GET_VEHICLES)
  const [createPregunta, result] = useMutation(CREATE_PREGUNTA)
  const [manualmente, setManualmente] = useState(false)

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
      setForm({ ...form, imagen: result.base64 })
    }
    if (!result.cancelled && result?.type !== 'image') {
      return Alert.alert('Solo puedes seleccionar imagenes')
    }
  };

  const handleSubmit=()=>{
    createPregunta({variables:form})
  };
  return (
    <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      keyboardShouldPersistTaps='always'
      >
      <View style={{ padding: 20, backgroundColor: '#f7f7f7' }}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 }}>
          <View>
            <Text style={{ color: Colors.secondary, fontSize: 22, fontWeight: 'bold' }}>Cotiza tus repuestos</Text>
            <Text style={{ color: Colors.gray, fontSize: 16, }}>Completa los datos</Text>
          </View>
        </View>
        {!manualmente ?
          <View>
            <Text style={styles.labelText}>Tu vehiculo</Text>
            <Pressable onPress={() => setModalVisible(true)} style={{ backgroundColor: 'white', width: '100%', elevation: 2, height: 50, paddingHorizontal: 10, alignItems: 'center', flexDirection: 'row', marginBottom: 10 }}>
              <Icon name="car-sport-outline" color={Colors.gray} size={24} />
              <Text style={{ color: Colors.gray, fontSize: 16, width: '90%', marginLeft: 10 }}>{form?.marca} {form.referencia}</Text>
            </Pressable>
          </View>
          :
          <View style={{ width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
            <Pressable onPress={()=> setModalVisibleMarca(true)} style={{ width: '35%', }}>
              <Text style={styles.labelText}>Marca</Text>
              <View style={{ backgroundColor: 'white', elevation: 2, height: 50, paddingHorizontal: 10, alignItems: 'center', flexDirection: 'row', marginBottom: 10 }}>
                <Icon name="car-sport-outline" color={Colors.gray} size={24} />
                <Text style={{  fontSize: 16, width: '90%', marginLeft: 10 }}>{form?.marca}</Text>
              </View>
            </Pressable>
            <View style={{ width: '60%', }}>
              <Text style={styles.labelText}>Referencia / cilindraje / modelo </Text>
              <Pressable style={{ backgroundColor: 'white', elevation: 2, height: 50, paddingHorizontal: 10, alignItems: 'center', flexDirection: 'row', marginBottom: 10 }}>
                <Icon name="car-sport-outline" color={Colors.gray} size={24} />
                <TextInput onChangeText={(text) => setForm({ ...form, referencia: text.trim() })} placeholder="Corsa 1.4 2002" maxLength={30} keyboardType='text' style={{ width: '90%', marginLeft: 10 }} />
              </Pressable>
            </View>
          </View>
        }

        <Text style={styles.labelText}>Repuestos</Text>
        <Pressable style={{ backgroundColor: 'white', width: '100%', elevation: 2, height: 50, paddingHorizontal: 10, alignItems: 'center', flexDirection: 'row', marginBottom: 10 }}>
          <MaterialCommunityIcons name={'car-wrench'} size={24} color={Colors.gray} />
          <TextInput placeholder="Eje de levas, impulsadores y balancines" multiline onChangeText={(text) => setForm({ ...form, titulo: text.trim() })} maxLength={80} keyboardType='text' style={{ width: '90%', marginLeft: 10 }} />
        </Pressable>

        <Text style={styles.labelText}>Tu celular</Text>
        <Pressable style={{ backgroundColor: 'white', width: '100%', elevation: 2, height: 50, paddingHorizontal: 10, alignItems: 'center', flexDirection: 'row', marginBottom: 10 }}>
          <Icon name="call-outline" color={Colors.gray} size={24} />
          <TextInput placeholder="314355****" onChangeText={(text) => setForm({ ...form, celular: text.trim() })} maxLength={10} minLength={10} keyboardType='numeric' style={{ width: '90%', marginLeft: 10 }} />
        </Pressable>

        <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginBottom: 20 }}>
          {image ? <Image source={{ uri: image }} style={{ width: 50, height: 50, marginRight: 20 }} />
            : <Icon style={{ marginLeft: 10 }} name="camera-outline" color={Colors.gray} size={24} />
          }
          <Pressable onPress={pickImage}>
            <Text style={[styles.labelText, { marginLeft: 10, color: Colors.primary }]}>Agregar foto</Text>
          </Pressable>

          {image && <Icon style={{ marginLeft: 10 }} name="close" color={Colors.primary} size={24} onPress={() => setImage(null)} />}
        </View>

        <TouchableOpacity
          style={[Buttons.primary, { width: '100%',backgroundColor:form.marca === initialForm.marca || form.referencia=== initialForm.referencia || form.celular=== initialForm.celular || form.titulo=== initialForm.titulo ? 'gray': '#f50057'}]}
          onPress={handleSubmit}
          disabled={form === initialForm}
        >
          <Text style={{ color: 'white', fontSize: 18, fontWeight: "600" }}>Cotizar</Text>
        </TouchableOpacity>
      </View>
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
              {loading && <ActivityIndicator color={Colors.primary} />}
              {data?.getCars ?
                <>
                  {data?.getCars.map(item => <SelectCar key={item.id} item={item} setForm={setForm} form={form} setModalVisible={setModalVisible} />)}
                  <Text  onPress={() => { setForm(initialForm), setModalVisible(false), setManualmente(true) }} style={{ color: Colors.primary, alignSelf: 'center', fontSize: 18, fontWeight: "600", marginBottom: 20 }}>Cotizar manualmente</Text>
                </>
                :
                <Pressable onPress={() => { setModalVisible(false), setManualmente(true) }} style={{ marginVertical: 20, justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={{ color: Colors.primary, alignSelf: 'center', fontSize: 18, fontWeight: "600" }}>No tienes ningun vehiculo para seleccionar</Text>
                  <Text style={{ color: Colors.gray, alignSelf: 'center', fontSize: 16, marginTop: 10 }}>Completa los datos manualmente o crea un vehículo</Text>
                </Pressable>
              }
            </View>
          </View>
        </Pressable>
      </Modal>
      <Modal
        animationType="slide"
        transparent={true}
        style={{ backgroundColor: 'rgba(0,0,0,0.5)', }}
        visible={modalVisibleMarca}
        onRequestClose={() => {
          setModalVisibleMarca(!modalVisibleMarca);
        }}
      >
        <Pressable onPress={() => setModalVisibleMarca(false)} style={styles.centeredView}>

        <View style={styles.modalView2}>
          <View style={{ backgroundColor: 'gray', height: 3, width: '20%', alignSelf: 'center', marginVertical: 10 }} />
          <View style={{margin:20, alignItems:'center', justifyContent:'center'}}>
          <Text onPress={()=> {setForm({...form, marca:'Chevrolet'}),setModalVisibleMarca(false)}} style={{ color: Colors.gray, alignSelf: 'center', fontSize: 18, fontWeight: "600" }}>Chevrolet</Text>
          <View style={{ backgroundColor: 'blue', height: 1, width: '100%', alignSelf: 'center', marginVertical: 10 }} />

          <Text onPress={()=> {setForm({...form, marca:'Mazda'}), setModalVisibleMarca(false)}}style={{ color: Colors.gray, alignSelf: 'center', fontSize: 18, fontWeight: "600" }}>Mazda</Text>
          </View>

        </View>
        </Pressable>
      </Modal>
    </KeyboardAwareScrollView>
  )
}

const styles = StyleSheet.create({
  labelText: {
    marginBottom: 5, color: Colors.gray
  },
  centeredView: {
    justifyContent: "center",
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: '100%',
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
})