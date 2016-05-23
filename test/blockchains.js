
var blockchains = require('../lib/blockchains');
var blocks = require('../lib/blocks');

exports['create blockchain'] = function (test) {
    var genesis = blocks.block();
    var bc = blockchains.blockchain(genesis);
    
    test.ok(bc);
    test.equal(typeof bc, 'object');
    test.equal(bc.bestBlock().number, genesis.number);
    test.equal(bc.bestBlock().hash, genesis.hash);
};

exports['add block'] = function (test) {
    var genesis = blocks.block();
    var block = blocks.block(genesis);
    var bc = blockchains.blockchain(genesis);
    
    bc.add(block);
    
    test.equal(bc.bestBlock().number, block.number);
    test.equal(bc.bestBlock().hash, block.hash);
};

exports['add block same height'] = function (test) {
    var genesis = blocks.block();
    var block = blocks.block(genesis);
    var block2 = blocks.block(genesis);
    
    var bc = blockchains.blockchain(genesis);
    
    bc.add(block);
    bc.add(block2);
    
    test.equal(bc.bestBlock().number, block.number);
    test.equal(bc.bestBlock().hash, block.hash);
};

exports['add block with next height'] = function (test) {
    var genesis = blocks.block();
    var block = blocks.block(genesis);
    var block2 = blocks.block(block);
    
    var bc = blockchains.blockchain(genesis);
    
    bc.add(block);
    bc.add(block2);
    
    test.equal(bc.bestBlock().number, block2.number);
    test.equal(bc.bestBlock().hash, block2.hash);
};

exports['add block next height but with another parent block'] = function (test) {
    var genesis = blocks.block();
    var block = blocks.block(genesis);
    var block2 = blocks.block(genesis);
    var block3 = blocks.block(block2);
    
    var bc = blockchains.blockchain(genesis);
    
    bc.add(block);
    bc.add(block3);
    
    test.equal(bc.bestBlock().number, block.number);
    test.equal(bc.bestBlock().hash, block.hash);
};

exports['switch to a better blockchain'] = function (test) {
    var genesis = blocks.block();
    var block = blocks.block(genesis);
    var block2 = blocks.block(genesis);
    var block3 = blocks.block(block2);
    
    var bc = blockchains.blockchain(genesis);
    
    bc.add(block);
    bc.add(block2);
    
    test.equal(bc.bestBlock().number, block.number);
    test.equal(bc.bestBlock().hash, block.hash);
    
    bc.add(block3);
    
    test.equal(bc.bestBlock().number, block3.number);
    test.equal(bc.bestBlock().hash, block3.hash);
};
