import { View, Text, TouchableOpacity, Image } from "react-native";
import { Containers } from "../../../Themes/containers";
import { Texts } from "../../../Themes/text";

export default function Screen1({ setScreens, setVehiculo, setForm, form }) {

  const onSubmit = (vehiculo) => {
    setScreens(2);
    setVehiculo(vehiculo);
    setForm({ ...form, tipo: vehiculo });
  };
  return (
    <View style={{ height: "60%" }}>
      <Text
        style={[Texts.title2BoldBlue,{marginVertical:'5%'}]}
      >
        Selecciona el tipo de Vehiculo
      </Text>

      <TouchableOpacity
        onPress={() => onSubmit("Carro")}
        style={[
          Containers.containerViewTipo,
          {marginLeft: 0,borderTopRightRadius: 20,borderBottomRightRadius: 20,borderTopLeftRadius: 0,borderBottomLeftRadius: 0,
          },
        ]}
      >
        <Image
          style={{ width: 200, height: 100, resizeMode: "contain" }}
          source={require("../../../../assets/Carro.png")}
        />
        <Text style={Texts.title2BoldWhite}>Carro</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => onSubmit("Moto")}
        style={Containers.containerViewTipo}
      >
        <Text  style={Texts.title2BoldWhite}>Moto</Text>

        <Image
          style={{ width: 200, height: 100, resizeMode: "contain" }}
          source={require("../../../../assets/Moto.png")}
        />
      </TouchableOpacity>
    </View>
  );
}
