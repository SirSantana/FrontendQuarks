import { View,  Text, TouchableOpacity,Modal, Image, ActivityIndicator, Alert } from "react-native"
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from "@react-navigation/native";
import { GET_VEHICLES } from "../../../graphql/querys";
import { useQuery } from "@apollo/client";
import { marcasCarros } from "../../CarComponents/marcasCarros";
import { marcasMotos } from "../../CarComponents/marcasMotos";
import useAuth from "../../../hooks/useAuth";
import ModalPremium from "../../../utils/ModalPremium";
import { useEffect, useState } from "react";


export default function CarCardPreviusView() {
  const { loading, data, error } = useQuery(GET_VEHICLES)
  const navigation = useNavigation()
  const { user } = useAuth()
  const [premiumModal, setPremiumModal] = useState(false)

  useEffect(()=>{
    if (error) {
     Alert.alert('Ha ocurrido un error, revisa tú conexión')
    }
  },[error])
  useEffect(()=>{
    if (loading) {
     <ActivityIndicator />
    }
  },[loading])
  const onNavigate = () => {
    if (data.getCars.length > 0 && user?.premium < 2) {
      setPremiumModal(true)
    }else{
      navigation.navigate('Vehiculo', { screen: 'Vehiculos', params: { crear: 'Crear' } })
    }
  }
  return (
    <>
      <Text style={{ color: 'white', fontSize: 18, fontWeight: '400', marginRight: 5, marginVertical: 20, marginLeft: '5%' }}>Tus vehiculos</Text>
      {data?.getCars.map(el => {
        const marca = marcasCarros.find(ele => ele.marca === el.marca)
        const marcaMoto = marcasMotos.find(ele => ele.marca === el?.marca)
        return (
          <TouchableOpacity key={el.id} onPress={() => navigation.navigate('Vehiculo', { screen: 'Vehiculos', params: { item: el } })} style={{ borderRadius: 10, padding: 15, height: 150, marginBottom: 20, marginHorizontal: '5%', backgroundColor: '#76022C', elevation: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', height: '100%', justifyContent: el?.imagen ? 'space-between' : 'center', }}>
              <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '40%' }}>
                <Image style={{ height: 40, width: 40, marginRight: 5 }} source={el?.tipo === 'Carro' ? marca?.src : marcaMoto?.src} />
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>{el?.referencia}</Text>
                    <Text style={{ fontSize: 14, color: 'white' }}>{el?.modelo}</Text>
                  </View>
                </View>
              </View>
              {el?.imagen && <Image style={{ height: 100, borderRadius: 10, width: '60%', alignSelf: 'center' }} source={{ uri: el.imagen }} />}
            </View>
          </TouchableOpacity>
        )
      })}
      <TouchableOpacity onPress={onNavigate} style={{ borderRadius: 10, padding: 15, height: 150, marginBottom: 20, marginHorizontal: '5%', justifyContent: 'center', alignItems: 'center', backgroundColor: '#76022C', elevation: 10, flexDirection: 'row' }}>
        <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginRight: 5 }}>Crear vehiculo</Text>
        <Icon name={'star'} color={'#F6DE0A'} size={24} />
      </TouchableOpacity>

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