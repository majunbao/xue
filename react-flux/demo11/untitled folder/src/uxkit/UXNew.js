import {h} from 'preact';
import UXCircle from '../uxkit/UXCircle';
import UXRect from '../uxkit/UXRect';
import UXTriangle from '../uxkit/UXTriangle';

const UXNew = ({children, ...props}) => {
  switch(props.type) {
    case 'UXRect':
    case 'rect':
      return <UXRect {...props} />
    case 'UXCircle':
    case 'circle':
      return <UXCircle {...props} />
    case 'UXTriangle':
    case 'triangle':
      return <UXTriangle {...props} />
    default:
      return <a {...props}>{children}</a>
  }
}

export default UXNew;