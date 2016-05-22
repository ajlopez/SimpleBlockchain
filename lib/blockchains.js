
function Blockchain(block) {
    var blocks = [block];
    
    this.bestBlock = function () { return blocks[blocks.length - 1]; }
    
    this.add = function (block) { 
        if (block.number != blocks[blocks.length - 1].number + 1)
            return;
            
        blocks.push(block); 
    }
}

function createBlockchain(block) {
    return new Blockchain(block);
}

module.exports = {
    blockchain: createBlockchain
}