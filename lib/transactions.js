
var utils = require('./utils');

function transfer(from, to, value) {
    return {
        id: utils.hash(),
        from: from,
        to: to,
        value: value
    };
}

function execute(tx, states) {
    var fromstate = states.get(tx.from);
    var tostate = states.get(tx.to);

    fromstate.balance -= tx.value;
    
    if (fromstate.balance < 0)
        return null;
        
    tostate.balance += tx.value;
    
    return states.put(tx.from, fromstate).put(tx.to, tostate);
}

module.exports = {
    transfer: transfer,
    execute: execute
};

