jest.setTimeout(20000)

describe('pages/storage/space-storage.vue', () => {
	let page
	beforeAll(async () => {
		page = await program.reLaunch('/pages/storage/space-storage')
		await page.waitFor('view')
	})
	
	it('应该能够上传图片文件', async () => {
		const res = await page.callMethod('uploadFile', {
			filePath: '/static/logo.png',
			cloudPath: Date.now() + 'test.png'
		})
		await page.waitFor(1000)
		expect(res.success).toBeTruthy()
		expect(res.fileID).toMatch(/^https:\/\/.*\.cdn\.bspapp\.com\/.*\.png$/)
	})
})