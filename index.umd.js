(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.myurlencoder = factory());
  })(this, (function () { 'use strict';function unicode2Utf8(code) {
  let ph = 0x80; // 1000 0000
  let ps = 0x3f; // 0011 1111
  let b2 = 0xc0; // 1100 0000
  let b3 = 0xe0; // 11100000
  let b4 = 0xf0; // 1111 0000

  //   console.log(Number(code).toString(2));

  let ret = [];
  if (code < 0x80) {
    ret.push(code);
  } else if (code <= 0x07ff) {
    let right1 = code & ps; // 6位
    let right2 = code >> 6;
    ret.push(right2 | b2);
    ret.push(right1 | ph);
  } else if (code <= 0xffff) {
    let right1 = code & ps; // 6位
    let right2 = (code >> 6) & ps; // 6位
    let right3 = code >> 12;

    ret.push(right3 | b3);
    ret.push(right2 | ph);
    ret.push(right1 | ph);
  } else {
    let right1 = code & ps; // 6位
    let right2 = (code >> 6) & ps; // 6位
    let right3 = (code >> 12) & ps; // 6位
    let right4 = code >> 18;
    ret.push(right4 | b4);
    ret.push(right3 | ph);
    ret.push(right2 | ph);
    ret.push(right1 | ph);
  }
  return ret;
}
// https://www.ietf.org/rfc/rfc2396.txt

function toHex(num) {
  return Number(num).toString(16).toUpperCase().padStart(2, '0');
}

function __encodeUtf8(str, keepcharFn) {
  let ret = '';
  let charList = Array.from(str);

  // https://zh.wikipedia.org/zh-hans/UTF-16
  charList.forEach((char) => {
    if (char.length === 1) {
      // BMP chars // ucs-2 code equals unicode code
      let code = char.charCodeAt(0);
      let utf8buf = unicode2Utf8(code);
      if (code < 0x80) {
        // ascii
        if (keepcharFn(char)) {
          ret += char;
        } else {
          ret += '%' + toHex(utf8buf[0]);
        }
      } else {
        ret += '%' + utf8buf.map((temp) => toHex(temp)).join('%');
      }
    } else {
      // 辅助平面   utf-16 code calc unicode code
      let unicode = ((char.charCodeAt(0) & 0x03ff) << 10) + (char.charCodeAt(1) & 0x03ff) + 0x10000;
      let utf8buf = unicode2Utf8(unicode);
      ret += '%' + utf8buf.map((temp) => toHex(temp)).join('%');
    }
  });
  return ret;
}

function __encodeURI(str) {
  return __encodeUtf8(str, (char) => {
    return /[A-Za-z0-9-_.!~*'()]/.test(char) || /[;/?:@&=+$,#]/.test(char);
  });
}

function __encodeURIComponent(str) {
  return __encodeUtf8(str, (char) => {
    return /[A-Za-z0-9-_.!~*'()]/.test(char);
  });
}

return  {
  encodeURI: __encodeURI,
  encodeURIComponent: __encodeURIComponent
};
}));