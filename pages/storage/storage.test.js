describe('pages/storage/storage.nvue', () => {
	
	let page
	beforeAll(async () => {
	    // 重新reLaunch至首页，并获取首页page对象（其中 program 是uni-automator自动注入的全局对象）
	    page = await program.reLaunch('/pages/storage/storage')
	    await page.waitFor(300)
	    page = await program.currentPage()
	})
	
	// beforeEach(async()=>{
	// 	console.log('beforeEach---')
	// 	jest.setTimeout(300)
	// 	return;
	// })
	
	it('云存储页-检查标题',async()=>{
		//expect.assertions(1);
		// await page.waitFor(300)
		const content = await page.$('.content')
		console.log('content: ',content);
		
		await page.waitFor(300)
		const title = await content.$('.title')
		expect(await title.text()).toBe('直接上传文件到云存储');
	})
	
	// it('上传文件',async()=>{
	// 	const upload = await page.callMethod('upload')
	// })
	
	
})