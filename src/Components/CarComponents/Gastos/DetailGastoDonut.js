import {View, Text} from 'react-native'

export default function DetailGastoDonut({dinero, gasto, color}) {
  return (
    <View style={{ display: 'flex', marginBottom: 10, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
      <View style={{ flexDirection: 'row',alignItems:'center'}}>
      <View style={{ backgroundColor: color, width: 10, height: 10, borderRadius: 10, marginRight: 20 }} />
      <Text style={{ fontSize: 14, fontWeight: '500', color: '#B9BAC2', marginRight: 5 }}>{gasto}:</Text>
      </View>
      <Text style={{ fontSize: 14, fontWeight: "700", color: '#464646' }}>$ {dinero}</Text>
    </View>
  )
}