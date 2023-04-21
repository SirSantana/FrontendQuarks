import { useLazyQuery, useQuery } from '@apollo/client'
import { View, Image, Text, TouchableOpacity, Modal, FlatList } from "react-native"
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { useEffect, useLayoutEffect, useState } from 'react';
import CardItem from './CardItem';
import { useNavigation } from '@react-navigation/native';
import { Alert } from 'react-native';
import { GET_VEHICLES } from '../../../graphql/querys';
import ModalPremium from '../../../utils/ModalPremium';



export default function CardVehiculo({ setIdCar, premium, idCar }) {
  const { data, error, loading } = useQuery(GET_VEHICLES)
  const [premiumModal, setPremiumModal] = useState(false)

  let long = data?.getCars?.length
  let numeroRenderizado = 0
  const navigation = useNavigation()

  const onNavigate = () => {
    if (data?.getCars?.length > 0 && premium < 2) {
      setPremiumModal(true)
    } else {
      navigation.navigate('Vehiculo', { screen: 'Crear Vehiculo' })
    }
  }

  useEffect(() => {
    if (data) {
      setIdCar(data?.getCars[0]?.id)
    }
  }, [data])
  if (loading) {
    return (
      <LinearGradient
        colors={['#F50057', '#5B0221']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{ padding: 16, width: '80%', borderRadius: 20, marginLeft: 16, height: 200 }}
      ></LinearGradient>
    )
  }
  if (error) {
    return Alert.alert('Ha ocurrido un error, revisa tu conexion')
  }
  //COLOCAR LOGO CORRECTO Y AGREGAR LA VISTA DEL GASTO DESDE EL HOME
  return (
    <>
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={({ item }) => {
          numeroRenderizado++
          return (
            <>
              <CardItem item={item} setIdCar={setIdCar} idCar={idCar} />
              {long === numeroRenderizado &&
                <TouchableOpacity onPress={onNavigate} style={{ backgroundColor: '#FFD4DA', paddingVertical: 16, paddingLeft: 16, borderRadius: 20, marginHorizontal: 16, width: 180, justifyContent: 'space-between', alignItems: 'flex-end', }}>
                  <Text style={{ color: '#5B0221', fontWeight: 'bold', fontSize: 26, alignSelf: 'flex-start' }}>Crea tu vehiculo</Text>
                  <Image resizeMode='center' source={require('../../../../assets/carroCut.png')} style={{ width: 140, height: 100, alignSelf: 'flex-end', alignContent: 'flex-end' }} />
                </TouchableOpacity>
              }
              {long === numeroRenderizado &&
                <TouchableOpacity onPress={onNavigate} style={{ backgroundColor: '#FFD4DA', paddingVertical: 16, paddingLeft: 16, borderRadius: 20, marginHorizontal: 16, width: 180, justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <View style={{ alignSelf: 'flex-start', flexDirection: 'row', alignItems: 'center' }}>
                    <Text style={{ color: '#5B0221', fontWeight: 'bold', fontSize: 26, alignSelf: 'flex-start', marginRight: 8 }}>Pasate a premium
                    </Text>
                    <Icon name="star" color={'#f50057'} size={40} />
                  </View>

                  <Text style={{ color: '#f50057', fontWeight: 'bold', fontSize: 16, alignSelf: 'flex-start' }}>Por solo $1.670 COP/mensuales y obten la version completa</Text>
                </TouchableOpacity>
              }
            </>
          )
        }
        } data={data?.getCars}
      />
      {data?.getCars?.length <= 0 &&
          <LinearGradient
            colors={['#F50057', '#5B0221']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={{ paddingVertical: 24, paddingLeft: 24, width: '90%', borderRadius: 20, marginLeft: 16 }}
          >
            <TouchableOpacity onPress={onNavigate} style={{ justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ width: '50%' }}>
                <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 26, }}>Crea tú vehículo</Text>
              </View>

              <Image resizeMode='center' source={require('../../../../assets/carroCut.png')} style={{ width: 140, height: 100, alignSelf: 'flex-end', alignContent: 'flex-end' }} />

            </TouchableOpacity>
          </LinearGradient>
        }
        
      <Modal
        animationType="fade"
        visible={premiumModal}
        transparent={true}
      >
        <ModalPremium setPremiumModal={setPremiumModal} />
      </Modal>
    </>



  )
}