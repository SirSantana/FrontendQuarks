import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
import Icon from 'react-native-vector-icons/Ionicons';
import { Colors } from '../../Contants/Colors';
import { slides } from "./slides";


export default function OnBoardingScreens({ setShowRealApp }) {
  const renderItem = ({ item }) => {
    return (
      <View
        style={{ width: "100%", height: "100%" }}
      >
        <View style={styles.container}>
          <Image style={styles.image} source={item.image} />
          <View style={{height:'25%'}}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.text}>{item.text}</Text>
          </View>
        </View>
      </View>
    );
  }
  const renderNextButton = () => {
    return (
      <View style={styles.buttonCircle}>
        <Icon
          name="arrow-forward-outline"
          color="rgba(255, 255, 255, .9)"
          size={24}
        />
      </View>
    );
  };
  const renderDoneButton = () => {
    return (
      <TouchableOpacity onPress={()=> setShowRealApp(true)} style={styles.buttonRegister}>
        <Text style={{ color: '#f50057', fontSize: 18, fontWeight: '600' }}>Registrate</Text>
      </TouchableOpacity>
    );
  };

  return (
    <AppIntroSlider
      renderItem={renderItem}
      data={slides}
      renderDoneButton={renderDoneButton}
      renderNextButton={renderNextButton}
      onDone={()=> setShowRealApp(true)} activeDotStyle={{
        backgroundColor: "#f26b9b",
        width: 30
      }} />
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height:'100%'
  },
  image: {
    resizeMode: "contain",
    height: "60%",
    width: '80%',
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.secondary,
    alignSelf: "center",
    marginBottom: 10
  },
  text: {
    textAlign: "center",
    color: Colors.gray2,
    fontSize: 16,
    paddingHorizontal: 30,
  },
  buttonCircle: {
    width: 40,
    height: 40,
    backgroundColor: Colors.primary,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonRegister: {
    width: 100,
    height: 40,
    backgroundColor: "white",
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
