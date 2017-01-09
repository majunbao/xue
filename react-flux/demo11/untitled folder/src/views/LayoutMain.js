import {h, cloneElement} from 'preact';

const LayoutMain = ({children, ...props}) => {
  let style = {
    width: '768px',
    height: '576px',
    top: '50%',
    left: '50%',
    overflow: 'visible',
    background: '#fff',
    marginTop: '-288px',
    marginLeft: '-383.5px'
  }
  
  return <div className="uk-view" style={{...style, ...props.style}}>{children}</div>
}

export default LayoutMain;