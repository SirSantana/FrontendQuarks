import {Modal, View, Text, StyleSheet, Pressable, Image} from 'react-native'
import { Theme } from '../theme';


export default function ModalImage({image}){
    return(
        
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <Image resizeMode='contain' style={{width: '100%',height: '100%'}} source={{uri:'data:image/png;base64,'+ image}}/>
          </View>
        </View>
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