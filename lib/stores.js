
function BlockStore() {
    this.getByHash = function () { return null; };
}

function createBlockStore() {
    return new BlockStore();
}

module.exports = {
    blockstore: createBlockStore
};