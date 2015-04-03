var _ = require('lodash');

function Payload(payload) {
  this.MerchantID = '';
  this.TerminalID = '';
  this.lidm = '';
  this.purchAmt = '';
  this.txType = '';
  this.MerchantName = '';
  this.AuthResURL = '';
  this.OrderDetail = '';
  this.ProdCode = '';
  this.AutoCap = '';
  this.customize = '';
  this.NumberOfPay = '1';
  if(typeof payload !== undefined) {
    _.merge(this, payload);
  }
}

Payload.prototype.mac_combine_str = function() {
  return '|' + this.MerchantID + '|' + this.TerminalID + '|' + this.lidm + '|' + this.purchAmt + '|' + this.txType + '|' + this.Option + '|';
};

module.exports = Payload;
