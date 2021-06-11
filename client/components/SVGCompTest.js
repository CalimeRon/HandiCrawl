import * as React from "react"
import Svg, { G, Circle, Ellipse, Path } from "react-native-svg";


export function WarningSvg () {
  return (
    <Svg
      width={100}
      height={100}
      viewBox="0 0 100 100"
      xmlns="http://www.w3.org/2000/svg"
    >
      <G transform="translate(-52.22 -96.347)">
        <Circle
          cx={102.22}
          cy={146.347}
          r={50}
          fill="#ffde07"
          fillRule="evenodd"
        />
        <Circle cx={-79.778} cy={85.07} r={35} fill="#fff" fillRule="evenodd" />
        <Ellipse cx={101.836} cy={134.596} rx={9.923} ry={32.476} fill="#333" />
        <Ellipse cx={102.137} cy={178.92} rx={9.382} ry={9.442} fill="#333" />
        <Path fill="#333" d="M92.023 101.158h19.616v38.009H92.023z" />
      </G>
    </Svg>
  )
}