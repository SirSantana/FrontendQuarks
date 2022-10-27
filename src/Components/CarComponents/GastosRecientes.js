import { Texts } from "../../Themes/text";
import { View, Text,FlatList, TextInput, StyleSheet,ScrollView, TouchableOpacity, Image, Pressable, Alert, SafeAreaView, StatusBar, Dimensions  } from "react-native";
import { Colors } from "../../Themes/colors";
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Containers } from "../../Themes/containers";
import { MaterialIcons } from '@expo/vector-icons';


export default function GastosRecientes({navigation, prevGastos, loading, id, setModalVisible2}){

    return(
        <ScrollView 
  style={{ width:'100%'}}>
           <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center'}}>
           <Text style={Texts.title2BoldBlue}>Gastos Recientes</Text>
            <Text onPress={()=> navigation.navigate('Gastos', {id:id})} style={Texts.subtitleRegularGray}>Ver Todo</Text>
            </View> 
            {loading&&
              <View style={styles.containerGasto}>
            <Text style={Texts.subtitleRegularBlue}>Cargando...</Text>
              </View>
              }

            {prevGastos?.length>0 ? prevGastos?.map(el=>{
          let fecha = new Date(el.fecha) 
          let tipoGasto;
          if(el.tipo === 'Tanqueada'){tipoGasto = 'fuel'}
          if(el.tipo === 'Parqueadero'){tipoGasto = 'car-brake-parking'}
          if(el.tipo === 'Lavada'){tipoGasto = 'local-car-wash'}
          if(el.tipo === 'Repuestos'){tipoGasto = 'car-wrench'}
          if(el.tipo === 'Mantenimiento'){tipoGasto = 'car-repair'}
              return(
                <View style={{width:'100%'}}>
        <View key={el.id} style={styles.containerGasto}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
            {tipoGasto === 'fuel' || tipoGasto === 'car-brake-parking' || tipoGasto === "car-wrench"?
           <MaterialCommunityIcons name={tipoGasto} size={32} color={Colors.secondary}  />
          : <MaterialIcons name={tipoGasto} size={32} color={Colors.secondary} />}
            <View style={{marginLeft:10}}>
            <Text style={Texts.subtitleRegularBlue}>{el.tipo}</Text>
            <Text style={[Texts.subtitleRegularGray,{lineHeight:20}]}>{fecha.toLocaleDateString()}</Text>
            </View>
            </View>
            <View>
            <Text style={[Texts.subtitleBoldRed]}>$ {el.dineroGastado.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</Text>
              </View> 
      
          </View>
            <View   style={{ width:'100%',height:1, backgroundColor:'#f1f1f1'}}/>
                </View>
              )
            }) 
            
            :
            <Pressable onPress={()=> setModalVisible2(true)} style={[Containers.containerGasto,{justifyContent:'center'}]}>
            <Text style={Texts.subtitleRegularRed}>Crea tu primer gasto</Text>
            
                </Pressable>
                }
            </ScrollView>
    )
}
const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      alignItems: "center",
      backgroundColor:'rgba(0,0,0,0.5)',
      
    },
    modalView: {
     
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      position: "absolute",
      bottom: 0,
      height: 180,
      width:'100%',
      borderTopLeftRadius: 20,
      alignItems: "center",
      borderTopRightRadius: 20,
      backgroundColor: "#464646",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    containerGasto:{
      backgroundColor:'white', width:'100%',elevation:5, flexDirection:'row',justifyContent:'space-between', borderRadius:10, height:50, padding:5, marginBottom:5, alignItems:'center'
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });