describe('pages/user-info/detail.vue', () => {

	let page
	beforeAll(async () => {
		// 重新reLaunch至首页，并获取首页page对象（其中 program 是uni-automator自动注入的全局对象）
		
		page = await program.reLaunch('/pages/user-info/detail?id=601d044ac9e7be0001cc00b8')
		if (process.env.UNI_PLATFORM === "h5") {
			await page.waitFor(1000)
		}
		if (process.env.UNI_PLATFORM === "mp-weixin") {
			await page.waitFor(10000)
		}
		page = await program.currentPage()
	})
	
	it('点击修改',async()=>{
		expect.assertions(1);
		const getQuery = await page.query
		expect(getQuery).not.toBeUndefined();
		const handleUpdate = await page.callMethod('handleUpdate')
		//console.log("handleUpdate: ",handleUpdate);
	})
	
	
	it('点击删除',async()=>{
		const handleDelete = await page.callMethod('handleDelete')
		//console.log("handleDelete: ",handleDelete);
	})
	
	
})