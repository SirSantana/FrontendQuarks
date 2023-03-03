import { View, Image, Alert, Text, StyleSheet, ActivityIndicator, TouchableOpacity } from 'react-native';
import {  useQuery } from '@apollo/client';
import { GET_VEHICLES } from '../../graphql/querys';
import { Colors } from '../../Contants/Colors';
import { useNavigation } from '@react-navigation/native';
export default function CardCarPreview() {
  const {loading, data, error}=useQuery(GET_VEHICLES)
  const navigation = useNavigation()
  
  useEffect(() => {
    if (loading) {
     <ActivityIndicator style={{ flex: 1 }} color={Colors.primary} size='large' />
    }
  }, [loading])
  useEffect(() => {
    if(error){
       Alert.alert('Ha ocurrido un error, revisa tú conexión')
    }
  }, [error])
  
  
  return (
      data && data?.getCars.map(el=>(
        <TouchableOpacity onPress={()=> navigation.navigate('Vehiculos', { item: el })} style={{ height: 250, marginVertical: '5%', backgroundColor: 'white', borderRadius: 20 }}>
        <Image onLoadStart={()=><ActivityIndicator color={Colors.primary}/>} source={{uri:el?.imagen}} style={styles.image} />
        <View style={{ marginHorizontal: '5%', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
          <View>
            <Text style={{ fontWeight: '600', fontSize: 22 }}>{el.referencia}</Text>
            <Text style={{ fontSize: 16, color: Colors.gray }}>{el.modelo}</Text>
          </View>
          <Image source={require('../../../assets/Mazda.png')} style={{ width: 50, height: 50 }} />
        </View>
      </TouchableOpacity>
      ))
  );
}
const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '70%',
    borderRadius: 20,
    marginBottom: '5%',
  }
})