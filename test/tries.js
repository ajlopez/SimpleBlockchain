
var tries = require('../lib/tries');

exports['get trie as object'] = function (test) {
    var trie = tries.trie();
    
    test.ok(trie);
    test.equal(typeof trie, 'object');
};

exports['get no data from empty trie'] = function (test) {
    var trie = tries.trie();
    
    var result = trie.get('0123');
    
    test.equal(result, null);
};

exports['put data and create another trie'] = function (test) {
    var trie = tries.trie();
    
    var result = trie.put('0123', 42);
    
    test.ok(result);
    test.ok(result !== trie);
};

exports['put data and get data'] = function (test) {
    var trie = tries.trie();
    
    var result = trie.put('0123', 42).get('0123');
    
    test.ok(result);
    test.equal(result, 42);
};


