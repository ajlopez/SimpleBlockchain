
var utils = require('./utils');

function createBlock(data, parent) {
    if (data && !parent) {
        parent = data;
        data = null;
    }
    
    data = data || {}
    
    var block = {
        number: parent ? parent.number + 1 : 0,
        hash: utils.hash(),
        parentHash: parent ? parent.hash : utils.zeroHash()
    };
    
    for (var n in data)
        if (block[n] == null)
            block[n] = data[n];
    
    return block;
}

module.exports = {
    block: createBlock
};

