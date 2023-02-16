import { Colors } from "../Contants/Colors"


export default function TiposDeGasto({ tipo }) {
  if (tipo === 'Tanqueada') return { tipoGasto: 'fuel', color: Colors.tanqueadaColor }
  if (tipo === 'Parqueadero') return { tipoGasto: 'car-brake-parking', color: Colors.parqueaderoColor }
  if (tipo === 'Lavada') return { tipoGasto: 'local-car-wash', color: Colors.lavadaColor }
  if (tipo === 'Repuestos') return { tipoGasto: 'car-wrench', color: Colors.repuestosColor }
  if (tipo === 'Mantenimiento') return { tipoGasto: 'car-repair', color: Colors.mantenimientoColor }
  if (tipo === 'Peaje') return { tipoGasto: 'highway', color: Colors.peajeColor }
  if (tipo === 'Multa') return { tipoGasto: 'local-police', color: Colors.multaColor }
  if (tipo === 'Otros') return { tipoGasto: 'add', color: Colors.primary }

}
