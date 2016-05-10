
function transfer(from, to, value) {
    return {
        from: from,
        to: to,
        value: value
    };
}

module.exports = {
    transfer: transfer
};

