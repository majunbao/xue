import {h} from 'preact';
import UXResize from './UXResize';

const UXCircle = ({children, ...props}) => (
  <UXResize  {...props}>
    <svg width="100%" height="100%">
      <ellipse cx="50%" cy="50%" rx="50%" ry="50%" />
    </svg>
  </UXResize>
)

export default UXCircle;