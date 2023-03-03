import { client } from './apollo';
import { Navigation } from './src/navigation';
import { AuthProvider } from "./src/Context/AuthContext";
import { ApolloProvider } from '@apollo/client';
import { useNetInfo } from "@react-native-community/netinfo";
import { useEffect, useState } from 'react';
import { Modal, Text, StyleSheet, View} from 'react-native';

const NoInternetModal = ({ show }) => (
  <Modal visible={!show} transparent={true}
    style={{ backgroundColor: 'rgba(0,0,0,0.5)', }}>
    <View style={styles.centeredView}>
      <View style={styles.modalView2}>
        <Text style={styles.modalTitle}>No se ha podido conectar a la red</Text>
        <Text style={styles.modalText}>
          Por favor revisa tu conexion a internet y vuelve a intentarlo.
        </Text>
      </View>
    </View>
  </Modal>
);

export default function App() {
  const netinfo = useNetInfo()
  const [internet, setInternet] = useState(false)
  useEffect(() => {
    console.log('connect',netinfo.isConnected);
    setInternet(netinfo.isConnected)
  }, [netinfo.isConnected])

  return (
    <ApolloProvider client={client}>
      <AuthProvider>
        <Navigation />
        <NoInternetModal show={internet} />
      </AuthProvider>
    </ApolloProvider>
  );
}
const styles = StyleSheet.create({
  centeredView: {
    justifyContent: "center",
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: '100%',
  },
  modalView2: {
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    position: "absolute",
    bottom: 0,
    paddingHorizontal: 10,
    width: '100%',
    borderTopLeftRadius: 20,
    alignItems: "center",
    borderTopRightRadius: 20,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '600',
  },
  modalText: {
    fontSize: 18,
    color: '#555',
    marginTop: 14,
    textAlign: 'center',
    marginBottom: 10,
  },
 
});