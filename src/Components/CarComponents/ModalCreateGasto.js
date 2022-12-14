import {View, Text, StyleSheet, Pressable,Image,Modal,FlatList,  TextInput, TouchableOpacity, Alert, Button, } from 'react-native'
import { Theme } from '../../theme';
import { MaterialIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { useEffect, useLayoutEffect, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { Fontisto } from '@expo/vector-icons';
import { gql, useMutation, useQuery } from "@apollo/client";
import * as FileSystem from 'expo-file-system'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import ModalCargando from '../../utils/ModalCargando';
import { CREATE_GASTO, UPDATE_GASTO } from '../../graphql/mutations';
import { GET_ALL_GASTOS, GET_GASTOS } from '../../graphql/querys';
import { getFileInfo, isLessThanTheMB } from "../../utils/actions";
import ModalSuccesfull from '../../utils/ModalSuccesfull';

let tiposGastos = [
    {tipo:'Lavada', icon:"local-car-wash"},
    {tipo:'Tanqueada', icon:"fuel"},
    {tipo:'Repuestos', icon:"car-wrench"},
    {tipo:'Parqueadero', icon:"car-brake-parking"},
    {tipo:'Mantenimiento', icon:"car-repair"},

]
let initialForm ={
    dineroGastado:'',
    fecha:'',
    tipo:'',
    lugar:'',
    imagen:'',
    description:'',
    vehiculo:'',
    id:'',
    binaryImage:''
}
export default function ModalCreateGasto({ setModalVisible2, id, item}){
    const [selectedDate, setSelectedDate] = useState(item ? new Date(item.fecha):new Date());
    const [datePickerVisible, setDatePickerVisible] = useState(false);
    const [form, setForm] = useState(initialForm)
    const [image, setImage] = useState(null);
    const [moreOptions, setMoreOptions] = useState(false)
    const [modalVisible, setModalVisible] = useState(false);
    const [tipoGasto,setTipoGasto] = useState("fuel")
    const [updateGasto, result] = useMutation(UPDATE_GASTO)
    const [visibleSuccesfull, setVisibleSuccesfull] = useState(false)

    
    const [createGasto, {loading, error, data}] = useMutation(CREATE_GASTO,{
      update(cache, {data}){
    const {getPrevGastos} = cache.readQuery({
      query:GET_GASTOS,
      variables:{id:id}
    })
    
     cache.writeQuery({
      query:GET_GASTOS,
      variables:{id:id},
      data:{
        getPrevGastos:[...getPrevGastos,data?.createGasto]
      }
    })
    let cah = cache.readQuery({query:GET_ALL_GASTOS,variables:{id:id}})
    if(cah !== null){
      cache.writeQuery({
        query:GET_ALL_GASTOS,
        variables:{id:id},
        data:{
          getAllGastos:[...cah.getAllGastos,data?.createGasto]
        }
      })
    }
  }
}
)
  
    const showDatePicker = () => {
      setDatePickerVisible(true);
    };
  
    const hideDatePicker = () => {
      setDatePickerVisible(false);
    };
  
    const handleConfirm = (date) => {
      hideDatePicker();
      setSelectedDate(date);
      setForm({...form, fecha:date})
    };
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          quality: 1,
          
          base64:true
        });
        // setForm({...form, binaryImage:binaryImage.data.toString()})
      const fileInfo = await getFileInfo(result.uri)

      if (!fileInfo?.size) {
        alert("Can't select this file as the size is unknown.")
        return
      }
        if (!result.cancelled) {
          const isLt15MB = isLessThanTheMB(fileInfo.size, 2)
            if (!isLt15MB) {
              Alert.alert(`Elige una imagen con un tama??o inferior a 2MB!`)
              return
            }
          setImage(result.uri);
          setForm({...form, imagen:result.base64})
        }
      };
      
    const handleSubmit=()=>{
      if(item){
        for (let property in form) {
     
          if(form[property].length === 0 && property != "id" ){
              delete form[property]
        }
      }
      
      setForm({...form})
      updateGasto({variables:{...form, id:item.id}})
      setForm(initialForm)
    }else{
      createGasto({variables:{...form, vehiculo:id}})
    }
    
    }
    
    useEffect(()=>{
      if(error){
        if(error?.message === 'Network request failed'){
          Alert.alert('Ha ocurrido un error', 'Revisa tu conexion a internet')
        }else{
          Alert.alert('Ha ocurrido un error',error?.message)
        }
      }
      if(result?.error){
        if(result?.error.message === 'Network request failed'){
          Alert.alert('Ha ocurrido un error', 'Revisa tu conexion a internet')
        }else{
          Alert.alert('Ha ocurrido un error',result?.error?.message)
        }
      }
      
    },[error, result?.error])

    useEffect(()=>{
      if(data){
        setVisibleSuccesfull(true)
        setTimeout(()=>{
        setVisibleSuccesfull(false)
        setModalVisible2(false)
        },3000)
      }
      if(result?.data){
        setModalVisible2(false)
      }
    },[data, result?.data])
    
    
    function Render(item){
        const press=()=>{
          setTipoGasto(item.icon)
          setForm({...form, tipo:item.tipo})
          setModalVisible(false)

        }
       
        return(
          <TouchableOpacity onPress={()=>press()} style={{ height:100, margin:10,justifyContent:'center', alignItems:'center', borderRadius:10}}>
              {/* <Image style={{width:40, height:40}} source={item.src}/> */}
              
              {item.icon === 'fuel' || item.icon === 'car-brake-parking' || item.icon === "car-wrench"?
               <MaterialCommunityIcons name={item.icon} size={40} color={Theme.colors.secondary} />
              : <MaterialIcons name={item.icon} size={40} color={Theme.colors.secondary} />}
              
              <Text style={Theme.fonts.descriptionGray}>{item.tipo}</Text>
              </TouchableOpacity>
        )
      }
    return(
      <>
      
        <Pressable style={styles.centeredView}>
          
            <KeyboardAwareScrollView 
    resetScrollToCoords={{ x: 0, y: 0 }}
        keyboardShouldPersistTaps= 'always'
        style= {{marginTop:'20%'}}>
          <View style={styles.modalView}>

            <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:20}}>
            <View>
            <Text style={Theme.fonts.titleBlue}>{item ? 'Edita': 'A??ade'} tu {tiposGastos.map(el=> el.icon === tipoGasto && el.tipo)}</Text>
            <Text style={[Theme.fonts.descriptionGray,{lineHeight:18}]}>Completa los datos</Text>
            </View>
            {tipoGasto === 'fuel' || tipoGasto === 'car-brake-parking' || tipoGasto === "car-wrench"?
           <MaterialCommunityIcons name={tipoGasto} size={40} color='#1b333d' />
          : <MaterialIcons name={tipoGasto} size={40} color='#1b333d' />}
            
            </View>

            <Text style={Theme.fonts.descriptionGray}>Tipo</Text>
            <Pressable onPress={()=> setModalVisible(true)} style={{backgroundColor:'white', width:'100%', height:50, paddingHorizontal:5, alignItems:'center', flexDirection:'row', justifyContent:'space-between', marginBottom:10}}>
            <View style={{flexDirection:'row', alignItems:'center'}}>
            {tipoGasto === 'fuel' || tipoGasto === 'car-brake-parking' || tipoGasto === "car-wrench"?
           <MaterialCommunityIcons name={tipoGasto} size={30} color='#1b333d' />
          : <MaterialIcons name={tipoGasto} size={30} color='#1b333d' />}
          
            <Text style={[Theme.fonts.descriptionGray,{marginLeft:10}]}>{tiposGastos.map(el=> el.icon === tipoGasto && el.tipo)}</Text>
            </View>
          <Image    style={{width:25, height:25,transform: [{rotate: modalVisible ? '0deg': '180deg'}]}} source={require('../../../assets/iconTriangule.png')}/>
            
            </Pressable>


            <Text style={Theme.fonts.descriptionGray}>Fecha</Text>
            <Pressable onPress={showDatePicker} style={{backgroundColor:'white', width:'100%', height:50, paddingHorizontal:10, alignItems:'center', flexDirection:'row', marginBottom:10}}>
            <Fontisto name="date" size={24} color="#1b333d" />
            <Text style={[Theme.fonts.descriptionGray,{marginLeft:10}]}>{selectedDate ? selectedDate.toLocaleDateString() : 'No date selected'}</Text>
            <DateTimePickerModal
                    date={selectedDate}
                    isVisible={datePickerVisible}
                    mode="date"
                    onConfirm={handleConfirm}
                    onCancel={hideDatePicker}
                    maximumDate={new Date(2023, 11, 31)}
                    minimumDate={new Date(2022, 0, 1)}
                    /> 
            </Pressable>


            <Text style={Theme.fonts.descriptionGray}>Dinero Gastado</Text>
            <Pressable style={{backgroundColor:'white', width:'100%', height:50, paddingHorizontal:5, alignItems:'center', flexDirection:'row', marginBottom:10}}>
            <MaterialIcons name="attach-money" size={30} color="black" />
            <TextInput maxLength={9} keyboardType='numeric' placeholder={item?.dineroGastado} style={[Theme.fonts.descriptionGray,{width:'90%'}]} onChangeText={(text)=> setForm({...form, dineroGastado:text.replace( /[.,\s]/g, '').trim()})} />
            </Pressable>

                
                
                    <Pressable onPress={()=> setMoreOptions(!moreOptions)} style={{marginBottom:10, flexDirection:'row', alignItems:'center'}}>
                    <Text style={[Theme.fonts.descriptionGray, { fontSize:18}]}>Mas opciones</Text>
                    <Image    style={{width:20,marginLeft:10, height:20,transform: [{rotate: moreOptions ? '0deg': '180deg'}]}} source={require('../../../assets/iconTriangule.png')}/>

                    </Pressable>

            {moreOptions &&
            <>
            <View style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between',marginBottom:10}}>
            {item?.imagen &&!image && <Image source={{uri:'data:image/png;base64,'+ item?.imagen}} style={{ width: 50, height: 50 }} />}

            {image ? <Image source={{ uri: image }} style={{ width: 50, height: 50, marginRight:20 }} />
            : <MaterialIcons name="photo-camera" size={24} color="#1b333d" style={{marginLeft:10}} />}
        <Pressable onPress={pickImage}>
            <Text style={Theme.fonts.descriptionBlue}>{image || item?.imagen? "Cambiar":"Agregar Recibo/Factura" }</Text>
        </Pressable>
        
            {image && <AntDesign name="close" size={24} color={Theme.colors.primary} onPress={()=> setImage(null)} />}
            </View>

            <Text style={Theme.fonts.descriptionGray}>Tienda</Text>
            <Pressable style={{backgroundColor:'white', width:'100%', height:50, paddingHorizontal:5, alignItems:'center', flexDirection:'row', marginBottom:10}}>
            <FontAwesome5 name="store" size={20} color="#1b333d" style={{marginLeft:5}}/>
            <TextInput maxLength={20} placeholder={item?.lugar} multiline style={[Theme.fonts.descriptionGray,{width:'80%', marginHorizontal:10}]} onChangeText={(text)=> setForm({...form, lugar:text.trim()})} />
            </Pressable>

            <Text style={Theme.fonts.descriptionGray}>Descripcion</Text>
            <Pressable style={{backgroundColor:'white', width:'100%', height:80, paddingHorizontal:5, alignItems:'center', flexDirection:'row', marginBottom:20}}>
            <AntDesign name="filetext1" size={24} color="#1b333d" style={{marginLeft:5}}/>
            <TextInput maxLength={100} placeholder={item?.description} multiline style={[Theme.fonts.descriptionGray,{width:'80%', marginHorizontal:10}]} onChangeText={(text)=> setForm({...form, description:text.trim()})} />
            </Pressable>
            </>

            }
            
            

            
            {item ?
            <Pressable
            disabled={loading && true}
               style={[Theme.buttons.primary,{width:'100%', backgroundColor:form === initialForm? 'gray': Theme.colors.primary}]}
               onPress={handleSubmit}
             >
               <Text style={{color:'white', fontSize:18, fontWeight:"600"}}>Editar Gasto</Text>
             </Pressable>
             :
             <Pressable
           disabled={form.dineroGastado === initialForm.dineroGastado ? true:false || loading && true}
              style={[Theme.buttons.primary,{width:'100%', backgroundColor:form.dineroGastado === initialForm.dineroGastado? 'gray': Theme.colors.primary}]}
              onPress={handleSubmit}
            >
              <Text style={{color:'white', fontSize:18, fontWeight:"600"}}>{item?'Editar Gasto':'Confirmar Gasto'}</Text>
            </Pressable>
            }
            

            <Button onPress={()=> setModalVisible2(false)} title='Cancelar'/>


            <Modal
        animationType="fade"
        transparent={true}
        style={{backgroundColor:'rgba(0,0,0,0.5)'}}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
          
        <Pressable onPress={()=> setModalVisible(false)} style={styles.centeredView}>
        
          <View style={styles.modalView2}>
          <View style={{flexDirection:'row', alignItems:'center', justifyContent:'center'}}>
          <Image  style={{width:50, height:50}} source={require('../../../assets/QuarksSpeak1.png')}/>
          <Text style={[Theme.fonts.descriptionGray,{marginTop:20}]}>Selecciona el tipo de gasto</Text>
          </View>
          <FlatList
            horizontal
            style={{width:'100%'}}
            renderItem={({ item })=> Render(item) }
            data={tiposGastos}
            />
          </View>
          </Pressable>
        
      </Modal>
      {result?.loading &&
         <Modal
         animationType="fade"
         visible={result?.loading}
         transparent={true}

       >
          <ModalCargando text='Editando Gasto...'/>
       </Modal>
         }
         {
          loading &&
          <Modal
         animationType="fade"
         visible={loading}
         transparent={true}

       >
          <ModalCargando text='Creando Gasto...'/>
       </Modal>
       
         }
         
          </View>
        </KeyboardAwareScrollView>
        {visibleSuccesfull &&
         <Modal
         animationType="fade"
         visible={visibleSuccesfull}
         transparent={true}

       >
          <ModalSuccesfull text={'Felicidades!'} description={'Gasto Creado'}/>
       </Modal>
         }
        </Pressable>
      </>

    )
}

const styles = StyleSheet.create({
    centeredView: {
      justifyContent: "center",
      backgroundColor:'rgba(0,0,0,0.5)',
      height:'100%',
    },
    modalView: {
        width:'90%',
      margin: 20,
      backgroundColor: "#f3f3f3",
      borderRadius: 20,
      padding: 20,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      // shadowOpacity: 0.25,
      // shadowRadius: 4,
      // elevation: 5
      // position: "absolute",
      // bottom: 0,
      // height: 250,
      // width:'100%',
      // borderTopLeftRadius: 20,
      // justifyContent: "center",
      // alignItems: "center",
      // borderTopRightRadius: 20,
      // backgroundColor: "white"
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
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "red",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
        color:'red',
      marginBottom: 15,
      textAlign: "center"
    }
  });