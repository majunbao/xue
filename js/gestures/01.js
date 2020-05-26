document.addEventListener('DOMContentLoaded', function(ev){
  // 按下点的数组
  var xys = [];
  var kbs = [];
  var _XYul = document.getElementById('xy');
  var _KBul = document.getElementById('kb');
  var canvas = document.getElementById('canvas');
  var ctx=canvas.getContext("2d");

  // 按下
  var onTouchStart = function(e){
    var x = e.touches[0].pageX;
    var y = e.touches[0].pageY;

    clearRecordXYs();
    clearRecordKBs();
    _clearXY();
    _clearKB();
    document.addEventListener('touchmove', onTouchMove, false);

    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineWidth = 4;
    ctx.strokeStyle = "red";
    
  }
  // 移动
  var onTouchMove = function(e){
    var x = e.touches[0].pageX;
    var y = e.touches[0].pageY;
    recordXYs(x, y);
    recordKBs();
    _renderXY(x, y);
    if(kbs.length>0){_renderKB(kbs[0].k, kbs[0].b);}

    ctx.lineTo(x, y);
    ctx.stroke();
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
    var k, b;
    
    if(xys.length>1) {
      var x1 = xys[0].x;
      var y1 = xys[0].y;
      var x2 = xys[1].x;
      var y2 = xys[1].y;

      if(x1 == x2) {
        k = 1;
      } else {
        k = (y2-y1) / (x2-x1);
        // k = parseFloat(k.toFixed(3));
      }

      b = y1 - k * x1;
      // b = parseFloat(b.toFixed(3));

      // if(xys.length > 2) {
      //   var x3 = xys[2].x;
      //   var y3 = xys[2].y;

      //   var py = x3 * k + b;
      //   var value = y3 - py;

      //   if(value >- 0.01 && value < 0.01) {
      //     console.log(true)
      //   }else {
      //     console.log(false)
      //   }
      // }
      
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
    li.innerText = ' x: ' + x + ' y: ' +  y + '\n';
    // li.innerText = xys.length + ' x: ' + x + ' y: ' +  y + '\n';

    _XYul.insertBefore(li, _XYul.firstChild);
  }

  function _clearXY() {
    i = 0;
    _XYul.innerText = '';
  }

  function _renderKB(k, b) {
    var li = document.createElement('li');
    li.innerText = ' k: ' + k + ' b: ' +  b + '\n';
    // li.innerText = kbs.length + ' k: ' + k + ' b: ' +  b + '\n';

    _KBul.insertBefore(li, _KBul.firstChild);
  }

  function _clearKB() {
    i = 0;
    _KBul.innerText = '';
  }

  function _canvas() {}
})
