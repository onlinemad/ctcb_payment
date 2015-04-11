var expect = require('chai').expect;
var CTBC = require('../lib/ctbc');
describe('CTBC.creditcard', function() {
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
      var ctbc = new CTBC.creditcard(sample_config);
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
      var ctbc = new CTBC.creditcard(sample_config, sample_payload);
      for (var property in sample_payload) {
        expect(ctbc.payload[property]).to.equal(sample_payload[property]);
      }
      done();
    });
  });
  describe('#combine_str()', function() {
    it('should get a combined string for hashing mac.', function(done) {
      var combine_str = '|8220276805409|90000369|811200076|1990|0|1|';
      var ctbc = new CTBC.creditcard(sample_config, sample_payload);
      expect(ctbc.combine_str()).to.equal(combine_str);
      done();
    });
  });
  describe('#InMac()', function() {
    it('should get hash value.', function(done) {
      var hash_example = '2F2EECA6E5D8CEC63C4E17169CB505D82063A38441AB8A98';
      var ctbc = new CTBC.creditcard(sample_config, sample_payload);
      expect(ctbc.InMac()).to.equal(hash_example);
      done();
    });
  });
  describe('#UrlEnc(payload)', function() {
    it('should get url enc value.', function(done) {
      var enc_example = '3EE9D399732500AB9E4E054D9E4A1BF0982A0F19AFD9D13E2A42C02C3B36F79A929A01030517C61D5F857831A03223C494D313A525CAB4944C246F63742D292CAF8FF1D8C87BB074AF79CC3A1BBF69935A9ADB65BB8CB17E85E9D4D506D91A01C0139DCD9F012723BEAD76FB23920AAF36CEFF7A67FC17CDBEFE27EB7947004D6B282D9032843999B0E94079EBB9B475DCF2BA6D58BC068D32F194C6F8A6B3F4B740D1C186AD2C5F4D3627DEF856713315C7BA5B70B7BF6D91F521EA010BC676A73BDD6245663D2FCF7E532429DD507775422A66440BB223ADD977E8B85A5B25632AA4FC17A0920D7F2546B44D080A70259DCC680D8E3A54F461658DEBD9D108E192C7BDC82F882205A5E7EE4BEEA1DD';
      var ctbc = new CTBC.creditcard(sample_config, sample_payload);
      expect(ctbc.UrlEnc()).to.deep.equal(enc_example);
      done();
    });
  });
  describe('#UrlResEnc()', function() {
    it('should get url enc value.', function(done) {
      var ctbc = new CTBC.creditcard(sample_config, sample_payload);
      var encoded_msg = '344F5B074BCB12E82FAEFE535B5FCC445F6C43DB180928531A34811B829C809D5AD3485F50C22DC3148B51321C7D528B90C979B2A2CB4D4B079E3C786202161DB859CE6A3CD62A7C87317C5F5219AE6851C0C01AFC97C6502B6CBE435FFBF85A87FF85DACAFD4B7483ED777DA8F703E624E5FA24A2D11309C118D7AA1BD3A7E2F815A669B374598F05AB6D50C97D841C6AB885527D28866C7364541924EB0645784CB887679794F4412AC0EB6BB80E19554B133813AB2A7C0770D8416C5BACA292E98D7FBEEABA8C7612F8BAF56DB33B5BD2C4B7BE1ECC3003F18FAD011D0C91079DAD8330227C6C0A44A9C15EE1C73A291734FA22928B3FC87AF1DF6FB467F2659173EB74AF050A';
      expect(ctbc.UrlResEnc(encoded_msg)).to.deep.equal({
        status: '0',
        errcode: '00',
        errDesc: 'null',
        OutMac: '7E452704356452A69DAA476E1039F3FFD2290EC364678F56',
        merID: '3',
        authAmt: '78',
        lidm: '123',
        xid: '9F47A94800303404284_123',
        authCode: '029710',
        Last4digitPAN: '3232',
        AuthResURL: 'https://testepos.chinatrust.com.tw:5443/ctcb/newmac/ShowResParameter.jsp'
      });
      done();
    });
  });
});
