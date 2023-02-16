import { useState } from "react"
import { View } from "react-native"
import CotizacionesComunidad from "../../Components/HomeComponents/CotizacionesComunidad";
import CotizacionesUser from "../../Components/HomeComponents/CotizacionesUser";
import OptionsMenuHome from "../../Components/HomeComponents/OptionesMenuHome";
import SectionCotizar from "../../Components/HomeComponents/SectionCotizar";

export default function HomeScreenIndex() {
  const [tab, setTab] = useState('search')

  return (
    <View style={{ backgroundColor: '#f7f7f7', width: '100%', }}>
      <OptionsMenuHome tab={tab} setTab={setTab}/>
      {tab === 'cotizaciones' && <CotizacionesUser setTab={setTab}/>}
      {tab === 'search' && <SectionCotizar/>}
      {tab === 'comunidad' && <CotizacionesComunidad/>}
    </View>
  )
}