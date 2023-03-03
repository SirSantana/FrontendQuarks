import { View, Text, TouchableOpacity, StyleSheet, Modal, ActivityIndicator, ScrollView, SafeAreaView, Platform, } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { Colors } from '../../Contants/Colors';
import ImageVehiculo from '../../Components/CarComponents/Car/ImageVehiculo';
import DatosVehiculo from '../../Components/CarComponents/Car/DatosVehiculo';
import ModalCreateGasto from '../../Components/CarComponents/Gastos/ModalCreateGasto';
import IconsAction from '../../Components/CarComponents/Car/IconsAction';
import ModalImage from '../../utils/ModalImage';
import ModalSettings from '../../Components/CarComponents/Car/ModalSettings';
import { GET_VEHICLES } from '../../graphql/querys';
import { useLazyQuery } from '@apollo/client';
import CardLimitGasto from '../../Components/CarComponents/Car/CardLimitGasto';
import { Buttons } from '../../Themes/buttons';
import useAuth from '../../hooks/useAuth';
import { Alert } from 'react-native';
import ModalScreenCar from '../../Components/CarComponents/Car/ModalScreenCar';


export default function VehiculeDataScreen({ route }) {
  const navigation = useNavigation()
  const item = route?.params?.item
  const [image, setImage] = useState({ visible: false, image: null })
  const [modalVisible2, setModalVisible2] = useState(false);
  const [settings, setSettings] = useState(false)
  const [getCars, { loading, data, error }] = useLazyQuery(GET_VEHICLES)
  const [modalQuarks, setModalQuarks] =useState(false)
  const {user} = useAuth()

  useEffect(() => {
    if (data?.getCars.length === 0 ) {
      return navigation.navigate('Vehiculo', { screen: 'Crear Vehiculo' })
    }
  }, [data,])
  useLayoutEffect(() => {
    if (route?.params?.crear) {
      return navigation.navigate('Vehiculo', { screen: 'Crear Vehiculo' })
    }
    if (!item) {
      getCars()
    }
    if(user?.puntos <= 150){
      setModalQuarks(true)
    }
  }, [route])
  console.log('item', item);
  return (
    <SafeAreaView style={styles.container}>
      {loading && <ActivityIndicator color={Colors.primary} />}

      {item ?
        <>
          <TouchableOpacity onPress={() => setSettings(true)} style={styles.iconContainer}>
            <Icon name="menu-outline" color={'white'} size={24} />
          </TouchableOpacity>
          <ImageVehiculo item={item} setImage={setImage} navigation={navigation} />
          <View style={styles.containerCarData} />
          <ScrollView style={styles.scrollView}>
            <View style={styles.container2}>
              <DatosVehiculo item={item} navigation={navigation} />
              <Text style={styles.title}>¿Qué quieres hacer?</Text>
              <View style={styles.containerIcons}>
                <View style={styles.containerIcon}>
                  <TouchableOpacity onPress={() => setModalVisible2(true)} style={{ flexDirection: 'column', display: 'flex', alignItems: 'center', width: '33%' }}>
                    <View style={{ padding: 10, borderRadius: 25, backgroundColor: 'white', width: 50, height: 50, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <Icon name="add-outline" color={Colors.primary} size={24} />
                    </View>
                    <Text style={{ color: 'white', fontWeight: '500' }}>Crear gasto</Text>
                  </TouchableOpacity>
                  <IconsAction icon={'cash-outline'} text={'Gastos'} item={item} navigate={'Gastos'} />
                  <IconsAction icon={'notifications-outline'} text={'Recordatorios'} item={item.id} navigate={'Recordatorios'} />
                </View>
              </View>
              <CardLimitGasto id={item.id} presupuestoMes={item?.presupuesto}/>
            </View>
          </ScrollView>
          {modalVisible2 &&
            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible2}
            >
              <ModalCreateGasto setModalVisible2={setModalVisible2} id={item.id} />
            </Modal>}
          {image &&
            <Modal
              animationType="fade"
              visible={image.visible}
              transparent={true}
            >
              <ModalImage image={image.image} setImage={setImage} />
            </Modal>}
          <Modal
            animationType="slide"
            visible={settings}
            transparent={true}
            onRequestClose={() => {
              setSettings(false);
            }}
          >
            <ModalSettings setSettings={setSettings} item={item} />
          </Modal>
        </>
        :data?.getCars.length >0 ?
        <>
          <TouchableOpacity onPress={() => setSettings(true)} style={styles.iconContainer}>
            <Icon name="menu-outline" color={'white'} size={24} />
          </TouchableOpacity>
          <ImageVehiculo item={data?.getCars[0]} setImage={setImage} navigation={navigation} />
          <View style={styles.containerCarData} />
          <ScrollView style={styles.scrollView}>
            <View style={styles.container2}>
              <DatosVehiculo item={data?.getCars[0]} navigation={navigation} />
              <Text style={styles.title}>¿Qué quieres hacer?</Text>
              <View style={styles.containerIcons}>
                <View style={styles.containerIcon}>
                  <TouchableOpacity onPress={() => setModalVisible2(true)} style={{ flexDirection: 'column', display: 'flex', alignItems: 'center', width: '33%' }}>
                    <View style={{ padding: 10, borderRadius: 25, backgroundColor: 'white', width: 50, height: 50, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                      <Icon name="add-outline" color={Colors.primary} size={24} />
                    </View>
                    <Text style={{ color: 'white', fontWeight: '500' }}>Crear gasto</Text>
                  </TouchableOpacity>
                  <IconsAction icon={'cash-outline'} text={'Gastos'} item={data?.getCars[0]} navigate={'Gastos'} />
                  <IconsAction icon={'notifications-outline'} text={'Recordatorios'} id={data?.getCars[0]?.id} navigate={'Recordatorios'} />
                </View>
              </View>
              <CardLimitGasto id={data?.getCars[0]?.id} presupuestoMes={data?.getCars[0]?.presupuesto}/>

            </View>
          </ScrollView>
          {modalVisible2 &&
            <Modal
              animationType="fade"
              transparent={true}
              visible={modalVisible2}
            >
              <ModalCreateGasto setModalVisible2={setModalVisible2} id={data?.getCars[0]?.id} />
            </Modal>}
          {image &&
            <Modal
              animationType="fade"
              visible={image.visible}
              transparent={true}
            >
              <ModalImage image={image.image} setImage={setImage} />
            </Modal>}
          <Modal
            animationType="slide"
            visible={settings}
            transparent={true}
            onRequestClose={() => {
              setSettings(false);
            }}
          >
            <ModalSettings setSettings={setSettings} item={data?.getCars[0]} />
          </Modal>
        </>
        :<TouchableOpacity onPress={()=>navigation.navigate('Vehiculo', { screen: 'Crear Vehiculo' })} style={[Buttons.primary,{width:'80%', alignSelf:'center', marginTop:'50%'}]}>
          <Text style={{color:'white'}}>Vamos a crear tu vehiculo!</Text>
        </TouchableOpacity>
      }
      <TouchableOpacity onPress={()=> setModalQuarks(true)} style={styles.ContainerIconAdd}>
        <Icon name="help-outline" color={'white'} size={30} />
      </TouchableOpacity>
      <Modal
            animationType="slide"
            visible={modalQuarks}
            transparent={true}
            onRequestClose={() => {
              setModalQuarks(false);
            }}
          >
            <ModalScreenCar  setVisibleModal={setModalQuarks} visibleModal={modalQuarks} setModalVisible2={setModalVisible2}/>
          </Modal>
    </SafeAreaView>


  )
}
const styles = StyleSheet.create({
  ContainerIconAdd: {
    position: 'absolute', bottom: 20, zIndex: 999, right: 20, width: 54, height: 54, elevation: 10, borderRadius: 27, backgroundColor: '#f50057', alignItems: 'center', justifyContent: 'center'
  },
  container: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    marginTop: 0
  },
  iconContainer: {
    position: 'absolute', top: Platform.OS === 'android' ? 20 : 30, zIndex: 999, right: 10, width: 50, height: 50, elevation: 10, borderRadius: 10, opacity: 0.8, backgroundColor: Colors.gray, alignItems: 'center', justifyContent: 'center'
  },
  containerCarData: {
    position: 'absolute', top: Platform.OS === 'android' ? 230 : 250, width: '100%', backgroundColor: '#f7f7f7', borderRadius: 20, padding: 20,
  },
  container2: {
    width: '100%', paddingTop: 0, backgroundColor: '#f7f7f7', padding: 20, marginBottom: 20
  },
  title: {
    color: '#464646', fontWeight: '500', fontSize: 18, marginTop: 20
  },
  containerIcons: {
    flexDirection: 'column', backgroundColor: '#f50057', borderRadius: 20, elevation: 2, padding: 20, marginTop: 20, display: 'flex', justifyContent: 'space-between', width: '100%'
  },
  containerIcon: {
    flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'
  }
});