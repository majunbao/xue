import {h} from 'preact';
import NavPage from '../NavPage';

const style = {
  bottom: 0,
  left: 0,
  background: '#aaacb9'
}
  
function Left(props) {
  return (
    <div className="uk-view" style={{...style, width: props.layout.left, top: props.layout.top}}>
      <NavPage {...props} />
    </div>
  )
}

export default Left;