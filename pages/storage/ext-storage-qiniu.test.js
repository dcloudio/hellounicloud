jest.setTimeout(20000)

describe('pages/storage/ext-storage-qiniu.vue', () => {
	let page
	beforeAll(async () => {
		page = await program.reLaunch('/pages/storage/ext-storage-qiniu')
		await page.waitFor('view')
		await page.setData({ isTest: true })
	})
	
	// 上传文件并验证结果
	async function uploadAndVerify(filePath, isPrivate = false) {
		const res = await page.callMethod('uploadFile', { filePath, isPrivate })
		await page.waitFor(2000)
		expectText(res.fileID, 'qiniu://')
		expectText(res.fileURL, 'https://')
		return res
	}
	
	describe('七牛云存储功能', () => {
		it('应该能够上传公开文件', async () => {
			await uploadAndVerify('/static/logo.png')
		})
		
		it('应该能够上传私有文件', async () => {
			await uploadAndVerify('/static/play.png', true)
		})
		
		it('应该能够获取私有文件临时下载链接', async () => {
			// 验证私有文件ID
			expectText(await page.data('privateFileID'), 'qiniu://jest')
			// 获取并验证临时下载链接
			const tempUrl = await page.callMethod('getTempFileURL')
			await page.waitFor(2000)
			expectText(tempUrl, '&token')
			expectText(tempUrl, 'https://')
		})
	})
})

// 辅助函数：验证文本包含关系
function expectText(value, expectValue) {
	expect(value).toEqual(expect.stringContaining(expectValue))
}
