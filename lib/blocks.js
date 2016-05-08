
var utils = require('./utils');

function createBlock() {
    return {
        number: 0,
        hash: utils.hash(),
        parentHash: utils.zeroHash()
    };
}

module.exports = {
    block: createBlock
};

