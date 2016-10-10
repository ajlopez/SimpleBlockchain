
var blockchains = require('./blockchains');

function Node() {
	var blockchain = blockchains.blockchain();
	
	this.addBlock = function (block) { blockchain.add(block); }
	
	this.bestBlock = function () { return blockchain.bestBlock(); }
}

function createNode() {
	return new Node();
}

module.exports = {
	node: createNode
};

