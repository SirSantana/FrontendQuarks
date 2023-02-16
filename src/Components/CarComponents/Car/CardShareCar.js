import {  Pressable, View, Text, StyleSheet, Image,Alert} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import useAuth from '../../../hooks/useAuth';
import { marcasCarros } from '../marcasCarros';
import { marcasMotos } from '../marcasMotos';
import { useLayoutEffect } from 'react';


export default function CardShareCar({ vehiculo, setVisibleShareCard }) {
  const { user } = useAuth()
  const marca = marcasCarros.find(el => el.marca === vehiculo?.marca)
  const marcaMoto = marcasMotos.find(el => el.marca === vehiculo?.marca)

  useLayoutEffect(()=>{
    Alert.alert('Toma una captura y compartela con tus amigos!')
  },[])
  return (

    <Pressable onPress={() => setVisibleShareCard(false)} style={styles.centeredView2}>
      <LinearGradient
        colors={['#F50057', '#860231']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.modalView1}
      >
        <View style={{flexDirection: 'column', marginBottom:20}}>
          <View style={{ alignSelf: 'flex-end', borderRadius: 5, backgroundColor: '#76022C', justifyContent: 'center', alignItems: 'center', width: 100, height: 25 }}>
            <Text style={{ color: '#FFC3D2', fontSize: 14, fontWeight: 'bold', }}>{user?.puntos} pts</Text>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View style={{ backgroundColor: '#76022C', height: 50, width: 50, borderRadius: 25, justifyContent: 'center', alignItems: 'center' }}>
              <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold', }}>{user?.name.slice(0, 1)}</Text>
            </View>
            <View style={{ marginLeft: 15 }}>
              <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold', }}>{user?.name} {user?.apellido}</Text>
              <Text style={{ color: '#76022C', fontSize: 16, fontWeight: '400', }}>{user?.ciudad}, {user?.pais}</Text>

            </View>
          </View>
          <Text style={{ fontWeight: '400', marginVertical: 20, fontSize: 18, color: 'white' }}>Mi vehiculo</Text>

          <View style={{ elevation: 5, backgroundColor: '#76022C', borderRadius: 10, padding: 20, width: '100%', height: 220, justifyContent: 'space-around', alignItems: 'center' }}>

            <View style={{ width: '100%', height: '75%', justifyContent: 'center', alignItems: 'center', }}>
              {vehiculo?.imagen &&
                <Image style={{ width: '100%', height: '100%', borderRadius: 10, alignSelf: 'center' }} source={{ uri: vehiculo.imagen }} />
              }

            </View>
            <View style={{ width: '100%', flexDirection: 'row', marginTop: 10, alignItems:'center' }}>
              <Image style={{ height: 40, width: 40, marginRight: 10 }} source={vehiculo?.tipo === 'Carro' ? marca?.src : marcaMoto?.src} />
              <View style={{ marginLeft: 10 }}>
                <Text style={{ fontWeight: 'bold', fontSize: 18, color: 'white' }}>{vehiculo?.referencia} {vehiculo?.cilindraje}</Text>
                <Text style={{ fontWeight: '400', fontSize: 14, color: 'white' }}>{vehiculo?.modelo}</Text>
              </View>
            </View>
          </View>
        </View>
      </LinearGradient>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  centeredView2: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: "center",
    height: '100%',
    alignItems: 'center',
    width: '100%',
    
  },
  modalView1: {
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: "absolute",
    padding:20,
    width: '100%',
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
  },
})