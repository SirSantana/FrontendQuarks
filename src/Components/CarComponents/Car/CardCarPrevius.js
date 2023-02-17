import { View,ImageBackground,TouchableOpacity,Text,Pressable,Image,ActivityIndicator} from "react-native";
import { Colors } from "../../../Contants/Colors";



export default function CardCarPrevius({pickImage, setVisibleModalDetailsCars,visibleModalDetailsCars,  image, logo, form,}){
  return(
      <View style={{ backgroundColor: '#76022c', borderRadius: 20, padding: 20, height: '40%', width: '100%' }}>
      <ImageBackground onLoadStart={() => <ActivityIndicator color={Colors.primary} />} style={{ width: '100%', height: '80%', opacity: 0.8, justifyContent: 'center', borderRadius: 10, alignItems: 'center' }} source={image ? { uri: image } : require('../../../../assets/Carro.png')} >
        <TouchableOpacity onPress={pickImage} underlayColor={'rgba(0,0,0,0)'} style={{ width: '60%', backgroundColor: 'rgba(0,0,0,.6)', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 20, opacity: 1, paddingVertical: 10 }}>
          <Text style={{ fontWeight: '400', fontSize: 18, color: 'white' }}>{image ? 'Cambiar foto' : 'Agregar foto'}</Text>
        </TouchableOpacity>
      </ImageBackground>
      <View style={{ flexDirection: 'row', alignItems: 'center', height: '20%' }}>
        <Pressable style={{ marginRight: 10 }} onPress={() => setVisibleModalDetailsCars({...visibleModalDetailsCars, marca:true})}>
          <Image style={{ width: 50, height: 50 }} source={logo ? logo.src : 5} />
        </Pressable>
        <View>
          <Text onPress={() => setVisibleModalDetailsCars({...visibleModalDetailsCars, referencia:true})} style={{ fontWeight: 'bold', fontSize: 18, color: 'white' }}>{form?.referencia.length > 0 ? form.referencia : "(Aquí tu referencia)"}</Text>
          <Text onPress={() => setVisibleModalDetailsCars({...visibleModalDetailsCars, modelo:true})} style={{ fontWeight: '400', fontSize: 14, color: 'white' }}>{form?.modelo.length > 0 ? form.modelo : "(Aquí tu modelo)"}</Text>
        </View>
      </View>
    </View>
    )
}