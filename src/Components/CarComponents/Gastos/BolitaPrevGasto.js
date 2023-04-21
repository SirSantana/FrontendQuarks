import { useState } from "react";
import { View, Text, TouchableOpacity, Modal } from "react-native";
import ModalDetailsGasto from "../Modals/ModalDetailsGasto";
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import TiposDeGasto from "../../../utils/TiposDeGasto";


export default function BolitaPrevGasto({ item }) {
  const [modalVisible, setModalVisible] = useState(false)
  const { tipoGasto,  } = TiposDeGasto({ tipo: item?.tipo })

  ///COLOCAR ICONOS DE GASTOS REALES
  return (
    <>
      <TouchableOpacity onPress={() => setModalVisible(true)} style={{ justifyContent: 'center', alignItems: 'center', marginRight: 16 }}>
        <View style={{ backgroundColor: '#FFD4DA', height: 50, width: 50, borderRadius: 50, justifyContent: 'center', alignItems: 'center', }}>
          {tipoGasto === 'fuel' || tipoGasto === 'car-brake-parking' || tipoGasto === "car-wrench" || tipoGasto === 'highway' ?
            <MaterialCommunityIcons name={tipoGasto} size={24} color={'#f50057'} />
            : <MaterialIcons name={tipoGasto} size={24} color={'#f50057'} />}
        </View>
        <Text style={{ color: '#373737', fontSize: 14, marginTop: 8 }}>$ {item.dineroGastado}</Text>
      </TouchableOpacity>
      {modalVisible &&
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <ModalDetailsGasto id={item.id} setModalVisible={setModalVisible} />
        </Modal>}
    </>

  )
}