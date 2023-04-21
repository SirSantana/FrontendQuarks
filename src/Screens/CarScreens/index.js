import { useState } from "react";
import { ScrollView, TouchableOpacity, Text, Modal} from "react-native"
import CardVehiculo from "../../Components/CarComponents/Car/CardVehiculo";
import GastosRecientes from "../../Components/CarComponents/Gastos/GastosRecientes";
import Recordatorios from "../../Components/CarComponents/Recordatorios";


import HeaderProfile from "../../Components/ProfileComponents/HeaderProfile";
import useAuth from "../../hooks/useAuth";
import ModalSecurityUser from "../../utils/ModalSecurityUser";


export default function CarScreenIndex() {
  const { user } = useAuth()
  const [idCar, setIdCar] = useState(null)
  const [visibleAddEmail, setVisibleAddEmail] = useState(false)

  return (
    <>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          backgroundColor: '#FFFBFC'
        }}
      >
        <HeaderProfile name={user?.name} puntos={user?.puntos} />
        
        {!user?.email && 
          <TouchableOpacity onPress={()=> setVisibleAddEmail(true)} style={{height:50, width:'90%',marginBottom:'5%',alignSelf:'center',alignItems:'center',justifyContent:'center', backgroundColor:'#FFD4DA', borderRadius:8}}>
            <Text style={{fontSize:16, color:'#f50057'}}>Para que no pierdas tus datos, agrega tu email</Text>
          </TouchableOpacity>
        }
        <CardVehiculo setIdCar={setIdCar} premium={user?.premium} idCar={idCar} />

        <GastosRecientes idCar={idCar} />

        <Recordatorios idCar={idCar} />


        {visibleAddEmail &&
          <Modal
            animationType="fade"
            visible={visibleAddEmail}
            transparent={true}
          >
            <ModalSecurityUser setVisibleAddEmail={setVisibleAddEmail} />
          </Modal>
        }
      </ScrollView>

    </>
  )
}
