
var utils = require('./utils');

function transfer(from, to, value) {
    return {
        id: utils.hash(),
        from: from,
        to: to,
        value: value
    };
}

module.exports = {
    transfer: transfer
};

