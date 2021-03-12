describe('pages/validate-demo/add.vue', () => {

	let page
	beforeAll(async () => {
		// 重新reLaunch至首页，并获取首页page对象（其中 program 是uni-automator自动注入的全局对象）
		page = await program.reLaunch('/pages/validate-demo/add')
		if (process.env.UNI_PLATFORM === "h5") {
			await page.waitFor(1000)
		}
		if (process.env.UNI_PLATFORM === "mp-weixin") {
			await page.waitFor(10000)
		}
		page = await program.currentPage()

		const formData = await page.data('formData')
	})

	it('输入表单内容', async () => {
		let type = 1
		let type_name = "数字天堂"
		let comment = "我是备注消息"
		let username = "林明"
		let weight = 51
		let email = "1076998870@qq.com"
		let dowloadUrl = "https://dcloud.io/"
		const setForm = await page.setData({
			"formData": {
				"type": type,
				"type_name": type_name,
				"comment": comment,
				"username": username,
				"email": email,
				"dowload_url": dowloadUrl,
				"weight": weight,
				"favorite_book": "4",
				"party_member": true,
				"hobby": ["dance"],
				"address": "110108"
			}
		})
		//console.log(await page.data('formData'), "setForm---");

		//姓名只能输入中文
		//expect(username).toMatch(/\u4e00-\u9fa5/);

		//姓名不能超过5位数
		if (type === 0 && type_name.length > 5) {
			expect(type_name).toBeLessThan(5);
		}
		//企业名称不能低于4位数
		if (type === 1 && type_name.length < 4) {
			expect(type_name).toBeGreaterThan(4);
		}
		//expect(type_name).not.toBeUndefined();

		//var re=/\w+@[a-z0-9]+\.[a-z]{2,4}/
		expect(email).toMatch(/\w+@[a-z0-9]+\.[a-z]{2,4}/);

		//url验证
		const urlEx = /^((ht|f)tps?):\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/;
		expect(dowloadUrl).toMatch(urlEx);

		//体重要大于50 小于或等于500
		expect(weight).toBeGreaterThan(50)
		expect(weight).toBeLessThanOrEqual(500)
		await page.callMethod('submit')
	})

})
