import { useLazyQuery } from "@apollo/client";
import { useEffect, useLayoutEffect, useState } from "react";
import { View, Text, FlatList,TouchableOpacity, Modal, Alert,ActivityIndicator} from "react-native";
import Icon from 'react-native-vector-icons/Ionicons';
import { GET_GASTOS } from "../../../graphql/querys";
import ModalFirstGasto from "../../../utils/ModalFirstGasto";
import BolitaPrevGasto from "./BolitaPrevGasto";
import ModalCreateGasto from "../Modals/ModalCreateGasto";


export default function GastosRecientes({ idCar }) {
  const [getPrevGastos, { loading, data, error }] = useLazyQuery(GET_GASTOS)
  const [modalVisible2, setModalVisible2] = useState(false);
  const [modalFirstGasto, setModalFirstGasto] = useState(false);


  useLayoutEffect(() => {
    if (idCar) {
      getPrevGastos({ variables: { id: idCar } })
    }
  }, [idCar])
  const validateExistVehicule=()=>{
    if(idCar){
      setModalVisible2(true)
    }else{
      Alert.alert('Primero debes crear un vehiculo')
    }
  }
  useEffect(()=>{
    if(data?.getPrevGastos.length <=0 ){
      setModalFirstGasto(true)
    }
  },[data])
  return (
    <View
      style={{ paddingVertical: '5%', paddingLeft: '5%', marginTop: '4%', opacity: idCar ? 1: 0.6}}
    >
      <Text style={{ color: '#373737', fontSize: 22, }}>Gastos Recientes</Text>

      <View style={{ marginTop: '4%', flexDirection: 'row', justifyContent: 'space-between' }}>
        <TouchableOpacity onPress={validateExistVehicule} style={{ justifyContent: 'center', alignItems: 'center' }}>
          <View style={{ backgroundColor: '#f50057', height: 50, width: 50, borderRadius: 50, justifyContent: 'center', alignItems: 'center' }}>
            <Icon name="add" color={'white'} size={26} />
          </View>
          <Text style={{ color: '#373737', fontSize: 14,marginTop:8 }}>Agregar</Text>

        </TouchableOpacity>
        {data?.getPrevGastos.length <=0 && <Text onPress={validateExistVehicule} style={{ color: '#f50057', fontSize: 20,alignSelft:'center', marginTop:16, marginLeft:16 }}>Crea tu primer gasto!</Text>}
        {loading && <ActivityIndicator size={'large'}/>}
        <FlatList
          showsHorizontalScrollIndicator={false}
          style={{
            marginLeft: '5%',
            width: '100%'
          }}
          horizontal
          renderItem={({ item }) => <BolitaPrevGasto item={item} />}
          data={data?.getPrevGastos}
        />

      </View>
      {modalVisible2 &&
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible2}
        >
          <ModalCreateGasto setModalVisible2={setModalVisible2} id={idCar} />
        </Modal>}

        {modalFirstGasto &&
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalFirstGasto}
        >
          <ModalFirstGasto setModalFirstGasto={setModalFirstGasto} setModalVisible2={setModalVisible2}/>
        </Modal>}
    </View>

  )
}