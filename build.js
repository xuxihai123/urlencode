const fs = require('fs');
const sourceCode = fs.readFileSync('./index.js','utf8');

var output = `(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
    typeof define === 'function' && define.amd ? define(factory) :
    (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.myurlencoder = factory());
  })(this, (function () { 'use strict';`;

fs.writeFileSync('./index.umd.js', output + sourceCode.replace(/module.exports\s*=/, 'return ') + '}));');

console.log('build complete.');
