const Sequencer = require("@jest/test-sequencer").default;
const sortTestFilenames = ["clientDB-api.test.js","cloudObject.test.js","cloudFunction.test.js","add.test.js","list.test.js","detail.test.js","edit.test.js"];
class CustomSequencer extends Sequencer {
  sort(tests) {
    // 测试例排序
    const copyTests = Array.from(tests);
    const sortTests = sortTestFilenames
      .map((filename) => {
        return copyTests.find((test) => test.path.endsWith(filename));
      })
      .filter(Boolean);
    console.log(sortTests);
    return [...new Set([...sortTests, ...copyTests])];
  }
}
module.exports = CustomSequencer;
