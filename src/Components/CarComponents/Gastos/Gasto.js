import { View, Text } from "react-native";
import { Colors } from "../../../Contants/Colors";
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PriceFormat from "../../../utils/priceFormat";
import TiposDeGasto from "../../../utils/TiposDeGasto";


export default function Gasto({data}) {
  let fecha = new Date(data.fecha).toLocaleDateString()
  const dineroGastado = PriceFormat({price:data?.dineroGastado})
  const {tipoGasto,color} = TiposDeGasto({tipo:data?.tipo})

  return (
      <View style={{ display: 'flex', flexDirection: 'row', paddingHorizontal: 10, paddingVertical: 5, justifyContent: 'space-between', alignItems: 'center', marginBottom:5}}>
        <View style={{ flexDirection: 'row', alignItems:'center' }}>
          <View style={{ padding: 10, borderRadius: 10, backgroundColor: color, width: 50, height: 50, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          {tipoGasto === 'fuel' || tipoGasto === 'car-brake-parking' || tipoGasto === "car-wrench" || tipoGasto === 'highway'?
               <MaterialCommunityIcons name={tipoGasto} size={24} color={'white'}  />
              : <MaterialIcons name={tipoGasto} size={24} color={'white'} />}
          </View>
          <View style={{ marginLeft: 20 }}>
            <Text style={{ color: '#464646', fontSize: 16, fontWeight: 'bold', marginBottom: 5 }}>{data?.tipo}</Text>
            <Text style={{ color: '#adadad' }}>{fecha}</Text>
          </View>
        </View>
        <Text style={{ color: Colors.primary, fontSize: 16, fontWeight: 'bold', }}>$ {dineroGastado}</Text>
      </View>

  )
}