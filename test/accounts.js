
var accounts = require('../lib/accounts');
var utils = require('../lib/utils');

exports['create account with address'] = function (test) {
    var account = accounts.account();
    
    test.ok(account);
    test.ok(account.address);
    test.equal(account.address.length, 40);
    test.ok(utils.isHexadecimal(account.address));
};

