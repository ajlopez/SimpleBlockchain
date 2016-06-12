
function Trie(values) {
    if (values == null)
        values = [];
        
    var defvalue = null;
    
    this.default = function (value) {
        defvalue = value;
    };
    
    this.get = function (key, offset) {
        var value = get(key, offset);
        
        if (value == null)
            return cloneObject(defvalue);
            
        return cloneObject(value);
    };
        
    function get(key, offset) {
        if (offset == null)
            offset = 0;
            
        var ky = key[offset];
        
        if (offset === key.length - 1)
            return values[ky];
        else if (values[ky])
            return values[ky].get(key, offset + 1);
        else
            return null;
    };
    
    this.put = function (key, data, offset) {
        if (offset == null)
            offset = 0;
        
        var newvalues = values.slice();
        var ky = key[offset];
        
        if (offset === key.length - 1)
            newvalues[ky] = data;
        else {
            if (!newvalues[ky])
                newvalues[ky] = new Trie();
                
            newvalues[ky] = newvalues[ky].put(key, data, offset + 1);
        }
            
        return new Trie(newvalues); 
    };
}

function cloneObject(obj) {
    if (obj == null)
        return null;
    
    if (typeof obj !== 'object')
        return obj;
    
    var newobj = {};
    
    for (var n in obj)
        newobj[n] = cloneObject(obj[n]);
    
    return newobj;
}

function createTrie() {
    return new Trie();
}

function createStates() {
    var trie = new Trie();
    
    trie.default({ balance: 0 });
    
    return trie;
}

module.exports = {
    trie: createTrie,
    states: createStates
};