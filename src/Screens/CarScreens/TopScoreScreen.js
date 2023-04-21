import { useNavigation } from "@react-navigation/native";
import { View, Text, TouchableOpacity, ScrollView, Modal,ActivityIndicator} from "react-native";
import { LinearGradient } from 'expo-linear-gradient';
import Icon from 'react-native-vector-icons/Ionicons';
import { useQuery } from "@apollo/client";
import { GET_SCORE } from "../../graphql/querys";
import { useState } from "react";
import ModalProfile from "../../utils/ModalProfile";


export default function TopScoreScreen() {
  const { loading, error, data } = useQuery(GET_SCORE)
  const [visibleProfile, setVisibleProfile] = useState(false)
  const [idUser, setIdUser] = useState(null)
  const navigation = useNavigation()
  let firstThree;
  let lastSeven;

  if (data) {
    firstThree = data?.getScore?.slice(0, 3)
    lastSeven = data?.getScore?.slice(3, 10)
  }

  if (loading) {
    return <LinearGradient
      colors={['#F50057', '#5B0221']}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={{ padding: 20, paddingBottom: '10%', marginVertical: '10%', borderBottomLeftRadius: 20, borderBottomRightRadius: 20, height: 200 }}

    >
      <ActivityIndicator size={'large'} color={'white'}/>

    </LinearGradient>
  }
  return (
    <ScrollView showsVerticalScrollIndicator={false}
      style={{
        backgroundColor: '#FFFBFC',
      }}>
      <LinearGradient
        colors={['#F50057', '#5B0221']}
        start={{ x: 0, y: 0 }}
        end={{ x: 0, y: 1 }}
        style={{ padding: 20, paddingBottom: '10%', marginBottom: '10%', borderBottomLeftRadius: 20, borderBottomRightRadius: 20 }}

      >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
          <TouchableOpacity onPress={() => navigation.goBack()} style={{ width: '50%', flexDirection: 'row', alignItems: 'center', height: 40, }}>
            <Icon name="chevron-back" color={'white'} size={28} />
          </TouchableOpacity>
        </View>

        <View style={{ justifyContent: 'center', alignItems: 'center', flexDirection: 'row', marginBottom: '10%' }}>

          <Text style={{ fontWeight: 'bold', fontSize: 22, marginRight: 8, color: 'white' }}>Top Puntaje</Text>
          <Icon name="trophy" color={'#F8DE53'} size={28} />
        </View>

        {firstThree?.map(el => (
          <TouchableOpacity key={el.id} onPress={() => {setVisibleProfile(true), setIdUser(el.id)}} style={{ width: '90%',alignItems:'center', alignSelf: 'center', backgroundColor: '#FFD4DA', marginBottom: 16, flexDirection: 'row', padding: 8, borderRadius: 8, justifyContent: 'space-between' }}>
            <View style={{ flexDirection: 'row', alignItems:'center' }}>
              <Icon name="trophy" color={'#f50057'} size={22} />
              <Text style={{ fontSize: 16, color: '#5B0221', marginLeft: 8 }}>{el?.name}</Text>
            </View>
            <Text style={{ fontSize: 16, color: '#5B0221', fontWeight: 'bold' }}>{el?.puntos} pts</Text>

          </TouchableOpacity>
        ))}

      </LinearGradient>



      {lastSeven?.map(el => (
        <TouchableOpacity key={el.id} onPress={() => {setVisibleProfile(true), setIdUser(el.id)}} style={{ width: '80%',alignItems:'center', alignSelf: 'center', backgroundColor: '#FFD4DA', marginBottom: 16, flexDirection: 'row', padding: 8, borderRadius: 8, justifyContent: 'space-between' }}>
          <View style={{ flexDirection: 'row',alignItems:'center' }}>
            <Icon name="trophy" color={'#f50057'} size={22} />
            <Text style={{ fontSize: 16, color: '#5B0221', marginLeft: 8 }}>{el?.name}</Text>
          </View>
          <Text style={{ fontSize: 16, color: '#5B0221', fontWeight: 'bold' }}>{el?.puntos} pts</Text>

        </TouchableOpacity>
      ))}

      <Modal
        animationType="fade"
        visible={visibleProfile}
        transparent={true}
      >
        <ModalProfile setVisibleProfile={setVisibleProfile} id={idUser} />
      </Modal>
    </ScrollView>
  )
}