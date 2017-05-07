
var nodes = require('../lib/nodes');
var blocks = require('../lib/blocks');
var transactions = require('../lib/transactions');
var utils = require('../lib/utils');
var tries = require('../lib/tries');

exports['create node'] = function (test) {
	var node = nodes.node();
	
	test.ok(node);
	test.equal(typeof node, 'object');
};

exports['add genesis block'] = function (test) {
    var genesis = blocks.block();
	var node = nodes.node();
	
	node.addBlock(genesis);
	
	var best = node.bestBlock();
	
	test.ok(best);
	test.equal(best.number, genesis.number);
	test.equal(best.hash, genesis.hash);
};

exports['add transfer'] = function (test) {
    var from = utils.hash();
    var to = utils.hash();
    var value = 1000;
    
    var tx = transactions.transfer(from, to, value);
	
	var node = nodes.node();
	
	node.addTransaction(tx);

	var txs = node.transactions();
	
	test.ok(txs);
	test.ok(Array.isArray(txs));
	test.equal(txs.length, 1);
	
	var ntx = txs[0];
	
	test.equal(ntx.id, tx.id);
	test.equal(ntx.to, tx.to);
	test.equal(ntx.value, tx.value);
	test.equal(ntx.from, tx.from);
};

exports['mine with no transfers'] = function (test) {
    var genesis = blocks.block();
	var node = nodes.node();
	
	node.addBlock(genesis);
	
	var result = node.mine();

    test.ok(result);
    test.ok(result.hash);
    test.ok(result.transactions);
    test.ok(Array.isArray(result.transactions));
    test.equal(result.transactions.length, 0);
    test.ok(result.parentHash);
    test.equal(result.parentHash, genesis.hash);
};

exports['mine with one transfer'] = function (test) {
    var from = utils.hash();
    var to = utils.hash();
    var value = 0;
    
    var tx = transactions.transfer(from, to, value);

    var genesis = blocks.block();
	var node = nodes.node();
	
	node.addBlock(genesis);
	node.addTransaction(tx);
	
	var result = node.mine();

    test.ok(result);
    test.ok(result.hash);
    test.ok(result.transactions);
    test.ok(Array.isArray(result.transactions));
    test.equal(result.transactions.length, 1);
    test.ok(result.parentHash);
    test.equal(result.parentHash, genesis.hash);
};


exports['mine with two transfers'] = function (test) {
    var from = utils.hash();
    var to = utils.hash();
    
    var tx1 = transactions.transfer(from, to, 100);
    var tx2 = transactions.transfer(to, from, 50);

	var states = tries.states().put(from, { balance: 3000 });

    var genesis = blocks.block();
	var node = nodes.node(states);
	
	node.addBlock(genesis);
	node.addTransaction(tx1);
	node.addTransaction(tx2);
	
	var result = node.mine();

    test.ok(result);
    test.ok(result.hash);
    test.ok(result.transactions);
    test.ok(Array.isArray(result.transactions));
    test.equal(result.transactions.length, 2);
    test.ok(result.parentHash);
    test.equal(result.parentHash, genesis.hash);
};

