
var stores = require('./stores');

function Blockchain(block) {
    var self = this;
    var blocks = [block];
    var blockstore = stores.blockstore();
    blockstore.save(block);
    
    this.bestBlock = function () { return blocks[blocks.length - 1]; }
    
    this.add = function (block) {
        if (blockstore.hasBlockHash(block.hash))
            return;
            
        blockstore.save(block);
        
        if (getUnknownAncestor(block) != null)
            return;
        
        tryAdd(block);
    }
     
    function tryAdd(block) {
        if (isBestBlockChild(block))
            blocks.push(block);

        if (isBetterBestBlock(block))
            tryFork(block);
            
        tryChildren(block);
    }
    
    function tryChildren(block) {
        var children = blockstore.getChildren(block.hash);
    
        for (var n in children)
            tryAdd(children[n]);
    }
    
    function isBestBlockChild(block) {
        var bblock = self.bestBlock();
        
        return bblock.hash === block.parentHash && bblock.number === block.number - 1;
    }
    
    function isBetterBestBlock(block) {
        var bblock = self.bestBlock();
        
        return bblock.number < block.number;
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
    
    function getUnknownAncestor(block) {
        var parentHash = block.parentHash;

        while (parentHash && blockstore.hasBlockHash(parentHash)) {
            var parent = blockstore.getByHash(parentHash);
            
            if (parent.hash === blocks[parent.number].hash)
                return null;
            
            parentHash = parent.parentHash;
        }
        
        return parentHash;
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

