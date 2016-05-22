
function Blockchain(block) {
    this.bestBlock = function () { return block; }
}

function createBlockchain(block) {
    return new Blockchain(block);
}

module.exports = {
    blockchain: createBlockchain
}