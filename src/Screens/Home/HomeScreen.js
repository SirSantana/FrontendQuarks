import { useNavigation } from "@react-navigation/native";
import React, {useState} from "react";
import { SafeAreaView, Text, TouchableOpacity, Image, View, Pressable, FlatList} from "react-native";
import { marcasCarros } from "../../Components/CarComponents/marcasCarros";
import { marcasMotos } from "../../Components/CarComponents/marcasMotos";
import useAuth from "../../hooks/useAuth";
import { Theme } from "../../theme";




export const HomeScreen = () => {
  const {user} = useAuth()
  const navigation = useNavigation()
  const [visibleSelect, setVisibleSelect] = useState(false)
  const [tipo,setTipo] = useState('Carro')
  const [marca, setMarca] = useState(null)

 
  return (
    <SafeAreaView style={[Theme.containers.containerParent, {justifyContent:'center', alignItems:'center'}]}>
          <>
              <Image style={{width:'100%', height:'70%', marginBottom:'5%'}} source={require('../../../assets/ComunityImage.png')}/>
          <Text style={[Theme.fonts.titleBlue,{width:'90%', textAlign:'center', fontSize:26}]}>Bienvenido a la Comunidad</Text>
          <Text style={[Theme.fonts.descriptionGray,{width:'90%', marginBottom:20, textAlign:'center'}]}>Aqui podras colocar tus dudas, y compartir con los demas, pasala bien!</Text>

          <TouchableOpacity
           onPress={()=>navigation.navigate(user? 'Chat': 'Profile')}
             style={[Theme.buttons.primary,{width:'90%'}]}>
            <Text style={Theme.fonts.titleWhite}>Vamos allá!</Text>
            </TouchableOpacity>
              </>
            {/* {visibleSelect ?
              <>
          <Text style={[Theme.fonts.titleBlue,{width:'90%', textAlign:'center', fontSize:26}]}>Selecciona tu Vehiculo y la marca</Text>
          <Text style={[Theme.fonts.descriptionGray,{width:'90%', marginBottom:20, textAlign:'center'}]}>No podras cambiar la marca para pertenecer a otro grupo, selecciona unicamente la marca de tu auto. </Text>

            <View style={{  flexDirection:'row', justifyContent:'space-between', width:'60%', marginTop:20}}>
          <TouchableOpacity onPress={()=>setTipo('Carro')} style={Theme.containers.containerBox}>
          <Image style={{width:80, height:80}} source={require('../../../assets/carroBlanco.png')}/>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>setTipo('Moto')}style={Theme.containers.containerBox}>
          <Image style={{width:80, height:80}} source={require('../../../assets/motoBlanca.png')}/>
          </TouchableOpacity>
          
      </View>
            {tipo === 'Carro' 
            ?
            <View style={{width:'80%', flexDirection:'row', justifyContent:'center', flexWrap:'wrap'}}>
              {
                marcasCarros.map(el=> 
                  <Pressable onPressIn={()=>setMarca(el.marca)} style={{width:60, height:60, margin:10, backgroundColor:marca === el.marca ? '#1b333d': 'white',justifyContent:'center', alignItems:'center', borderRadius:10}}>
              <Image style={{width:40, height:40}} source={el.src}/>
              </Pressable>
              )
              }
            </View>
            
            :
            <View style={{width:'80%', flexDirection:'row', justifyContent:'center', flexWrap:'wrap'}}>
              {
                marcasMotos.map(el=> 
                  <Pressable onPressIn={()=>setMarca(el.marca)} style={{width:60, height:60, margin:10, backgroundColor:marca === el.marca ? '#1b333d': 'white',justifyContent:'center', alignItems:'center', borderRadius:10}}>
              <Image style={{width:40, height:40}} source={el.src}/>
              </Pressable>
              )
              }
            </View>
            }
            </>


              :
              <>
              <Image style={{width:'100%', height:'70%', marginBottom:'5%'}} source={require('../../../assets/ComunityImage.png')}/>
          <Text style={[Theme.fonts.titleBlue,{width:'90%', textAlign:'center', fontSize:26}]}>Bienvenido a la Comunidad</Text>
          <Text style={[Theme.fonts.descriptionGray,{width:'90%', marginBottom:20, textAlign:'center'}]}>Aqui podras colocar tus dudas, y compartir con los demas, pasala bien!</Text>

          <TouchableOpacity
          //  onPress={()=>navigation.navigate(user? 'Chat': 'Profile')}
            onPress={()=> setVisibleSelect(true)}
             style={[Theme.buttons.primary,{width:'90%'}]}>
            <Text style={Theme.fonts.titleWhite}>Vamos allá!</Text>
            </TouchableOpacity>
              </>
            
            
            
            }
             */}
        
    </SafeAreaView>
    
  );
};
