
function Trie() {
    this.get = function () { return null; };
    
    this.put = function () { return new Trie(); };
}

function createTrie() {
    return new Trie();
}

module.exports = {
    trie: createTrie
};