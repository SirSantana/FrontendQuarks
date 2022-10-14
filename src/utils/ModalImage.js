import {Modal, View, Text, StyleSheet, Pressable, Image, PermissionsAndroid, Platform, Alert} from 'react-native'
import { Theme } from '../theme';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';
import * as Permissions from 'expo-permissions';
import * as ImagePicker from 'expo-image-picker';
import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';
import ModalSuccesfull from './ModalSuccesfull';
export default function ModalImage({image, setImage}){
  const [visibleSuccesfull, setVisibleSuccesfull] = useState(false)
 
  const downloadImage=async()=>{
    
    const filename = FileSystem.documentDirectory + "some_unique_file_name.png";
    await FileSystem.writeAsStringAsync(filename, image, {
      encoding: FileSystem.EncodingType.Base64,
    });
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status === "granted") {
      const mediaResult = await MediaLibrary.saveToLibraryAsync(filename);
    setVisibleSuccesfull(true)
    }else{
      Alert.alert('Error')
    }

}
if(visibleSuccesfull){
  setTimeout(()=>{
    setVisibleSuccesfull(false)
    setImage({visible:false})
  },3000)
}

    return(
        <>
        <Pressable onPress={()=> setImage({visible:false})} style={styles.centeredView}>
          {/* <Pressable onPress={downloadImage()}> */}
          <Image  resizeMode='contain' style={{width: '100%',height: '80%'}} source={{uri:'data:image/png;base64,'+ image}}/>
          {!visibleSuccesfull &&<Pressable onPress={()=>downloadImage()} style={[Theme.buttons.primary,{width:50, height:50}]}><AntDesign name="download" size={30} color="white" /></Pressable>}
          
          {/* </Pressable> */}
        </Pressable>
          {visibleSuccesfull && <ModalSuccesfull text={'Descarga Completa'} check={true}/>}
          </>

    )
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor:'rgba(0,0,0,0.5)',
    },
    modalView: {
      margin: 20,
      backgroundColor: 'transparent',
      borderRadius: 20,
      padding: 10,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      height:'60%',
        width:'90%'
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
  
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });