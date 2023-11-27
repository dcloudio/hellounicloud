describe('pages/clientDB/clientDB.vue', () => {
	let page
	beforeAll(async () => {
		// 重新reLaunch至首页，并获取首页page对象（其中 program 是uni-automator自动注入的全局对象）
		page = await program.switchTab('/pages/clientDB/clientDB')
		await page.waitFor('view')
		// page = await program.currentPage()
	})
	it('当前页面-clientDB', async () => {
		//expect.assertions(2);
		expect(await page.path).toBe('pages/clientDB/clientDB')
		await page.waitFor(300)
		const list = await page.$$('.item')
		expect(list.length).toBe(5)
	})
})
