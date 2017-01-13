import {h, cloneElement} from 'preact';
import Header from '../Header';

const style = {
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  background: '#242424'
}

function Top(props) {
  return (
    <div className="uk-view" style={{...style, height: props.layout.top}}>
      <Header {...props} />
    </div>
  )
}

export default Top;