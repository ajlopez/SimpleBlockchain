
function Trie(values) {
    if (values == null)
        values = [];
        
    this.get = function (key, offset) {
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

function createTrie() {
    return new Trie();
}

module.exports = {
    trie: createTrie
};