import { View, StyleSheet, Pressable, TouchableOpacity, Text, Modal, ActivityIndicator } from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { useLazyQuery } from "@apollo/client";
import { GET_ONE_USERS } from "../graphql/querys";
import { useLayoutEffect, useState } from "react";
import EditProfile from "../Components/ProfileComponents/EditProfile";



export default function ModalProfile({ setVisibleProfile, id, user }) {

  const [getOneUser, { loading, error, data }] = useLazyQuery(GET_ONE_USERS)
  const [visibleEdit, setVisibleEdit] = useState(false)

  useLayoutEffect(() => {
    if (!user) {
      getOneUser({ variables: { id: id } })
    }
  }, [id])
  
  return (
    <Pressable onPress={() => setVisibleProfile(false)} style={styles.centeredView}>
      <LinearGradient
        colors={['#F50057', '#5B0221']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={styles.modalView}
      >
        <View style={{ width: '100%', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', }}>
            {loading && <ActivityIndicator color={'white'}/>}

              <TouchableOpacity style={{ backgroundColor: '#BFBFBF', width: 50, borderRadius: 50, height: 50, alignItems: 'center', justifyContent: 'center', marginRight: 8 }}>
                <Text style={{ color: 'white', fontSize: 20 }}>{user ? user?.name.slice(0, 1) : data?.getOneUser?.name.slice(0, 1)}</Text>
              </TouchableOpacity>
            {loading && <ActivityIndicator color={'white'}/>}

              <Text style={{ color: 'white', fontSize: 20, lineHeight: 20, fontWeight: 'bold' }}>{user ? user?.name : data?.getOneUser?.name}</Text>
            </View>
            {loading && <ActivityIndicator color={'white'}/>}
            {user?.id === id &&
              <Icon onPress={() => setVisibleEdit(true)} name="create-outline" color={'#f1f1f1'} size={26} style={{ marginLeft: 8 }} />
            }
          </View>


        </View>

        <View style={{ flexDirection: 'row', width: '60%', justifyContent: 'space-between', alignItems: 'center' }}>
          <View style={{ flexDirection: 'column', marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ backgroundColor: '#5B0221', width: 50, borderRadius: 50, height: 50, alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
              <Icon name="trophy" color={'#f50057'} size={26} />
            </View>
            {loading && <ActivityIndicator color={'white'}/>}
            <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold', }}>{user ? user?.puntos : data?.getOneUser?.puntos} pts</Text>
          </View>
          <View style={{ flexDirection: 'column', marginTop: 20, justifyContent: 'center', alignItems: 'center' }}>
            <View style={{ backgroundColor: '#5B0221', width: 50, borderRadius: 50, height: 50, alignItems: 'center', justifyContent: 'center', marginBottom: 8 }}>
              <Icon name="car" color={'#f50057'} size={26} />
            </View>

            {loading && <ActivityIndicator color={'white'}/>}

            <Text style={{ fontSize: 16, color: 'white', fontWeight: 'bold', }}>{user ? user?.vehiculos?.length : data?.getOneUser?.vehiculos?.length}</Text>
          </View>
        </View>
      </LinearGradient>

      <Modal
        animationType="slide"
        visible={visibleEdit}
        transparent={true}
      >
        <EditProfile user={user} setVisibleEdit={setVisibleEdit} />
      </Modal>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: 'rgba(0,0,0,0.5)',
    width: '100%'
  },
  modalView: {
    margin: 20,
    backgroundColor: '#f3f3f3',
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
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
});