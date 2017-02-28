
var blockchains = require('./blockchains');
var transactions = require('./transactions');
var miners = require('./miners');

function Node() {
	var blockchain = blockchains.blockchain();
	var txs = transactions.txs();
	var miner;
	
	this.addBlock = function (block) { blockchain.add(block); }
	
	this.bestBlock = function () { return blockchain.bestBlock(); }
	
	this.addTransaction = function (tx) { txs.add(tx); }
	
	this.transactions = function () { return txs.list(); }
	
	this.mine = function () {
		if (!miner)
			miner = miners.miner();
		
		return miner.mine(blockchain.bestBlock(), null);
	}
}

function createNode() {
	return new Node();
}

module.exports = {
	node: createNode
};

