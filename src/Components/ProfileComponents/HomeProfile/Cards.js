import { useNavigation } from "@react-navigation/native"
import { View, ImageBackground, Text, Image, ActivityIndicator,StyleSheet, TouchableOpacity } from "react-native"
import { Colors } from "../../../Contants/Colors"



export default function CardsFirstSteps() {
  const navigation = useNavigation()

  return (
    <>
      <TouchableOpacity onPress={() => navigation.navigate('Vehiculo', { screen: 'Crear vehiculo' })} style={styles.container} >
        <View style={{ flexDirection: 'row', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
          <Image resizeMode="contain" style={{ width: '50%', height: '100%' }} source={require('../../../../assets/Carro.png')} />
          <View style={{ width: '50%' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white', alignSelf: 'flex-end', marginBottom: 10 }}>Crea tu vehiculo</Text>
            <View style={{ padding: 5, width: '80%', justifyContent: 'center', alignSelf: 'flex-end', alignItems: 'center', height: 40, backgroundColor: '#990036', borderRadius: 5 }}>
              <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Crear</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Vehiculo', { screen: 'Crear vehiculo' })} style={styles.container} >
        <View style={{ flexDirection: 'row', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ width: '60%' }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#464646', alignSelf: 'flex-start', marginBottom: 10 }}>Busca tu repuesto</Text>
            <View style={{ padding: 5, width: '80%', justifyContent: 'center', alignSelf: 'flex-start', alignItems: 'center', height: 40, backgroundColor: Colors.primary, borderRadius: 5 }}>
              <Text style={{ color: 'white', fontSize: 16, fontWeight: 'bold' }}>Buscar</Text>
            </View>
          </View>
          <Image style={{ width: '40%', height: '100%' }} source={require('../../../../assets/repuesto.png')} />
        </View>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Vehiculo', { screen: 'Crear vehiculo' })} >
        <ImageBackground onLoadStart={() => <ActivityIndicator color={Colors.primary} />} style={styles.container} source={require('../../../../assets/Rectangule3.png')}>
          <View style={{ flexDirection: 'row', height: '30%', justifyContent: 'space-between', width: '100%' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', color: 'white' }}>Conviertete en premium</Text>
            <View style={{ padding: 5, height: 30, backgroundColor: '#391D4E', borderRadius: 5 }}>
              <Text style={{ color: '#9215D0' }}>+50 pts</Text>
            </View>
          </View>
          <View style={{ flexDirection: 'row', width: '100%', height: '70%', alignItems: 'flex-end', justifyContent: 'space-between' }}>
            <Image onLoadStart={() => <ActivityIndicator color={Colors.primary} />} style={{ width: '50%', height: '80%' }} source={require('../../../../assets/repuesto.png')} />
            <View style={{ padding: 5, width: '50%', justifyContent: 'center', alignItems: 'center', height: 40, backgroundColor: 'white', borderRadius: 5 }}>
              <Text style={{ color: '#391D4E', fontSize: 16, fontWeight: 'bold' }}>Ver beneficios</Text>
            </View>
          </View>
        </ImageBackground>
      </TouchableOpacity>

    </>
  )
}

const styles = StyleSheet.create({
  container:{
    marginTop: 40, padding: 20, height: 180, marginHorizontal: '5%', backgroundColor: '#f50057', borderRadius: 10, justifyContent: 'space-between', alignItems: 'center', elevation: 5
  }
})