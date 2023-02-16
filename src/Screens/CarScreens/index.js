import { useQuery } from "@apollo/client"
import { useNavigation } from "@react-navigation/native"
import { useEffect } from "react"
import { ActivityIndicator } from "react-native"
import { View, Text, ImageBackground, Image, StyleSheet, TouchableOpacity, FlatList, Pressable } from "react-native"
import Vehiculo from "../../Components/CarComponents/Car/Vehiculo"
import { Colors } from "../../Contants/Colors"
import { GET_VEHICLES } from "../../graphql/querys"
import useAuth from "../../hooks/useAuth"
import { Buttons } from "../../Themes/buttons"
import { Texts } from "../../Themes/text"

export default function CarScreenIndex() {
  const { data, error, loading } = useQuery(GET_VEHICLES)

  const navigation = useNavigation()
  const { user } = useAuth()


  const handleCreate = () => {
    if (user) {
      return navigation.navigate('Crear Vehiculo')
    }
    else {
      return navigation.navigate('Profile')
    }
  }
  useEffect(() => {
    if (data && data?.getCars?.length > 0) {
      navigation.navigate('Vehiculos', { item: data?.getCars[0] })
    }
  }, [data])
  return (
    <>
      {loading && <ActivityIndicator style={{ flex: 1 }} color={Colors.primary} />}
      {data?.getCars?.length > 0 && user ?
        <View style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <View style={{
            shadowColor: "#000",
            paddingTop: '40%',
            height: '85%',
            justifyContent: 'center',
            alignItems: 'center',
            elevation: 40,
          }}>
            <Text >Hola {user.name}! </Text>
            <Text style={{ lineHeight: 20, marginBottom: "5%", fontSize: 20, fontWeight: '600' }}>Selecciona el Vehiculo</Text>
            <FlatList
              style={{
                marginLeft: 20, shadowOpacity: 0.20,
                shadowRadius: 5.46, shadowOffset: {
                  width: 4,
                  height: 3,
                  shadowColor: "#000"
                },
              }}
              horizontal
              renderItem={({ item }) =>
                <TouchableOpacity key={item?.id} onPress={() => navigation.navigate('Vehiculos', { item: item })} >
                  <Vehiculo item={item} />
                </TouchableOpacity>
              }
              data={data?.getCars}
            />

          </View>
          <Pressable
            onPress={() => handleCreate()}
            style={[Buttons.primary, { width: '90%' }]}>
            <Text style={Texts.title2RegularWhite}>Crear otro Vehiculo</Text>
          </Pressable>
        </View>
        :
        <ImageBackground
          source={require(`../../../assets/backRotate.png`)}
          style={{ width: "100%", height: "100%", }}
        >
          <View style={styles.container}>
            <View style={{ marginTop: '20%', marginLeft: '5%' }}>
              <Text style={styles.title}>Crea tu vehículo</Text>
              <Text style={styles.text}>Personaliza tu vehículo, para llevar tus gastos</Text>
            </View>
            <View style={{ margin: '5%', height: '60%', justifyContent: 'center', marginTop: '10%' }}>
              <Image style={{ height: '100%', width: '100%' }} source={require("../../../assets/CarBack.png")} />
            </View>
            <TouchableOpacity onPress={() => handleCreate()} style={styles.containerButton}>
              <Text style={{
                color: 'white',
                fontSize: 18
              }}>Crear vehículo</Text>
            </TouchableOpacity>
          </View>
        </ImageBackground>
      }
    </>
  )
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  containerButton: {
    position: 'absolute',
    bottom: '5%',
    marginHorizontal: '5%',
    alignItems: "center",
    justifyContent: "center",
    marginTop: 30,
    backgroundColor: Colors.primary,
    paddingVertical: 10,
    borderRadius: 10,
    width: '90%'
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    color: 'white'
  },
})