describe('pages/validate-demo/add.vue', () => {
	let page
	beforeAll(async () => {
		page = await program.reLaunch('/pages/validate-demo/add')
		await page.waitFor('view')
		await page.setData({isTestMode:true})
	})
	
	afterAll(async () => {
		await page.setData({isTestMode:false})
	})
	
	it('应该能够正确验证表单内容', async () => {
		const formData = {
			type: 1,
			type_name: "数字天堂",
			comment: "我是备注消息",
			username: "林明",
			weight: 51,
			email: "1076998870@qq.com",
			dowload_url: "https://dcloud.io/",
			favorite_book: "4",
			party_member: true,
			hobby: ["dance"],
			address: "110108"
		}
		
		await page.setData({ formData })
		
		// 验证企业名称长度
		expect(formData.type_name.length).toBeGreaterThanOrEqual(4)
		
		// 验证邮箱格式
		expect(formData.email).toMatch(/^\w+@[a-z0-9]+\.[a-z]{2,4}$/)
		
		// 验证URL格式
		expect(formData.dowload_url).toMatch(/^https?:\/\/[\w\-]+(\.[\w\-]+)+([\w\-\.,@?^=%&:\/~\+#]*[\w\-\@?^=%&\/~\+#])?$/)
		
		// 验证体重范围
		expect(formData.weight).toBeGreaterThan(50)
		expect(formData.weight).toBeLessThanOrEqual(500)
		
		const res = await page.callMethod('submit')
		await page.waitFor(500)
		// 验证提交结果
		expect(res.result.id).toBeTruthy();
		expect(res.success).toBe(true);
	})
})
