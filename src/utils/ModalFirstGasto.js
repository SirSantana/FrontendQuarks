import { View, Text, StyleSheet, ActivityIndicator,TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';


export default function ModalFirstGasto({setModalFirstGasto, setModalVisible2 }) {
  return (
    <TouchableOpacity onPress={()=> setModalFirstGasto(false)} style={styles.centeredView}>
      <View style={styles.modalView}>
        <Text style={styles.titleRed}>Genial! Ya creaste tu vehiculo</Text>
        <Text style={styles.titleRed1}>Ahora vamos a agregar tu primer gasto</Text>
        <TouchableOpacity onPress={()=> {setModalFirstGasto(false), setModalVisible2(true)}} style={{ justifyContent: 'center', alignItems: 'center', marginTop:16 }}>
          <View style={{ backgroundColor: '#f50057', height: 50, width: 50, borderRadius: 50, justifyContent: 'center', alignItems: 'center' }}>
            <Icon name="add" color={'white'} size={26} />
          </View>
          <Text style={{ color: '#373737', fontSize: 14,marginTop:8 }}>Agregar</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: 'rgba(0,0,0,0.5)',
        width: '100%'
      },
      modalView: {
        margin: 20,
        backgroundColor: '#f3f3f3',
        borderRadius: 20,
        padding: 20,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
    
      },
  titleRed: {
    fontSize: 18,
    fontWeight: "400",
    color: '#f50057',
    marginBottom:16
  },
  titleRed1: {
    fontSize: 16,
    fontWeight: "400",
    color: '#373737',
    marginBottom:16
  },
  
});