describe('pages/user-info/detail.vue', () => {
	let page
	beforeAll(async () => {
		// 重新reLaunch至首页，并获取首页page对象（其中 program 是uni-automator自动注入的全局对象）
		// page = await program.navigateTo('/pages/user-info/detail')
		page = await program.currentPage()
		await page.waitFor('view')
		// console.log('page: ',page);
	})
	it('点击修改',async()=>{
		// expect.assertions(1);
		const getQuery = await page.query
		console.log('getQuery: ',getQuery);
		await page.callMethod('handleUpdate')
		await page.waitFor(1000)
		console.log('currentPage',await program.currentPage())
		// console.log('query',await page.query)
		expect((await program.currentPage()).path).toBe('pages/user-info/edit')
	})
	// it('点击删除',async()=>{
	// 	const handleDelete = await page.callMethod('handleDelete')
	// })
})