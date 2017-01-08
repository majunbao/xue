import {h} from 'preact';
import UXResize from './UXResize';

const UXCircle = ({children, ...props}) => (
  <UXResize  {...props}>
    <svg width="100%" height="100%">
      <rect width="100%" height="100%" fill={props.fill} />
    </svg>
  </UXResize>
)

export default UXCircle;