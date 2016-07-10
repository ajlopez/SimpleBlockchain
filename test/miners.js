
var miners = require('../lib/miners');
var blocks = require('../lib/blocks');
var tries = require('../lib/tries');
var transactions = require('../lib/transactions');

exports['mine empty block'] = function (test) {
    var txs = transactions.txs();
    var miner = miners.miner(txs);
    
    var states = tries.states();
    var genesis = blocks.block();
    
    var result = miner.mine(genesis, states);
    
    test.ok(result);
    test.ok(result.hash);
    test.ok(result.transactions);
    test.ok(Array.isArray(result.transactions));
    test.equal(result.transactions.length, 0);
    test.ok(result.parentHash);
    test.equal(result.parentHash, genesis.hash);
}