const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain;charset=UTF-8'});
    // from 的值	含义
    // message	好友消息中的文字链接
    // singlemessage	转发给单个好友的图文消息
    // groupmessage	转发给微信群的图文消息
    // timeline	转发到朋友圈的图文消息
    let arg = url.parse(req.url, true).query;
    let {from} = arg;
    let agent = 'Web';
    switch (from) {
        case 'timeline':
            agent = '朋友圈';
            break;
        case 'singlemessage':
            agent = '单个好友';
        case 'groupmessage':
            agent = '微信群';
        default:
            
            break;
    }
    res.end('来源：' + agent);
});

server.listen(1337)