import React, {  useState } from "react";
import {
  View,
  Modal,
  TouchableOpacity,
  Platform
} from "react-native";
import { Colors } from "../../../Contants/Colors";
import Donut from "./Donut";
import Icon from 'react-native-vector-icons/Ionicons';
import ModalResumeMes from "../Modals/ModalResumeMes";

const Detail = ({ gastosSeparados, numeroGastosSeparados, car }) => {
  const [modalVisible, setModalVisible] = useState(false)
  
  return (
    <View style={{ borderRadius: 20, padding: 10, }}>
      <View style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
        <TouchableOpacity onPress={()=> setModalVisible(true)} style={{ backgroundColor: Colors.primary, borderRadius: 10, justifyContent: 'center', alignItems: 'center', width: 40, height: 40, position: 'absolute', top: Platform.OS === 'android' ? '65%' : '65%', right: 20, zIndex: 999 }}>
          <Icon name="stats-chart" color={'white'} size={22} />
        </TouchableOpacity>
        <Donut gastosSeparados={gastosSeparados} />
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <ModalResumeMes setModalVisible={setModalVisible} gastosSeparados={gastosSeparados} numeroGastosSeparados={numeroGastosSeparados} car={car}/>
        </Modal>
        
      </View>
    </View>

  );
};
export default Detail;

