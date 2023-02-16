import { View, StyleSheet, Text, Pressable, ScrollView, } from "react-native";
import { Colors } from "../../../Contants/Colors";
import Icon from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from "react-native";

let meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre', 'Todo el Año']
let año = [2022, 2023]
export default function ModalSelectTime({ tipo, setModalVisible, setResumenYear, setMonthActual, setYearActual, yearActual, monthActual }) {
  const handleMonth = (el) => {
    if (el === 12) {
      setResumenYear(true)
      setMonthActual(el)
    } else {
      setResumenYear(false)
      setMonthActual(el)
    }
    setModalVisible(false)
  }
  return (
    <>
      <Pressable onPress={() => setModalVisible(false)} style={styles.centeredView}>
        <ScrollView style={styles.modalView}>
          <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Icon name="calendar-outline" color={'#f50057'} size={30} />
          </View>

          <View style={{ marginTop: 20 }}>
            {tipo === 'mes'
              ?
              meses.map((index, el) => (
                <TouchableOpacity key={el} onPress={() => handleMonth(el)} style={styles.viewDetail}>
                  <Text style={styles.label1}>{meses[el]}</Text>
                  {el === monthActual ?
                    <Icon name="ellipse"  color={'#f50057'} size={30} />
                    :
                    <Icon name="ellipse-outline" color={'#f50057'} size={30} />
                  }
                </TouchableOpacity>
              ))
              : año.map((index, el) => (
                <TouchableOpacity key={el} onPress={() => { setYearActual(año[el]), setModalVisible(false) }} style={styles.viewDetail}>
                  <Text style={styles.label1}>{año[el]}</Text>
                  {año[el] === yearActual ?
                    <Icon name="ellipse" color={'#f50057'} size={30} />
                    :
                    <Icon name="ellipse-outline" color={'#f50057'} size={30} />
                  }
                </TouchableOpacity>
              ))}
          </View>
        </ScrollView>
      </Pressable>

    </>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: "center",
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: '100%',
    width: '100%',

  },
  modalView: {
    //   margin: 20,
    //   backgroundColor: "#f3f3f3",
    //   borderRadius: 20,
    padding: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: "absolute",
    bottom: 0,
    width: '100%',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: 'white',
  },
  modalView2: {
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: "absolute",
    bottom: 0,
    height: 150,
    paddingHorizontal: 10,
    width: '100%',
    borderTopLeftRadius: 20,
    alignItems: "center",
    borderTopRightRadius: 20,
    backgroundColor: "#f3f3f3",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
  },
  viewDetail: {
    marginTop: 5, flexDirection: 'row', justifyContent: 'space-between', width: '100%'
  },
  label1: {
    color: Colors.gray,
    fontSize: 16

  },
  label2: {
    color: Colors.secondary,
    fontWeight: '600',
    fontSize: 16
  }
});