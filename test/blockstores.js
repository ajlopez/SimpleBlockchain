
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

exports['retrieve unknown block by parent hash'] = function (test) {
    var store = stores.blockstore();
    
    var result = store.getByParentHash(utils.hash());
    
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, 0);
};

exports['save block and retrieve it by hash'] = function (test) {
    var store = stores.blockstore();
    var hash = utils.hash();
    var block = { hash: hash };
    
    store.save(block);
    
    var result = store.getByHash(hash);
    
    test.ok(result);
    test.equal(result.hash, hash);
};

exports['save block and retrieve it by parent hash'] = function (test) {
    var store = stores.blockstore();
    var hash = utils.hash();
    var parentHash = utils.hash();
    var block = { hash: hash, parentHash: parentHash };
    
    store.save(block);
    
    var result = store.getByParentHash(parentHash);
    
    test.ok(result);
    test.ok(Array.isArray(result));
    test.equal(result.length, 1);
    test.equal(result[0].hash, hash);
    test.equal(result[0].parentHash, parentHash);
};

