import { StyleSheet, Pressable, Image, ActivityIndicator } from 'react-native'
import { useState } from 'react';

export default function ModalImage({ image, setImage }) {
  const [visibleSuccesfull, setVisibleSuccesfull] = useState(false)
  const [loadImage, setLoadImage] = useState(true)

  if (visibleSuccesfull) {
    setTimeout(() => {
      setVisibleSuccesfull(false)
      setImage({ visible: false })
    }, 3000)
  }
  return (
    <Pressable onPress={() => setImage({ visible: false })} style={styles.centeredView}>
      {loadImage && <ActivityIndicator style={{ flex: 1 }} size={'large'} color={'white'} />}
      <Image onLoad={() => setLoadImage(false)} resizeMode='contain' style={{ width: '100%', height: '80%' }} source={{ uri: image }} />
    </Pressable>
  )
}
const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
});