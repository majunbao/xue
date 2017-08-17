import { h, render } from 'preact';
import $ from 'jquery';

import { Document } from './Document'
let doc = new Document

render((
  <div id="foo">
    <span>Hello, world!</span><br />
    <span>jQuery版本：{$().jquery}</span>
  </div>
), document.body);