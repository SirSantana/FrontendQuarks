import { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Theme } from '../../../theme';


export default function Screen1({crearVehiculo}){
    const [loadingImage, setLoadingImage] = useState(true)
    
    return(
        <View style={Theme.containers.containerParent}>
            <Image onLoadEnd={()=> setLoadingImage(false)} style={{width:'100%', height:'30%'}} source={require('../../../../assets/CarBack.png')}/>
          {loadingImage && <ActivityIndicator color={Theme.colors.secondary}/>}

        <Text style={[Theme.fonts.titleBlue,{width:'90%', textAlign:'center', fontSize:26}]}>Crea tu Vehiculo</Text>
        <Text style={[Theme.fonts.descriptionGray]}>Y empieza a llevar tus gastos!</Text>


        <TouchableOpacity onPress={()=>crearVehiculo()} style={[Theme.buttons.primary,{width:'90%', marginTop:20}]}>
        <Text style={Theme.fonts.titleWhite}>Crear mi Vehiculo</Text>

        </TouchableOpacity>
            </View>
    )
}