var crypto = require('crypto');
var qs = require('querystring');
var iconv = require('iconv-lite');
var _ = require('lodash');

var iv = new Buffer('hywebpg5');
var min_requirements = ['MerchantID', 'TerminalID', 'lidm', 'purchAmt', 'txType', 'InMac', 'MerchantName', 'AuthResURL', 'OrderDetail', 'ProdCode', 'AutoCap', 'customize', 'NumberOfPay']

var inMac = function(payload) {
  var combine_str = payload.mac_combine_str();
  var cipher = crypto.createCipheriv("des3", payload.Key, iv);
  var buffer = new Buffer(cipher.update(combine_str, 'utf8', 'hex') + cipher.final('hex'), 'hex');
  var str = '';
  for (var i = buffer.length - 24; i < buffer.length; i++) {
    var s = buffer[i].toString('16');
    if (s.length === 1) {
      str += 0 + s;
    } else {
      str += s;
    }
  }
  return str.toUpperCase();
}

exports.InMac = inMac;

exports.UrlEnc = function(payload) {
  var data = '';
  for(var property in payload){
    if(typeof payload[property] === 'string' &&
              property !== 'debug' &&
              property !== 'Key') {
      data += property + '=' + payload[property] + '&';
    }
  }
  data += 'InMac=' + inMac(payload);
  var cipher = crypto.createCipheriv("des3", payload.Key, iv);
  var str = cipher.update(iconv.encode(data, 'Big5'), 'utf8', 'hex') + cipher.final('hex');
  return str.toUpperCase();
}
