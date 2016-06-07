
var tries = require('../lib/tries');

exports['create states with default value'] = function (test) {
    var states = tries.states();
    
    test.ok(states);
    test.equal(typeof states, 'object');
    
    var result = states.get('1234');
    
    test.ok(result);
    test.equal(typeof result, 'object');
    test.equal(result.balance, 0);
};

