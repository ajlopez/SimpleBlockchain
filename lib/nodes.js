
var blockchains = require('./blockchains');
var transactions = require('./transactions');
var miners = require('./miners');
var tries = require('./tries');

function Node(initialStates) {
	var blockchain = blockchains.blockchain();
	var txs = transactions.txs();
	var miner;
	var states = initialStates || tries.states();
	
	this.addBlock = function (block) { blockchain.add(block); }
	
	this.bestBlock = function () { return blockchain.bestBlock(); }
	
	this.addTransaction = function (tx) { txs.add(tx); }
	
	this.transactions = function () { return txs.list(); }
	
	this.states = function () { return states; }
	
	this.mine = function () {
		if (!miner)
			miner = miners.miner(txs);
		
		return miner.mine(blockchain.bestBlock(), states);
	}
}

function createNode(states) {
	return new Node(states);
}

module.exports = {
	node: createNode
};

