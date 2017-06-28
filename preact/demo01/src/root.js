import { h, render } from 'preact';

render((
  <div id="foo">
    <div id="doc">
      <h3>States</h3>
      <button>save</button>
      <button>index</button>
      <h3>Navigation</h3>
      <button>back</button>
      <button>next</button>
      <button>go</button>
      <h3>Event</h3>
      <button>change</button>
    </div>
    <div id="cont">

    </div>
  </div>
), document.body);