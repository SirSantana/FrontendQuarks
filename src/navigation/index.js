import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Icon from 'react-native-vector-icons/Ionicons';
import { StatusBar, ActivityIndicator, Modal,  } from 'react-native';
import {useState } from 'react';
import useAuth from '../hooks/useAuth';
import OnBoardingScreens from '../Screens/OnBoardScreens';

import CarScreenIndex from '../Screens/CarScreens';
import ModalPutName from '../utils/ModalPutName';
import PruebaCarScreen from '../Screens/CarScreens/PruebaCarScreen';
import GastosScreen from '../Screens/CarScreens/GastosScreen';
import TopScoreScreen from '../Screens/CarScreens/TopScoreScreen';
import FormCreateVehicule from '../Components/CarComponents/Car/FormCreateVehicule';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

export const Navigation = () => {
  const { user, loading } = useAuth()
  const [showRealApp, setShowRealApp] = useState(false)
  const [modalPutName, setModalPutName] = useState(false)
  if (loading) {
    return <ActivityIndicator style={{ flex: 1 }} size={'large'} color={'#f50057'} />
  }
  if (showRealApp && !user) {
    return <Modal animationType="fade"
      transparent={true}>
      <ModalPutName setModalPutName={setModalPutName} />
    </Modal>
  }

  if (!user) {
    return <OnBoardingScreens setShowRealApp={setShowRealApp} />
  }

  return (
    <NavigationContainer >
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <Tab.Navigator initialRouteName={'Mi perfil'} barStyle={{ backgroundColor: 'white' }}
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            height: 0,
          },
          tabBarShowLabel: false,
        }}>
        <Tab.Screen name="Vehiculo" component={StackCar} options={({ route }) => ({
          tabBarIcon: ({ color, focused }) => <Icon
            name={focused ? 'car-sport' : "car-sport-outline"}
            color={focused ? 'white' : '#f3f3f3'}
            size={24}
          />,
          tabBarShowLabel: false
        })} />
      </Tab.Navigator>
    </NavigationContainer>
  )

}


function StackCar() {
  return (
    <Stack.Navigator initialRouteName='CarScreen' screenOptions={{

      headerStyle: {
        shadowColor: "#000",
        backgroundColor: '#464646'
      }, headerTintColor: 'white'
    }}>
      <Stack.Screen name="CarScreen" component={CarScreenIndex} options={{ headerShown: false, }} />
      <Stack.Screen name="Crear Vehiculo" component={PruebaCarScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Gastos" component={GastosScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Creando mi Vehiculo" component={FormCreateVehicule} />
      <Stack.Screen name="Score" component={TopScoreScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
}

