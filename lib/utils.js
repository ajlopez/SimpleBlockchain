
var zerohash = '0x';

for (var k = 0; k < 32; k++)
    zerohash += '00';

function generateByte() {
    var value = Math.floor(Math.random() * 256).toString(16);
    
    if (value.length < 2)
        value = '0' + value;
    
    return value;
}

function generateBytes(n) {
    var key = '0x';
    
    for (var k = 0; k < n; k++)
        key += generateByte();
    
    return key;
}

function generateHash() {
    return generateBytes(32);
}

function generateAddress() {
    return generateBytes(20);
}

function zeroHash() {
    return zerohash;
}

function isHexadecimal(text) {
    if (text.substring(0, 2) !== '0x')
        return false;
        
    for (var k = 2; k < text.length; k++) {
        var ch = text[k];
        if (ch >= '0' && ch <='9')
            continue;
        if (ch >= 'a' && ch <= 'f')
            continue;
            
        return false;
    }
    
    return true;
}

module.exports = {
    hash: generateHash,
    zeroHash: zeroHash,
    address: generateAddress,
    isHexadecimal: isHexadecimal
}

