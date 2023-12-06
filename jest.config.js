const path = require('path');
module.exports = {
	testTimeout:30000,
	reporters: ['default'],
	watchPathIgnorePatterns: ['/node_modules/', '/dist/', '/.git/'],
	moduleFileExtensions: ['js', 'json'],
	rootDir: __dirname,
	// testMatch: ["<rootDir>/pages/**/*test.[jt]s?(x)"],
	testMatch: ["<rootDir>/pages/storage/storage.test.js","<rootDir>/pages/storage/space-storage.test.js","<rootDir>/pages/cloudObject/cloudObject.test.js","<rootDir>/pages/clientDB/permission-table-compound/permission-table-compound.test.js","<rootDir>/pages/clientDB/permission-table-simple/permission-table-simple.test.js"],
	testPathIgnorePatterns: ['/node_modules/','/js_sdk/validator/permission-test.js'],
	testSequencer: path.join(__dirname, "testSequencer.js")
}
