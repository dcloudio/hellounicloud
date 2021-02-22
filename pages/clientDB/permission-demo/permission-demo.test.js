describe('pages/clientDB/permission-demo/permission-demo.vue', () => {
	let page
	beforeAll(async () => {
		// 重新reLaunch至首页，并获取首页page对象（其中 program 是uni-automator自动注入的全局对象）
		page = await program.reLaunch(
			'/pages/clientDB/permission-demo/permission-demo')
		if (process.env.UNI_PLATFORM === "h5") {
			await page.waitFor(1000)
		}
		if (process.env.UNI_PLATFORM === "mp-weixin") {
			await page.waitFor(10000)
		}
		page = await program.currentPage()
	})

	it('用户', async () => {
		const perPage = await page.$('.page')
		//底部角色控制条
		const roles = await perPage.$$('.roles-item')
		//点击创建
		await roles[1].tap()
		await page.waitFor(600)
		if (await roles[1].text() == '用户') {
			//console.log(await roles[1].text())
			//更新一条数据
			const setDataA = await page.setData({
				"formData": {
					"_id": "60200c3554a29f0001d14586",
					"nickname": "我是一只小鸟",
					"username": "小明",
					"state": 0,
					"phone": "18890903030"
				}
			})
			//console.log(await page.data('formData'), "setDataA-------");
			const buttonGroup = await page.$('.uni-button-group')
			const toButton = await buttonGroup.$('.uni-button')
			await toButton.tap()
			await page.waitFor(800)
		}
	})
	
	it('未登陆', async () => {
		const perPage = await page.$('.page')
		//底部角色控制条
		const roles = await perPage.$$('.roles-item')
		//点击创建
		await roles[0].tap()
		await page.waitFor(600)
		if (await roles[0].text() == '未登陆') {
			//console.log(await roles[0].text())
			const getData = await page.data('formData')
			//console.log('getData---------', getData);
			//expect(getData.nickname).toBe('我是一只小鸟')
			//expect(getData.username).toBe('默认姓名')
		}
	})
	
	it('审核员', async () => {
		const perPage = await page.$('.page')
		//底部角色控制条
		const roles = await perPage.$$('.roles-item')
		//点击创建
		await roles[2].tap()
		await page.waitFor(1200)
		if (await roles[2].text() == '审核员') {
			//console.log(await roles[2].text())
			const setDataB = await page.setData({
				"formData": {
					"_id": "60200c3554a29f0001d14586",
					"nickname": "我是一只小鸟",
					"username": "小明",
					"state":1,
					"phone": "18890903030"
				}
			})
			//console.log(await page.data('formData'), "setDataB-------");
			
		}
	})

	it('管理员', async () => {
		const perPage = await page.$('.page')
		//底部角色控制条
		const roles = await perPage.$$('.roles-item')
		//点击创建
		await roles[3].tap()
		await page.waitFor(1000)
		if (await roles[3].text() == '管理员') {
			//console.log(await roles[3].text())
			const setDataC = await page.setData({
				"formData": {
					"_id": "60200c3554a29f0001d14586",
					"nickname": "我是一只小鸟",
					"username": "小明",
					"state":-1,
					"phone": "18890903030"
				}
			})
			//console.log(await page.data('formData'), "setDataC-------");
		}
	})
	
})
