
function BlockStore() {
    var byhash = {};
    var byparenthash = {};
    
    this.save = function (block) {
        if (block.hash)
            byhash[block.hash] = block;
        
        if (block.parentHash) {
            var byphash = byparenthash[block.parentHash];
            
            if (!byphash)
                byparenthash[block.parentHahs] = [block];
            else            
                byphash.push(block);
        }
    };
    
    this.getByHash = function (hash) { 
        return byhash[hash];
    };
    
    this.getByParentHash = function (hash) {
        var result = byparenthash[hash];
        
        if (result)
            return result;
        
        return [];
    }
}

function createBlockStore() {
    return new BlockStore();
}

module.exports = {
    blockstore: createBlockStore
};

