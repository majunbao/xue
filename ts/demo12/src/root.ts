import * as $ from 'jquery';
import Shapre from './shape';
import Marquee from './Marquee';

class Editor {

  constructor(argument) {
    // code...
  }
  render(s: SVGPolygonElement) {
    let n = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    n.setAttribute('width', '500');
    n.setAttribute('height', '400');
    n.setAttribute('style', 'background-color: red');
    n.appendChild(s);
    document.body.appendChild(n);
  }
  pointsToPolygon(t: number[]) {
    for (var e = []; t.length >= 2;) e.push(t.shift() + "," + t.shift());
    return e.join(" ")
  }
  layout(t: number, e: number, i: number): SVGPolygonElement {
    let n = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    let s = [];
    for (var o = t / 2, a = e / 2, r = 0; i > r; r++) {
      var l = o + o * Math.cos(2 * Math.PI * r / i);
      var c = a + a * Math.sin(2 * Math.PI * r / i);
      l = Math.round(10 * l) / 10;
      c = Math.round(10 * c) / 10;
      s.push(l);
      s.push(c)

      console.log(l, c)
    };
    return n.setAttribute('points', this.pointsToPolygon(s)), n;
  }
}

new Shapre();
new Marquee();