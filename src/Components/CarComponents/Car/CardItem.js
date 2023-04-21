
import { useLazyQuery,  } from '@apollo/client'
import { View, Image, Text, Modal, TouchableOpacity } from "react-native"
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { Dimensions } from 'react-native';
import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { GET_GASTOS_MONTH } from '../../../graphql/querys';
import PriceFormat from '../../../utils/priceFormat';
import { marcasCarros } from '../marcasCarros';
import { marcasMotos } from '../marcasMotos';
import ModalSettings from '../Modals/ModalSettings';


const month = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
export default function CardItem({ item, setIdCar, idCar }) {
  const [getGastosMonth, result] = useLazyQuery(GET_GASTOS_MONTH)
  const { width } = Dimensions.get('screen')
  const date = new Date()
  const monthNum = date.getMonth()
  const navigation = useNavigation()
  const [settings, setSettings] = useState(false)

  let medida = width * 85 / 100

  let dineroTotalGastado = 0;
  if (result?.data?.getGastosMonth) {
    for (let i = 0; i <= result?.data?.getGastosMonth?.length - 1; i++) {
      dineroTotalGastado += Number(result?.data?.getGastosMonth[i]?.dineroGastado)
    }
  }
  useEffect(() => {
    getGastosMonth({ variables: { id: item.id } })
  }, [])
  const marca = marcasCarros.find(ele => ele.marca === item.marca)
  const marcaMoto = marcasMotos.find(ele => ele.marca === item?.marca)

  return (
    <LinearGradient
      colors={['#F50057', '#81002E']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ padding: 16, width: medida, borderRadius: 20, marginLeft: 16, opacity: idCar === item?.id ? 1: 0.6}}
    >
      <TouchableOpacity  onPress={() => setIdCar(item?.id)}>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <Image style={{ height: 40, width: 40, marginRight: 5 }} source={item?.tipo === 'Carro' ? marca?.src : marcaMoto?.src} />
          <Text style={{ color: 'white', fontSize: 14, }}>Sincronizar gastos</Text>

        </View>
        <Text style={{ color: 'white', fontSize: 18, fontWeight: '500' }}>{item?.marca} {item?.referencia}</Text>
        <Text style={{ color: 'white', fontSize: 14, }}>{item?.modelo}</Text>


      <View style={{ alignItems: 'flex-end', justifyContent: 'flex-end' }}>
        <Text style={{ color: '#5B0221', fontSize: 14, fontWeight: 'bold' }}>{month[monthNum]}</Text>
        <Text style={{ color: 'white', fontSize: 28, fontWeight: 'bold' }}>$ {PriceFormat({ price: dineroTotalGastado?.toString() })}</Text>
        <View style={{ flexDirection: 'row', marginTop: 8 }}>
          <TouchableOpacity onPress={() => navigation.navigate('Gastos', { item: item })} style={{ backgroundColor: '#5B0221', paddingVertical: 8, marginRight: 8, paddingHorizontal: 16, borderRadius: 8 }}>
            <Text style={{ color: '#f50057', fontSize: 16, fontWeight: 'bold' }}>Ver gastos</Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setSettings(true)} style={{ backgroundColor: '#5B0221', paddingVertical: 4, paddingHorizontal: 8, borderRadius: 8, justifyContent: 'center', alignItems: 'center' }}>
            <Icon name="create-outline" color={'#f50057'} size={22} />
          </TouchableOpacity>
        </View>

      </View>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        visible={settings}
        transparent={true}
        onRequestClose={() => {
          setSettings(false);
        }}
      >
        <ModalSettings setSettings={setSettings} item={item} />
      </Modal>

    </LinearGradient>

  )
}