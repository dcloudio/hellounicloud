describe('pages/user-info/detail.vue', () => {
	let page
	beforeAll(async () => {
		// 重新reLaunch至首页，并获取首页page对象（其中 program 是uni-automator自动注入的全局对象）
		// page = await program.navigateTo('/pages/user-info/edit?id=601d044ac9e7be0001cc00b8')
		page = await program.currentPage()
		await page.waitFor('view')
	})
	it('修改表单内容', async () => {
		const getQuery = await page.query
		console.log('getQuery: ',getQuery);
		if(getQuery.id || getQuery.hobby_valuetotext.length>0){
			await page.setData({
				"formData": {
					"username":"林小明加",
					"gender":2,
					"birth_date": Date.now(),
					"weight":56,
					"mobile":"17766666666",
					"email":"1076998866@qq.com",
					"url":"https://uniapp.dcloud.net.cn/",
					"favorite_book_id": "4",
					"address_code": "110105",
					"party_member": true,
					"hobby":["dance","Sing","draw"],
					"comment": "好的更新了"
				}
			})
			await page.waitFor(300)
			const res = await page.callMethod('submit')
			console.log('res: ',res.updated);
			expect(res.updated).toBe(1)
		}
	})
})