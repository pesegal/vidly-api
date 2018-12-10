const config = require('config');

module.exports = function() {

    // Kill the app in case the environment variable is not set.
    if (!config.get('jwtPrivateKey')) {
        throw new Error('FATAL ERROR: jwtPrivateKey not set.');
    }

}