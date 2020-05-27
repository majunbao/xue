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
  var _XYul = document.getElementById('xy');
  var _KBul = document.getElementById('kb');
  var _Forceul = document.getElementById('force');
  var _Lineul = document.getElementById('line');
  var canvas = document.getElementById('canvas');
  var ctx=canvas.getContext("2d");

  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;

  

  // 按下
  var onTouchStart = function(e){
    console.log(e.target)
    var x = e.touches[0].pageX;
    var y = e.touches[0].pageY;
    document.addEventListener('touchmove', onTouchMove, false);

    
    // _clearXY();
    // _clearKB();
    

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
    _renderForce(e);

    ctx.lineTo(x, y);
    ctx.stroke();

    console.log(e.touches[0].force)
  }
  // 抬起
  var onTouchEnd = function(e){
    document.removeEventListener('touchmove', onTouchMove);

    // _renderLine(checkIsLine(xys.slice(1, xys.length/2)))

    clearRecordXYs();
    clearRecordKBs();
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

  function _renderForce(e) {
    var touche = e.touches[0];
    var li = document.createElement('li');
    li.innerText = ' force: ' + touche.force + 
                   ' rotationAngle: ' +  touche.rotationAngle + '\n' + 
                   ' radiusX: ' +  touche.radiusX + '\n' + 
                   ' radiusY: ' +  touche.radiusY + '\n'
                   ;
    // li.innerText = xys.length + ' x: ' + x + ' y: ' +  y + '\n';

    _Forceul.insertBefore(li, _Forceul.firstChild);
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

  function _renderLine(isLine) {
    var li = document.createElement('li');
    li.innerText = isLine + '\n';

    _Lineul.insertBefore(li, _Lineul.firstChild);
  }

  function _clearKB() {
    i = 0;
    _KBul.innerText = '';
  }

  function atan(x, y) {
    return Math.atan(y / x) * 180 / Math.PI;
  }

  //检测是不是直线
  function checkIsLine(pointArray) {
    if (pointArray === null || pointArray === undefined || pointArray.length < 3) {
        return false;
    }
    // console.log(pointArray);
    var startX = pointArray[0].x;
    var startY = pointArray[0].y;

    var endX = pointArray[pointArray.length - 1].x;
    var endY = pointArray[pointArray.length - 1].y;

    var tan = atan(endX - startX, endY - startY);
    // console.log("tan" + tan);
    for (let i in pointArray) {
        //这里相隔4个点比较一次
        let skip = 4;
        if (i > skip) {
            var tantemp = atan(pointArray[i].x  - pointArray[i - skip].x,
                pointArray[i].y - pointArray[i - skip].y);
            // console.log("tantemp" + tantemp);
            if (Math.abs(tantemp - tan) > 2) {//允许误差在2度
                return false;
            }
        }
    }
    return true;
  }

  var robot = new touchRobot(document.body);
  setTimeout(function(){
    robot.touchLeft();
  },1)

  // setTimeout(function(){
  //   robot.touchRight();
  // },1000)

  // setTimeout(function(){
  //   robot.touchBottom();
  // },2000)

  // setTimeout(function(){
  //   robot.touchTop();
  // },3000)
})
