
function BlockStore() {
    var byhash = {};
    
    this.save = function (block) {
        byhash[block.hash] = block;
    };
    
    this.getByHash = function (hash) { 
        return byhash[hash];
    };
}

function createBlockStore() {
    return new BlockStore();
}

module.exports = {
    blockstore: createBlockStore
};

