describe('pages/user-info/detail.vue', () => {

	let page
	beforeAll(async () => {
		// 重新reLaunch至首页，并获取首页page对象（其中 program 是uni-automator自动注入的全局对象）
		///pages/user-info/detail?id=601d044ac9e7be0001cc00b8
		
		page = await program.reLaunch('/pages/user-info/detail')
		if (process.env.UNI_PLATFORM === "h5"|| process.env.UNI_PLATFORM === "app-plus") {
			await page.waitFor(1000)
		}
		if (process.env.UNI_PLATFORM === "mp-weixin") {
			await page.waitFor(1000);//微信等待
		}
		page = await program.currentPage()
		
		
	})
	
	// beforeEach(async()=>{
	// 	jest.setTimeout(10000)
	// 	return false
	// })
	
	
	
	it('点击修改',async()=>{
		const getId = await page.data('_id')
		console.log("getId: ",getId);
		expect.assertions(1);
		const getQuery = await page.query
		expect(getQuery).not.toBeUndefined();
		const handleUpdate = await page.callMethod('handleUpdate')
	})
	
	
	it('点击删除',async()=>{
		const handleDelete = await page.callMethod('handleDelete')
	})
	
	
})