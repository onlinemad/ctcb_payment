var expect = require('chai').expect;
var CTBC = require('../lib/ctbc');
describe('CTBC.unionpay', function() {
  var sample_config = {
    merId: '1311',
    Key: 'O698H1WGVSDYLqJFRuwCwxJa'
  }
  var sample_payload = {
    lidm: '20120528123000',
    purchAmt: '100'
  }

  // describe('#constructor()', function() {
  //   it('should new a payload object with default properties.', function(done) {
  //     var ctbc = new CTBC.creditcard(sample_config);
  //     var config_properties = ['MerchantID', 'TerminalID', 'MerchantName', 'AuthResURL', 'Key']
  //     var payload_properties = ['lidm', 'purchAmt', 'txType', 'OrderDetail', 'Option', 'AutoCap', 'customize', 'NumberOfPay']
  //     config_properties.map(function(property) {
  //       expect(ctbc.config.hasOwnProperty(property)).to.be.true;
  //     });
  //     payload_properties.map(function(property) {
  //       expect(ctbc.payload.hasOwnProperty(property)).to.be.true;
  //     });
  //     done();
  //   });
  // });
  // describe('#constructor(payload)', function() {
  //   it('should new a payload object with passed payload object.', function(done) {
  //     var ctbc = new CTBC.creditcard(sample_config, sample_payload);
  //     for (var property in sample_payload) {
  //       expect(ctbc.payload[property]).to.equal(sample_payload[property]);
  //     }
  //     done();
  //   });
  // });
  describe('#combine_str()', function() {
    it('should get a combined string for hashing mac.', function(done) {
      var combine_str = 'merId=1311&lidm=20120528123000&purchAmt=100&xid=&respCode=&respMsg=&respTime=&requestTime=&orderStatus=&traceNumber=&traceTime=&qid=&settleAmount=&settleCurrency=&settleDate=&exchangeRate=&exchangeDate=&reserved=&';
      var ctbc = new CTBC.unionpay(sample_config, sample_payload);
      expect(ctbc.combine_str()).to.equal(combine_str);
      done();
    });
  });
  describe('#InMac()', function() {
    it('should get hash value.', function(done) {
      var hash_example = '1071A8FEFF065EEE101A5F98EB83C0E849259015F64D8665';
      var ctbc = new CTBC.unionpay(sample_config, sample_payload);
      expect(ctbc.InMac()).to.equal(hash_example);
      done();
    });
  });
  describe('#format(attr, value)', function() {
    it('should format status code to string message.', function(done) {
      expect(CTBC.unionpay.format('orderStatus', '13')).to.equal('授權成功');
      expect(CTBC.unionpay.format('orderStatus', '999')).to.equal('999');
      expect(CTBC.unionpay.format('respCode', '00')).to.equal('成功交易');
      done();
    });
  });
});
