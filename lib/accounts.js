
var utils = require('./utils');

function createAccount() {
    return { address: utils.address() };
}

module.exports = {
    account: createAccount
}

