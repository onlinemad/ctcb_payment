var expect = require('chai').expect;
var Payload = require('../lib/payload');
var url = require('../lib/url');
describe('url', function() {
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

  describe('#InMac(payload)', function() {
    it('should get payload hash value.', function(done) {
      var hash_example = '2F2EECA6E5D8CEC63C4E17169CB505D82063A38441AB8A98';
      var payload = new Payload(payload_example);
      expect(url.InMac(payload)).to.equal(hash_example);
      done();
    });
  });
  describe('#UrlEnc(payload)', function() {
    it('should new a payload object with passed payload object.', function(done) {
      var enc_example = '3EE9D399732500AB9E4E054D9E4A1BF0982A0F19AFD9D13E2A42C02C3B36F79A929A01030517C61D6C42349D3E4783F3F3D87612D936CCF1C765B574406D6B70E707A65B613FC09470DDC5FB5AF552B9AB730BEF997FCE9E1F2B3C877539DCAF2DF0ABE874ECD506A1126621643DC50D8A385483AB38374BD33B2CACCBA06E84DDCD8838FDBB090700C4747BD036E70B1E52DBC04947F1EABB154B58FB7802F6D8F79FA50F59128F1BBA5EE86E406AAFB4A610A3653396F8E25B2E2649947C55025991F573393007F224EF9AEB98661BE50F8D3FB71F92085CE9AB17614E246BCE1BEE469442E455BC9D4B8C01B3687E8215F85D7723ECBAD9E42BBF94238D31B1CC1280840E5E7551EE09F15AE80CAC46CEDAA8FA79C89A';
      var payload = new Payload(payload_example);
      expect(url.UrlEnc(payload)).to.deep.equal(enc_example);
      done();
    });
  });
});
