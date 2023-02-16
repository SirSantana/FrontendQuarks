import { useEffect, useState } from "react";
import { Text, View, Alert, Modal, ImageBackground, StatusBar, StyleSheet, TextInput, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from "../../Contants/Colors";
import LoginScreen from "./LoginScreen";
import * as Yup from 'yup'
import { SIGN_UP } from "../../graphql/mutations";
import { useFormik } from "formik";
import { useMutation } from "@apollo/client";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { client } from "../../../apollo";
import useAuth from "../../hooks/useAuth";
import ModalCargando from "../../utils/ModalCargando";

const initialForm = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',

}
const validationSchema = {
  name: Yup.string().required('Debes colocar un nombre'),
  email: Yup.string().required('Debes colocar un email').email('Debe ser un email valido'),
  password: Yup.string().required('Debes colocar una password').min(6, 'Debe tener minimo 6 caracteres'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Las contraseñas deben coincidir'),
}
export default function RegisterScreen() {
  const [visiblePassword, setVisiblePassword] = useState(false)
  const [signUp, { data, error, loading }] = useMutation(SIGN_UP)
  const { login } = useAuth()

  const [loginScreen, setLogin] = useState(false)

  const formik = useFormik({
    initialValues: initialForm,
    validateOnChange: false,
    validationSchema: Yup.object(validationSchema),
    onSubmit: (formValue) => {
      signUp({ variables: formValue })
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
      login(data?.signUp?.user)
      AsyncStorage.setItem('token', JSON.stringify(data.signUp.token))
    }
  }, [data])
  if (loginScreen) {
    return <LoginScreen />
  }
  return (
    <ImageBackground
      source={require(`../../../assets/backRotate.png`)}
      style={{ width: "100%", height: "100%", }}
    >
      <StatusBar hidden={true} />
      <View style={styles.container}>
        <View style={{ marginHorizontal: '5%', height: '30%', justifyContent: 'flex-end' }}>
          <Text style={styles.title}>Registrate</Text>
          <Text style={styles.text}>Completa tus datos</Text>
        </View>
        {formik.errors.name && <Text style={{ color: 'red', marginLeft: 20 }}>{formik.errors.name}</Text>}
        <View style={styles.inputContainer}>
          <Icon name="person-outline" color={Colors.gray} size={24} />
          <TextInput
            style={{ paddingHorizontal: 10, fontSize: 18, width: '100%' }}
            value={formik.values.name}
            placeholder='Tu nombre'
            onChangeText={(text) => formik.setFieldValue('name', text)}
            maxLength={15}
          />
        </View>

        {formik.errors.email && <Text style={{ color: 'red', marginLeft: 20 }}>{formik.errors.email}</Text>}
        <View style={[styles.inputContainer, { marginTop: 10 }]}>
          <Icon name="mail-outline" color={Colors.gray} size={24} />
          <TextInput
            style={{ paddingHorizontal: 10, fontSize: 18, width: '100%' }}
            autoCapitalize='none'
            value={formik.values.email}
            placeholder='tucorreo@gmail.com'
            onChangeText={(text) => formik.setFieldValue('email', text)}
          />
        </View>

        {formik.errors.password && <Text style={{ color: 'red', marginLeft: 20 }}>{formik.errors.password}</Text>}
        <View style={[styles.inputContainer, { marginTop: 10, justifyContent: 'space-between' }]}>
          <View style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row' }}>
            <Icon name="key-outline" color={Colors.gray} size={24} />
            <TextInput
              secureTextEntry={visiblePassword ? false : true}
              style={{ paddingHorizontal: 10, fontSize: 18,width:'85%' }}
              placeholder='******'
              value={formik.values.password}
              onChangeText={(text) => formik.setFieldValue('password', text)}
            />
          </View>
          <Icon onPress={() => setVisiblePassword(visiblePassword ? false : true)} name={visiblePassword ? 'eye-outline' : 'eye-off-outline'} color={Colors.gray} size={24} />
        </View>

        {formik.errors.confirmPassword && <Text style={{ color: 'red', marginLeft: 20 }}>{formik.errors.confirmPassword}</Text>}
        <View style={[styles.inputContainer, { marginTop: 10, justifyContent: 'space-between' }]}>
          <View style={{ justifyContent: 'flex-start', alignItems: 'center', flexDirection: 'row' }}>
            <Icon name="key-outline" color={Colors.gray} size={24} />
            <TextInput
              secureTextEntry={visiblePassword ? false : true}
              style={{ paddingHorizontal: 10, fontSize: 18,width:'85%' }}
              placeholder='Confirma tu contraseña'
              value={formik.values.confirmPassword}
              onChangeText={(text) => formik.setFieldValue('confirmPassword', text)}
            />
          </View>
          <Icon onPress={() => setVisiblePassword(visiblePassword ? false : true)} name={visiblePassword ? 'eye-outline' : 'eye-off-outline'} color={Colors.gray} size={24} />
        </View>

        <TouchableOpacity disabled={loading} onPress={formik.handleSubmit}>
          <View style={styles.containerButton}>
            <Text style={{
              color: "white",
              fontSize: 18
            }}>Registrate</Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity disabled={loading} onPress={() => setLogin(true)} style={[styles.containerButton, { marginTop: 10, backgroundColor: 'none' }]}>
          <Text style={{
            color: Colors.primary,
            fontSize: 18
          }}>Ya tienes una cuenta? Inicia sesión</Text>
        </TouchableOpacity>
      </View>
      {
        loading &&
        <Modal
          animationType="fade"
          visible={loading}
          transparent={true}
        >
          <ModalCargando text='Creando perfil...' />
        </Modal>
      }
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
    height: 40,
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
