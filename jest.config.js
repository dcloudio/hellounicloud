module.exports = {
	/* globalTeardown: '@dcloudio/uni-automator/dist/teardown.js',
	testEnvironment: '@dcloudio/uni-automator/dist/environment.js', */
	testEnvironmentOptions: {
		compile: true,
		h5: { // 为了节省测试时间，可以指定一个 H5 的 url 地址，若不指定，每次运行测试，会先 npm run dev:h5
			//169.254.90.119:8080
			//url: "http://169.254.90.119:8080/h5/",
			options: {
				headless: false // 配置是否显示 puppeteer 测试窗口
			}
		},
		"mp-weixin": {
			port: 9420, // 默认 9420
			account: "", // 测试账号
			args: "", // 指定开发者工具参数cnpm
			cwd: "", // 指定开发者工具工作目录
			launch: true, // 是否主动拉起开发者工具
			teardown: "disconnect", // 可选值 "disconnect"|"close" 运行测试结束后，断开开发者工具或关闭开发者工具
			remote: false, // 是否真机自动化测试
			executablePath: "C:/Users/liuxi/download/微信web开发者工具/cli.bat", // 开发者工具cli路径，默认会自动查找,  windows: C:/Program Files (x86)/Tencent/微信web开发者工具/cli.bat", mac: /Applications/wechatwebdevtools.app/Contents/MacOS/cli
		},
	},
	testTimeout: 32000,
	reporters: [
		'default'
	],
	watchPathIgnorePatterns: ['/node_modules/', '/dist/', '/.git/'],
	moduleFileExtensions: ['js', 'json'],
	rootDir: __dirname,
	testMatch: ['<rootDir>/pages/**/*test.[jt]s?(x)'],
	testPathIgnorePatterns: ['/node_modules/', '.*/test.js', '/js_sdk/validator/permission-test.js']
}
