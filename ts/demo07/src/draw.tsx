let x=0,y=0,w=0,h=0;
let rect: HTMLElement ;

let start = (e) => {
  x = e.clientX;
  y = e.clientY;
  rect = document.getElementById('rect');

  rect.style.left = x + 'px';
  rect.style.top = y + 'px';

  document.addEventListener('mousemove', handleMove)
  document.addEventListener('mouseup', end);
}

let handleMove = (e) => {
  rect.style.left = Math.min(e.clientX, x) + 'px';
  rect.style.top = Math.min(e.clientY, y) + 'px';
  rect.style.width = Math.abs(e.clientX - x) + 'px';
  rect.style.height = Math.abs(e.clientY - y) + 'px';
}

let end = (e) => {
  rect.style.width = '0';
  rect.style.height = '0';
  document.removeEventListener('mousemove', handleMove);
  document.removeEventListener('mouseup', end);
}

let style = {
  width: 600,
  height: 600,
  background: '#def',
  position: 'absolute',
  left: 0,
  top: 0
}

let spanStyle = {
  background: '#edf',
  position: 'absolute',
  left: 0,
  top: 50
}

let spanEvent = (e) => {
  
}

function Canvas() {
  return (
    <div id="canvas" style={style} onMouseDown={start}>
      <button>三角形</button>
      <button>线段</button>
      <span id="rect" style={spanStyle}></span>
    </div>
  )
}

export default Canvas;