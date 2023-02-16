import { View, Text, Image } from "react-native";



export default function HeaderCotizacion({ id }) {
  // const [getAvatar, { loading, data, error }] = useLazyQuery(GET_AVATAR_USER)
  // const [visibleModal, setVisibleModal] = useState(false)
  // useEffect(() => {
  //   if (id) {
  //     getAvatar({ variables: { id: id } })
  //   }
  // }, [id])
  
  return (
    <View style={{ display: 'flex', flexDirection: 'row',justifyContent:'space-between', alignItems:'center'}}>
      {/* <View style={{ display: 'flex', flexDirection: 'row',}}>
      <View style={{ width: 50, height:50, display: 'flex', justifyContent: 'center', alignItems: 'center', border: 'none', borderRadius: 25, fontSize: 14, backgroundColor: 'purple', color: 'white' }}>
        {data?.getAvatar?.avatar
          ? <Image source={{ uri: data?.getAvatar?.avatar }} style={{ height:50, width:50, backgroundColor: 'white', borderRadius: 25 }} />
          : <Text style={{color:'white'}}>V</Text>
        }
      </View>

        <View style={{marginLeft:20}}>
        <Text style={{ color: '#1b333d', fontSize: 18, margin: 0, fontWeight: 'bold' }}>{data?.getAvatar?.name} </Text>
        <Text style={{ color: '#7a7a7a', fontSize: 14, margin: 0, }}>{data?.getAvatar?.ciudad} </Text>

        </View>
      </View> */}
    </View>
     
  )
}