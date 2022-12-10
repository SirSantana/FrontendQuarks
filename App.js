import { StatusBar } from "expo-status-bar";
import { Alert, Modal, StyleSheet, Text, View } from "react-native";
import { ApolloProvider } from "@apollo/client";
import { client } from "./apollo";
import { Navigation } from "./src/navigation";
import { AuthProvider } from "./src/Context/AuthContext";
import { useEffect, useState } from "react";
import {useNetInfo} from "@react-native-community/netinfo";
import ModalCargando from "./src/utils/ModalCargando";


export default function App() {
  const netInfo = useNetInfo()
  const [connect,setConnect] = useState(false)
  useEffect(()=>{
    setConnect(netInfo?.isConnected?.toString())
    if(connect){
      Alert.alert('Revisa tu conexion')

    }
  },[netInfo?.isConnected])
  return (
    <>
      <ApolloProvider client={client}>
        <AuthProvider>
          <Navigation />
          {!connect&& <Modal
           animationType="fade"
           transparent={true}
           visible={!connect}
         >
          
          <ModalCargando text={'Revisa tu Conexion'}/>
         </Modal>}
          
        </AuthProvider>
      </ApolloProvider>
    </>

    // <View>
    //   <Text>Hola</Text>
    // </View>
  );
}
