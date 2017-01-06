import {h} from 'preact';
import UXCircle from '../uxkit/UXCircle';
import UXRect from '../uxkit/UXRect';

const New = ({children, ...props}) => {
  switch(props.type) {
    case 'UXCircle':
      return <UXCircle {...props} />
    case 'UXRect':
      return <UXRect {...props} />
    default:
      return <a {...props}>{children}</a>
  }
}

export default New;