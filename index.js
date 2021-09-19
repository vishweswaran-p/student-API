
/**
 * @main Student API
 */
// Transpile all code following this line with babel and use 'env' (aka ES6) preset.
require('babel-register')({
    presets: [ 'es2015' ]
});

// Import the rest of our application.
module.exports = require('./bin/www');
