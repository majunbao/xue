import {h, render, Component} from 'preact';
import Layout from './Layout';

class App extends Component {
  appStyle = {
    top: '60px',
    left: '200px',
    right: '270px',
    minHeight: '650px',
    mixWidth: '1000px',
    canvasWidth: '768px',
    canvasHeight: '576px'
  }

  render(props, state) {
    return (
      <Layout {...this.appStyle} />
    )
  }
}

export default App;