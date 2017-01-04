import {h} from 'preact';
import UXCircle from '../uxkit/UXCircle';

const New = ({children, ...props}) => {
  switch(props.type) {
    case 'UXCircle':
      return <UXCircle {...props} />
    default:
      return <a {...props}>{children}</a>
  }
}

export default New;