import React from 'react';
import { View, StyleSheet, Text } from "react-native";
import Svg, { G, Circle } from "react-native-svg";
import { Colors } from '../../../Contants/Colors';
import PriceFormat from '../../../utils/priceFormat';

export default function Donut({ gastosSeparados }) {



  const radius = 70;
  const circleCircumference = 2 * Math.PI * radius;

  const tanqueada = gastosSeparados[0]
  const mantenimiento = gastosSeparados[1]
  const lavadas = gastosSeparados[2]
  const repuestos = gastosSeparados[3]
  const parqueadero = gastosSeparados[4]
  const peaje = gastosSeparados[5]
  const policia = gastosSeparados[6]
  const otros = gastosSeparados[7]


  const total = tanqueada + repuestos + mantenimiento + lavadas + parqueadero + peaje + policia + otros
  const dineroGastado = PriceFormat({ price: total.toString() })

  const tanqueadaPercentage = (tanqueada / total) * 100;
  const repuestosPercentage = (repuestos / total) * 100;
  const mantenimientoPercentage = (mantenimiento / total) * 100;
  const lavadasPercentage = (lavadas / total) * 100;
  const parqueaderoPercentage = (parqueadero / total) * 100;
  const peajePercentage = (peaje / total) * 100;
  const policiaPercentage = (policia / total) * 100;
  const otroPercentage = (otros / total) * 100;


  const tanqueadaStrokeDashoffset = circleCircumference - (circleCircumference * tanqueadaPercentage) / 100;
  const repuestosStrokeDashoffset = circleCircumference - (circleCircumference * repuestosPercentage) / 100;
  const mantenimientoStrokeDashoffset = circleCircumference - (circleCircumference * mantenimientoPercentage) / 100;
  const lavadasStrokeDashoffset = circleCircumference - (circleCircumference * lavadasPercentage) / 100;
  const parqueaderoStrokeDashoffset = circleCircumference - (circleCircumference * parqueaderoPercentage) / 100;
  const peajeStrokeDashoffset = circleCircumference - (circleCircumference * peajePercentage) / 100;
  const policiaStrokeDashoffset = circleCircumference - (circleCircumference * policiaPercentage) / 100;
  const otrosStrokeDashoffset = circleCircumference - (circleCircumference * otroPercentage) / 100;


  const tanqueadaAngle = (tanqueada / total) * 360;
  const repuestosAngle = (repuestos / total) * 360;
  const mantenimientoAngle = tanqueadaAngle + repuestosAngle;
  const lavadasAngle = tanqueadaAngle + repuestosAngle + (mantenimiento / total) * 360;
  const parqueaderoAngle = tanqueadaAngle + repuestosAngle + (mantenimiento / total) * 360 + (lavadas / total) * 360
  const peajesAngle = tanqueadaAngle + repuestosAngle + (mantenimiento / total) * 360 + (lavadas / total)* 360 + (parqueadero / total) * 360
  const policiaAngle = tanqueadaAngle + repuestosAngle + (mantenimiento / total) * 360 + (lavadas / total)* 360 + (parqueadero / total)* 360 + (peaje / total) * 360
  const otrosAngle = tanqueadaAngle + repuestosAngle + (mantenimiento / total) * 360 + (lavadas / total)* 360 + (parqueadero / total)* 360 + (peaje / total)* 360 + (policia / total) * 360
  return (
    <View style={styles.container}>
      <View style={styles.graphWrapper}>
        <Svg height="180" width="180" viewBox="0 0 180 180">
          <G  originX="90" originY="90">
            {total === 0 ? (
              <Circle
                cx="50%"
                cy="50%"
                r={radius}
                stroke="#F1F6F9"
                fill="transparent"
                strokeWidth="15"
              />
            ) : (
              <>
                <Circle
                  cx="50%"
                  cy="50%"
                  r={radius}
                  stroke={Colors.tanqueadaColor}
                  fill="transparent"
                  strokeWidth="15"
                  strokeDasharray={circleCircumference}
                  strokeDashoffset={tanqueadaStrokeDashoffset}
                  rotation={0}
                  originX="90"
                  originY="90"
                  strokeLinecap="round"
                />
                <Circle
                  cx="50%"
                  cy="50%"
                  r={radius}
                  stroke={Colors.repuestosColor}
                  fill="transparent"
                  strokeWidth="15"
                  strokeDasharray={circleCircumference}
                  strokeDashoffset={repuestosStrokeDashoffset}
                  rotation={tanqueadaAngle}
                  originX="90"
                  originY="90"
                  strokeLinecap="round"
                />
                <Circle
                  cx="50%"
                  cy="50%"
                  r={radius}
                  stroke={Colors.mantenimientoColor}
                  fill="transparent"
                  strokeWidth="15"
                  strokeDasharray={circleCircumference}
                  strokeDashoffset={mantenimientoStrokeDashoffset}
                  rotation={mantenimientoAngle}
                  originX="90"
                  originY="90"
                  strokeLinecap="round"
                />
                <Circle
                  cx="50%"
                  cy="50%"
                  r={radius}
                  stroke={Colors.lavadaColor}
                  fill="transparent"
                  strokeWidth="15"
                  strokeDasharray={circleCircumference}
                  strokeDashoffset={lavadasStrokeDashoffset}
                  rotation={lavadasAngle}
                  originX="90"
                  originY="90"
                  strokeLinecap="round"
                />

                <Circle
                  cx="50%"
                  cy="50%"
                  r={radius}
                  stroke={Colors.parqueaderoColor}
                  fill="transparent"
                  strokeWidth="15"
                  strokeDasharray={circleCircumference}
                  strokeDashoffset={parqueaderoStrokeDashoffset}
                  rotation={parqueaderoAngle}
                  originX="90"
                  originY="90"
                  strokeLinecap="round"
                />
                <Circle
                  cx="50%"
                  cy="50%"
                  r={radius}
                  stroke={Colors.peajeColor}
                  fill="transparent"
                  strokeWidth="15"
                  strokeDasharray={circleCircumference}
                  strokeDashoffset={peajeStrokeDashoffset}
                  rotation={peajesAngle}
                  originX="90"
                  originY="90"
                  strokeLinecap="round"
                />
                <Circle
                  cx="50%"
                  cy="50%"
                  r={radius}
                  stroke={Colors.multaColor}
                  fill="transparent"
                  strokeWidth="15"
                  strokeDasharray={circleCircumference}
                  strokeDashoffset={policiaStrokeDashoffset}
                  rotation={policiaAngle}
                  originX="90"
                  originY="90"
                  strokeLinecap="round"
                />
                <Circle
                  cx="50%"
                  cy="50%"
                  r={radius}
                  stroke={Colors.primary}
                  fill="transparent"
                  strokeWidth="15"
                  strokeDasharray={circleCircumference}
                  strokeDashoffset={otrosStrokeDashoffset}
                  rotation={otrosAngle}
                  originX="90"
                  originY="90"
                  strokeLinecap="round"
                />
              </>
            )
            }
          </G>
        </Svg>
        <Text style={styles.label}>$ {dineroGastado}</Text>
      </View>
    </View>
  );
};


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  graphWrapper: {
    alignItems: "center",
    justifyContent: "center",

  },
  label: {
    position: "absolute",
    textAlign: "center",
    fontWeight: "700",
    fontSize: 20,
    color: '#464646'
  },
});