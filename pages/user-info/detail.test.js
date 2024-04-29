describe('pages/user-info/detail.vue', () => {
	let page,getQuery;
	if (process.env.uniTestPlatformInfo == 'ios_simulator 13.7') {
		it('ios', async () => {
			expect(1).toBe(1)
		})
		return
	}
	beforeAll(async () => {
		// 重新reLaunch至首页，并获取首页page对象（其中 program 是uni-automator自动注入的全局对象）
		// page = await program.navigateTo('/pages/user-info/detail')
		page = await program.currentPage()
		await page.waitFor('view')
		const getQuery = await page.query
		console.log('getQuery: ', getQuery);
		if (Object.keys(getQuery).length === 0 || getQuery === undefined) {
		  console.log('err query')
		  return
		}
	})
	it('打开修改页面', async () => {
		// expect.assertions(1);
		await page.callMethod('handleUpdate')
		await page.waitFor(1000)
		console.log('currentPage', await program.currentPage())
		expect((await program.currentPage()).path).toBe('pages/user-info/edit')
	})
})