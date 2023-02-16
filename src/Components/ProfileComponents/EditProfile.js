import { Modal, View, Text, StyleSheet, Pressable, TextInput,Alert, Dimensions, TouchableOpacity } from 'react-native'
import { useState, useEffect } from 'react'
// import * as ImagePicker from 'expo-image-picker';
import { useMutation } from '@apollo/client';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ModalCargando from '../../utils/ModalCargando';
import { EDIT_USER } from '../../graphql/mutations';
import { Colors } from '../../Contants/Colors';
import { Buttons } from '../../Themes/buttons';
import ModalSuccesfull from '../../utils/ModalSuccesfull';

const initialForm = {
  nombre: "",
  apellido: "",
  avatar: "",
  ciudad: "",
  pais: "",
}

export default function EditProfile({ user, setVisibleEdit }) {
  // const [image, setImage] = useState(null);
  const [form, setForm] = useState(initialForm)
  const [editUser, { loading, data, error }] = useMutation(EDIT_USER)
  const { width, height } = Dimensions.get('window');
  const [visibleSuccesfull, setVisibleSuccesfull] = useState(false)

  const handleEdit = () => {
    for (let property in form) {
      if (form[property].length === 0) {
        delete form[property]
      }
    }
    editUser({ variables: form })
  }
  useEffect(() => {
    if (data) {
      setVisibleSuccesfull(true)
      setTimeout(() => {
        setVisibleSuccesfull(false)
        setVisibleEdit(false)
      }, 2000)
    }
    
  }, [data])


  useEffect(() => {
    if (error) {
      if (error?.message === 'Network request failed') {
        Alert.alert('Ha ocurrido un error', 'Revisa tu conexion a internet')
      } else {
        Alert.alert('Ha ocurrido un error', error?.message)
      }
    }
  }, [error])


  // const pickImage = async () => {
  //   // No permissions request is necessary for launching the image library
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.All,
  //     allowsEditing: true,
  //     quality: 1,
  //     base64: true
  //   });


  //   if (!result.cancelled) {
  //     setImage(result.uri);
  //     setForm({ ...form, avatar: result.base64 })
  //   }
  // };

  return (
    <>
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        keyboardShouldPersistTaps='always'
      >
        <Pressable onPress={() => setVisibleEdit(false)} style={[styles.centeredView, { height: height, justifyContent: 'center' }]}>
          <View style={styles.modalView}>
            <View style={{ flexDirection: 'column', justifyContent: 'space-between', marginBottom: 20 }}>
              <Text style={{ color: Colors.secondary, fontSize: 22, fontWeight: 'bold' }}>Hola {user.name}</Text>
              <Text style={{ lineHeight: 18, color: Colors.gray, fontSize: 16, }}>Edita tu perfil</Text>
            </View>
            <Text style={styles.labelText}>Nombre</Text>
            <Pressable style={{ backgroundColor: 'white', width: '100%', height: 50, paddingHorizontal: 5, alignItems: 'center', flexDirection: 'row', marginBottom: 10 }}>
              <TextInput maxLength={15} onChangeText={(text) => setForm({ ...form, name: text.trim() })} placeholder={user?.name}  style={[styles.labelText, { width: '80%', marginHorizontal: 10 }]} />
            </Pressable>
            <Text style={styles.labelText}>Apellido</Text>
            <Pressable style={{ backgroundColor: 'white', width: '100%', height: 50, paddingHorizontal: 5, alignItems: 'center', flexDirection: 'row', marginBottom: 10 }}>
              <TextInput maxLength={15} onChangeText={(text) => setForm({ ...form, apellido: text.trim() })} placeholder={user?.apellido}  style={[styles.labelText, { width: '80%', marginHorizontal: 10 }]} />
            </Pressable>
            <Text style={styles.labelText}>Ciudad</Text>
            <Pressable style={{ backgroundColor: 'white', width: '100%', height: 50, paddingHorizontal: 5, alignItems: 'center', flexDirection: 'row', marginBottom: 10 }}>
              <TextInput maxLength={15} onChangeText={(text) => setForm({ ...form, ciudad: text.trim() })} placeholder={user?.ciudad ? user?.ciudad: 'Bogotá'}  style={[styles.labelText, { width: '80%', marginHorizontal: 10 }]} />
            </Pressable>
            <Text style={styles.labelText}>Pais</Text>
            <Pressable style={{ backgroundColor: 'white', width: '100%', height: 50, paddingHorizontal: 5, alignItems: 'center', flexDirection: 'row', marginBottom: 10 }}>
              <TextInput maxLength={15} onChangeText={(text) => setForm({ ...form, pais: text.trim() })} placeholder={user?.pais? user?.pais: 'Colombia'}  style={[styles.labelText, { width: '80%', marginHorizontal: 10 }]} />
            </Pressable>
            {/* <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
           {user?.avatar &&!image && <Image source={{uri:'data:image/png;base64,'+ user.avatar}} style={{ width: 50, height: 50 }} />}

           <Pressable
            onPress={()=> alert('Hola')}
            underlayColor={'rgba(0,0,0,0)'}
            >
                {image && <Image source={{ uri: image }} style={{ width: 50, height: 50 }} />}

            </Pressable>
            <Pressable onPress={pickImage} >
                <Text style={Theme.fonts.descriptionRed}>{image || user?.avatar? "Cambiar Imagen":"Agregar Foto de Perfil" }</Text>

            </Pressable>
            {image && <AntDesign name="close" size={24} color={Theme.colors.primary} onPress={()=> setImage(null)} />}

           </View> */}
            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 20 }}>
              <TouchableOpacity onPress={() => handleEdit()} disabled={form == initialForm ? true : false || loading && true} style={[Buttons.primary, { width: "45%", backgroundColor: form === initialForm ? 'gray' : Colors.primary }]}>
                <Text style={{ color: 'white', fontWeight: '600' }}>Editar perfil</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setVisibleEdit(false)} style={[Buttons.primaryOutlined, { width: "45%" }]}>
                <Text style={{ color: Colors.primary, fontWeight: '600' }}>Regresar</Text>
              </TouchableOpacity>
            </View>
          </View>
          {loading &&
            <Modal
              animationType="fade"
              visible={loading}
              transparent={true}
            >
              <ModalCargando text='Guardando...' />
            </Modal>
          }
        </Pressable>
        {visibleSuccesfull &&
          <Modal
            animationType="fade"
            visible={visibleSuccesfull}
            transparent={true}

          >
            <ModalSuccesfull text={'Perfecto!'} description={'Usuario editado'} />
          </Modal>
        }
      </KeyboardAwareScrollView>
    </>
  )
}
const styles = StyleSheet.create({
  centeredView: {
    justifyContent: "center",
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: '100%',
  },

  modalView: {
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: "absolute",
    bottom: 0,
    padding: 20,
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: "#f3f3f3",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
  },

  modalText: {
    marginBottom: 15,
    textAlign: "center"
  },
  labelText: {
    marginBottom: 5, color: Colors.gray
  },
});