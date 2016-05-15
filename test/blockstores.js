
var stores = require('../lib/stores');
var utils = require('../lib/utils');

exports['create store'] = function (test) {
    var store = stores.blockstore();
    
    test.ok(store);
    test.equal(typeof store, 'object');
};

exports['retrieve unknown block by hash'] = function (test) {
    var store = stores.blockstore();
    
    var block = store.getByHash(utils.hash());
    
    test.equal(block, null);
};


