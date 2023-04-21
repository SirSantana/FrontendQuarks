import { View, Text, FlatList, TextInput, Modal, Image, StyleSheet, Pressable, Alert, SafeAreaView, Dimensions } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useMutation } from "@apollo/client";
import * as ImagePicker from 'expo-image-picker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import { UPDATE_CAR } from "../../../graphql/mutations";
import { marcasCarros } from "../marcasCarros";
import { marcasMotos } from "../marcasMotos";
import { Colors } from "../../../Contants/Colors";
import { Buttons } from "../../../Themes/buttons";
import ModalCargando from "../../../utils/ModalCargando";

const initialForm = {
  marca: '',
  referencia: '',
  modelo: '',
  tipo: '',
  cilindraje: '',
  imagen: '',
  user: '',
  id: ''
}

export default function FormCreateVehicule({ route }) {
  const [form, setForm] = useState(initialForm)
  const [image, setImage] = useState(null);
  const navigation = useNavigation()
  const { tipo, itemData } = route.params;
  const [marca, setMarca] = useState(null)
  const { width, height } = Dimensions.get('window');
  const [updateCar, result] = useMutation(UPDATE_CAR)

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      quality: 1,
      base64: true
    });
    if (!result.cancelled) {
      setImage(result.uri);
      let image = 'data:image/jpg;base64,' + result.base64
      setForm({ ...form, imagen:image })
    }
  };
  const handleSubmit = () => {
    if (itemData) {
      setForm({ ...form, id: itemData.id })
      for (let property in form) {
        if (form[property].length === 0 && property !== "id") {
          delete form[property]
        }
      }
      updateCar({ variables: { ...form, id: itemData.id } })
      setForm(initialForm)
    } else {
    }
  }
  const handleChange = (itemMarca) => {
    setForm({ ...form, marca: itemMarca })
    setMarca(itemMarca)
  }
  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Editar mi Vehiculo'
    })
    setForm({ ...form, tipo: tipo })
  }, [])
  useEffect(() => {
    if (result?.error) {
      if (result?.error.message === 'Network request failed') {
        Alert.alert('Ha ocurrido un error', 'Revisa tu conexion a internet')
      } else {
        Alert.alert('Ha ocurrido un error', result?.error?.message)
      }
    }
  }, [result?.error])

  useEffect(() => {
    if (result?.data) {
      navigation.navigate('Vehiculo', {screen:'CarScreen'})
    }
  }, [result?.data])

  const renderItem = (item) => {
    return (
      <Pressable onPressIn={() => handleChange(item.marca)} style={{ width: 60, height: 60, marginVertical: 10, marginRight: 20, elevation: 5, backgroundColor: marca === item.marca ? '#1b333d' : 'white', justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
        <Image style={{ width: 40, height: 40 }} source={item.src} />
      </Pressable>
    )
  }
  return (
    <KeyboardAwareScrollView
      resetScrollToCoords={{ x: 0, y: 0 }}
      keyboardShouldPersistTaps='always'
      style={{ flex: 1, backgroundColor: '#f3f3f3' }}>
      <SafeAreaView >
        {result?.loading &&
          <Modal
            style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
            animationType="slide"
            transparent={true}
            visible={result?.loading}
          >
            <ModalCargando text={'Guardando Cambios...'} />
          </Modal>
        }
        <View style={{ width: '100%', padding: 20, }}>
          <Text style={{ color: Colors.secondary, fontSize: 22, fontWeight: 'bold', marginBottom: 20 }}>{itemData ? "Edita tu vehiculo" : 'Completa los datos'}</Text>
          <Text style={styles.labelText}>Selecciona la marca</Text>
          {tipo === 'Carro'
            ? <FlatList
              horizontal
              renderItem={({ item }) => renderItem(item)}
              data={marcasCarros}
            />
            : <FlatList
              horizontal
              renderItem={({ item }) => renderItem(item)}
              data={marcasMotos}
            />
          }
          <Text style={styles.labelText}>Referencia / Nombre Vehiculo</Text>
          <TextInput
            style={styles.input}
            placeholder={itemData && itemData?.referencia}
            onChangeText={(text) => setForm({ ...form, referencia: text.trim() })}
            maxLength={15}
          />
          <Text style={styles.labelText}>Modelo / Año</Text>
          <TextInput
            style={styles.input}
            placeholder={itemData?.modelo ? itemData?.modelo : '2010'}
            onChangeText={(text) => setForm({ ...form, modelo: text.trim() })}
            maxLength={4}
          />
          <Text style={styles.labelText}>Cilindraje</Text>
          <TextInput
            style={styles.input}
            onChangeText={(text) => setForm({ ...form, cilindraje: text.trim() })}
            placeholder={itemData?.cilindraje ? itemData?.cilindraje : '1500'}
            maxLength={5}
          />
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {itemData?.imagen && !image && <Image source={{ uri: itemData?.imagen }} style={{ width: 50, height: 50 }} />}
            <Pressable
              onPress={() => alert('Hola')}
              underlayColor={'rgba(0,0,0,0)'}
            >
              {image && <Image source={{ uri: image }} style={{ width: 50, height: 50 }} />}
            </Pressable>
            <Pressable onPress={pickImage} style={{ width: '50%' }}>
              <Text style={{ color: '#f50057', fontSize: 18, fontWeight: "600", marginLeft: 10 }}>{image || itemData?.imagen ? "Cambiar Imagen" : "Agregar Imagen"}</Text>
            </Pressable>
          </View>
          <View style={{ flexDirection: 'row', marginTop: 20, width: '100%', justifyContent: 'space-between' }}>
            <Pressable disabled={form !== initialForm ? false : true || result?.loading && true} onPress={handleSubmit} style={[Buttons.primary, { width: '100%', backgroundColor: form !== initialForm ? Colors.primary : 'gray' }]}>
              <Text style={{ color: 'white', fontSize: 18, fontWeight: "600" }}>Guardar Cambios</Text>
            </Pressable>
          </View>
        </View>
      </SafeAreaView>
    </KeyboardAwareScrollView>

  );
}
const styles = StyleSheet.create({
  labelText: {
    color: Colors.gray,
    marginBottom: 5,
    fontSize: 16
  },
  input: {
    height: 50, marginBottom: 10, width: '100%', backgroundColor: 'white', paddingHorizontal: 20
  }
});