describe('pages/user-info/add.vue', () => {

	let page
	beforeAll(async () => {
		// 重新reLaunch至首页，并获取首页page对象（其中 program 是uni-automator自动注入的全局对象）
		page = await program.reLaunch('/pages/user-info/add')
		if (process.env.UNI_PLATFORM === "h5"|| process.env.UNI_PLATFORM === "app-plus") {
			await page.waitFor(1000)
		}
		if (process.env.UNI_PLATFORM === "mp-weixin") {
			await page.waitFor(1000);//微信等待
		}
		page = await program.currentPage()
		// console.log("page-add: ",page);
	})


	beforeEach(async()=>{
		jest.setTimeout(20000)
		return false
	})
	
	it('输入表单内容', async () => {
		
		
		const getForm = await page.data('formData')
		console.log("getForm: ",getForm);
		
		let username = "林小明"
		let weight = 51
		let mobile = "17769516066"
		let email = "1076998870@qq.com"
		let url = "https://dcloud.io/"
		const setForm = await page.setData({
			"formData": {
				"username":username,
				"gender":1,
				"birth_date": 1612519694000,
				"weight":weight,
				"mobile":mobile,
				"email":email,
				"url":url,
				"favorite_book_id": "4",
				"address_code": "110105",
				"party_member": true,
				"hobby":["dance"],
				"comment": "好的"
			}
		})
		//console.log(await page.data('formData'), "setForm---");
		
		//姓名只能输入中文
		//expect(username).toMatch(/^[\u4e00-\u9fa5]+/);
		
		//手机号校验 
		expect(mobile).toMatch(/^1[3|4|5|7|8][0-9]{9}$/);
		
		
		//var re=/\w+@[a-z0-9]+\.[a-z]{2,4}/
		expect(email).toMatch(/\w+@[a-z0-9]+\.[a-z]{2,4}/);
		
		//url验证
		const urlEx = /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/;
		expect(url).toMatch(urlEx);
		
		//体重要大于50 小于或等于500
		expect(weight).toBeGreaterThan(50)
		expect(weight).toBeLessThanOrEqual(500)
		const subRes = await page.callMethod('submit')
		console.log("subRes: ",subRes);
	})
	
	
	
})