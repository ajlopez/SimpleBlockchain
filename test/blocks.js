
var blocks = require('../lib/blocks');
var utils = require('../lib/utils');
var transactions = require('../lib/transactions');
var tries = require('../lib/tries');

function isHash(hash) {
    if (typeof hash !== 'string')
        return false;
        
    if (hash.length != 64)
        return false;
        
    return utils.isHexadecimal(hash);
}

exports['create genesis block'] = function (test) {
    var block = blocks.block();
    
    test.ok(block);
    test.equal(typeof block, 'object');
    test.equal(block.number, 0);
    test.ok(isHash(block.hash));
    test.ok(isHash(block.parentHash));
    test.equal(block.parentHash, '0000000000000000000000000000000000000000000000000000000000000000');
}

exports['create child block'] = function (test) {
    var genesis = blocks.block();
    var block = blocks.block(genesis);
    
    test.ok(block);
    test.equal(typeof block, 'object');
    test.equal(block.number, 1);
    test.ok(isHash(block.hash));
    test.ok(isHash(block.parentHash));
    test.equal(block.parentHash, genesis.hash);
}

exports['create child block with initial data'] = function (test) {
    var genesis = blocks.block();
    var block = blocks.block({ extra: 'hello' }, genesis);
    
    test.ok(block);
    test.equal(typeof block, 'object');
    test.equal(block.number, 1);
    test.ok(isHash(block.hash));
    test.ok(isHash(block.parentHash));
    test.equal(block.parentHash, genesis.hash);
    test.equal(block.extra, 'hello');
}


exports['execute block with transfer'] = function (test) {
    var from = utils.hash();
    var to = utils.hash();
    var value = 1000;

    var states = tries.states().put(from, { balance: 3000 });

    var tx = transactions.transfer(from, to, value);
    
    test.ok(tx);
    test.equal(tx.from, from);
    test.equal(tx.to, to);
    test.equal(tx.value, value);

    var genesis = blocks.block();
    var block = blocks.block({ transactions: [tx] }, genesis);
    
    var newstates = blocks.execute(block, states);

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
