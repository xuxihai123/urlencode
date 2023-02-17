const myencoder = require('./index.umd')

function shuffle(total, size) {
  let result = [];
  for (let i = 0; i < size; i++) {
    const randomIndex = Math.floor(Math.random() * total);
    result.push(randomIndex);
  }
  return result;
}

var zhch = require('./temp/ch').zhch;

zhch += ";/?:@&=+$,#-_.!~*'() ;/?:@&=+$,#-_.!~*'() ;/?:@&=+$,#-_.!~*'() ;/?:@&=+$,#-_.!~*'() A-Za-z0-9-_.!~*'() ;/?:@&=+$,#";

function test() {
  let i = 0;
  let errcout = 0;
  while (i < 1000 * 10) {
    var indexarrs = shuffle(zhch.length, 10);
    let strs = indexarrs.map((idx) => zhch[idx]).join('');
    if (myencoder.encodeURI(strs) !== encodeURI(strs)) {
      console.log('exception:', strs, myencoder.encodeURI(strs), '   ', encodeURI(strs));
      errcout++;
      continue;
    }
    if (myencoder.encodeURIComponent(strs) !== encodeURIComponent(strs)) {
      console.log('exception:', strs, myencoder.encodeURIComponent(strs), '   ', encodeURIComponent(strs));
      errcout++;
    }
    i++;
  }
  console.log('error count:' + errcout);
}

test();
