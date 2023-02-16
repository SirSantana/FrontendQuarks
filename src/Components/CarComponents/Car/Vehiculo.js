import { marcasCarros } from '../marcasCarros'
import { View, Text, ActivityIndicator, Image, StyleSheet } from "react-native";
import { marcasMotos } from '../marcasMotos';
import { Colors } from '../../../Contants/Colors';


export default function Vehiculo({ item }) {
  const marca = marcasCarros.find(el => el.marca === item.marca)
  const marcaMoto = marcasMotos.find(el => el.marca === item?.marca)
  return (
    <View  style={{ backgroundColor: "white", width: 300, borderRadius: 20, marginRight: 20, }}>
      <View style={{
        width: '100%',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <View style={{ height: 250,  backgroundColor: 'white', borderRadius: 20 }}>
          <Image onLoadStart={()=><ActivityIndicator color={Colors.primary}/>} source={{ uri:item?.imagen }} style={styles.image} />
          <View style={{ marginHorizontal: '5%', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
            <View>
              <Text style={{ fontWeight: '600', fontSize: 22 }}>{item?.referencia}</Text>
              <Text style={{ fontSize: 16, color: Colors.gray }}>{item?.modelo}</Text>
            </View>
            <Image style={{ height: 50, width: 50 }} source={item?.tipo === 'Carro' ? marca?.src : marcaMoto?.src} />
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: '70%',
    borderRadius: 20,
    marginBottom: '5%',
  }
})