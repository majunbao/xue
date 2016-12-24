var h = require('virtual-dom/h');
var createElement = require('virtual-dom/create-element');

var node = createElement(
  <div class="red" onclick="function(){console.log(2)}">
  ni
  </div>
);

document.body.appendChild(node);