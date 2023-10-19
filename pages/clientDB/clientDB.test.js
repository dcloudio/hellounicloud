describe('pages/clientDB/clientDB.vue', () => {
	let page
	beforeAll(async () => {
		// 重新reLaunch至首页，并获取首页page对象（其中 program 是uni-automator自动注入的全局对象）
		page = await program.reLaunch('/pages/clientDB/clientDB')
		await page.waitFor(1000)
		page = await program.currentPage()
	})
	
	beforeEach(async()=>{
		jest.setTimeout(5000)
		return false
	})

	it('当前页面-clientDB', async () => {
		// await page.waitFor(1000)
		//expect.assertions(2);
		expect(await page.path).toBe('pages/clientDB/clientDB')
		
		await page.waitFor(300)
		const list = await page.$('uni-list')
		console.log("list: ",list);
		// if(list){
		// 	const getList = await list.$$('.item')
		// 	console.log("getList: ",getList);
		// 	expect(getList.length).toBe(5)
		// }
		

	})

})
