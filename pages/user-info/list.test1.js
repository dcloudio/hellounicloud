describe('pages/user-info/list.vue', () => {

	let page
	beforeAll(async () => {
		// 重新reLaunch至首页，并获取首页page对象（其中 program 是uni-automator自动注入的全局对象）
		page = await program.reLaunch('/pages/user-info/list')
		await page.waitFor('view')
		page = await program.currentPage()
	})
	
	// beforeEach(async()=>{
	// 	jest.setTimeout(20000)
	// 	return false
	// })
	it('点击第一条',async()=>{
		const items = await page.$$('.uni-list-item')
		// console.log('items: ',items);
		await items[0].tap()
	})
	
	/* it('点击某一条',async()=>{
		const getDataList = await page.data('dataList')
		console.log("getDataList: ",getDataList);
		for (var i = 0; i < getDataList.length; i++) {
			console.log("getDataList[i]: ",getDataList[i]);
		}
		const uId = getDataList[0]._id
		console.log("uId: ",uId);
		
		if(uId){
			const handleItemClick = await page.callMethod('handleItemClick',uId)
		}
		
	}) */
	
	
	
	it('点击fab跳转到添加页',async()=>{
		const fabClick = await page.callMethod('fabClick')
	})
	
})