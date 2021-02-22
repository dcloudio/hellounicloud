describe('pages/schema2code/schema2code.nvue', () => {
	
	let page
	beforeAll(async () => {
	    // 重新reLaunch至首页，并获取首页page对象（其中 program 是uni-automator自动注入的全局对象）
	    page = await program.reLaunch('/pages/schema2code/schema2code')
	    if (process.env.UNI_PLATFORM === "h5") {
	    	await page.waitFor(1000)
	    }
	    if (process.env.UNI_PLATFORM === "mp-weixin") {
	    	await page.waitFor(10000)
	    }
	    
	    page = await program.currentPage()
	})
	
	it('schema2code-检查标题',async()=>{
		const showSchemaCode = await page.callMethod('showSchemaCode')
	})
	
	/* it('播放视频',async()=>{
		const video = await page.$('video')
		await video.tap()
		await page.waitFor(500)
	}) */
	
	it('前往生成的云端一体页面',async()=>{
		
		const toForm = await page.$('.toForm')
		await toForm.tap()
		await page.waitFor(500)
		
		/* expect( (await program.currentPage()).path).toBe('pages/clientDB/unicloud-db-demo/unicloud-db-demo')
		await page.waitFor(500) */
		//返回navigateBack 验证是否返回
		//console.log((await program.navigateBack()).path);
		/* expect((await program.navigateBack()).path).toBe('pages/schema2code/schema2code') */
		
		
	})
	
})