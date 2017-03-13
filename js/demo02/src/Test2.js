function recurFib(n) {
  if(n<2) {
    return n;
  }else {
    return recurFib(n-1) + recurFib(n-2);
  }
}

function dyFib(n) {
  var val = [];
  if(n === 1 || n === 2) {
    return 1;
  }else {
    val[0] = 0;
    val[1] = 1;
    val[2] = 1;
    for(var i = 3;i<=n;i++){
      val[i] = val[i-1] + val[i-2];
    }
    return val[n];
  }
}

var num = 0;

var start = new Date().getTime();
document.write(recurFib(num));
var end = new Date().getTime();
console.log("递归:" + (end - start)+ 'ms');

document.write('<br />');

var start = new Date().getTime();
document.write(recurFib(num));
var end = new Date().getTime();
console.log("动态:" + (end - start)+ 'ms');