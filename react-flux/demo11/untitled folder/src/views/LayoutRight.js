import {h} from 'preact';
import Inspector from './Inspector';

const LayoutRight = ({children, ...props}) => {
  let style = {
    top: '60px',
    right: 0,
    bottom: 0,
    background: '#F6F6F6'
  }

  return <div className="uk-view" style={{...style, ...props.style}}><Inspector /></div>

}

export default LayoutRight;