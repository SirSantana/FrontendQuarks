import { View, StyleSheet, Text, Pressable, Image, Button, Modal, ScrollView, ActivityIndicator, Alert} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Theme } from "../../theme";
import { gql, useLazyQuery } from "@apollo/client";
import { useLayoutEffect, useState, useEffect } from "react";
import { Feather } from '@expo/vector-icons';
import ModalCreateGasto from "../CarComponents/ModalCreateGasto";
import ModalCargando from "../../utils/ModalCargando";
import ModalConfirmDelete from "../../utils/ModalConfirmDelete";
import { GET_ONE_GASTO } from "../../graphql/querys";
import { options } from "../../utils/dateEs";
import ModalImage from "../../utils/ModalImage";


export default function ModalDetailsGasto({id, setModalVisible}){
    const [getOne, {loading, data, error}] = useLazyQuery(GET_ONE_GASTO)
    const [modalVisible2, setModalVisible2] = useState(false)
    const [visibleDelete, setVisibleDelete] = useState(false)
    const [loadingImage, setLoading] = useState({image:true, marcas:true})
  const [image, setImage] = useState({visible:false, image:null})

    useLayoutEffect(()=>{
      if(id){
          getOne({variables:{id:id}})
      }
    },[])
    const getOneGasto = data?.getOneGasto

    let fecha = new Date(getOneGasto?.fecha)
    let tipoGasto;

    if(getOneGasto){
    if(getOneGasto.tipo === 'Tanqueada'){tipoGasto = 'fuel'}
    if(getOneGasto.tipo === 'Parqueadero'){tipoGasto = 'car-brake-parking'}
    if(getOneGasto.tipo === 'Lavada'){tipoGasto = 'local-car-wash'}
    if(getOneGasto.tipo === 'Repuestos'){tipoGasto = 'car-wrench'}
    if(getOneGasto.tipo === 'Mantenimiento'){tipoGasto = 'car-repair'}
    }
    const handleEdit=()=>{
      setModalVisible2(true)
    }
    console.log('hdasdasda');
    useEffect(()=>{
      if(error){
          if(error?.message === 'Network request failed'){
            Alert.alert('Ha ocurrido un error', 'Revisa tu conexion a internet')
          }else{
            Alert.alert('Ha ocurrido un error',error?.message)
          }
        }
    },[error])

    return(
      <>
        
        <Pressable onPress={()=> setModalVisible(false)}  style={styles.centeredView}>
              <ScrollView style={styles.modalView}>
              {loading &&
              <View style={{justifyContent:'center', alignItems:'center'}}>
                <ActivityIndicator style={{width:80, height:80, }} color={Theme.colors.primary}/>

              </View>
                }
               {getOneGasto &&
               <>
               <View style={{width:'100%', flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
               <MaterialIcons onPress={()=> setVisibleDelete(true)}  name="delete-outline" size={30} color={Theme.colors.primary} />
               {tipoGasto === 'fuel' || tipoGasto === 'car-brake-parking' || tipoGasto === "car-wrench"?
           <MaterialCommunityIcons  name={tipoGasto} size={50} color={Theme.colors.primary}  />
          : <MaterialIcons  name={tipoGasto} size={50} color={Theme.colors.primary} />}
               <Feather onPress={handleEdit} name="edit" size={25} color={Theme.colors.primary} />
          
               </View>
               <View style={{marginTop:20}}>
                <View style={styles.viewDetail}>
               <Text style={Theme.fonts.descriptionGray}>Tipo</Text>
               <Text style={Theme.fonts.descriptionBlue}>{getOneGasto.tipo}</Text>
                </View>
                <View style={styles.viewDetail}>
               <Text style={Theme.fonts.descriptionGray}>Fecha</Text>
               <Text style={Theme.fonts.descriptionBlue}>{fecha.toLocaleDateString('es-ES', options)}</Text>
                </View>
                <View style={styles.viewDetail}>
               <Text style={Theme.fonts.descriptionGray}>Dinero Gastado</Text>
               <Text style={Theme.fonts.descriptionBlue}>$ {getOneGasto.dineroGastado.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}</Text>
                </View>

                {getOneGasto?.description &&
                <View style={[styles.viewDetail,{width:'100%', alignItems:'center',justifyContent:'space-between' }]}>
                <Text style={Theme.fonts.descriptionGray}>Descripcion</Text>
                <Text style={[Theme.fonts.descriptionBlue,{flexShrink:1, marginLeft:10}]}> {getOneGasto.description}</Text>
                 </View>
                }
                {getOneGasto?.lugar &&
                <View style={styles.viewDetail}>
                <Text style={Theme.fonts.descriptionGray}>Lugar</Text>
                <Text style={Theme.fonts.descriptionBlue}>{getOneGasto.lugar}</Text>
                 </View>
                }
                {getOneGasto?.imagen &&
                <Pressable onPress={()=> setImage({image:getOneGasto.imagen, visible:true})} style={{flexDirection:'column'}}>
                <Text style={Theme.fonts.descriptionGray}>Factura</Text>
                {loadingImage.image && <ActivityIndicator/>}
                    <Image resizeMode='cover' onLoadEnd={()=> setLoading({image:false})}   style={{
                    width: '100%',
                    height: 300, borderBottomLeftRadius:20, borderBottomRightRadius:20,}} source={{uri:'data:image/png;base64,'+ getOneGasto.imagen}}/>
                </Pressable>
                }
                
                

               </View>
               </>
               }
             
              </ScrollView>

          </Pressable>
           <Modal
           animationType="fade"
           transparent={true}
           visible={modalVisible2}
         >
             <ModalCreateGasto setModalVisible2={setModalVisible2} id={id} item={getOneGasto}/>
         </Modal>
               {visibleDelete &&
               <Modal
               animationType="fade"
               transparent={true}
               visible={visibleDelete}
             >
                 <ModalConfirmDelete setVisibleDelete={setVisibleDelete} id={id} idVehiculo={getOneGasto?.vehiculo} setModalVisible={setModalVisible}/>
             </Modal>
             }
         {image &&
      <Modal
      animationType="fade"
      visible={image.visible}
      transparent={true}
     
      >
          <ModalImage image={image.image} setImage={setImage}/>
      </Modal>}
         </>
    )
}

const styles = StyleSheet.create({
    centeredView: {
      justifyContent: "center",
      backgroundColor:'rgba(0,0,0,0.5)',
      height: '100%',
      width:'100%',

    },
    modalView: {
    //   margin: 20,
    //   backgroundColor: "#f3f3f3",
    //   borderRadius: 20,
      padding: 20,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      position: "absolute",
      bottom: 0,
      width:'100%',
      borderTopLeftRadius: 20,
      borderTopRightRadius: 20,
      backgroundColor:'white',
    },
    modalView2: {
   
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        position: "absolute",
        bottom: 0,
        height: 150,
        paddingHorizontal:10,
        width:'100%',
        borderTopLeftRadius: 20,
        alignItems: "center",
        borderTopRightRadius: 20,
        backgroundColor: "#f3f3f3",
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2
        },
      },
      viewDetail:{
        marginTop:20, flexDirection:'row', justifyContent:'space-between',width:'100%'
      }
  });