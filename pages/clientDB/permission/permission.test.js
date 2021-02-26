describe('pages/clientDB/permission/permission.vue', () => {
	let page
	beforeAll(async () => {
		// 重新reLaunch至首页，并获取首页page对象（其中 program 是uni-automator自动注入的全局对象）
		await program.reLaunch('/pages/clientDB/permission/permission')
		if (process.env.UNI_PLATFORM === "h5") {
			await page.waitFor(1000)
		}
		if (process.env.UNI_PLATFORM === "mp-weixin") {
			await page.waitFor(10000)
		}
		page = await program.currentPage()

	})

	it('获取数据',async()=>{
		//expect.assertions(2)
		const perPage = await page.$('.page')
		
		if(process.env.UNI_PLATFORM === "mp-weixin"){
			
			const listItem = await perPage.$('uni-list-item')
			console.log("listItem: ",listItem);
			
		}
		
		if(process.env.UNI_PLATFORM != "mp-weixin"){
			const getData = await perPage.$$(".table-item")
			expect(getData.length).toBe(4)
			expect(await getData[0].text()).not.toBeUndefined();
		}
		
		
		
	})
	
})