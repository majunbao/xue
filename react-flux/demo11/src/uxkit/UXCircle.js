import {h} from 'preact';
import UXResize from './UXResize';

const UXCircle = ({children, ...props}) => (
  <UXResize  {...props} />
)

export default UXCircle;