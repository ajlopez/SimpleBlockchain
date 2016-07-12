
var miners = require('../lib/miners');
var blocks = require('../lib/blocks');
var tries = require('../lib/tries');
var transactions = require('../lib/transactions');
var utils = require('../lib/utils');

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
};

exports['mine block with transaction'] = function (test) {
    var from = utils.hash();
    var to = utils.hash();
    var value = 1000;

    var states = tries.states().put(from, { balance: 3000 });
    var tx = transactions.transfer(from, to, value);
    
    var txs = transactions.txs();
    txs.add(tx);

    var miner = miners.miner(txs);
    
    var genesis = blocks.block();
    
    var result = miner.mine(genesis, states);
    
    test.ok(result);
    test.ok(result.hash);
    test.ok(result.transactions);
    test.ok(Array.isArray(result.transactions));
    test.equal(result.transactions.length, 1);
    
    test.equal(result.transactions[0].from, from);
    test.equal(result.transactions[0].to, to);
    test.equal(result.transactions[0].value, 1000);
    
    test.ok(result.parentHash);
    test.equal(result.parentHash, genesis.hash);
    
    var pendingtxs = txs.list();
    
    test.ok(pendingtxs);
    test.ok(Array.isArray(pendingtxs));
    test.equal(pendingtxs.length, 0);
};

exports['mine block rejecting transaction without funds'] = function (test) {
    var from = utils.hash();
    var to = utils.hash();
    var value = 1000;

    var states = tries.states();
    var tx = transactions.transfer(from, to, value);
    
    var txs = transactions.txs();
    txs.add(tx);

    var miner = miners.miner(txs);
    
    var genesis = blocks.block();
    
    var result = miner.mine(genesis, states);
    
    test.ok(result);
    test.ok(result.hash);
    test.ok(result.transactions);
    test.ok(Array.isArray(result.transactions));
    test.equal(result.transactions.length, 0);
    
    test.ok(result.parentHash);
    test.equal(result.parentHash, genesis.hash);
};

