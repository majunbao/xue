let XY = (e) => {
  console.log(e.pageX);
  console.log(e.target)
}

let style = {
  width: 600,
  height: 600,
  background: '#def',
  position: 'absolute',
  left: 300,
  top: 20
}

let spanStyle = {
  width: 200,
  height: 200,
  background: '#edf',
  position: 'absolute',
  left: 0,
  top: 50
}

let spanEvent = (e) => {
  
}

function Canvas() {
  return <div id="canvas" style={style} onMouseDown={XY}>
    <span style={spanStyle} onMouseDown={spanEvent}>nihao</span>
  </div>
}

export default Canvas;