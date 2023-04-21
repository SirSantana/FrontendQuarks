import { View, Text, TouchableOpacity} from "react-native";
import RecordatoriosScreen from "../../Screens/CarScreens/RecordatoriosScreen";


export default function Recordatorios({idCar}) {
  return (
    <View
      style={{ paddingVertical: '5%', paddingHorizontal: '5%', opacity: idCar ? 1: 0.6 }}
    >
      <RecordatoriosScreen item={idCar}/>
    </View>
  )
}