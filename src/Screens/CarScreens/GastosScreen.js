import { useNavigation } from "@react-navigation/native";
import { View, Text, ScrollView, FlatList, TouchableOpacity, Alert, StyleSheet, ActivityIndicator, Platform, Modal } from "react-native";
import Detail from "../../Components/CarComponents/Gastos/Detail";
import Gasto from "../../Components/CarComponents/Gastos/Gasto";
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from "../../Contants/Colors";
import CardToGasto from "../../Components/CarComponents/Gastos/CardToGasto";
import { useEffect, useLayoutEffect, useRef, useState, } from "react";
import ModalCreateGasto from "../../Components/CarComponents/Modals/ModalCreateGasto";
import { GET_ALL_GASTOS } from "../../graphql/querys";
import { useLazyQuery } from "@apollo/client";
import ModalDetailsGasto from "../../Components/CarComponents/Modals/ModalDetailsGasto";
import TimeSelectTime from "../../Components/CarComponents/TabSelectTime";

export default function GastosScreen({ route }) {
  const [modalVisible2, setModalVisible2] = useState(false)
  const scrollViewRef = useRef(null)
  const navigation = useNavigation()
  const item = route?.params?.item
  const [resumenYear, setResumenYear] = useState(false)
  const [modalVisible, setModalVisible] = useState(false)
  const [details, setDetails] = useState(null)
  const [getAll, { loading, data, error }] = useLazyQuery(GET_ALL_GASTOS)
  const [filtro, setFiltro] = useState(null)
  const [monthActual, setMonthActual] = useState(new Date().getMonth())
  const [yearActual, setYearActual] = useState(new Date().getFullYear())

  let gastosSeparados = [0, 0, 0, 0, 0, 0, 0, 0,]
  let numeroGastosSeparados = [0, 0, 0, 0, 0, 0, 0, 0,]
  let yearsData = [[], [], [], [], [], [], [], [], [], [], [], []]
  let dataMonthActual
  let yearData;

  if (data?.getAllGastos) {
    dataMonthActual = data.getAllGastos.filter(el => {
      let month = new Date(el?.fecha).getMonth()
      let year = new Date(el?.fecha).getFullYear()
      if (year === 2022) {
        yearsData[0].push(el)
      } else if (year === 2023) {
        yearsData[1].push(el)
      }
      return month === monthActual && year === yearActual
    })
  }
  if (dataMonthActual) {
    for (let i = 0; i < dataMonthActual?.length; i++) {
      switch (dataMonthActual[i].tipo) {
        case 'Tanqueada': {gastosSeparados[0] += Number(dataMonthActual[i].dineroGastado),numeroGastosSeparados[0]++}
          break;
        case 'Mantenimiento': {gastosSeparados[1] += Number(dataMonthActual[i].dineroGastado), numeroGastosSeparados[1]++}
          break;
        case 'Lavada': {gastosSeparados[2] += Number(dataMonthActual[i].dineroGastado), numeroGastosSeparados[2]++}
          break;
        case 'Repuestos': {gastosSeparados[3] += Number(dataMonthActual[i].dineroGastado), numeroGastosSeparados[3]++}
          break;
        case 'Parqueadero': {gastosSeparados[4] += Number(dataMonthActual[i].dineroGastado), numeroGastosSeparados[4]++}
          break;
        case 'Peaje': {gastosSeparados[5] += Number(dataMonthActual[i].dineroGastado), numeroGastosSeparados[5]++}
          break;
        case 'Multa': {gastosSeparados[6] += Number(dataMonthActual[i].dineroGastado), numeroGastosSeparados[6]++}
          break;
        case 'Otros': {gastosSeparados[7] += Number(dataMonthActual[i].dineroGastado), numeroGastosSeparados[7]++}
          break;
      }
    }
  }
  if (resumenYear) {
    yearData = yearActual === 2022 ? yearsData[0] : yearsData[1]
    for (let i = 0; i < yearData?.length; i++) {
      switch (yearData[i].tipo) {
        case 'Tanqueada': {gastosSeparados[0] += Number(yearData[i].dineroGastado),numeroGastosSeparados[0]++}
          break;
        case 'Mantenimiento': {gastosSeparados[1] += Number(yearData[i].dineroGastado),numeroGastosSeparados[1]++}
          break;
        case 'Lavada': {gastosSeparados[2] += Number(yearData[i].dineroGastado),numeroGastosSeparados[2]++}
          break;
        case 'Repuestos': {gastosSeparados[3] += Number(yearData[i].dineroGastado),numeroGastosSeparados[3]++}
          break;
        case 'Parqueadero': {gastosSeparados[4] += Number(yearData[i].dineroGastado),numeroGastosSeparados[4]++}
          break;
        case 'Peaje': {gastosSeparados[5] += Number(yearData[i].dineroGastado),numeroGastosSeparados[5]++}
          break;
        case 'Multa': {gastosSeparados[6] += Number(yearData[i].dineroGastado),numeroGastosSeparados[6]++}
          break;
        case 'Otros': {gastosSeparados[7] += Number(yearData[i].dineroGastado),numeroGastosSeparados[7]++}
          break;
      }
    }
  }
  useLayoutEffect(() => {
    if (item) {
      getAll({ variables: { id: item?.id } })
    }
  }, [])

  const handleDetails = (item) => {
    setModalVisible(false)
    setDetails(item?.id)
    setModalVisible(true)
  }
  useEffect(() => {
    if (loading) {
     <ActivityIndicator style={{ flex: 1 }} color={Colors.primary} />
    }
  }, [loading])

  let gastosFiltrados;
  if (filtro && !yearData) {
    gastosFiltrados = dataMonthActual.filter(el => el.tipo === filtro)
    scrollViewRef.current.scrollToEnd({ animated: true })
  }
  if (filtro && yearData) {
    gastosFiltrados = yearData.filter(el => el.tipo === filtro)
    scrollViewRef.current.scrollToEnd({ animated: true })
  }
    if (error) {
      Alert.alert('Ha ocurrido un error', error)
    }
  return (
    <>
      <ScrollView ref={scrollViewRef} style={{ flexGrow: 1, backgroundColor: '#F5F7FB' }}>
        <Icon onPress={() => navigation.goBack()} name="chevron-back-outline" color={Colors.secondary} size={32} style={{ position: 'absolute', top: Platform.OS === 'android' ? 20 : 30, left: 20, zIndex: 999 }} />
        <View style={styles.ViewTime}>
          <TimeSelectTime setResumenYear={setResumenYear} resumenYear={resumenYear} setMonthActual={setMonthActual} setYearActual={setYearActual} yearActual={yearActual} monthActual={monthActual} />
          {gastosSeparados && <Detail gastosSeparados={gastosSeparados} numeroGastosSeparados={numeroGastosSeparados} car={item}/>}

        </View>

        <View style={styles.ViewAddGasto}>
          <Text style={styles.Title1}>Tus gastos</Text>
          <TouchableOpacity onPress={() => setModalVisible2(true)} style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
            <Icon name="add-outline" color={'#f50057'} size={24} />
            <Text style={styles.Title2}>Agregar gasto</Text>
          </TouchableOpacity>
        </View>

        {gastosSeparados &&
          <FlatList
            style={{ marginLeft: 15 }}
            renderItem={({ item }) =>
              <>
                <CardToGasto data={gastosSeparados[0]} gasto={'Tanqueada'} color={Colors.tanqueadaColor} setFiltro={setFiltro} />
                <CardToGasto data={gastosSeparados[1]} gasto={'Mantenimiento'} color={Colors.mantenimientoColor} setFiltro={setFiltro} />
                <CardToGasto data={gastosSeparados[2]} gasto={'Lavada'} color={Colors.lavadaColor} setFiltro={setFiltro} />
                <CardToGasto data={gastosSeparados[3]} gasto={'Repuestos'} color={Colors.repuestosColor} setFiltro={setFiltro} />
                <CardToGasto data={gastosSeparados[4]} gasto={'Parqueadero'} color={Colors.parqueaderoColor} setFiltro={setFiltro} />
                <CardToGasto data={gastosSeparados[5]} gasto={'Peaje'} color={Colors.peajeColor} setFiltro={setFiltro} />
                <CardToGasto data={gastosSeparados[6]} gasto={'Multa'} color={Colors.multaColor} setFiltro={setFiltro} />
                <CardToGasto data={gastosSeparados[7]} gasto={'Otros'} color={Colors.primary} setFiltro={setFiltro} />
              </>
            }
            horizontal
            data={[[]]}
          />}

        <Text onPress={() => setFiltro(null)} style={styles.Title3}> {filtro && <Icon onPress={() => setFiltro(null)} name="chevron-back-outline" color={Colors.secondary} size={24} />}{filtro ? `${filtro} del mes` : 'Todos los gastos'}</Text>

        <View style={styles.ContainerGastos}>
          {gastosFiltrados ? gastosFiltrados.map(item => (
            <TouchableOpacity key={item.id} onPress={() => handleDetails(item)} >
              <Gasto data={item} />
            </TouchableOpacity>
          ))
            : !yearData ? dataMonthActual?.map(item => (
              <TouchableOpacity key={item.id} onPress={() => handleDetails(item)} >
                <Gasto data={item} />
              </TouchableOpacity>
            ))
              :
              yearData && yearData?.map(item => (
                <TouchableOpacity key={item.id} onPress={() => handleDetails(item)} >
                  <Gasto data={item} />
                </TouchableOpacity>
              ))
          }
        </View>

      </ScrollView>
      <TouchableOpacity onPress={() => setModalVisible2(true)} style={styles.ContainerIconAdd}>
        <Icon name="add-outline" color={'white'} size={30} />
      </TouchableOpacity>

      {modalVisible2 &&
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible2}
        >
          <ModalCreateGasto setModalVisible2={setModalVisible2} id={item?.id} />
        </Modal>}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <ModalDetailsGasto id={details} setModalVisible={setModalVisible} />
      </Modal>
    </>
  )
}

const styles = StyleSheet.create({
  ViewTime: {
    backgroundColor: 'white', elevation: 5, borderBottomRightRadius: 20, borderBottomLeftRadius: 20, justifyContent: 'center',
  },
  ViewAddGasto: {
    marginHorizontal: 15, marginTop: 10, marginBottom: 0, borderRadius: 20, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'
  },
  Title1: {
    color: Colors.secondary, fontWeight: '500', fontSize: 20, marginVertical: 20
  },
  Title2: {
    color: Colors.primary, fontWeight: '500', fontSize: 16, marginVertical: 20
  },
  Title3: {
    color: Colors.secondary, fontWeight: '500', fontSize: 20, marginHorizontal: 15, marginTop: 20, marginBottom: 10
  },
  ContainerGastos: {
    marginHorizontal: 15, marginVertical: 5, borderRadius: 20, backgroundColor: 'white', elevation: 2
  },
  ContainerIconAdd: {
    position: 'absolute', bottom: 20, zIndex: 999, right: 20, width: 54, height: 54, elevation: 10, borderRadius: 27, backgroundColor: '#f50057', alignItems: 'center', justifyContent: 'center'
  }
})