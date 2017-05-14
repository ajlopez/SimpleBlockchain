
var utils = require('./utils');
var transactions = require('./transactions');

function createBlock(data, parent) {
    if (data && !parent) {
        parent = data;
        data = null;
    }
    
    data = data || {}
    
    var block = {
        number: parent ? parent.number + 1 : 0,
        hash: utils.hash(),
        parentHash: parent ? parent.hash : utils.zeroHash()
    };
    
    for (var n in data)
        if (block[n] == null)
            block[n] = data[n];
    
    return block;
}

function executeBlock(block, states) {
    if (!block.transactions)
        return states;
        
    for (var n in block.transactions) {
        var tx = block.transactions[n];
        
        var newstates = transactions.execute(tx, states);
		
		if (!newstates)
			return null;
        
        states = newstates;
    }
    
    return states;
}

module.exports = {
    block: createBlock,
    execute: executeBlock
};

