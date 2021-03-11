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
	
	it('未登陆', async () => {
		//console.log(process.env.UNI_PLATFORM);
	
		if (process.env.UNI_PLATFORM === "h5" || process.env.UNI_PLATFORM === "app-plus" 
		|| process.env.UNI_PLATFORM === "ios"  ) {
			const perPage = await page.$('.page')
			//底部角色控制条
			const roles = await perPage.$$('.roles-item')
			//点击创建
			await roles[0].tap()
			//console.log("222: ",await roles[0].text());
		}
		
		if (process.env.UNI_PLATFORM === "mp-weixin") {
			const perPage = await page.$('.page')
			const setPer = await perPage.$('set-permission')
			//底部角色控制条
			const roles = await setPer.$$('.roles-item')
			//点击创建
			await roles[0].tap()
			
		}
		
		
		const unlogin = await page.waitFor(async()=>{
			const unloginRole = await page.data('rulo_index')
			return unloginRole === 0 
		})
		//console.log(unlogin,"unlogin------------------------------");
		
		const getData = await page.data('formData')
		//console.log('getData---------', getData);
		
	})

	it('用户', async () => {
		if (process.env.UNI_PLATFORM === "h5" || process.env.UNI_PLATFORM === "app-plus" 
		|| process.env.UNI_PLATFORM === "ios" ) {
			const perPage = await page.$('.page')
			//底部角色控制条
			const roles = await perPage.$$('.roles-item')
			//点击创建
			await roles[1].tap()
		}
		
		if (process.env.UNI_PLATFORM === "mp-weixin") {
			const perPage = await page.$('.page')
			const setPer = await perPage.$('set-permission')
			//底部角色控制条
			const roles = await setPer.$$('.roles-item')
			//点击创建
			await roles[1].tap()
		}
		
		
		const user = await page.waitFor(async()=>{
			const userRole = await page.data('rulo_index')
			return userRole === 1 
		})
		//console.log("user: ",user);
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
		
	})
	
	
	
	it('审核员', async () => {
		
		if (process.env.UNI_PLATFORM === "h5" || process.env.UNI_PLATFORM === "app-plus" 
		|| process.env.UNI_PLATFORM === "ios"  ) {
			const perPage = await page.$('.page')
			//底部角色控制条
			const roles = await perPage.$$('.roles-item')
			
			//点击创建
			await roles[2].tap()
		}
		
		
		if (process.env.UNI_PLATFORM === "mp-weixin") {
			const perPage = await page.$('.page')
			const setPer = await perPage.$('set-permission')
			//底部角色控制条
			const roles = await setPer.$$('.roles-item')
			
			//点击创建
			await roles[2].tap()
		}
		
		
		
		const auditor = await page.waitFor(async()=>{
			const auditorRole = await page.data('rulo_index')
			return auditorRole === 2 
		})
		//console.log(auditor,"auditor------------------------------");
		
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
			
		
	})

	it('管理员', async () => {
		/* const perPage = await page.$('.page')
		//底部角色控制条
		const roles = await perPage.$$('.roles-item') */
		
		if (process.env.UNI_PLATFORM === "h5" || process.env.UNI_PLATFORM === "app-plus" 
		|| process.env.UNI_PLATFORM === "ios"  ) {
			const perPage = await page.$('.page')
			//底部角色控制条
			const roles = await perPage.$$('.roles-item')
			//点击创建
			await roles[3].tap()
		}
		
		if (process.env.UNI_PLATFORM === "mp-weixin") {
			const perPage = await page.$('.page')
			const setPer = await perPage.$('set-permission')
			//底部角色控制条
			const roles = await setPer.$$('.roles-item')
			//点击创建
			await roles[3].tap()
		}
		
		
		
		const admin = await page.waitFor(async()=>{
			const adminRole = await page.data('rulo_index')
			return adminRole === 3 
		})
		//console.log(admin,"admin------------------------------");
		
		
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
		
	})
	
})
