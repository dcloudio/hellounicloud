describe('pages/clientDB/clientDB.nvue', () => {
	let page
	beforeAll(async () => {
	    // 重新reLaunch至首页，并获取首页page对象（其中 program 是uni-automator自动注入的全局对象）
	    page = await program.reLaunch('/pages/clientDB/clientDB')
	    if (process.env.UNI_PLATFORM === "h5") {
	    	await page.waitFor(1000)
	    }
	    if (process.env.UNI_PLATFORM === "mp-weixin") {
	    	await page.waitFor(10000)
	    }
	    
	    page = await program.currentPage()
	})
	
	it('当前页面-clientDB', async () => {
		expect.assertions(2);
		expect(await page.path).toBe('pages/clientDB/clientDB')
		//当前页面数据length
		const getList = await page.$$('.item')
		expect(getList.length).toBe(5)
	})
	
})