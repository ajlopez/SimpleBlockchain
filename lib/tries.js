
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
            if (!offset)
                return cloneObject(defvalue);
            else
                return defvalue;
            
        if (offset)
            return cloneObject(value);
        
        return value;
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
        
        var newvalues = cloneValues(values);
        
        var ky = key[offset];
        
        if (offset === key.length - 1)
            newvalues[ky] = data;
        else {
            if (!newvalues[ky]) {
                newvalues[ky] = new Trie();
                newvalues[ky].default(defvalue);
            }
                
            newvalues[ky] = newvalues[ky].put(key, data, offset + 1);
        }
            
        var newtrie = new Trie(newvalues); 

        newtrie.default(defvalue);
        
        return newtrie;
    };
}

function cloneValues(values) {
    var newvalues = [];
    
    for (var n in values)
        newvalues[n] = values[n];
    
    return newvalues;
}

function cloneObject(obj) {
    if (obj == null)
        return null;
    
    if (typeof obj !== 'object')
        return obj;
    
    var newobj;
    
    if (Array.isArray(obj))
        newobj = [];
    else
        newobj = {};
    
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