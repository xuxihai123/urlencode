(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.myurlencoder = factory());
  })(this, (function () { 'use strict';function unicode2Utf8(code) {
  let ret;
  let ph = 0x80; // 1000 0000
  let ps = 0x3f; // 0011 1111
  let b2 = 0xc0; // 1100 0000
  let b3 = 0xe0; // 11100000
  let b4 = 0xf0; // 1111 0000

  //   console.log(Number(code).toString(2));

  if (code < 0x80) {
    ret = code;
  } else if (code < 0x07ff) {
    let right1 = code & ps; // 6位
    let right2 = code >> 6;
    ret = (right1 | ph) + ((right2 | b2) << 8);
  } else if (code < 0xffff) {
    let right1 = code & ps; // 6位
    let right2 = (code >> 6) & ps; // 6位
    let right3 = code >> 12;
    ret = (right1 | ph) + ((right2 | ph) << 8) + ((right3 | b3) << 16);
  } else {
    let right1 = code & ps; // 6位
    let right2 = (code >> 6) & ps; // 6位
    let right3 = (code >> 12) & ps; // 6位
    let right4 = code >> 18;
    ret = (right1 | ph) + ((right2 | ph) << 8) + ((right3 | ph) << 16) + ((right4 | b4) << 24);
  }
  return ret;
}
// https://www.ietf.org/rfc/rfc2396.txt

function __encodeURI(str) {
  let code;
  let ret = '';
  for (var i = 0; i < str.length; i++) {
    code = str.charCodeAt(i);
    let utf8hex = Number(unicode2Utf8(code)).toString(16).toUpperCase();
    if (code < 0x80) {
      if (/[A-Za-z0-9-_.!~*'()]/.test(str[i])) {
        ret += str[i];
      } else if (/[;/?:@&=+$,#]/.test(str[i])) {
        ret += str[i];
      } else {
        ret += '%' + utf8hex;
      }
    } else if (code < 0x07ff) {
      ret += '%' + utf8hex.slice(0, 2) + '%' + utf8hex.slice(2);
    } else if (code < 0xffff) {
      ret += '%' + utf8hex.slice(0, 2) + '%' + utf8hex.slice(2, 4) + '%' + utf8hex.slice(4);
    } else {
      ret += '%' + utf8hex.slice(0, 2) + '%' + utf8hex.slice(2, 4) + '%' + utf8hex.slice(4, 6) + '%' + utf8hex.slice(6, 8);
    }
  }
  return ret;
}

function __encodeURIComponent(str) {
  let code;
  let ret = '';
  for (var i = 0; i < str.length; i++) {
    code = str.charCodeAt(i);
    let utf8hex = Number(unicode2Utf8(code)).toString(16).toUpperCase();
    if (code < 0x80) {
      if (/[A-Za-z0-9-_.!~*'()]/.test(str[i])) {
        ret += str[i];
      } else {
        ret += '%' + utf8hex;
      }
    } else if (code < 0x07ff) {
      ret += '%' + utf8hex.slice(0, 2) + '%' + utf8hex.slice(2);
    } else if (code < 0xffff) {
      ret += '%' + utf8hex.slice(0, 2) + '%' + utf8hex.slice(2, 4) + '%' + utf8hex.slice(4);
    } else {
      ret += '%' + utf8hex.slice(0, 2) + '%' + utf8hex.slice(2, 4) + '%' + utf8hex.slice(4, 6) + '%' + utf8hex.slice(6, 8);
    }
  }
  return ret;
}

return  {
  encodeURI: __encodeURI,
  encodeURIComponent: __encodeURIComponent
};
}));