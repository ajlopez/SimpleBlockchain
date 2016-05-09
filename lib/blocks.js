
var utils = require('./utils');

function createBlock(parent) {
    return {
        number: parent ? parent.number + 1 : 0,
        hash: utils.hash(),
        parentHash: parent ? parent.hash : utils.zeroHash()
    };
}

module.exports = {
    block: createBlock
};

