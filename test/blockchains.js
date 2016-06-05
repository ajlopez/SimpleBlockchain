
var blockchains = require('../lib/blockchains');
var blocks = require('../lib/blocks');

exports['create blockchain'] = function (test) {
    var genesis = blocks.block();
    var bc = blockchains.blockchain();
    
    bc.add(genesis);
    
    test.ok(bc);
    test.equal(typeof bc, 'object');
    test.equal(bc.bestBlock().number, genesis.number);
    test.equal(bc.bestBlock().hash, genesis.hash);
};

exports['create partial blockchain'] = function (test) {
    var genesis = blocks.block();
    var block1 = blocks.block(genesis);
    var block2 = blocks.block(block1);
    
    var bc = blockchains.blockchain();
    
    bc.add(block2);
    
    test.ok(bc);
    test.equal(typeof bc, 'object');
    test.equal(bc.bestBlock().number, block2.number);
    test.equal(bc.bestBlock().hash, block2.hash);
};

exports['add block'] = function (test) {
    var genesis = blocks.block();
    var block = blocks.block(genesis);
    var bc = blockchains.blockchain();
    
    bc.add(genesis);
    bc.add(block);
    
    test.equal(bc.bestBlock().number, block.number);
    test.equal(bc.bestBlock().hash, block.hash);
};

exports['add block same height'] = function (test) {
    var genesis = blocks.block();
    var block = blocks.block(genesis);
    var block2 = blocks.block(genesis);
    
    var bc = blockchains.blockchain();
    
    bc.add(genesis);
    bc.add(block);
    bc.add(block2);
    
    test.equal(bc.bestBlock().number, block.number);
    test.equal(bc.bestBlock().hash, block.hash);
};

exports['add block with next height'] = function (test) {
    var genesis = blocks.block();
    var block = blocks.block(genesis);
    var block2 = blocks.block(block);
    
    var bc = blockchains.blockchain();
    
    bc.add(genesis);
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
    
    var bc = blockchains.blockchain();
    
    bc.add(genesis);
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
    
    var bc = blockchains.blockchain();
    
    bc.add(genesis);
    bc.add(block);
    bc.add(block2);
    
    test.equal(bc.bestBlock().number, block.number);
    test.equal(bc.bestBlock().hash, block.hash);
    
    bc.add(block3);
    
    test.equal(bc.bestBlock().number, block3.number);
    test.equal(bc.bestBlock().hash, block3.hash);
};

exports['switch to a better blockchain with gap'] = function (test) {
    var genesis = blocks.block();
    var block = blocks.block(genesis);
    var block2 = blocks.block(genesis);
    var block3 = blocks.block(block2);
    var block4 = blocks.block(block3);
    
    var bc = blockchains.blockchain();
    
    bc.add(genesis);
    bc.add(block);
    bc.add(block2);
    
    test.equal(bc.bestBlock().number, block.number);
    test.equal(bc.bestBlock().hash, block.hash);
    
    bc.add(block4);
    bc.add(block3);
    
    test.equal(bc.bestBlock().number, block4.number);
    test.equal(bc.bestBlock().hash, block4.hash);
};

exports['get blocks in blockchain by number'] = function (test) {
    var genesis = blocks.block();
    var block = blocks.block(genesis);
    var block2 = blocks.block(block);
    var block3 = blocks.block(block2);
    var block4 = blocks.block(block3);
    
    var bc = blockchains.blockchain();
    
    bc.add(genesis);
    bc.add(block);
    bc.add(block2);
    bc.add(block3);
    bc.add(block4);
    
    var result = bc.getBlock(0);
    
    test.ok(result);
    test.equal(result.number, genesis.number);
    test.equal(result.hash, genesis.hash);
    
    var result = bc.getBlock(1);
    
    test.ok(result);
    test.equal(result.number, block.number);
    test.equal(result.hash, block.hash);
    
    var result = bc.getBlock(2);
    
    test.ok(result);
    test.equal(result.number, block2.number);
    test.equal(result.hash, block2.hash);
    
    var result = bc.getBlock(3);
    
    test.ok(result);
    test.equal(result.number, block3.number);
    test.equal(result.hash, block3.hash);
    
    var result = bc.getBlock(4);
    
    test.ok(result);
    test.equal(result.number, block4.number);
    test.equal(result.hash, block4.hash);
    
    var result = bc.getBlock(5);
    
    test.ok(!result);
    test.equal(result, null);
};

exports['get blocks in partial blockchain by number'] = function (test) {
    var genesis = blocks.block();
    var block = blocks.block(genesis);
    var block2 = blocks.block(block);
    var block3 = blocks.block(block2);
    var block4 = blocks.block(block3);
    
    var bc = blockchains.blockchain();
    
    bc.add(block2);
    bc.add(block3);
    bc.add(block4);
    
    var result = bc.getBlock(0);
    
    test.ok(!result);
    test.equal(result, null);
    
    var result = bc.getBlock(1);
    
    test.ok(!result);
    test.equal(result, null);
    
    var result = bc.getBlock(2);
    
    test.ok(result);
    test.equal(result.number, block2.number);
    test.equal(result.hash, block2.hash);
    
    var result = bc.getBlock(3);
    
    test.ok(result);
    test.equal(result.number, block3.number);
    test.equal(result.hash, block3.hash);
    
    var result = bc.getBlock(4);
    
    test.ok(result);
    test.equal(result.number, block4.number);
    test.equal(result.hash, block4.hash);
    
    var result = bc.getBlock(5);
    
    test.ok(!result);
    test.equal(result, null);
};

