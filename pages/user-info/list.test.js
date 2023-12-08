// 	jest.setTimeout(20000)
describe('pages/user-info/list.vue', () => {
	let page,currentPage;
	beforeAll(async () => {
		// 重新reLaunch至首页，并获取首页page对象（其中 program 是uni-automator自动注入的全局对象）
		page = await program.navigateTo('/pages/user-info/list')
		await page.waitFor('view')
	})
	it('点击fab跳转到添加页',async()=>{
		await page.callMethod('fabClick')
		await page.waitFor(500)
		currentPage = await program.currentPage()
		expect(currentPage.path).toBe('pages/user-info/add')
		await program.navigateBack()
	})
	it('点击第一条',async()=>{
		const items = await page.$$('.uni-list-item')
		await items[0].tap()
		await page.waitFor(500)
		currentPage = await program.currentPage()
		expect(currentPage.path).toBe('pages/user-info/detail')
		// await program.navigateBack()
		// console.log('currentPage',await program.currentPage())
	})
})