
var accounts = require('../lib/accounts');
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

exports['create account with address'] = function (test) {
    var account = accounts.account();
    
    test.ok(account);
    test.ok(account.address);
    test.equal(account.address.length, 42);
    test.ok(utils.isHexadecimal(account.address));
};

