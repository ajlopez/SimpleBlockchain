
var nodes = require('../lib/nodes');

exports['create node'] = function (test) {
	var node = nodes.node();
	
	test.ok(node);
	test.equal(typeof node, 'object');
};

