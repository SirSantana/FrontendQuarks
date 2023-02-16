import { useQuery } from '@apollo/client'
import { View, Text, Pressable, ScrollView, ActivityIndicator,Alert, Image, Linking, } from "react-native"
import { Colors } from '../../Contants/Colors'
import { GET_LAST_PREGUNTAS } from '../../graphql/querys'
import { marcasCarros } from '../CarComponents/marcasCarros'
import { marcasMotos } from '../CarComponents/marcasMotos'


export default function CotizacionesComunidad() {
  const { loading, error, data } = useQuery(GET_LAST_PREGUNTAS)
  
  if (error) {
    return Alert.alert('Ha ocurrido un error, revisa tú conexión')
  }
  if (loading) {
    return <ActivityIndicator />
  }
  return (
    <ScrollView style={{ backgroundColor: 'white', marginBottom: 100 }}>
      <Text style={{ color: '#7a7a7a', fontSize: 18, fontWeight: '400', marginRight: 5, marginVertical: 20, marginLeft: '5%', }}>Cotizaciones de la comunidad</Text>
      {data?.getLastPreguntas &&
        data.getLastPreguntas.map(el => {
          const marca = marcasCarros.find(ele => ele.marca === el?.marca)
          const marcaMoto = marcasMotos.find(ele => ele.marca === el?.marca)
          return (
            <Pressable
              onPress={() => Linking.openURL(`https://www.quarks.com.co/cotizaciones/${el.id} ${el.titulo}`)}
              key={el.id} style={{ padding: 20, flexDirection: 'row', alignItems: 'center', width: '100%' }}>
              <Image style={{ height: 40, width: 40, marginRight: 10 }} source={marca ? marca?.src : marcaMoto?.src} />
              <View style={{ flexDirection: 'column', width: '95%' }}>
                <View style={{ flexDirection: 'row', width: '90%', justifyContent: 'space-between', flexWrap: 'wrap', alignItems: 'center' }}>
                  <Text style={{ color: Colors.secondary, fontSize: 18, fontWeight: 'bold', marginRight: 5 }}>{el.referencia}</Text>
                  <Text style={{ color: '#7a7a7a', fontSize: 14, marginRight: 5, }}>{new Date(el.fecha).toLocaleDateString()}</Text>

                </View>
                <Text style={{ width: '95%', color: '#828282', fontSize: 16, marginRight: 5, flexWrap: 'wrap' }}>{el.titulo}</Text>
                <View style={{ height: 40, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginTop: 10, width: '50%', backgroundColor: el?.cotizaciones === null ? Colors.primary : 'green' }}>
                  <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>{el.cotizaciones === null ? '0 Cotizaciones' : el?.cotizaciones?.length + ' Cotizaciones'}</Text>
                </View>
              </View>
            </Pressable>
          )
        })
      }
    </ScrollView>
  )
}