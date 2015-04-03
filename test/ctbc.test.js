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
      var payload_properties = ['lidm', 'purchAmt', 'txType', 'OrderDetail', 'Option', 'AutoCap', 'customize']
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
      var enc_example = '3EE9D399732500AB069FB0A3135DCC6BAA804FCF6398FE8CD696315C2504403C2C8BE58A2086FF6AC45A626F6AE12EEE11BAD38F6FA77F264DAED2746BC692C645A4CAFDE4A10AD36ED9DE683B4A0FBDCD623CC4AD053FD637165AC6AAFC6FB00147CACCF58BA995989DEC639F2C78765733C658F35A6604BE871F2BF13FBAD6AA9BD850326A7784AE881CF980A5DA8EF166A60E9F3316C08B28EEA97A6931A967748755C520064D109FAE34C6E4075EAACCAD50181943683C004D6817991A44B1A9C28D5BE1940146A255EAE53AC88CEE04214C55EA350AB2FC535884DC7B86BB7435F094E10B95236B29A095EB3825F171C1D78C8748796AF78F449B2AE488';
      var ctbc = new CTBC(sample_config, sample_payload);
      expect(ctbc.UrlEnc()).to.deep.equal(enc_example);
      done();
    });
  });
});
