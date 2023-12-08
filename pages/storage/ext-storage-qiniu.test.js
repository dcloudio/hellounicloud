describe('pages/storage/ext-storage-qiniu.vue', () => {
	let page
	beforeAll(async () => {
		// 重新reLaunch至首页，并获取首页page对象（其中 program 是uni-automator自动注入的全局对象）
		page = await program.navigateTo('/pages/storage/ext-storage-qiniu')
		await page.waitFor('view')
		await page.setData({'isTest':true})
	})
	it('qiniu-storage-上传文件', async () => {
		expect.assertions(2);
		const res = await page.callMethod('uploadFile', {
			filePath: '../../static/logo.png',
			cloudPath: Date.now() + 'test-qiniu.png',
			isPrivate: false
		})
		console.log('res: ---1', res);
		expectText(res.fileID,'qiniu://')
		expectText(res.fileURL,'https://')
	})
	it('qiniu-私有文件-上传', async () => {
		expect.assertions(2);
		const res = await page.callMethod('uploadFile', {
			filePath: '../../static/play.png',
			// cloudPath: Date.now() + 'test-qiniu.png',
			isPrivate: true
		})
		console.log('res: ----2', res);
		expectText(res.fileID,'qiniu://')
		expectText(res.fileURL,'https://')
	})
	it('获取私有文件临时下载链接', async () => {
		expect.assertions(3);
		expectText(await page.data('privateFileID'),'qiniu://jest')
		const res = await page.callMethod('getTempFileURL')
		console.log('res: ----3', res);
		expectText(res,'&token')
		expectText(res,'https://')
	})
})
function expectText(value,expectValue){
	expect(value).toEqual(expect.stringContaining(expectValue));
}