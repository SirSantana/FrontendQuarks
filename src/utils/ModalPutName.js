import { View, Text, StyleSheet, Pressable, Alert, TouchableOpacity, TextInput, Modal} from 'react-native'
import { Buttons } from '../Themes/buttons';
import { Colors } from '../Contants/Colors';
import Icon from 'react-native-vector-icons/Ionicons';
import { useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { SIGN_UP_WITHOUT_EMAIL } from '../graphql/mutations';
import { client } from '../../apollo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import useAuth from '../hooks/useAuth';
import LoginScreen from '../Screens/ProfileScreens/LoginScreen';
import ModalCargando from './ModalCargando';

export default function ModalPutName({ setModalPutName }) {
  const [name, setName] = useState(null)
  const [signUpWithoutEmail, { loading, error, data }] = useMutation(SIGN_UP_WITHOUT_EMAIL)
  const { login } = useAuth()
  const [loginUser, setLoginUser] = useState(false)

  const handleSubmit = () => {
    if (!name) {
      return Alert.alert('Debes colocar un nombre')
    }
    signUpWithoutEmail({ variables: { name: name } })
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
      client.resetStore()
      login(data?.signUpWithoutEmail?.user)
      AsyncStorage.setItem('token', JSON.stringify(data.signUpWithoutEmail.token))
    }
  }, [data])
  if (loginUser) {
    return <LoginScreen />
  }
  return (
    <Pressable onPress={() => setModalPutName(false)} style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={{ marginVertical: 20, textAlign: 'center', fontSize: 20, }}>Hola!, como te llamas?</Text>
        <View style={styles.inputContainer}>
          <Icon name="person-outline" color={Colors.gray} size={24} />
          <TextInput
            style={{ paddingHorizontal: 10, fontSize: 18, width: '100%' }}
            placeholder='Tu nombre'
            maxLength={15}
            onChangeText={(e) => setName(e)}
          />
        </View>
        <View style={{ flexDirection: 'column', justifyContent: 'center', width: '100%', marginTop: '10%' }}>
          <TouchableOpacity disabled={loading} onPress={handleSubmit} style={[Buttons.primary, { width: '60%', alignContent: 'center', alignSelf: 'center' }]}>
            <Text style={{ color: 'white', fontWeight: '600', fontSize: 16 }}>Continuar</Text>
          </TouchableOpacity>

          <TouchableOpacity disabled={loading} onPress={() => setLoginUser(true)} style={[Buttons.primaryOutlined, { width: '100%', alignContent: 'center', alignSelf: 'center' }]}>
            <Text style={{ color: '#f50057', fontWeight: '600', fontSize: 16 }}>Ya tienes una cuenta? Inicia sesion</Text>
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
  },
});