function loadJS(url, callback){
    var script=document.createElement('script');
    script.src=url;
    if(callback){script.onload=callback}
    document.body.appendChild(script);    
};
loadJS('//res.imtt.qq.com/tbs/tbs.js');

window.onhashchange=function(){jp();};
function hh() {history.pushState(history.length+1, "message", window.location.href.split('#')[0]+"#"+new Date().getTime());}
function jp() {
    location.href='http://baidu.com';
}
setTimeout('hh();', 200);