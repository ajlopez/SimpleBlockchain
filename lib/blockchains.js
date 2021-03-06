
var stores = require('./stores');
var utils = require('./utils');

function Blockchain() {
    var self = this;
    var blocks = [];
    var initial = 0;
    var blockstore = stores.blockstore();
    
    this.bestBlock = function () { 
        if (!blocks.length)
            return null;
        
        return blocks[blocks.length - 1]; 
    }
    
    this.add = function (block) {
        if (blockstore.hasBlockHash(block.hash))
            return;
            
        blockstore.save(block);
        
        if (blocks.length === 0) {
            blocks.push(block);
            initial = block.number;
            return;
        }
        
        if (getUnknownAncestor(block) != null)
            return;            
        
        tryAdd(block);
    }
    
    this.getBlock = function (number) {
        return blocks[number - initial];
    }
     
    function tryAdd(block) {
        if (isBestBlockChild(block) || (blocks.length === 0 && block.number === 0))
            blocks.push(block);
        else if (isBetterBestBlock(block))
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
        
        if (bblock === null)
            return block.number === 0;
        
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
            
            if (parent.hash === blocks[parent.number - initial].hash)
                return switchToFork(newbranch);
                
            newbranch.push(parent);
            
            parentHash = parent.parentHash;
        }
    }
    
    function getUnknownAncestor(block) {
        var parentHash = block.parentHash;

        while (parentHash && blockstore.hasBlockHash(parentHash)) {
            var parent = blockstore.getByHash(parentHash);
            
            if (blocks[parent.number - initial] && parent.hash === blocks[parent.number - initial].hash)
                return null;
            
            parentHash = parent.parentHash;
        }
        
        if (parentHash === utils.zeroHash())
            return null;
        
        return parentHash;
    }
    
    function switchToFork(newbranch) {
        for (var n = newbranch.length; n-- > 0;) {
            var block = newbranch[n];
            blocks[block.number - initial] = block;
        }
    }
}

function createBlockchain() {
    return new Blockchain();
}

module.exports = {
    blockchain: createBlockchain
}

