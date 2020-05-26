document.addEventListener('DOMContentLoaded', function(ev){
  // 按下点的数组
  var xys = [];
  var kbs = [];
  var _XYul = document.getElementById('xy');
  var _KBul = document.getElementById('kb');

  // 按下
  var onTouchStart = function(e){
    clearRecordXYs();
    clearRecordKBs();
    _clearXY();
    _clearKB();
    document.addEventListener('touchmove', onTouchMove, false);
  }
  // 移动
  var onTouchMove = function(e){
    var x = e.touches[0].pageX;
    var y = e.touches[0].pageY;
    recordXYs(x, y);
    recordKBs();
    _renderXY(x, y);
    if(kbs.length>0){_renderKB(kbs[0].k, kbs[0].b);}
    
  }
  // 抬起
  var onTouchEnd = function(e){
    document.removeEventListener('touchmove', onTouchMove);
  }

  // 触发
  document.addEventListener('touchstart', onTouchStart, false);
  // 销毁
  document.addEventListener('touchend', onTouchEnd, false);

  // 求斜率k，带入x1，x2 k=(y2-y1)/(x2-x1)
  function mathKB (xys){
    var k, b, b1, b2;
    
    if(xys.length>1) {
      var x1 = xys[0].x;
      var y1 = xys[0].y;
      var x2 = xys[1].x;
      var y2 = xys[1].y;

      if(x1 == x2) {
        k = 0;
      } else {
        k = (y2-y1) / (x2-x1);
      }

      b1 = y1 - k * x1;
      b2 = y2 - k * x2;
      b = b1 + ',' +  b2;

      return {
        k: k,
        b: b
      };
    }
  }

  // 记录触摸点
  function recordXYs(x, y){
    xys.unshift({
      x: x,
      y: y
    });
  }

  // 清空记录的触摸点
  function clearRecordXYs(){
    xys = [];
  }
  
  // 记录kb
  function recordKBs(x, y){
    var kbObject = {};
    if(xys.length>1) {
      kbObject = mathKB(xys);
    }
    kbs.unshift(kbObject);
  }

  function clearRecordKBs(){
    kbs = [];
  }
  
  function _renderXY(x, y) {
    var li = document.createElement('li');
    li.innerText = xys.length + ' pageX: ' + x + ' pageY: ' +  y + '\n';

    _XYul.insertBefore(li, _XYul.firstChild);
  }

  function _clearXY() {
    i = 0;
    _XYul.innerText = '';
  }

  function _renderKB(k, b) {
    var li = document.createElement('li');
    li.innerText = kbs.length + ' K: ' + k + ' B: ' +  b + '\n';

    _KBul.insertBefore(li, _KBul.firstChild);
  }

  function _clearKB() {
    i = 0;
    _KBul.innerText = '';
  }
})
