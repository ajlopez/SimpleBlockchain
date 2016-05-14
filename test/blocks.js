
var blocks = require('../lib/blocks');

function isHexadecimal(text) {
    for (var k = 0; k < text.length; k++) {
        var ch = text[k];
        if (ch >= '0' && ch <='9')
            continue;
        if (ch >= 'a' && ch <= 'f')
            continue;
            
        return false;
    }
    
    return true;
}

function isHash(hash) {
    if (typeof hash !== 'string')
        return false;
        
    if (hash.length != 66)
        return false;
        
    if (hash.substring(0, 2) !== '0x')
        return false;
        
    return isHexadecimal(hash.substring(2));
}

exports['create genesis block'] = function (test) {
    var block = blocks.block();
    
    test.ok(block);
    test.equal(typeof block, 'object');
    test.equal(block.number, 0);
    test.ok(isHash(block.hash));
    test.ok(isHash(block.parentHash));
    test.equal(block.parentHash, '0x0000000000000000000000000000000000000000000000000000000000000000');
}

exports['create child block'] = function (test) {
    var genesis = blocks.block();
    var block = blocks.block(genesis);
    
    test.ok(block);
    test.equal(typeof block, 'object');
    test.equal(block.number, 1);
    test.ok(isHash(block.hash));
    test.ok(isHash(block.parentHash));
    test.equal(block.parentHash, genesis.hash);
}

exports['create child block with initial data'] = function (test) {
    var genesis = blocks.block();
    var block = blocks.block({ extra: 'hello' }, genesis);
    
    test.ok(block);
    test.equal(typeof block, 'object');
    test.equal(block.number, 1);
    test.ok(isHash(block.hash));
    test.ok(isHash(block.parentHash));
    test.equal(block.parentHash, genesis.hash);
    test.equal(block.extra, 'hello');
}

