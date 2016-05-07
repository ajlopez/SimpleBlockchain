
var utils = require('../lib/utils');

function isHexadecimal(text) {
    for (var k = 0; k < text.length; k++) {
        var ch = text[k];
        if (ch >= '0' && ch <='9')
            continue;
        if (ch >= 'a' && ch <= 'f')
            continue;
            
        return false;
    }
    
    return true;
}

exports['generate hash'] = function (test) {
    var hash = utils.hash();
    
    test.ok(hash);
    test.equal(typeof hash, 'string');
    test.equal(hash.substring(0, 2), '0x');
    test.equal(hash.length, 66);
    test.ok(isHexadecimal(hash.substring(2)));
    test
};

exports['generate address'] = function (test) {
    var hash = utils.address();
    
    test.ok(hash);
    test.equal(typeof hash, 'string');
    test.equal(hash.substring(0, 2), '0x');
    test.equal(hash.length, 42);
    test.ok(isHexadecimal(hash.substring(2)));
    test
};

