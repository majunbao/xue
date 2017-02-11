import {render} from 'inferno';

const container = document.getElementById('app');

function MyComponent() {
	return <div>Hello</div>
}

render(<MyComponent />, container);
