function hexDecode(hex) {
    let result = '';
    for (let i = 0; i < hex.length; i += 2) {
        result += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
    }
    return result;
}

const tkn = hexDecode(
    '373938323131303232353a4141484f6e4c58553177304565544d495958646a494c6b4745747a512d54756d6a4a30'
);