const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

http.createServer((req, res) => {
  let pathname = url.parse(req.url).pathname;
  res.writeHead(200, { 'Content-Type': 'text/html' });
  router(res, req, pathname);
}).listen(3000, '127.0.0.1');

function router(res, req, pathname) {
  switch (pathname) {
    case '/value':
      console.log('22')
      break;

    default:
      console.log(pathname)
      goIndex(res, req);
      break;
  }
}

function goIndex(res, req) {
  let indexPath = path.join(__dirname, 'index.html');
  let indexContent = fs.readFileSync(indexPath);

  res.end(indexContent)
}

