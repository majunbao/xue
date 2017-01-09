export function addEvent(el, event, handler){
  if(!el){return};
  el.addEventListener(event, handler, false);
}

export function removeEvent(el, event, handler){
  if(!el){return};
  el.removeEventListener(event, handler, false);
}

export function prefixCssProp(prop){
  const prefixes = ['moz', 'webkit', 'o', 'ms'];
  const styles = document.createElement('div').style;
  if(prop in styles) return prop;
  for(let i=0; i<prefixes.length; i++) {
    let nowProp = prefixes[i]+prop.charAt(0).toUpperCase()+prop.slice(1);
    if(nowProp in styles) {
      return nowProp;
    }
  }
}

export function prefixCssVal() {
  const prefixes = ['Moz', 'Webkit', 'O', 'ms'];
}