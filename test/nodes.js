
var nodes = require('../lib/nodes');
var blocks = require('../lib/blocks');

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

