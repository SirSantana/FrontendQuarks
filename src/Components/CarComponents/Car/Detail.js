import React, {  useState } from "react";
import {
  View,
  Modal,
  TouchableOpacity,
  Platform
} from "react-native";
import { Colors } from "../../../Contants/Colors";
import BarChartGastos from "../Gastos/BarChart";
import CardToGasto from "../Gastos/CardToGasto";
import DetailGastoDonut from "../Gastos/DetailGastoDonut";
import Donut from "./Donut";
import Icon from 'react-native-vector-icons/Ionicons';
import ModalResumeMes from "../Gastos/ModalResumeMes";

const Detail = ({ gastosSeparados, numeroGastosSeparados, car }) => {
  console.log(numeroGastosSeparados);
  const [modalVisible, setModalVisible] = useState(false)
  
  // const [gastoSelected, setGastoSelected] = useState('Tanqueada')
  // const tanqueada = gastosSeparados[0]
  // const mantenimiento = gastosSeparados[1]
  // const lavadas = gastosSeparados[2]
  // const repuestos = gastosSeparados[3]
  // const parqueadero = gastosSeparados[4]


  // const total = tanqueada + repuestos + mantenimiento+lavadas+parqueadero

  // const tanqueadaPercentage = (tanqueada / total) * 100;
  // const repuestosPercentage = (repuestos / total) * 100;
  // const mantenimientoPercentage = (mantenimiento / total) * 100;
  // const lavadasPercentage = (lavadas / total) * 100;
  // const parqueaderoPercentage = (parqueadero / total) * 100;
  // let data=[
  //   {percentage:tanqueadaPercentage, dineroGastado:tanqueada, tipo:'Tanqueada'},
  //   {percentage:repuestosPercentage, dineroGastado:repuestos,tipo:'Repuestos'},
  //   {percentage:mantenimientoPercentage, dineroGastado:mantenimiento,tipo:'Mantenimiento'},
  //   {percentage:lavadasPercentage, dineroGastado:lavadas, tipo:'Lavadas'},
  //   {percentage:parqueaderoPercentage, dineroGastado:parqueadero,tipo:'Parqueadero'},
  // ]
  // let dataa = data.sort(function(a,b){
  //   return a.dineroGastado-b.dineroGastado;
  //  });
  //  let maxPercentage = dataa[dataa.length-1].percentage
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
        {/* <FlatList
            contentContainerStyle={{justifyContent:'flex-end', alignItems:'flex-end'}}
            style={{marginLeft:15, height:180, width:Dimensions.get('window').width,}}
            renderItem={( {item} ) =>
            <TouchableOpacity onPress={()=>setGastoSelected(item.tipo)}>
                <BarChartGastos item={item} maxPercentage={maxPercentage} gastoSelected={gastoSelected}/>
            </TouchableOpacity>
            }
            horizontal
            data={data}
          /> */}
        {/* <View style={{display:'flex',width:'90%', flexDirection:'column', justifyContent:'space-between', }}>
              <DetailGastoDonut dinero={gastosSeparados[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} gasto={'Tanqueada'} color={'#966FB0'}/>
              <DetailGastoDonut dinero={gastosSeparados[1].toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} gasto={'Mantenimiento'} color={'#1A81C4'}/>
              <DetailGastoDonut dinero={gastosSeparados[2].toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} gasto={'Lavada'} color={'#54BB62'}/>
              <DetailGastoDonut dinero={gastosSeparados[3].toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} gasto={'Repuestos'} color={'#DFE351'}/>
              <DetailGastoDonut dinero={gastosSeparados[4].toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')} gasto={'Parqueadero'} color={'#F8AB53'}/>
            </View> */}
        
      </View>
    </View>

  );
};
export default Detail;

