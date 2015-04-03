var expect = require('chai').expect;
var Payload = require('../lib/payload');
describe('Payload', function() {
  var payload_example = {
    MerchantID: '8220276805409',
    TerminalID: '90000369',
    lidm: '811200076',
    purchAmt: '1990',
    txType: '0',
    Option: '1',
    Key: '123456789012345678901234',
    MerchantName: '中國信託測試',
    AuthResURL: 'http://www.chinatrust.com.tw',
    OrderDetail: '測試訂單',
    AutoCap: '1',
    customize: '',
    debug: '0'
  }

  describe('#constructor()', function() {
    it('should new a payload object with default properties.', function(done) {
      var payload = new Payload();
      var properties = ['MerchantID', 'TerminalID', 'lidm', 'purchAmt', 'txType', 'MerchantName', 'AuthResURL', 'OrderDetail', 'ProdCode', 'AutoCap', 'customize', 'NumberOfPay']
      properties.map(function(property) {
        expect(payload.hasOwnProperty(property)).to.be.true;
      });
      done();
    });
  });
  describe('#constructor(payload)', function() {
    it('should new a payload object with passed payload object.', function(done) {
      var payload = new Payload(payload_example);
      for(var property in payload_example){
        expect(payload[property]).to.equal(payload_example[property]);
      }
      done();
    });
  });
  describe('#mac_combine_str()', function() {
    it('should get a combined string for hashing mac.', function(done) {
      var combine_str_example = '|8220276805409|90000369|811200076|1990|0|1|';
      var payload = new Payload(payload_example);
      expect(payload.mac_combine_str()).to.equal(combine_str_example);
      done();
    });
  });
});
