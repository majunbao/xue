import {h} from 'preact';
import Inspector from '../Inspector';

const style = {
  top: '60px',
  right: 0,
  bottom: 0,
  background: '#F6F6F6'
}

function Right(props) {
  return (
    <div className="uk-view" style={{...style, top: props.layout.top, width: props.layout.right}}>
      <Inspector {...props} />
    </div>
  )
}

export default Right;