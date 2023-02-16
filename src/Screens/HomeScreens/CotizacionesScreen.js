import { useLazyQuery } from '@apollo/client';
import { useLayoutEffect } from 'react';
import { View, FlatList } from 'react-native'
import CardCotizaciones from '../../Components/HomeComponents/CardCotizaciones';
import { GET_COTIZACIONES } from '../../graphql/querys';


export default function CotizacionesScreen({ route }) {
  // const [getCotizaciones, { loading, data, error }] = useLazyQuery(GET_COTIZACIONES)
  // useLayoutEffect(() => {
  //   if (route?.params?.id) {
  //     getCotizaciones({ variables: { id: route?.params?.id } })
  //   }
  // }, [])
  return (
    <View>
      
    </View>
    // <FlatList
    //   style={{ width: '100%', }}
    //   horizontal
    //   renderItem={( {item} ) => CardCotizaciones(item)}
    //   data={data?.getCotizaciones}
    // />
  )
}