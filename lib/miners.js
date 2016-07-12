
var blocks = require('./blocks');
var transactions = require('./transactions');

function Miner(txs) {
    this.mine = function (parent, states) {
        var ptxs = txs.list();
        var btxs = [];
        
        ptxs.forEach(function (ptx) {
            var newstates = transactions.execute(ptx, states);
            
            if (newstates == null)
                return;
            
            states = newstates;
            btxs.push(ptx);
            txs.remove(ptx);
        });
        
        var block = blocks.block({ transactions: btxs }, parent);
        
        return block;
    }
}

function createMiner(txs) {
    return new Miner(txs);
}

module.exports = {
    miner: createMiner
};