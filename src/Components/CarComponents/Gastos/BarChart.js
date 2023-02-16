import { View, Text } from "react-native";

import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from "../../../Contants/Colors";
export default function BarChartGastos({ item, maxPercentage, gastoSelected }) {
  let maxHeigth = 160;
  let height = (item?.percentage * maxHeigth) / maxPercentage
  let tipo = item?.tipo

  let tipoGasto;
  if (tipo === 'Tanqueada') { tipoGasto = 'fuel' }
  if (tipo === 'Parqueadero') { tipoGasto = 'car-brake-parking' }
  if (tipo === 'Lavadas') { tipoGasto = 'local-car-wash' }
  if (tipo === 'Repuestos') { tipoGasto = 'car-wrench' }
  if (tipo === 'Mantenimiento') { tipoGasto = 'car-repair' }
  return (
    <>
      <View style={{ height: height ? height - 20 : 5, alignItems: 'center', paddingVertical: 5, justifyContent: 'flex-end', borderRadius: 10, width: 40, marginRight: 20, backgroundColor: gastoSelected === tipo ? '#f50057' : '#FFEBF0', }}>
        <View>

        </View>

      </View>
      {tipoGasto === 'fuel' || tipoGasto === 'car-brake-parking' || tipoGasto === "car-wrench" ?
        <MaterialCommunityIcons style={{ alignSelf: 'stretch', marginTop: 10 }} name={tipoGasto} size={24} color={Colors.primary} />
        : <MaterialIcons style={{ alignSelf: 'stretch', marginTop: 10 }} name={tipoGasto} size={24} color={Colors.primary} />}
    </>
  )
}