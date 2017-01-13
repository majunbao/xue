import {h} from 'preact';

function Header(props) {
  let onLayout = (direction, num) => {
    props.onUpdataLayout({
      [direction]: props.layout[direction] == 0 ? num: 0
    })
  }

  return (
    <div>
      <button onClick={()=>{props.onAddCanvas({type: 'rect'})}}>正方形</button>
      <button onClick={()=>{onLayout('left', 200)}}>切换导航</button>
    </div>
  )
}

export default Header;
