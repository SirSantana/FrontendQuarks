import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import TiposDeGasto from "../../../utils/TiposDeGasto";
import {View, } from 'react-native'

export default function IconoTipoGasto({tipo}) {
  const {tipoGasto} = TiposDeGasto({tipo})
  return (
    <View style={{  borderRadius: 10, backgroundColor: '#FFD4DA', width: 40, height: 40, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      {tipoGasto === 'fuel' || tipoGasto === 'car-brake-parking' || tipoGasto === "car-wrench" || tipoGasto === 'highway' ?
        <MaterialCommunityIcons name={tipoGasto} size={22} color={'#f50057'} />
        : <MaterialIcons name={tipoGasto} size={22} color={'#f50057'} />}
    </View>
  )
}