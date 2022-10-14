import {Modal, View, Text, StyleSheet, Pressable, Image, ActivityIndicator} from 'react-native'
import { Theme } from '../theme';
import { FontAwesome5 } from '@expo/vector-icons';

export default function ModalSuccesfull({text, description,check}){
    return(
        
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
          <FontAwesome5 name="check-circle" size={24} color="green" />
              <Text style={Theme.fonts.titleBlue}>{text}</Text>
              <Text style={Theme.fonts.descriptionGray}>{description}</Text>

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
      backgroundColor:'#f3f3f3',
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
    },
  
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });