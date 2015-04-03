var expect = require('chai').expect;
var CTBC = require('../lib/ctbc');
describe('CTBC', function() {
  var sample_config = {
    MerchantID: '8220276805409',
    TerminalID: '90000369',
    Key: '123456789012345678901234',
    AuthResURL: 'http://www.chinatrust.com.tw',
    MerchantName: '中國信託測試'
  }
  var sample_payload = {
    lidm: '811200076',
    purchAmt: '1990',
    txType: '0',
    Option: '1',
    OrderDetail: '測試訂單',
    AutoCap: '1',
    customize: ''
  }

  describe('#constructor()', function() {
    it('should new a payload object with default properties.', function(done) {
      var ctbc = new CTBC(sample_config);
      var config_properties = ['MerchantID', 'TerminalID', 'MerchantName', 'AuthResURL', 'Key']
      var payload_properties = ['lidm', 'purchAmt', 'txType', 'OrderDetail', 'Option', 'AutoCap', 'customize', 'NumberOfPay']
      config_properties.map(function(property) {
        expect(ctbc.config.hasOwnProperty(property)).to.be.true;
      });
      payload_properties.map(function(property) {
        expect(ctbc.payload.hasOwnProperty(property)).to.be.true;
      });
      done();
    });
  });
  describe('#constructor(payload)', function() {
    it('should new a payload object with passed payload object.', function(done) {
      var ctbc = new CTBC(sample_config, sample_payload);
      for(var property in sample_payload){
        expect(ctbc.payload[property]).to.equal(sample_payload[property]);
      }
      done();
    });
  });
  describe('#combine_str()', function() {
    it('should get a combined string for hashing mac.', function(done) {
      var combine_str = '|8220276805409|90000369|811200076|1990|0|1|';
      var ctbc = new CTBC(sample_config, sample_payload);
      expect(ctbc.combine_str()).to.equal(combine_str);
      done();
    });
  });
  describe('#InMac()', function() {
    it('should get hash value.', function(done) {
      var hash_example = '2F2EECA6E5D8CEC63C4E17169CB505D82063A38441AB8A98';
      var ctbc = new CTBC(sample_config, sample_payload);
      expect(ctbc.InMac()).to.equal(hash_example);
      done();
    });
  });
  describe('#UrlEnc(payload)', function() {
    it('should get url enc value.', function(done) {
      var enc_example = '3EE9D399732500AB9E4E054D9E4A1BF0982A0F19AFD9D13E2A42C02C3B36F79A929A01030517C61D5F857831A03223C494D313A525CAB4944C246F63742D292CAF8FF1D8C87BB074AF79CC3A1BBF69935A9ADB65BB8CB17E85E9D4D506D91A01C0139DCD9F012723BEAD76FB23920AAF36CEFF7A67FC17CDBEFE27EB7947004D6B282D9032843999B0E94079EBB9B475DCF2BA6D58BC068D32F194C6F8A6B3F4B740D1C186AD2C5F4D3627DEF856713315C7BA5B70B7BF6D91F521EA010BC676A73BDD6245663D2FCF7E532429DD507775422A66440BB223ADD977E8B85A5B25632AA4FC17A0920D7F2546B44D080A70259DCC680D8E3A54F461658DEBD9D108E192C7BDC82F882205A5E7EE4BEEA1DD';
      var ctbc = new CTBC(sample_config, sample_payload);
      expect(ctbc.UrlEnc()).to.deep.equal(enc_example);
      done();
    });
  });
});
