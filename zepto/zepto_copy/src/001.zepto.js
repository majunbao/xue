var $ = function (selector) {
  $.dom = [].slice.apply(document.querySelectorAll(selector));
  return $;
}

var $ = function (_) {
  if (typeof _ == 'function') $.dom.forEach(_)
  else $.dom = [].slice.apply(document.querySelectorAll(_));
  return $;
}

function $(_) {
  if (typeof _ == 'function') $.dom.forEach(_)
  else {
    $._ = _;
    $.dom = [].slice.apply(document.querySelectorAll(_));
  }
  return $.fn;
}

(function (slice) {
  var $ = function (_) {
    if (typeof _ == 'function') $.dom.forEach(_)
    else {
      $._ = _;
      $.dom = slice.call(document.querySelectorAll(_));
    }
    return $.fn;
  };

  // ... other code
})([].slice);

var $ = (function () {
  var slice = [].slice;

  function $(_) {
    if (typeof _ == 'function') $.dom.forEach(_)
    else
      $.dom = slice.call(document.querySelectorAll($._ = _));
    return $.fn;
  }

  // ... other code
  return $;
})();

var $ = (function () {
  var slice = [].slice, k;

  function $(_) {
    function fn(_) { return arguments.callee.dom.forEach(_), arguments.callee; }
    fn.dom = slice.call(document.querySelectorAll(fn.selector = _));
    for (k in $.fn) fn[k] = $.fn[k];
    return fn;
  }

  // ... other code
  return $;
})();



var $ = (function () {
  var slice = [].slice;

  function $(_) {
    function fn(_) { return arguments.callee.dom.forEach(_), arguments.callee; }
    fn.dom = _ instanceof Element ? [_] : slice.call(d.querySelectorAll(fn.selector = _));
    for (k in $.fn) fn[k] = $.fn[k];
    return fn;
  }

  // ... other code
  return $;
})(document);


//make sure k is declared, so it is not set in window
var $ = (function (d) {
  var slice = [].slice, k;

  function $(_) {
    function fn(_) { return arguments.callee.dom.forEach(_), arguments.callee; }
    fn.dom = _ instanceof Element ? [_] : slice.call(d.querySelectorAll(fn.selector = _));
    for (k in $.fn) fn[k] = $.fn[k];
    return fn;
  }

  // ... other code
  return $;
})(document);

var $ = (function (d) {
  var slice = [].slice, k;

  function $(_) {
    function fn(_) { return fn.dom.forEach(_), fn }
    fn.dom = _ instanceof Element ? [_] : slice.call(d.querySelectorAll(fn.selector = _));
    for (k in $.fn) fn[k] = $.fn[k];
    return fn;
  }

  // ... other code
  return $;
})(document);

//Add context to $
var $ = (function (d) {
  var slice = [].slice, k;

  function $(_, context) {
    if (context !== void 0) return $(context).find(_);
    function fn(_) { return fn.dom.forEach(_), fn }
    fn.dom = (typeof _ == 'function' && 'dom' in _) ? _.dom : (_ instanceof Array ? _ : (_ instanceof Element ? [_] : slice.call(d.querySelectorAll(fn.selector = _))));
    for (k in $.fn) fn[k] = $.fn[k];
    return fn;
  }

  // ... other code
  return $;
})(document);

var Zepto = (function () {
  var slice = [].slice, d = document;

  function $(_, context) {
    if (context !== void 0) return $(context).find(_);
    function fn(_) { return fn.dom.forEach(_), fn }
    fn.dom = compact((typeof _ == 'function' && 'dom' in _) ?
      _.dom : (_ instanceof Array ? _ :
        (_ instanceof Element ? [_] :
          $$(d, fn.selector = _))));
    $.extend(fn, $.fn);
    return fn;
  }


  return $;
})();

'$' in window || (window.$ = Zepto);
