const crypto = require('crypto');

const secret = crypto.randomBytes(32).toString('hex');

console.log("Your new secret key is: ", secret);
