import {h, render, Component, cloneElement} from 'preact';
import UXDrag from './UXDrag';

class UXResize extends Component {

  render(props, state) {
    return (
      <div>
        <UXDrag>
          <svg width="100" height="200"><rect fill="#ff0000" width="100%" height="100%" x="0" y="0"></rect></svg>
        </UXDrag>
        <svg width="200" height="300">
          <circle id="selectorGrip_resize_nw" fill="#22C" r="4" stroke-width="2" pointer-events="all" cx="20" cy="20" style="cursor: nw-resize;"></circle>
        <g id="selectorParentGroup"><rect id="selectorRubberBand" fill="#22C" fill-opacity="0.15" stroke="#22C" stroke-width="0.5" display="none" style="pointer-events:none" x="35" y="356" width="0" height="0"></rect><g id="selectorGroup0" transform="" display="inline"><path id="selectedBox0" fill="none" stroke="#22C" stroke-dasharray="5,5" style="pointer-events:none;" d="M-42.86,-42.86 L42.86,-42.86 42.86,42.86 -42.86,42.86z"></path><g display="inline"><circle id="selectorGrip_resize_nw" fill="#22C" r="4" style="cursor:nw-resize" stroke-width="2" pointer-events="all" cx="-42.86" cy="-42.86"></circle><circle id="selectorGrip_resize_n" fill="#22C" r="4" style="cursor:n-resize" stroke-width="2" pointer-events="all" cx="0" cy="-42.86"></circle><circle id="selectorGrip_resize_ne" fill="#22C" r="4" style="cursor:ne-resize" stroke-width="2" pointer-events="all" cx="42.86" cy="-42.86"></circle><circle id="selectorGrip_resize_e" fill="#22C" r="4" style="cursor:e-resize" stroke-width="2" pointer-events="all" cx="42.86" cy="0"></circle><circle id="selectorGrip_resize_se" fill="#22C" r="4" style="cursor:se-resize" stroke-width="2" pointer-events="all" cx="42.86" cy="42.86"></circle><circle id="selectorGrip_resize_s" fill="#22C" r="4" style="cursor:s-resize" stroke-width="2" pointer-events="all" cx="0" cy="42.86"></circle><circle id="selectorGrip_resize_sw" fill="#22C" r="4" style="cursor:sw-resize" stroke-width="2" pointer-events="all" cx="-42.86" cy="42.86"></circle><circle id="selectorGrip_resize_w" fill="#22C" r="4" style="cursor:w-resize" stroke-width="2" pointer-events="all" cx="-42.86" cy="0"></circle><line id="selectorGrip_rotateconnector" stroke="#22C" x1="0" y1="-42.86" x2="0" y2="-62.86"></line><circle id="selectorGrip_rotate" fill="lime" r="4" stroke="#22C" stroke-width="2" style="cursor:url(images/rotate.png) 12 12, auto;" cx="0" cy="-62.86"></circle></g></g></g>
        </svg>
      </div>
    )
  }
}

export default UXResize;