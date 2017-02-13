import {render, version} from 'inferno';
import MainView from './views/MainView';

const container = document.getElementById('root');

render(<MainView />, container);