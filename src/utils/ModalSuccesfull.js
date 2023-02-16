import { View, Text, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

export default function ModalSuccesfull({ text, description, check }) {
  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <Icon style={{ marginLeft: 10 }} name="checkmark-circle-outline" color={'white'} size={32} />
        <Text style={styles.titleBlue}>{text}. {description}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalView: {
    margin: 20,
    backgroundColor: '#54BB62',
    borderRadius: 5,
    position: 'absolute',
    top: 10,
    width: '90%',
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: "center",
    shadowColor: "#000",
    flexDirection: 'row',
    shadowOffset: {
      width: 0,
      height: 2
    },
  },
  titleBlue: {
    marginLeft: 20,
    fontSize: 18,
    fontWeight: "400",
    color: 'white',
  },

});