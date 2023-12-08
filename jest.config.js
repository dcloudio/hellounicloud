const path = require('path');
module.exports = {
	testTimeout:30000,
	reporters: ['default'],
	watchPathIgnorePatterns: ['/node_modules/', '/dist/', '/.git/'],
	moduleFileExtensions: ['js', 'json'],
	rootDir: __dirname,
	testMatch: ["<rootDir>/pages/**/*test.[jt]s?(x)"],
	testPathIgnorePatterns: ['/node_modules/','/js_sdk/validator/permission-test.js','/pages/clientDB/permission-table-simple/permission-table-simple.test.js'],
	testSequencer: path.join(__dirname, "testSequencer.js")
}
