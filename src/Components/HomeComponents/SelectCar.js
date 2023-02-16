import {View, Text, Image, TouchableOpacity} from 'react-native'
import { Colors } from '../../Contants/Colors'


export default function SelectCar({item, setForm, form, setModalVisible}) {
  const handleSelectForm=()=>{
    setForm({...form, marca:item.marca, referencia:`${item.referencia} ${item?.modelo}`})
    setModalVisible(false)
  }
  return (
    <TouchableOpacity onPress={handleSelectForm} style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginVertical: 20, backgroundColor: '#f9f9f9', padding: 10, elevation: 2 }}>
      <View>
        <Text style={{ color: Colors.secondary, fontSize: 20, fontWeight: 'bold', flexWrap:'wrap' }}>{item?.marca} {item.referencia}</Text>
        <Text style={{ color: Colors.gray, fontSize: 14 }}>{item?.modelo}</Text>
      </View>
      {item?.imagen &&<Image style={{ height: 120, borderRadius: 10, width: '60%', alignSelf: 'center' }} source={{ uri: item?.imagen }} />}
    </TouchableOpacity>
  )
}