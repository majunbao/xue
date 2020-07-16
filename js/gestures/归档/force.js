// force
// 手指挤压触摸平面的压力大小. 从0.0(没有压力)到1.0(设备可识别的最大压力)的浮点数.
// rotationAngle
// 以度为单位的旋转角. 由radiusX 和 radiusY 描述的正方向的椭圆，通过顺时针旋转这个角度后，能最精确地覆盖住用户和触摸平面的接触面的角度.
// radiusX
// 能够包围用户和触摸平面的接触面的最小椭圆的水平轴(X轴)半径.
// radiusY
// 能够包围用户和触摸平面的接触面的最小椭圆的垂直轴(Y轴)半径.


document.addEventListener('DOMContentLoaded', function(ev){
  // 按下点的数组
  var xys = [];
  var kbs = [];

  var _Forceul = document.getElementById('force');
  var _Lineul = document.getElementById('line');
  var canvas = document.getElementById('canvas');
  var ctx=canvas.getContext("2d");

  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;

  

  // 按下
  var onTouchStart = function(e){
    var x = e.touches[0].pageX;
    var y = e.touches[0].pageY;
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
    
    
    _renderForce(e);

    ctx.lineTo(x, y);
    ctx.stroke();

  }
  // 抬起
  var onTouchEnd = function(e){
    document.removeEventListener('touchmove', onTouchMove);

    // _renderLine(checkIsLine(xys.slice(1, xys.length/2)))

  }

  // 触发
  document.addEventListener('touchstart', onTouchStart, false);
  // 销毁
  document.addEventListener('touchend', onTouchEnd, false);


  function _renderForce(e) {
    var touche = e.touches[0];
    var li = document.createElement('li');
    li.innerText = ' force: ' + touche.force + 
                   ' rotationAngle: ' +  touche.rotationAngle  + 
                   ' radiusX: ' +  touche.radiusX  + 
                   ' radiusY: ' +  touche.radiusY + '\n\n'
                   ;
    // li.innerText = xys.length + ' x: ' + x + ' y: ' +  y + '\n';

    _Forceul.insertBefore(li, _Forceul.firstChild);
  }


  function _renderLine(isLine) {
    var li = document.createElement('li');
    li.innerText = isLine + '\n';

    _Lineul.insertBefore(li, _Lineul.firstChild);
  }

})
