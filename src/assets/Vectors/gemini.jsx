import * as React from "react"
import Svg, { Path, Defs, RadialGradient, Stop } from "react-native-svg"
const GeminiIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 16 16"
    {...props}
  >
    <Path
      fill="url(#a)"
      d="M16 8.016A8.522 8.522 0 0 0 8.016 16h-.032A8.521 8.521 0 0 0 0 8.016v-.032A8.521 8.521 0 0 0 7.984 0h.032A8.522 8.522 0 0 0 16 7.984v.032z"
    />
    <Defs>
      <RadialGradient
        id="a"
        cx={0}
        cy={0}
        r={1}
        gradientTransform="matrix(16.1326 5.4553 -43.70045 129.2322 1.588 6.503)"
        gradientUnits="userSpaceOnUse"
      >
        <Stop offset={0.067} stopColor="#9168C0" />
        <Stop offset={0.343} stopColor="#5684D1" />
        <Stop offset={0.672} stopColor="#1BA1E3" />
      </RadialGradient>
    </Defs>
  </Svg>
)
export default GeminiIcon
