
var utils = require('../lib/utils');

exports['generate hash'] = function (test) {
    var hash = utils.hash();
    
    test.ok(hash);
    test.equal(typeof hash, 'string');
    test.equal(hash.length, 64);
    test.ok(utils.isHexadecimal(hash));
    test
};

exports['generate address'] = function (test) {
    var hash = utils.address();
    
    test.ok(hash);
    test.equal(typeof hash, 'string');
    test.equal(hash.length, 40);
    test.ok(utils.isHexadecimal(hash));
    test
};

