
var blocks = require('./blocks');

function Miner(txs) {
    this.mine = function (parent, states) {
        var block = blocks.block({ transactions: [] }, parent);
        
        return block;
    }
}

function createMiner(txs) {
    return new Miner(txs);
}

module.exports = {
    miner: createMiner
};