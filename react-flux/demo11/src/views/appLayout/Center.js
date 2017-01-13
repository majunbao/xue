import {h} from 'preact';
import EditAreaPage from '../EditAreaPage';

const canvasStyle = {
  width: '768px',
  height: '576px',
  top: '50%',
  left: '50%',
  overflow: 'visible',
  background: '#fff',
  marginTop: '-288px',
  marginLeft: '-383.5px'
}

function Center(props) {
  let mainStyle = {
    bottom: 0,
    top: props.layout.top,
    right: props.layout.right,
    left: props.layout.left,
    background: '#57585D'
  }

  return (
    <div className="uk-view" style={mainStyle} onMouseDown={(e)=>{e.which == 1 && props.onCancelSelected()}}>
      <div className="uk-view dd" style={{...canvasStyle}} >
        <EditAreaPage {...props} />
      </div>
    </div>
  )
}

export default Center;