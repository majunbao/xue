import {h} from 'preact';
import AttrPage from '../AttrPage';

const style = {
  top: '60px',
  right: 0,
  bottom: 0,
  background: '#F6F6F6'
}

function Right(props) {
  return (
    <div className="uk-view" style={{...style, top: props.layout.top, width: props.layout.right}}>
      <AttrPage {...props} />
    </div>
  )
}

export default Right;