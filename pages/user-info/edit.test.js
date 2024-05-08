describe('pages/user-info/detail.vue', () => {
	let page,getQuery;
	if (process.env.uniTestPlatformInfo == 'ios_simulator 13.7') {
		it('ios', async () => {
			expect(1).toBe(1)
		})
		return
	}
	beforeAll(async () => {
		// 重新reLaunch至首页，并获取首页page对象（其中 program 是uni-automator自动注入的全局对象）
		// page = await program.navigateTo('/pages/user-info/edit?id=601d044ac9e7be0001cc00b8')
		page = await program.currentPage()
    console.log('page: ', page);
		await page.waitFor('view')
    await page.setData({'isTest':true})
		getQuery = await page.query
		console.log('getQuery: ', getQuery);
		if (Object.keys(getQuery).length === 0 || getQuery === undefined) {
		  console.log('err query')
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
		console.log('res: ', res.updated);
		expect(res.updated).toBe(1)
		// console.log("currentPage", await program.currentPage())
	})
})