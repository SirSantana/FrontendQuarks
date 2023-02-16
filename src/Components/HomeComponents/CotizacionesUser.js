import { View, Text, TouchableOpacity, ImageBackground, Pressable, ActivityIndicator, Image, Linking, Alert } from "react-native"
import { Colors } from "../../Contants/Colors"
import Icon from 'react-native-vector-icons/Ionicons';
import { useQuery } from "@apollo/client";
import { GET_PREGUNTAS_USER } from "../../graphql/querys";
import { marcasCarros } from "../CarComponents/marcasCarros";
import { marcasMotos } from "../CarComponents/marcasMotos";
import { useEffect } from "react";



export default function CotizacionesUser({ setTab }) {
  const { loading, error, data } = useQuery(GET_PREGUNTAS_USER)
  useEffect(() => {
    if (error) {
      Alert.alert(error?.message)
    }
  }, [error])
  return (
    <View style={{ backgroundColor: 'white' }}>
      <Text style={{ color: '#7a7a7a', fontSize: 18, fontWeight: '400', marginRight: 5, marginVertical: 20, marginLeft: '5%', }}>Tus cotizaciones</Text>
      {loading && <ActivityIndicator color={Colors.primary} />}
      {data?.getPreguntasUser ?
        data.getPreguntasUser.map(el => {
          const marca = marcasCarros.find(ele => ele.marca === el?.marca)
          const marcaMoto = marcasMotos.find(ele => ele.marca === el?.marca)
          return (
            <Pressable
              onPress={() => Linking.openURL(`https://www.quarks.com.co/cotizaciones/${el.id} ${el.titulo}`)}
              key={el.id} style={{ padding: 20, flexDirection: 'row', alignItems: 'center', width: '100%' }}>
              <Image style={{ height: 40, width: 40, marginRight: 10 }} source={marca ? marca?.src : marcaMoto?.src} />
              <View style={{ flexDirection: 'column', width: '95%' }}>
                <View style={{ flexDirection: 'row', width: '90%', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Text style={{ color: Colors.secondary, fontSize: 18, fontWeight: 'bold', marginRight: 5 }}>{el.referencia}</Text>
                  <Text style={{ color: '#7a7a7a', fontSize: 14, marginRight: 5 }}>{new Date(el.fecha).toLocaleDateString()}</Text>
                </View>
                <Text style={{ color: '#828282', fontSize: 16, marginRight: 5, width: '95%' }}>{el.titulo}</Text>
                <View style={{ height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginTop: 10, width: '50%', backgroundColor: el?.cotizaciones === null ? Colors.primary : 'green' }}>
                  <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>{el.cotizaciones === null ? '0 Cotizaciones' : el?.cotizaciones?.length + ' Cotizaciones'}</Text>
                </View>
              </View>
              <View style={{ backgroundColor: 'blue', height: 10, width: '90%' }} />
            </Pressable>
          )
        })
        :
        <TouchableOpacity onPress={() => setTab('search')} style={{ marginBottom: 20 }}>
          <ImageBackground onLoadStart={() => <ActivityIndicator color={Colors.primary} />} style={{ borderRadius: 10, padding: 20, height: 180, marginHorizontal: '5%', justifyContent: 'center', alignItems: 'center' }} source={require('../../../assets/CardOpacityCar.png')}>
            <View style={{ padding: 5, width: '50%', justifyContent: 'center', flexDirection: 'row', alignItems: 'center', backgroundColor: Colors.primary, borderRadius: 5 }}>
              <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', marginRight: 5 }}>Cotiza tus repuestos</Text>
              <Icon name={'add-outline'} color={'white'} size={24} />
            </View>
          </ImageBackground>
        </TouchableOpacity>
      }
    </View>
  )
}