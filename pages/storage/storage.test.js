describe('pages/storage/storage.nvue', () => {
	
	let page
	beforeAll(async () => {
	    // 重新reLaunch至首页，并获取首页page对象（其中 program 是uni-automator自动注入的全局对象）
	    page = await program.reLaunch('/pages/storage/storage')
	    if (process.env.UNI_PLATFORM === "h5") {
	    	await page.waitFor(1000)
	    }
	    if (process.env.UNI_PLATFORM === "mp-weixin") {
	    	await page.waitFor(10000)
	    }
	    page = await program.currentPage()
	})
	
	it('云存储页-检查标题',async()=>{
		expect.assertions(1);
		const title = await page.$('.title')
		expect(await title.text()).toBe('直接上传文件到云存储');
	})
	
	it('上传文件',async()=>{
		//expect.assertions(1);
		const upload = await page.callMethod('upload')
	})
	
	
})