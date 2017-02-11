import {render, version} from 'inferno';


const container = document.getElementById('root');

function MyComponent() {
  return <div>Hello {version}</div>
}

render(<MyComponent />, container);
