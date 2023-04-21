




import { View, Text, StyleSheet, Pressable, Alert, TouchableOpacity, TextInput, Modal } from 'react-native'
import { Buttons } from '../Themes/buttons';
import { Colors } from '../Contants/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_EMAIL_USER, } from '../graphql/mutations';
import { client } from '../../apollo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAuth from '../hooks/useAuth';
import ModalCargando from './ModalCargando';
import ModalSuccesfull from './ModalSuccesfull';

const initialForm = {
  email: '',
  password: '',
  confirmPassword: ''
}

const strongRegex = new RegExp("^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$")
export default function ModalSecurityUser({ setVisibleAddEmail }) {
  const [name, setName] = useState(null)
  const { login } = useAuth()
  const [visiblePassword, setVisiblePassword] = useState(false)
  const [form, setForm] = useState(initialForm)
  const [addEmailUser, { loading, error, data }] = useMutation(ADD_EMAIL_USER)
  const [visibleSuccesfull, setVisibleSuccesfull] = useState(false)

  const handleSubmit = () => {
    if (form === initialForm) {
      return Alert.alert('Debes agregar todos los campos')
    }
    if (!strongRegex.test(form?.email)) {
      return Alert.alert('Debes ser un email valido')
    }
    if (form.password == '') {
      return Alert.alert('Debes agregar un contraseña')
    }
    if (form.password != form.confirmPassword) {
      return Alert.alert('Las contraseñas deben coincidir, verificalas')
    }
    addEmailUser({ variables: form })
  }
  useEffect(() => {
    if (data) {
      setVisibleSuccesfull(true)
      setTimeout(() => {
        setVisibleSuccesfull(false)
        login(data?.addEmailUser)
      setVisibleAddEmail(false)
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
  //REVISAR EL CERRAR SESION y CREAR LOADERS Y ERRORES
  return (
    <Pressable style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={{ marginVertical: '5%', textAlign: 'center', fontSize: 20, }}>Agrega tu email y contraseña para guardar tus datos</Text>
        <View style={[styles.inputContainer, { marginTop: 10 }]}>
          <Icon name="mail-outline" color={Colors.gray} size={24} />
          <TextInput

            style={{ paddingHorizontal: 10, fontSize: 18, width: '100%' }}
            autoCapitalize='none'
            placeholder='tucorreo@gmail.com'
            onChangeText={(e) => setForm({ ...form, email: e })}
          />
        </View>


        <View style={[styles.inputContainer, { marginTop: 10 }]}>
          <View style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row' }}>
            <Icon name="key-outline" color={Colors.gray} size={24} />
            <TextInput
              secureTextEntry={visiblePassword ? false : true}
              style={{ paddingHorizontal: 10, fontSize: 18, width: '80%' }}
              placeholder='******'
              onChangeText={(e) => setForm({ ...form, password: e })}

            />
          </View>
          <Icon onPress={() => setVisiblePassword(visiblePassword ? false : true)} name={visiblePassword ? 'eye-outline' : 'eye-off-outline'} color={Colors.gray} size={24} />
        </View>

        <View style={[styles.inputContainer, { marginTop: 10 }]}>
          <View style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row' }}>
            <Icon name="key-outline" color={Colors.gray} size={24} />
            <TextInput
              secureTextEntry={visiblePassword ? false : true}
              style={{ paddingHorizontal: 10, fontSize: 18, width: '80%' }}
              placeholder='Confirma tu contraseña'
              onChangeText={(e) => setForm({ ...form, confirmPassword: e })}

            />
          </View>
          <Icon onPress={() => setVisiblePassword(visiblePassword ? false : true)} name={visiblePassword ? 'eye-outline' : 'eye-off-outline'} color={Colors.gray} size={24} />
        </View>

        <View style={{ flexDirection: 'row', justifyContent: 'center', width: '100%', marginTop: '10%' }}>
          <TouchableOpacity onPress={handleSubmit} style={[Buttons.primary, { width: '60%', alignContent: 'center', alignSelf: 'center' }]}>
            <Text style={{ color: 'white', fontWeight: '600', fontSize: 16 }}>Guardar Cambios</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center', width: '100%', }}>
          <TouchableOpacity onPress={() => setVisibleAddEmail(false)} style={[Buttons.primaryOutlined, { width: '60%', alignContent: 'center', alignSelf: 'center' }]}>
            <Text style={{ color: '#f50057', fontWeight: '600', fontSize: 16 }}>Regresar</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        animationType="fade"
        visible={loading}
        transparent={true}
      >
        <ModalCargando text='Ingresando, espera un momento...' />
      </Modal>
      <Modal
        animationType="fade"
        visible={visibleSuccesfull}
        transparent={true}
      >
        <ModalSuccesfull text={'Correctamente!'} description={'Sesion guardada'} />
      </Modal>
    </Pressable>
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

  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: '5%',
    borderWidth: 2,
    paddingHorizontal: 10,
    borderColor: '#cacaca',
    borderRadius: 10,
    paddingVertical: 2,
    height: 40,
    width: '100%'
  },
});