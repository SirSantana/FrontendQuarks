import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { Image } from 'react-native';
import { Foundation } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import {CarScreen} from '../Screens/Car/CarScreen'
import { getFocusedRouteNameFromRoute, NavigationContainer } from '@react-navigation/native';
import SignInScreen from '../Screens/Profile/SiginScreen';
import { SignUpScreen } from '../Screens/Profile/SignUpScreen';
import { HomeScreen } from '../Screens/Home/HomeScreen';
import { ProfileScreen } from '../Screens/Profile/ProfileScreen';
import FormCreateVehicule from '../Components/CarComponents/FormCreateVehicule';
import VehiculeDataScreen from '../Screens/Car/VehiculeDataScreen';
import GastosScreen from '../Screens/Car/GastosScreen';
import ChatScreen from '../Screens/Home/ChatScreen';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import StoreScreen from '../Screens/Store/StoreScreen';
import { MaterialIcons } from '@expo/vector-icons';
import IndexStores from '../Screens/Store/IndexStores';
import DetailsStore from '../Components/StoreComponent/DetailsStore';
import { useEffect, useLayoutEffect, useState } from 'react';
import PruebaCarScreen from '../Screens/Car/PruebaCarScreen';
import ForgotPasswordScreen from '../Screens/Profile/ForgotPasswordScreen';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();


const TabBarIcon=({color, name})=>{
  if(name === 'home'){
    return <Foundation name={name} size={24} color={color} />
  }
  if(name=== 'car'|| name ==='user-alt'){
    return <FontAwesome5 name={name} size={24} color={color} />
  }
  if(name === 'store'){
    return <MaterialIcons name="store" size={24} color={color} />
  }
}

export const Navigation=()=>{
  

  return(
    <NavigationContainer >
      <Tab.Navigator initialRouteName='Profile' barStyle={{backgroundColor:'white'}} screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Store" component={StackStore} options={{tabBarIcon:()=><Image  style={{width:20, height:20}} source={require('../../assets/Logo.png')}/> }}/>
        <Tab.Screen name="Car" component={StackCar} options={{tabBarIcon:({color})=><TabBarIcon color={color} name='car'/>}}/>
        {/* <Tab.Screen name="Home" component={StackHome} options={{tabBarIcon:()=><Image  style={{width:20, height:20}} source={require('../../assets/Logo.png')}/>}} /> */}
        <Tab.Screen name="Profile" component={StackProfile} options={{tabBarIcon:({color})=><TabBarIcon color={color} name='user-alt'/>}}/>

      </Tab.Navigator>

    </NavigationContainer>
  )

}

function StackHome() {

    return (
      <Stack.Navigator >
        <Stack.Screen name="Inicio" component={HomeScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Chat" component={ChatScreen} options={{tabBarVisible:false}}/>

      </Stack.Navigator>
    );
  }
  function StackStore({ navigation, route }) {
    
    return (
      <Stack.Navigator  >
        <Stack.Screen name="Stores" component={StoreScreen} options={{headerShown:false}}/>
        <Tab.Screen name="IndexStores" component={IndexStores} options={{
            tabBarStyle: { display: "none" },
          }}/>
        <Stack.Screen name="DetailStore" component={DetailsStore}/>

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
            backgroundColor:'#464646'
          },
          headerTintColor: 'white'}}>
            
          <Stack.Screen name="Perfil" component={ProfileScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />


        </Stack.Navigator>
      );
    }

    function StackCar() {
      return (
        <Stack.Navigator screenOptions={{
          headerStyle: {
            shadowColor: "#000",
            backgroundColor:'white'
          },headerTintColor: '#1b333d'
          }}>
        {/* <Stack.Screen name="Mi Vehiculo" component={CarScreen} options={{headerShown:false}}/> */}
        <Stack.Screen name="Mi Vehiculo" component={PruebaCarScreen} options={{headerShown:false}}/>
        <Stack.Screen name="Creando mi Vehiculo" component={FormCreateVehicule}  />
        <Stack.Screen name="Vehiculo" component={VehiculeDataScreen}  />
        <Stack.Screen name="Gastos" component={GastosScreen}  />

        </Stack.Navigator>
      );
    }


// const Stack = createNativeStackNavigator();

// export const Navigation = () => {
//   return (
//     <Stack.Navigator initialRouteName="Root">
//       <Stack.Screen
//         name="Root"
//         component={BottomTabNavigator}
//         options={{ headerShown: false }}
//       />
//       </Stack.Navigator>
//   )
// }
