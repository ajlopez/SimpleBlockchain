
function Trie() {
    this.get = function () { return null; };
}

function createTrie() {
    return new Trie();
}

module.exports = {
    trie: createTrie
};