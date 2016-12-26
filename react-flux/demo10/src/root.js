import {h, render, Component, cloneElement} from 'preact';

class App extends Component {
  constructor() {
    super();
  }

  render(props, state) {
    // return <div>{props.children}</div>
    return cloneElement(props.children[0], {
      style: {background:'red'},
      onClick: () => console.log(2)
    })
  }
}

render(<App><p>wssss</p></App>, document.body)