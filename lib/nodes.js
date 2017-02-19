
var blockchains = require('./blockchains');
var transactions = require('./transactions');

function Node() {
	var blockchain = blockchains.blockchain();
	var txs = transactions.txs();
	
	this.addBlock = function (block) { blockchain.add(block); }
	
	this.bestBlock = function () { return blockchain.bestBlock(); }
	
	this.addTransaction = function (tx) { txs.add(tx); }
	
	this.transactions = function () { return txs.list(); }
}

function createNode() {
	return new Node();
}

module.exports = {
	node: createNode
};

