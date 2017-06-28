const { h, render } = require('preact');
const $ = require('jquery');

const Store = require('./Store');
const Canvas = require('./Canvas');

render((
  <div id="foo">
    <Canvas />
  </div>
), document.body);