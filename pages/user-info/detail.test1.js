describe('pages/user-info/detail.vue', () => {

	let page
	beforeAll(async () => {
		// 重新reLaunch至首页，并获取首页page对象（其中 program 是uni-automator自动注入的全局对象）
		page = await program.reLaunch('/pages/user-info/detail')
		await page.waitFor('view')
		page = await program.currentPage()
	})
	
	
	it('点击修改',async()=>{
		const getId = await page.data('_id')
		console.log("getId: ",getId);
		expect.assertions(1);
		const getQuery = await page.query
		console.log('getQuery: ',getQuery);
		expect(getQuery).not.toBeUndefined();
		const handleUpdate = await page.callMethod('handleUpdate')
	})
	
	
	it('点击删除',async()=>{
		const handleDelete = await page.callMethod('handleDelete')
	})
	
	
})