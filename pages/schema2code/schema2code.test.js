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
	
	it('schema2code-点击',async()=>{
		
		const title = await page.$('.uni-title')
		
		const showSchemaCode = await title.$('.showSchemaCode')
		await showSchemaCode.tap()
		await page.waitFor(300)
		
		// const showSchemaCode = await page.callMethod('showSchemaCode')
	})
	
	
	it('前往生成的云端一体页面',async()=>{
		
		const toForm = await page.$('.toForm')
		await toForm.tap()
		await page.waitFor(500)
		
		expect( (await program.currentPage()).path).toBe('pages/user-info/list')
		await page.waitFor(500) 
		//返回navigateBack 验证是否返回
		expect((await program.navigateBack()).path).toBe('pages/schema2code/schema2code')
	})
	
})