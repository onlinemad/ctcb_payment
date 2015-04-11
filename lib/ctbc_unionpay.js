var _ = require('lodash');
var crypto = require('crypto');
var qs = require('querystring');
var iconv = require('iconv-lite');
iconv.extendNodeEncodings();

var iv = new Buffer('hywebpg5');

function unionpay(config, payload) {
  if(typeof config === undefined) throw new Error();
  this.config = config;
  this.payload = {
    lidm: '',
    purchAmt: '',
    xid: '',
    respCode: '',
    respMsg: '',
    respTime: '',
    requestTime: '',
    orderStatus: '',
    traceNumber: '',
    traceTime: '',
    qid: '',
    settleAmount: '',
    settleCurrency: '',
    settleDate: '',
    exchangeRate: '',
    exchangeDate: '',
    reserved: ''
  };
  if(typeof payload !== undefined) {
    _.merge(this.payload, payload);
  }
}

unionpay.prototype.combine_str = function() {
  var data= '';
  data += 'merId=' + this.config.merId + '&';
  for(var p in this.payload){
    data += p + '=' + this.payload[p] + '&';
  }
  return data;
};

unionpay.prototype.InMac = function() {
  var cipher = crypto.createCipheriv("des3", this.config.Key, iv);
  var buffer = new Buffer(cipher.update(this.combine_str(), 'utf8', 'hex') + cipher.final('hex'), 'hex');
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
};

// unionpay.prototype.UrlEnc = function() {
//   var data = '';
//   data += 'MerchantID=' + this.config.MerchantID + '&';
//   data += 'TerminalID=' + this.config.TerminalID + '&';
//   data += 'MerchantName=' + this.config.MerchantName + '&';
//   data += 'AuthResURL=' + this.config.AuthResURL + '&';
//   for(var p in this.payload){
//     data += p + '=' + this.payload[p] + '&';
//   }
//   data += 'InMac=' + this.InMac();
//   var cipher = crypto.createCipheriv("des3", this.config.Key, iv);
//   var str = cipher.update(iconv.encode(data, 'big5'), 'utf8', 'hex') + cipher.final('hex');
//   return str.toUpperCase();
// };
//
// unionpay.prototype.UrlResEnc = function(msg) {
//   var cipher = crypto.createDecipheriv("des3", this.config.Key, iv);
//   var obj = cipher.update(msg, 'hex', 'big5') + cipher.final('big5');
//   return qs.parse(obj);
// };

module.exports = unionpay;
