describe('pages/user-info/list.vue', () => {

	let page
	beforeAll(async () => {
		// 重新reLaunch至首页，并获取首页page对象（其中 program 是uni-automator自动注入的全局对象）
		page = await program.reLaunch('/pages/user-info/list')
		if (process.env.UNI_PLATFORM === "h5") {
			await page.waitFor(1000)
		}
		if (process.env.UNI_PLATFORM === "mp-weixin") {
			await page.waitFor(10000)
		}
		page = await program.currentPage()
	})
	
	it('点击某一条',async()=>{
		
		const getDataList = await page.data('dataList')
		//console.log(getDataList,"getDataList----------");
		
		const uId = getDataList[0]._id
		//console.log("uId: ",uId);
		
		
		const handleItemClick = await page.callMethod('handleItemClick',
			uId
		)
		//console.log(handleItemClick,"handleItemClick------------");
		
		
		/* console.log((await program.currentPage()).path,"000000000000");
		
		
		expect((await program.currentPage()).path).toBe('pages/user-info/detail') */
		//pages/user-info/detail?id=601d044ac9e7be0001cc00b8
		
		
		/* await page.waitFor(500)
		expect((await program.navigateBack()).path).toBe('pages/user-info/list') */
		
		
	})
	
	
	it('点击fab跳转到添加页',async()=>{
		const fabClick = await page.callMethod('fabClick')
		//console.log(fabClick,"fabClick--------");
	})
	
})