import { Pressable, StyleSheet, View, Text, Image } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import PriceFormat from "../../../utils/priceFormat";
import IconoTipoGasto from "../Gastos/IconoTipoGasto";
import { marcasMotos } from "../marcasMotos";
import { marcasCarros } from "../marcasCarros";
import useAuth from "../../../hooks/useAuth";

let Tipos = [{ tipo: 'Tanqueada', dinero: '', veces: '' },
{ tipo: 'Mantenimiento', dinero: '', veces: '' },
{ tipo: 'Lavada', dinero: '', veces: '' },
{ tipo: 'Repuestos', dinero: '', veces: '' },
{ tipo: 'Parqueadero', dinero: '', veces: '' },
{ tipo: 'Peaje', dinero: '', veces: '' },
{ tipo: 'Multa', dinero: '', veces: '' },
{ tipo: 'Otros', dinero: '', veces: '' },
]

export default function ModalResumeMes({ setModalVisible, gastosSeparados, numeroGastosSeparados, car }) {
  const { user } = useAuth()

  if (gastosSeparados.length > 0) {
    for (let i = 0; i < gastosSeparados.length; i++) {
      Tipos[i].dinero = gastosSeparados[i]
      Tipos[i].veces = numeroGastosSeparados[i]
    }
  }

  const total = Tipos[0].dinero + Tipos[1].dinero + Tipos[2].dinero + Tipos[3].dinero + Tipos[4].dinero + Tipos[5].dinero + Tipos[6].dinero + Tipos[7].dinero
  const dineroGastado = PriceFormat({ price: total.toString() })
  const marca = marcasCarros.find(ele => ele.marca === car?.marca)
  const marcaMoto = marcasMotos.find(ele => ele.marca === car?.marca)
  return (
    <Pressable onPress={() => setModalVisible(false)} style={styles.centeredView}>
      <LinearGradient
        colors={['#F50057', '#860231']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.modalView1}
      >
        <View>
          <Text style={{ fontSize: 22, color: 'white', fontWeight: 'bold' }}>Hola {user?.name}!</Text>
          <Text style={{ color: '#5B0221', fontSize: 16, fontWeight: '500' }}>Te presentamos tu resumen del mes</Text>
        </View>
        <Text style={{ color: 'white', fontSize: 32, fontWeight: 'bold', marginVertical: 20 }}>$ {dineroGastado}</Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap',  width:'100%' }}>
          {Tipos.map(el => (
            el.dinero > 0 &&
            <View key={el.tipo} style={{ flexDirection: 'row', alignItems: 'center', width: '50%', marginBottom: 10 }}>
              <IconoTipoGasto tipo={el.tipo} />
              <View style={{ marginLeft: 10 }}>
                <Text style={{ fontSize: 16, color: 'white', }}>{el.veces} {el.tipo.slice(0, 6)}.</Text>
                <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold' }}>$ {PriceFormat({ price: el.dinero.toString() })}</Text>
              </View>
            </View>
          ))}
        </View>
        <View style={{flexDirection:'row', marginTop:40}}>
          <View style={{ flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '40%' }}>
            <Image style={{ height: 40, width: 40, marginRight: 5 }} source={car?.tipo === 'Carro' ? marca?.src : marcaMoto?.src} />
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>{car.referencia}</Text>
                <Text style={{ fontSize: 14, color: 'white' }}>{car?.modelo}</Text>
              </View>
            </View>
          </View>
          {car?.imagen && <Image style={{ height: 100, borderRadius: 10, width: '60%', alignSelf: 'center' }} source={{ uri: car.imagen }} />}

        </View>
      </LinearGradient>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    justifyContent: "center",
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: '100%',
    width: '100%',
    alignItems: 'center'

  },
  modalView1: {
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: "absolute",
    padding: 20,
    justifyContent:'center',
    width: '90%',
    backgroundColor: "white",
    borderRadius: 20,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
  },

});