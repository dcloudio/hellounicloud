describe('pages/clientDB/clientDB.vue', () => {
	let page
	beforeAll(async () => {
		page = await program.switchTab('/pages/clientDB/clientDB')
		await page.waitFor('view')
	})
	it('应该正确加载页面并显示导航列表', async () => {
		// 验证页面路径
		expect(await page.path).toBe('pages/clientDB/clientDB')
		// 验证列表项数量
		const list = await page.$$('.item')
		expect(list.length).toBe(5)
		// 验证列表项标题
		const titles = await page.$$('.uni-list-item__content-title')
		expect(titles.length).toBe(5)
		expect(await titles[0].text()).toBe('API操作数据库')
		expect(await titles[1].text()).toBe('unicloud-db组件')
		expect(await titles[2].text()).toBe('控制前端操作数据库的权限')
		expect(await titles[3].text()).toBe('字段值域校验')
		expect(await titles[4].text()).toBe('完整示例')
	})
	
})
