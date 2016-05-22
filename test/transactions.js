
var transactions = require('../lib/transactions');
var utils = require('../lib/utils');

exports['create transfer'] = function (test) {
    var from = utils.hash();
    var to = utils.hash();
    var value = 1000;
    
    var tx = transactions.transfer(from, to, value);
    
    test.ok(tx);
    test.equal(tx.from, from);
    test.equal(tx.to, to);
    test.equal(tx.value, value);
}

exports['create transfer with id'] = function (test) {
    var from = utils.hash();
    var to = utils.hash();
    var value = 1000;
    
    var tx = transactions.transfer(from, to, value);
    
    test.ok(tx);
    test.ok(tx.id);
    test.ok(utils.isHexadecimal(tx.id));
}

