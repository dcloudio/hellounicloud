describe('pages/storage/storage.nvue', () => {
	
	let page
	beforeAll(async () => {
	    // 重新reLaunch至首页，并获取首页page对象（其中 program 是uni-automator自动注入的全局对象）
	    page = await program.reLaunch('/pages/storage/storage')
	    if (process.env.UNI_PLATFORM === "h5"|| process.env.UNI_PLATFORM === "app-plus") {
	    	await page.waitFor(1000)
	    }
	    if (process.env.UNI_PLATFORM === "mp-weixin") {
	    	await page.waitFor(1000);//微信等待
	    }
	    page = await program.currentPage()
	})
	
	beforeEach(async()=>{
		jest.setTimeout(5000)
		return false
	})
	
	it('云存储页-检查标题',async()=>{
		//expect.assertions(1);
		await page.waitFor(300)
		const content = await page.$('.content')
		
		await page.waitFor(300)
		const title = await content.$('.title')
		expect(await title.text()).toBe('直接上传文件到云存储');
	})
	
	// it('上传文件',async()=>{
	// 	const upload = await page.callMethod('upload')
	// })
	
	
})