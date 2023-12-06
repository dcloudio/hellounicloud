describe('pages/storage/space-storage.vue', () => {
	let page
	beforeAll(async () => {
		// 重新reLaunch至首页，并获取首页page对象（其中 program 是uni-automator自动注入的全局对象）
		page = await program.navigateTo('/pages/storage/space-storage')
		await page.waitFor('view')
	})
	it('space-storage-上传文件', async () => {
		expect.assertions(2);
		const res = await page.callMethod('uploadFile', {
			filePath: '../../static/logo.png',
			cloudPath: Date.now() + 'test.png'
		})
		console.log('res: ', res);
		expect(res.success).toBeTruthy()
		expect(res.fileID).toEqual(expect.stringContaining('https'));  
	})
})