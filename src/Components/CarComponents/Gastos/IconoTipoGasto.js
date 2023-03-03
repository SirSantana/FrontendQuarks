import { Colors } from "../../../Contants/Colors";
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import TiposDeGasto from "../../../utils/TiposDeGasto";
import {View, } from 'react-native'

export default function IconoTipoGasto({tipo}) {
  const {tipoGasto,color} = TiposDeGasto({tipo})
  return (
    <View style={{  borderRadius: 10, backgroundColor: color, width: 40, height: 40, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {tipoGasto === 'fuel' || tipoGasto === 'car-brake-parking' || tipoGasto === "car-wrench" || tipoGasto === 'highway' ?
        <MaterialCommunityIcons name={tipoGasto} size={22} color={'white'} />
        : <MaterialIcons name={tipoGasto} size={22} color={'white'} />}
    </View>
  )
}