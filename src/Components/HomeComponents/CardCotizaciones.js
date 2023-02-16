import { View, Text, Dimensions } from "react-native";
import HeaderCotizacion from "./HeaderCotizacion";
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from "../../Contants/Colors";



export default function CardCotizaciones(item) {
  return (
    <View style={{width:Dimensions.get("screen").width, padding:20, backgroundColor:'white', elevation:2}}>
      <HeaderCotizacion id={item.user}/>
      <View style={{flexDirection:'row'}}>
      <Icon name={'document-text-outline'} color={Colors.primary} size={24} />
      <Text>Descripcion: {item?.descripcion}</Text>
      </View>
      <View style={{flexDirection:'row'}}>
      <Icon name={'pricetag-outline'} color={Colors.primary} size={24} />
      <Text>Estado: {item?.estado}</Text>
      </View>
      <View style={{flexDirection:'row'}}>
      <Icon name={'globe-outline'} color={Colors.primary} size={24} />
      <Text>Marca / origen: {item?.marca}</Text>
      </View>
      <View style={{flexDirection:'row'}}>
      <Icon name={'shield-checkmark-outline'} color={Colors.primary} size={24} />
      <Text>Calidad: {item?.calidad}</Text>
      </View>
      <View style={{flexDirection:'row'}}>
      <Icon name={'pin-outline'} color={Colors.primary} size={24} />
      <Text>Ciudad: {item?.ciudad}</Text>
      </View>
    </View>
  )
}