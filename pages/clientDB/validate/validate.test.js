describe('pages/clientDB/validate/validate.vue', () => {

	let page
	beforeAll(async () => {
		// 重新reLaunch至首页，并获取首页page对象（其中 program 是uni-automator自动注入的全局对象）
		page = await program.reLaunch('/pages/clientDB/validate/validate')
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

	it('点击切换navBar', async () => {
		//expect.assertions(1);
		const segmentedControl = await page.$('.segmented-control')
		
		const seControl = await segmentedControl.$$('.segmented-control__item')
		// console.log(await seControl[0].text());
		expect(await seControl[0].text()).toBe('实例demo')
		
		await seControl[1].tap()
		await page.waitFor(300)
		
		await seControl[2].tap()
		await page.waitFor(300)
		
	})

})
