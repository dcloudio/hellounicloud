describe('pages/storage/storage.vue', () => {
	
	let page
	beforeAll(async () => {
	    // 重新reLaunch至首页，并获取首页page对象（其中 program 是uni-automator自动注入的全局对象）
	    page = await program.switchTab('/pages/storage/storage')
	    await page.waitFor('view')
	})
	
	it('云存储页-检查标题',async()=>{
		//expect.assertions(1);
		const content = await page.$('.content')
		const title = await content.$('.title')
		console.log('content: ',content,await title.text());
		expect(await title.text()).toBe('直接上传文件到云存储');
	})
	
	// it('上传文件',async()=>{
	// 	const upload = await page.callMethod('upload')
	// })
	
})