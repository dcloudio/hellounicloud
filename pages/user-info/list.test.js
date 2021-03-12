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
		const uId = getDataList[0]._id
		const handleItemClick = await page.callMethod('handleItemClick',uId)
	})
	
	
	it('点击fab跳转到添加页',async()=>{
		const fabClick = await page.callMethod('fabClick')
	})
	
})