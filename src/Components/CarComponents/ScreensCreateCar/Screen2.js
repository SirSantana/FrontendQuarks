import { useState } from "react";
import { View, Text, TouchableOpacity, Image, ActivityIndicator } from "react-native";
import { Theme } from "../../../theme";

export default function Screen2({ setScreens, setVehiculo, setForm, form }) {
  const [loadingImage, setLoadingImage] = useState(true);

  const onSubmit = (vehiculo) => {
    setScreens(3);
    setVehiculo(vehiculo);
    setForm({ ...form, tipo: vehiculo });
  };
  return (
    <View style={{ height: "60%" }}>
      <Text
        style={[
          Theme.fonts.titleBlue,
          { textAlign: "center", marginVertical: "5%" },
        ]}
      >
        Selecciona el tipo de Vehiculo
      </Text>

      <TouchableOpacity
        onPress={() => onSubmit("Carro")}
        style={[
          Theme.containers.containerViewTipo,
          {marginLeft: 0,borderTopRightRadius: 20,borderBottomRightRadius: 20,borderTopLeftRadius: 0,borderBottomLeftRadius: 0,
          },
        ]}
      >
        <Image
          onLoadEnd={() => setLoadingImage(false)}
          style={{ width: 200, height: 100, resizeMode: "contain" }}
          source={require("../../../../assets/Carro.png")}
        />
        {loadingImage && <ActivityIndicator color={Theme.colors.secondary} />}
        <Text style={[Theme.fonts.titleWhite]}>Carro</Text>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => onSubmit("Moto")}
        style={Theme.containers.containerViewTipo}
      >
        <Text style={[Theme.fonts.titleWhite]}>Moto</Text>

        <Image
          onLoadEnd={() => setLoadingImage(false)}
          style={{ width: 200, height: 100, resizeMode: "contain" }}
          source={require("../../../../assets/Moto.png")}
        />
        {loadingImage && <ActivityIndicator color={Theme.colors.secondary} />}
      </TouchableOpacity>
    </View>
  );
}
