import {useMutation, useQuery } from '@apollo/client'
import { useEffect, useState } from 'react'
import { View, Text, ActivityIndicator, Alert, StyleSheet, Pressable, TextInput, Modal } from 'react-native'
import { Colors } from '../../../Contants/Colors'
import { GET_GASTOS_MONTH, GET_VEHICLES } from '../../../graphql/querys'
import Icon from 'react-native-vector-icons/Ionicons';
import { Buttons } from '../../../Themes/buttons'
import { CREATE_PRESUPUESTO } from '../../../graphql/mutations'
import { TouchableOpacity } from 'react-native'
import ModalCargando from '../../../utils/ModalCargando'
import ModalSuccesfull from '../../../utils/ModalSuccesfull'
import { useNavigation } from '@react-navigation/native'
import PriceFormat from '../../../utils/priceFormat'
import ModalPremium from '../../../utils/ModalPremium'
import useAuth from '../../../hooks/useAuth'


export default function CardLimitGasto({ id, presupuestoMes }) {
  const { loading, error, data } = useQuery(GET_GASTOS_MONTH, { variables: { id } })
  const [createPresupuesto, result] = useMutation(CREATE_PRESUPUESTO, { refetchQueries: [{ query: GET_VEHICLES }] })
  const [visibleInput, setVisibleInput] = useState(false)
  const [presupuesto, setPresupuesto] = useState('')
  const [visibleSuccesfull, setVisibleSuccesfull] = useState(false)
  const [premiumModal, setPremiumModal] = useState(false)
  const navigation = useNavigation()
  const {user} = useAuth()

  let dineroTotalGastado = 0;
  if (data?.getGastosMonth) {
    for (let i = 0; i <= data?.getGastosMonth?.length - 1; i++) {
      dineroTotalGastado += Number(data?.getGastosMonth[i]?.dineroGastado)
    }
  }
  const handleSubmit = () => {
    if (presupuesto.length <= 0) {
      Alert.alert('Debes colocar tu presupuesto')
      return
    }
    createPresupuesto({ variables: { presupuesto, id } })
  }
  useEffect(() => {
    if (error) {
      Alert.alert(error, 'Ha ocurrido un error, intentalo mas tarde')
    }
  }, [error])
  let porcentaje = 0;
  if (dineroTotalGastado && presupuestoMes) {
    porcentaje = (dineroTotalGastado * 100) / presupuestoMes
  }
  const handleHasPremium=()=>{
    if(user?.premium>0){
      setVisibleInput(true)
    }else{
    setPremiumModal(true)
    }
  }
  useEffect(() => {
    if (result?.data) {
      setVisibleSuccesfull(true)
      setTimeout(() => {
        setVisibleSuccesfull(false)
        setVisibleInput(false)
        navigation.navigate('Mi perfil')
      }, 2000)
    }
  }, [result?.data])

  return (
    <>
      <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 30 }}>
        <Pressable onPress={() => setPremiumModal(true)} style={{ alignItems: 'center', flexDirection: 'row' }}>
          <Text style={styles.title}>Tú presupuesto</Text>
          <Icon style={{ marginLeft: 5 }} name={'star'} color={'#F6DE0A'} size={24} />
        </Pressable>
        <Icon onPress={handleHasPremium} name={presupuestoMes ? "create-outline" : "add-circle-outline"} color={Colors.primary} size={28} />
      </View>

      <View style={{ backgroundColor: Colors.primary, width: '100%', borderRadius: 20, padding: 20, marginTop: 10 }}>
        {loading && <ActivityIndicator color={Colors.primary} />}


        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Text style={{ color: '#5B0221', fontSize: 16, marginBottom: 10, fontWeight: 'bold' }}>Balance de este mes</Text>
          <Text style={{ color: 'white', fontSize: 16, marginBottom: 10 }}>{porcentaje?.toFixed(0)}%</Text>
        </View>
        <View style={{ backgroundColor: '#5B0221', width: '100%', justifyContent: 'center', height: 20, borderRadius: 10, padding:4,alignItems: 'flex-start' }}>
          <View style={{ backgroundColor: 'white', width: porcentaje <= 100 ? `${porcentaje}%` : '100%', height: 12, borderRadius: 10 }} />
        </View>
        {presupuestoMes
          ? <View style={{ flexDirection: 'row', alignItems: 'center', marginVertical: 10 }}>
            <Text style={{ color: 'white', fontSize: 24, fontWeight: 'bold', marginRight: 5 }}>${PriceFormat({ price: dineroTotalGastado.toString() })}</Text>
            <Text style={{ color: '#5B0221', fontSize: 18, fontWeight: 'bold', }}>de {PriceFormat({ price: presupuestoMes?.toString() })}</Text>
          </View>
          :
          <TouchableOpacity
            style={[Buttons.primary, { width: '100%' }]}
            onPress={handleHasPremium}
          >
            <Text style={{ color: 'white', fontSize: 18, fontWeight: "600" }}>Crea tú presupuesto mensual</Text>
          </TouchableOpacity>
        }
      </View>
      <Modal
        animationType="slide"
        transparent={true}
        style={{ backgroundColor: 'rgba(0,0,0,0.5)', }}
        visible={visibleInput}
      >
        <Pressable onPress={() => setVisibleInput(false)} style={styles.centeredView}>
          <View style={styles.modalView2}>
            <View style={{ backgroundColor: 'gray', height: 3, width: '20%', alignSelf: 'center', marginVertical: 10 }} />
            <View style={{ flexDirection: 'column', width: '100%', padding: 20, justifyContent: 'center', }}>
              <Text style={{ fontSize: 16, color: '#7a7a7a', marginBottom: 10 }}>Elige tu presupuesto mensual</Text>
              <Pressable style={{ backgroundColor: '#f7f7f7', elevation: 2, width: '100%', height: 50, paddingHorizontal: 5, alignItems: 'center', flexDirection: 'row', marginBottom: 20 }}>
                <Icon style={{ marginLeft: 10 }} name="cash-outline" color={Colors.gray} size={24} />
                <TextInput
                  onChangeText={(text) => setPresupuesto(text)}
                  style={{ backgroundColor: '#f7f7f7', paddingHorizontal: 20, fontSize: 18, width: '90%', height: '100%' }}
                  placeholder='800.000'
                  maxLength={20}
                  keyboardType="numeric"
                />
              </Pressable>
              <TouchableOpacity
                style={[Buttons.primary, { width: '100%' }]}
                onPress={handleSubmit}
                disabled={result?.loading}
              >
                <Text style={{ color: 'white', fontSize: 18, fontWeight: "600" }}>{presupuestoMes ? 'Edita tu' : 'Crea tu'} presupuesto</Text>
              </TouchableOpacity>

            </View>
          </View>
        </Pressable>
      </Modal>
        {result?.loading &&
        <Modal
        animationType="fade"
        visible={result?.loading}
        transparent={true}
      >
        <ModalCargando text='Creando presupuesto...' />
      </Modal>}
      <Modal
        animationType="fade"
        visible={premiumModal}
        transparent={true}

      >
        <ModalPremium setPremiumModal={setPremiumModal} />
      </Modal>
      {visibleSuccesfull &&
        <Modal
          animationType="fade"
          visible={visibleSuccesfull}
          transparent={true}
        >
          <ModalSuccesfull text={'Presupuesto'} description={'Creado'} />
        </Modal>
      }
    </>
  )
}

const styles = StyleSheet.create({

  title: {
    color: '#464646', fontWeight: '500', fontSize: 18,
  },
  centeredView: {
    justifyContent: "center",
    height: '100%',
    backgroundColor: 'rgba(0,0,0,0.5)',

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
