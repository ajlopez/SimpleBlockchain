
var blockchains = require('../lib/blockchains');
var blocks = require('../lib/blocks');

exports['create blockchain'] = function (test) {
    var genesis = blocks.block();
    var bc = blockchains.blockchain(genesis);
    
    test.ok(bc);
    test.equal(typeof bc, 'object');
    test.equal(bc.bestBlock(), genesis);
};

