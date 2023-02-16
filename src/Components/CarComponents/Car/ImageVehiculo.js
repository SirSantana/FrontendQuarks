import { useState } from 'react'
import { View, Text, Image,ImageBackground, TouchableOpacity, TouchableHighlight,ActivityIndicator } from 'react-native'
import { Colors } from '../../../Contants/Colors'
import { Buttons } from '../../../Themes/buttons'
import { Texts } from '../../../Themes/text'

export default function ImageVehiculo({ item, setImage, navigation }) {
  const [imageLoading, setImageLoading] = useState(true)
 
  return (
    <>
      {item?.imagen
        ?
        <TouchableHighlight onPress={() => setImage({ image: imageLoading ?'Cargando': item?.imagen, visible: true })} style={{ width: '100%', height: 250, }}>
          <ImageBackground onLoad={()=> setImageLoading(false)} style={{ height: 250 }} resizeMode='cover'  source={{ uri: item?.imagen }} >
            {imageLoading && <ActivityIndicator style={{flex:1}} color={Colors.primary}/>}
          </ImageBackground>
        </TouchableHighlight>
        :
        <View style={{ width: '100%', height: 250 }}>
          <Image resizeMode='cover'  style={{ opacity: .5, height: 250 }} source={require('../../../../assets/Carro.png')} />
          <TouchableOpacity
            onPress={() => navigation.navigate('Creando mi Vehiculo', { tipo: item?.tipo, itemData: item })}
            style={[Buttons.primary, { position: 'absolute', top: '40%', left: '25%', width: '50%' }]}>
            <Text style={Texts.title2RegularWhite}>Agrega una foto</Text>
          </TouchableOpacity>
        </View>
      }
    </>
  )
}