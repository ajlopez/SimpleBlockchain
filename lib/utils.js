
function generateByte() {
    var value = Math.floor(Math.random() * 256).toString(16);
    
    if (value.length < 2)
        value = '0' + value;
    
    return value;
}

function generateHash() {
    var key = '0x';
    
    for (var k = 0; k < 32; k++)
        key += generateByte();
    
    return key;
}

module.exports = {
    hash: generateHash
}

