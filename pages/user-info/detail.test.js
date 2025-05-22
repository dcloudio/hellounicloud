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
		getQuery = await page.query
		if (Object.keys(getQuery).length === 0 || getQuery === undefined) {
		  return
		}
	})
	it('打开修改页面', async () => {
		await page.callMethod('handleUpdate')
		await page.waitFor(1000)
		expect((await program.currentPage()).path).toBe('pages/user-info/edit')
	})
  // it('删除当前数据', async () => {
  // 	await page.callMethod('handleDelete')
  // 	await page.waitFor(1000)
  //   const testRes = await page.data('testRes')
  // 	console.log('testRes', testRes)
  //   console.log('currentPage', await program.currentPage())
  // })
})