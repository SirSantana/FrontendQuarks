import { useEffect, useState } from "react";
import { Text, View, TextInput, ImageBackground, StatusBar, StyleSheet, TouchableOpacity, Alert, Modal } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { SIGN_IN_MUTATION } from '../../graphql/mutations';
import { useMutation } from '@apollo/client'
import GET_USER from '../../Context/AuthContext'
import { Colors } from "../../Contants/Colors";
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { client } from '../../../apollo';
import useAuth from '../../hooks/useAuth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ModalPutName from "../../utils/ModalPutName";

const initialForm = {
  email: '',
  password: ''
}
const validationSchema = {
  email: Yup.string().required('Debes colocar un email').email('Debe ser un Email Valido'),
  password: Yup.string().required('Debes colocar una password')

}
export default function LoginScreen() {
  const [visiblePassword, setVisiblePassword] = useState(false)
  const [register, setRegister] = useState(false)
  const [signIn, { data, error, loading }] = useMutation(SIGN_IN_MUTATION, { refetchQueries: [{ query: GET_USER }] })
  const { login } = useAuth()
  const formik = useFormik({
    initialValues: initialForm,
    validateOnChange: false,
    validationSchema: Yup.object(validationSchema),
    onSubmit: (formValue) => {
      signIn({ variables: formValue })
    },
  })
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
      login(data?.signIn.user)
      AsyncStorage.setItem('token', JSON.stringify(data.signIn.token))
    }
  }, [data])

 
  return (
    <ImageBackground
      source={require(`../../../assets/backRotate.png`)}
      style={{ width: "100%", height: "100%", }}
    >
      <StatusBar hidden={true} />
      <View style={styles.container}>
        <View style={{ marginHorizontal: '5%', height: '30%', justifyContent: 'flex-end' }}>
          <Text style={styles.title}>Inicia Sesion</Text>
          <Text style={styles.text}>Bienvenido de nuevo!</Text>
        </View>

        <View style={[styles.inputContainer]}>
          <Icon name="mail-outline" color={Colors.gray} size={24} />
          <TextInput
            autoCapitalize='none'
            value={formik.values.email}
            onChangeText={(text) => formik.setFieldValue('email', text)}
            style={{ paddingHorizontal: 10, fontSize: 18 }}
            placeholder='tucorreo@gmail.com'
            keyboardType="email-address"
          />
        </View>
        <View style={[styles.inputContainer, { marginTop: 10, justifyContent: 'space-between' }]}>
          <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row' }}>
            <Icon name="key-outline" color={Colors.gray} size={24} />
            <TextInput
              value={formik.values.password}
              onChangeText={(text) => formik.setFieldValue('password', text)}
              secureTextEntry={visiblePassword ? false : true}
              style={{ paddingHorizontal: 10, fontSize: 18, width:'80%' }}
              placeholder='******'
            />
          </View>
          <Icon onPress={() => setVisiblePassword(visiblePassword ? false : true)} name={visiblePassword ? 'eye-outline' : 'eye-off-outline'} color={Colors.gray} size={24} />
        </View>

        <TouchableOpacity onPress={formik.handleSubmit}
          disabled={loading}>
          <View style={styles.containerButton}>
            <Text style={{
              color: "white",
              fontSize: 18
            }}>Iniciar Sesion</Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setRegister(true)} style={[styles.containerButton, { marginTop: 10, backgroundColor: 'none' }]}>
          <Text style={{
            color: Colors.primary,
            fontSize: 18
          }}>Regresar</Text>
        </TouchableOpacity>
        
      </View>
      <Modal animationType="fade"
      transparent={true}
      visible={register}
      >
      <ModalPutName/>
    </Modal>
    </ImageBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
  title: {
    fontSize: 40,
    fontWeight: 'bold',
    color: 'white'
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginHorizontal: '5%',
    borderWidth: 2,
    marginTop: '25%',
    paddingHorizontal: 10,
    borderColor: '#cacaca',
    borderRadius: 10,
    paddingVertical: 2,
    height: 40
  },
  containerButton: {
    marginHorizontal: '5%',
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    borderRadius: 10
  }
});
