// http://www.kedou6.com/contents/videos_screenshots/0/661/preview.mp4.jpg

const http = require('http');
const fs = require('fs');

// for (let i = 0; i < 1; i++) {
//   let path1 = formatNum(i, 1);
//   for (let j = 100; j < 1000; j++) {
//     let path2 = formatNum(j, 3);

//     getImg(path1, path2);
//   }
// }

let i = 0;
let j = 120;
let paths = [];
let num = 5;

function sync(i, num) {
  i++;
  getImg(0, i, num);
}

function formatNum(num, length) {
  let strTemp = '';
  for (let i = 0; i < length - num.toString().length; i++) {
    strTemp += '0';
  }
  return strTemp + num;
}

function getImg(path1, path2, num) {
  paths[num] = path2 + parseInt(100 * num);
  // if (paths[num] == 100 * (num + 1)) {
  //   return;
  // }
  let options = {
    hostname: "www.kedou6.com",
    path: "/contents/videos_screenshots/" + path1 + "/" + paths[num] + "/preview.mp4.jpg",
    timeout: 1200
  }

  const req = http.request(options, (res) => {
    res.setEncoding('binary');
    let imgData = '';
    res.on('data', (chunk) => {
      imgData += chunk;
    });
    res.on('end', () => {
      sync(path2, num);
      if (!fs.existsSync('data')) { fs.mkdirSync('data') }
      // if (!fs.existsSync(path1)) { fs.mkdirSync(path1) }
      fs.writeFile('data/' + path1 + '/' + paths[num] + '.jpg', imgData, 'binary', (e) => {
        !e || console.log(e);
        // log
        fs.writeFile('log', options.path, () => { });
        console.log(options.path);
      });
    });
  });

  req.on('timeout', () => {
    req.abort();
  });
  req.on('error', () => {
    console.log('error');
  });
  req.on('abort', () => {
    sync(paths[num] - num * 100, num);
  })
  req.end();
}


// for (let now = 0; now < 10; now++) {
//   sync(0, now);
// }

sync(13, num);