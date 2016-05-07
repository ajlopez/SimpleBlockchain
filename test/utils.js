
var utils = require('../lib/utils');

exports['generate hash'] = function (test) {
    var hash = utils.hash();
    
    test.ok(hash);
    test.equal(typeof hash, 'string');
    test.equal(hash.substring(0, 2), '0x');
    test.equal(hash.length, 66);
    test
};