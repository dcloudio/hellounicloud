describe('pages/user-info/add.vue', () => {
	let page
  if(process.env.uniTestPlatformInfo == 'ios_simulator 13.7'){
    it('ios', async () => {
    	expect(1).toBe(1)
      return
    })
  }
	beforeAll(async () => {
		// 重新reLaunch至首页，并获取首页page对象（其中 program 是uni-automator自动注入的全局对象）
		page = await program.reLaunch('/pages/user-info/add')
		await page.waitFor('view')
	})
	it('输入表单内容', async () => {
		await page.setData({
			"formData": {
				"username":"小明",
				"gender":1,
				"birth_date": Date.now(),
				"weight":51,
				"mobile":"17755555555",
				"email":"1076998870@qq.com",
				"url":"https://dcloud.io/",
				"favorite_book_id": "4",
				"address_code": "110105",
				"party_member": true,
				"hobby":["dance"],
				"comment": "好的"
			},
			"isTest":true
		})
		await page.callMethod('submit')
	})
})