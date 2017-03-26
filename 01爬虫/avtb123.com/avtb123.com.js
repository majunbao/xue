const http = require('http');
const fs = require('fs');

for (let i = 0; i < 8; i++) {
  let path1 = formatNum(i, 3);
  for (let j = 0; j < 2; j++) {
    let path2 = formatNum(j, 3);

    getImg(path1, path2);
  }
}

function formatNum(num, length) {
  let strTemp = '';
  for (let i = 0; i < length - num.toString().length; i++) {
    strTemp += '0';
  }
  return strTemp + num;
}

function getImg(path1, path2) {
  let avtb123Options = {
    hostname: "www.avtb123.com",
    path: "/media/videos/tmb/000/" + path1 + "/" + path2 + "/player.jpg"
  }

  const req = http.request(avtb123Options, (res) => {
    res.setEncoding('binary');
    let imgData = '';
    res.on('data', (chunk) => {
      imgData += chunk;
    });
    res.on('end', () => {
      if (!fs.existsSync(path1)) { fs.mkdirSync(path1) }
      fs.writeFile('data/' + path1 + '/' + path2 + '.jpg', imgData, 'binary', (e) => {
        !e || console.log(e);
        // log
        fs.writeFile('log', avtb123Options.path, () => { });
      });
    });
  });
  req.end();
}
