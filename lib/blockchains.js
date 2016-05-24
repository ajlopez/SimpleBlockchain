
var stores = require('./stores');

function Blockchain(block) {
    var blocks = [block];
    var blockstore = stores.blockstore();
    blockstore.save(block);
    
    this.bestBlock = function () { return blocks[blocks.length - 1]; }
    
    this.add = function (block) {
        if (blockstore.hasBlockHash(block.hash))
            return;
            
        blockstore.save(block);
            
        if (block.number != blocks[blocks.length - 1].number + 1)
            if (block.number > blocks[blocks.length - 1].number)
                return tryFork(block);
            else
                return;
            
        if (block.parentHash != blocks[blocks.length - 1].hash)
            return tryFork(block);
            
        blocks.push(block); 
    }
    
    function tryFork(block) {
        var newbranch = [block];
        var parentHash = block.parentHash;
        
        while (parentHash && blockstore.hasBlockHash(parentHash)) {
            var parent = blockstore.getByHash(parentHash);
            
            if (parent.hash === blocks[parent.number].hash)
                return switchToFork(newbranch);
                
            newbranch.push(parent);
            
            parentHash = parent.parentHash;
        }
    }
    
    function getDescendants(block) {
        var children = getChildren(block);
        
        if (children.length == 0)
            return children;
        
        var descendants = []
        
        for (var n in children) {
            var child = children[n];
            descendants = descendants.concat(getChildren(child));
        }
    }
    
    function switchToFork(newbranch) {
        for (var n = newbranch.length; n-- > 0;) {
            var block = newbranch[n];
            blocks[block.number] = block;
        }
    }
}

function createBlockchain(block) {
    return new Blockchain(block);
}

module.exports = {
    blockchain: createBlockchain
}

