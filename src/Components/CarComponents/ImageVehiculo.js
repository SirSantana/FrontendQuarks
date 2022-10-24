import { Buttons } from '../../Themes/buttons';
import { Texts } from '../../Themes/text';
import { View, Text, Image, TouchableOpacity,  TouchableHighlight, } from 'react-native'



export default function ImageVehiculo({item, setLoading, setImage, navigation}){

    return(
        <>
        {item?.imagen
           ?
           <TouchableHighlight onPress={()=> setImage({image:item?.imagen, visible:true})} style={{width:'100%',height: 200, maxHeight:'30%'}}>
          <Image style={{height:'100%'}} resizeMode='cover' onLoadEnd={()=> setLoading({image:false})}  source={{uri:'data:image/png;base64,'+ item.imagen}}/>
           </TouchableHighlight>
          :
          <View style={{width:'100%',height: '30%'}}>
           <Image  resizeMode='cover' onLoadEnd={()=> setLoading({image:false})} style={{opacity:.5, height:'100%'}} source={require('../../../assets/Carro.png')}/>
           <TouchableOpacity
           onPress={()=> navigation.navigate('Creando mi Vehiculo',{tipo:item?.tipo, itemData:item})}
            style={[Buttons.primary,{position:'absolute', top:'40%',left:'25%', width:'50%'}]}>
                <Text style={Texts.title2RegularWhite}>Agrega una foto</Text>
            </TouchableOpacity>
           </View>
          
            }
        </>
    )
}