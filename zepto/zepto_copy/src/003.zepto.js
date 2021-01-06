var $ = function (_) {
  if (typeof _ == 'function') $.dom.forEach(_);
  else $.dom = Array.prototype.slice.apply(document.querySelectorAll(_));

  return $;
}

$.html = function (html) {
  $.dom.forEach(function (el) {
    el.innerHTML = html;
  });
  return $;
}

$.css = function (style) {
  $.dom.forEach(function (el) {
    el.style.cssText = style;
  });
  return $;
}

$.append = function (html) {
  $.dom.forEach(function (el) {
    el.insertAdjacentHTML('beforeEnd', html);
  });
  return $;
}

$.prepend = function (html) {
  $.dom.forEach(function (el) {
    el.insertAdjacentHTML('afterBegin', html);
  })
}