
var transactions = require('../lib/transactions');
var utils = require('../lib/utils');
var tries = require('../lib/tries');

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

exports['execute transfer'] = function (test) {
    var from = utils.hash();
    var to = utils.hash();
    var value = 1000;

    var states = tries.states().put(from, { balance: 3000 });

    var tx = transactions.transfer(from, to, value);
    
    test.ok(tx);
    test.equal(tx.from, from);
    test.equal(tx.to, to);
    test.equal(tx.value, value);
    
    var newstates = transactions.execute(tx, states);

    test.ok(newstates);
    
    var oldfromstate = states.get(tx.from);
    
    test.ok(oldfromstate);
    test.equal(oldfromstate.balance, 3000);
    
    var oldtostate = states.get(tx.to);
    
    test.ok(oldtostate);
    test.equal(oldtostate.balance, 0);
    
    var newtostate = newstates.get(tx.to);
    
    test.ok(newtostate);
    test.equal(newtostate.balance, 1000);
    
    var newfromstate = newstates.get(tx.from);
    
    test.ok(newfromstate);
    test.equal(newfromstate.balance, 2000);
}

exports['execute transfer without funds'] = function (test) {
    var from = utils.hash();
    var to = utils.hash();
    var value = 1000;

    var states = tries.states();

    var tx = transactions.transfer(from, to, value);
    
    test.ok(tx);
    test.equal(tx.from, from);
    test.equal(tx.to, to);
    test.equal(tx.value, value);
    
    var newstates = transactions.execute(tx, states);

    test.equal(newstates, null);
    
    var oldfromstate = states.get(tx.from);
    
    test.ok(oldfromstate);
    test.equal(oldfromstate.balance, 0);
    
    var oldtostate = states.get(tx.to);
    
    test.ok(oldtostate);
    test.equal(oldtostate.balance, 0);
}

