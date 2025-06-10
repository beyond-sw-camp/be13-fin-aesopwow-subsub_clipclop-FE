import React from 'react'
import { DotWave } from 'ldrs/react'
import 'ldrs/react/DotWave.css'

const DotWaveLoader: React.FC<{ size?: string; speed?: string; color?: string }> = ({
  size = "47",
  speed = "1",
  color = "black"
}) => (
  <DotWave size={size} speed={speed} color={color} />
);

export default DotWaveLoader;
