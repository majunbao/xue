import {h, render, Component} from 'preact';
import Layout from './Layout';

class App extends Component {

  render(props, state) {
    return (
      <Layout><h1>nihao</h1></Layout>
    )
  }
}

export default App;