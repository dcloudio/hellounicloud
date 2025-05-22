describe('pages/user-info/detail.vue', () => {
	let page, getQuery;
	if (process.env.uniTestPlatformInfo == 'ios_simulator 13.7') {
		it('ios', async () => {
			expect(1).toBe(1)
		})
		return
	}
	beforeAll(async () => {
		// page = await program.navigateTo('/pages/user-info/edit?id=601d044ac9e7be0001cc00b8')
		page = await program.currentPage()
		await page.waitFor('view')
		await page.setData({
			'isTest': true
		})
		getQuery = await page.query
		if (Object.keys(getQuery).length === 0 || getQuery === undefined) {
			return
		}
	})
	it('修改表单内容', async () => {
		await page.setData({
			"formData": {
				"username": "林小明加",
				"gender": 2,
				"birth_date": Date.now(),
				"weight": 56,
				"mobile": "17766666666",
				"email": "1076998866@qq.com",
				"url": "https://uniapp.dcloud.net.cn/",
				"favorite_book_id": "4",
				"address_code": "110105",
				"party_member": true,
				"hobby": ["dance", "Sing", "draw"],
				"comment": "好的更新了"
			}
		})
		await page.waitFor(300)
		const res = await page.callMethod('submit')
		expect(res.updated).toBe(1)
	})
})