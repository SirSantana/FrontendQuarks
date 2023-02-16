import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreenIndex from '../Screens/HomeScreens';
import ProfileScreenIndex from '../Screens/ProfileScreens';
import Icon from 'react-native-vector-icons/Ionicons';
import { StatusBar,ActivityIndicator } from 'react-native';
import { Colors } from '../Contants/Colors';
import LoginScreen from '../Screens/ProfileScreens/LoginScreen';
import RegisterScreen from '../Screens/ProfileScreens/RegisterScreen';
import {  useState } from 'react';
import useAuth from '../hooks/useAuth';
import OnBoardingScreens from '../Screens/OnBoardScreens';
import PruebaCarScreen from '../Screens/CarScreens/PruebaCarScreen';
import VehiculeDataScreen from '../Screens/CarScreens/VehiculeDataScreen';
import GastosScreen from '../Screens/CarScreens/GastosScreen';
import FormCreateVehicule from '../Components/CarComponents/Car/FormCreateVehicule';
import RecordatoriosScreen from '../Screens/CarScreens/RecordatoriosScreen';
import CotizacionesScreen from '../Screens/HomeScreens/CotizacionesScreen';


const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();



const TabBarIcon = ({ color, name }) => {
  if (name === 'home') {
    return <Foundation name={name} size={24} color={color} />
  }
  if (name === 'car' || name === 'user-alt') {
    return <FontAwesome5 name={name} size={24} color={color} />
  }
  if (name === 'store') {
    return <MaterialIcons name="store" size={24} color={color} />
  }
}

export const Navigation = () => {
  const { user, logout,loading } = useAuth()
  const [showRealApp, setShowRealApp] = useState(false)

  if(loading){
    return <ActivityIndicator color={Colors.primary}/>
  }
  if(showRealApp && !user){
    return <RegisterScreen />
  }
  if(!user){
    return <OnBoardingScreens setShowRealApp={setShowRealApp} />
  }
  
  return (
    <NavigationContainer >
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <Tab.Navigator initialRouteName={user?.vehiculos.length>0?'Vehiculo':'Mi perfil'} barStyle={{ backgroundColor: 'white' }} 
      screenOptions={{
        headerShown: false, 
        tabBarStyle: {
          height: 60,
        },
        tabBarActiveTintColor: Colors.primary
      }}>
        <Tab.Screen name="Cotizar" component={StackHome} options={{
          tabBarIcon: ({ focused }) => <Icon
            name={focused ? 'search' : 'search-outline'}
            color={focused ? Colors.primary : Colors.gray2}
            size={24}
          />
        }} />
        <Tab.Screen name="Vehiculo" component={StackCar} options={({ route }) => ({
          tabBarIcon: ({ color, focused }) => <Icon
            name={focused ? 'car-sport':"car-sport-outline"}
            color={focused ? Colors.primary : Colors.gray2}
            size={24}
          />,
          // tabBarStyle: ((route) => {
          //   const routeName = getFocusedRouteNameFromRoute(route) ?? "CarScreen"
          //   if (routeName === 'CarScreen') {
          //     return { display: "none" }
          //   }
          //   return
          // })(route)
         
        })} />
        <Tab.Screen name="Mi perfil" component={StackProfile} options={{
          tabBarIcon: ({ focused }) => <Icon
            name={focused ? 'person':"person-outline"}
            color={focused ? Colors.primary : Colors.gray2}
            size={24}
          />,
        }} />

      </Tab.Navigator>

    </NavigationContainer>
  )

}

function StackHome({ navigation, route }) {

  return (
    <Stack.Navigator   screenOptions={{
      headerShown: true,
      headerStyle: {
        shadowColor: "#000",
        backgroundColor:'#f50057'
      },
      headerTintColor: 'white'}} >
      <Stack.Screen name="HomeScreen" component={HomeScreenIndex}  options={{ title:'', headerShown:false}}/>
      <Stack.Screen name="CotizacionesScreen" component={CotizacionesScreen}options={{ title:'Cotizaciones',}}/>
    
    </Stack.Navigator>
  );
}

function StackProfile() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          shadowColor: "#000",
          backgroundColor: '#464646'
        },
        headerTintColor: 'white'
      }}>
      <Stack.Screen name="ProfileScreen" component={ProfileScreenIndex} options={{ headerShown: false }} />
      <Stack.Screen name="SignIn" component={LoginScreen} />
      <Stack.Screen name="SignUp" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

function StackCar() {
  
  return (
    <Stack.Navigator initialRouteName='Vehiculos' screenOptions={{
      
      headerStyle: {
        shadowColor: "#000",
        backgroundColor: '#464646'
      }, headerTintColor: 'white'
    }}>
      <Stack.Screen name="Vehiculos" component={VehiculeDataScreen} options={{headerShown:false}} />
      {/* <Stack.Screen name="CarScreen" component={CarScreenIndex} options={{ headerShown: false, }} /> */}
      <Stack.Screen name="Crear Vehiculo" component={PruebaCarScreen} options={{headerShown:false}}/>
      <Stack.Screen name="Gastos" component={GastosScreen}  options={{headerShown:false}}/>
      <Stack.Screen name="Creando mi Vehiculo" component={FormCreateVehicule}  />
      <Stack.Screen name="Recordatorios" component={RecordatoriosScreen}  />

    </Stack.Navigator>
  );
}

