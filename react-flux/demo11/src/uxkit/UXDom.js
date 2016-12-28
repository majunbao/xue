export function addEvent(el, event, handler){
  if(!el){return};
  if(el.attchEvent) {
    el.attchEvent('on' + event, handler);
  }else if(el.addEventListener) {
    el.addEventListener(event, handler, false);
  }else {
    el['on'] = handler;
  }
}

export function removeEvent(el, event, handler){
  if(!el){return};
  if(el.detachEvent) {
    el.detachEvent('on' + event, handler);
  }else if(el.removeEventListener) {
    el.removeEventListener(event, handler, false);
  }else {
    el['on'] = null;
  }
}