import { View, Text, StyleSheet, ActivityIndicator } from 'react-native'


export default function ModalCargando({ text }) {
  return (
    <View style={styles.centeredView}>
      <View style={styles.modalView}>
        <ActivityIndicator color={'white'} size={32} />
        <Text style={styles.titleRed}>{text}</Text>
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
    backgroundColor: '#F8AB53',
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
  titleRed: {
    marginLeft: 20,
    fontSize: 18,
    fontWeight: "600",
    color: 'white',
  },
});