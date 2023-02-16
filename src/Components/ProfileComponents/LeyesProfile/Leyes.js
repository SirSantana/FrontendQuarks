import { useState } from 'react'
import { View, Text, TouchableOpacity, Modal } from 'react-native'
import ModalImage from '../../../utils/ModalImage'

let data = [
  {
    ley: 'Decreto 2106 de 2019. Art. 111 Paragrafo 2',
    descripcion: 'No se puede exigir la revision tecnico-mecanica',
    imagen: 'https://azurequarks.blob.core.windows.net/vehiculos/Decreto 2106 de 2019. Art. 111 Paragrafo 2.png'
  },
  {
    ley: 'Circular Mintransporte 03-01-2022',
    descripcion: 'No es obligatorio tener la licencia de coduccion en fisico, puedes mostrarla desde la app del RUNT.',
    imagen: 'https://azurequarks.blob.core.windows.net/vehiculos/CircularMintransporte030122.png'
  },
  {
    ley: 'Ley 962 de 2005. Art.23. Modifiquese Art.18',
    descripcion: 'No es obligatorio entregar los documentos, solo mostrarlos.',
    imagen: 'https://azurequarks.blob.core.windows.net/vehiculos/Ley 962 de 2005.ARTÍCULO 23 modifiquese Articulo 18.png'
  },
  {
    ley: 'Codigo nacional de transito. Ley 769 de 2002. Art.127. Paragrafo 1',
    descripcion: 'No se pueden llevar tu vehiculo por mal parqueo, si estas presente.',
    imagen: 'https://azurequarks.blob.core.windows.net/vehiculos/Ley 769 de 2002, Art 127. Paragrafo 1..png'
  },
  {
    ley: 'Codigo de Policía. Articulo21',
    descripcion: 'Puedes grabar el procedimiento de transito.',
    imagen: 'https://azurequarks.blob.core.windows.net/vehiculos/CodigoPolicia, Art  21.png'
  },
]

export default function Leyes() {
  const [image, setImage] = useState({ visible: false, image: null })

  return (
    <>
      <View style={{ padding: 20, }}>
        <Text style={{ color: 'white', fontSize: 18, fontWeight: '400', }}>Ley en Colombia</Text>
        {data && data.map((el, index) => (
          <TouchableOpacity key={index} onPress={() => setImage({ visible: true, image: el.imagen })} style={{ backgroundColor: '#76022C', borderRadius: 10, width: '100%', marginTop: 20, padding: 15 }}>
            <Text style={{ color: '#f50057', fontSize: 16, fontWeight: '400', }}>{el.ley}</Text>
            <Text style={{ color: 'white', marginTop: 10, fontSize: 16, fontWeight: 'bold', }}>{el.descripcion}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {image &&
        <Modal
          animationType="fade"
          visible={image.visible}
          transparent={true}
        >
          <ModalImage image={image.image} setImage={setImage} />
        </Modal>}
    </>
  )
}