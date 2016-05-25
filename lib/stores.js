
function BlockStore() {
    var byhash = {};
    var byparenthash = {};
    var bynumber = [];
    
    this.save = function (block) {
        if (block.hash)
            byhash[block.hash] = block;
        
        if (block.parentHash) {
            var byphash = byparenthash[block.parentHash];
            
            if (!byphash)
                byparenthash[block.parentHash] = [block];
            else            
                byphash.push(block);
        }
        
        if (block.number != null) {
            var byn = bynumber[block.number];
            
            if (!byn)
                bynumber[block.number] = [block];
            else            
                byn.push(block);
        }
    };
    
    this.getByHash = function (hash) { 
        return byhash[hash];
    };
    
    this.hasBlockHash = function (hash) {
        return byhash[hash] != null;
    };
    
    this.getChildren = function (hash) {
        var result = byparenthash[hash];
        
        if (result)
            return result;
        
        return [];
    }
    
    this.getByNumber = function (number) {
        var result = bynumber[number];
        
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

