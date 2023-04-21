import { Text, TouchableOpacity } from "react-native";
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import PriceFormat from "../../../utils/priceFormat";

export default function CardToGasto({ data, gasto, color, setFiltro }) {
  let tipoGasto;
  if (gasto === 'Tanqueada') { tipoGasto = 'fuel' }
  if (gasto === 'Parqueadero') { tipoGasto = 'car-brake-parking' }
  if (gasto === 'Lavada') { tipoGasto = 'local-car-wash' }
  if (gasto === 'Repuestos') { tipoGasto = 'car-wrench' }
  if (gasto === 'Mantenimiento') { tipoGasto = 'car-repair' }
  if (gasto === 'Peaje') { tipoGasto= 'highway' }
  if (gasto === 'Multa')  { tipoGasto= 'local-police'}
  if (gasto === 'Otros') { tipoGasto='add' }
  return (
    <TouchableOpacity onPress={()=>setFiltro(gasto)} style={{ backgroundColor: color, width: 120, height: 150, marginRight: 20, borderRadius: 20, alignItems: 'flex-end', justifyContent: 'flex-end', padding: 10 }}>
      {tipoGasto === 'fuel' || tipoGasto === 'car-brake-parking' || tipoGasto === "car-wrench" ||tipoGasto === 'highway' ?
        <MaterialCommunityIcons name={tipoGasto} size={40} color={'white'} />
        : <MaterialIcons name={tipoGasto} size={40} color={'white'} />}
      <Text style={{ color: 'white', fontSize: data?.toString().length > 6 ? 18 : 22, fontWeight: '700' }}>${data.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</Text>
      <Text style={{ color: 'white' }}>{gasto}</Text>
    </TouchableOpacity>
  )
}