const myencoder = require('./index.umd');

function shuffle(total, size) {
  let result = [];
  for (let i = 0; i < size; i++) {
    const randomIndex = Math.floor(Math.random() * total);
    result.push(randomIndex);
  }
  return result;
}

var teststrs = [];

for (var i = 0; i < 0x80; i++) {
  pushRepeat(teststrs, String.fromCharCode(i), 20);
}

function pushRepeat(arr, element, count) {
  while (count > 0) {
    arr.push(element);
    count--;
  }
}

for (var i = 0x80; i < 100 * 1000; i++) {
  pushRepeat(teststrs, String.fromCodePoint(i), 10);
}

function test() {
  let i = 0;
  let errcout = 0;
  while (i < 1000 * 100) {
    var indexarrs = shuffle(teststrs.length, 2);
    let strs = indexarrs.map((idx) => teststrs[idx]).join('');
    try {
      // 
      if (/([\uD800-\uDBFF])[^\uDC00-\uDFFF]|^([\uDC00-\uDFFF])|([\uD800-\uDBFF])$|[^\uD800-\uDBFF]([\uDC00-\uDFFF])/.test(strs)) {
        continue;
      }
      if (myencoder.encodeURI(strs) !== encodeURI(strs)) {
        console.log('exception:', strs, myencoder.encodeURI(strs), '   ', encodeURI(strs));
        errcout++;
        continue;
      }
      if (myencoder.encodeURIComponent(strs) !== encodeURIComponent(strs)) {
        console.log('exception:', strs, myencoder.encodeURIComponent(strs), '   ', encodeURIComponent(strs));
        errcout++;
      }
    } catch (err) {
      console.log(strs);
      console.log(err);
      break;
    }
    i++;
  }
  console.log('error count:' + errcout);
}

test();

// %ED%A2%8E%ED%B2
// %F0%B3%A2
// %EA%AD%83%E4%A3%B2%E5%8C%A8%E4%80%92%E0%B8%85%E2%A5%BA%E7%A5%9D%E0%9F%BF%EE%88%95%E4%A8%9D
// %EA%AD%83%E4%A3%B2%E5%8C%A8%E4%80%92%E0%B8%85%E2%A5%BA%E7%A5%9D%DF%BF%EE%88%95%E4%A8%9D

// %E1%B6%BE%D%EF%95%9D%E2%81%80%EA%B4%B7%EA%96%B2%E9%98%AF%E2%87%92%E2%8F%9E%E5%A4%A7
// %E1%B6%BE%0D%EF%95%9D%E2%81%80%EA%B4%B7%EA%96%B2%E9%98%AF%E2%87%92%E2%8F%9E%E5%A4%A7

// %E2%AC%91%E4%9D%92%E7%B3%B0%ED%96%9E%F%EA%AD%90%E7%9C%87%E8%B0%A9%E3%AC%83%E8%8B%BE
// %E2%AC%91%E4%9D%92%E7%B3%B0%ED%96%9E%0F%EA%AD%90%E7%9C%87%E8%B0%A9%E3%AC%83%E8%8B%BE
