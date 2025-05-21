describe('pages/clientDB/permission/permission.vue', () => {
	let page
	beforeAll(async () => {
		page = await program.reLaunch('/pages/clientDB/permission/permission')
		await page.waitFor('view')
		page = await program.currentPage()
	})

	it('列表数据', async () => {
		// 微信小程序环境
		if (process.env.UNI_PLATFORM === "mp-weixin") {
			await page.waitFor(1000)
			const listItem = await page.$$('uni-list-item')
			expect(listItem.length).toBe(4)
		}
		
		// H5/App环境
		if (process.env.UNI_PLATFORM === "h5" || process.env.UNI_PLATFORM.startsWith("app")) {
			await page.waitFor(500)
			const perPage = await page.$('.page')
			const getData = await perPage.$$(".table-item")
			expect(getData.length).toBe(4)
		}
	})
})