describe('pages/clientDB/permission-demo/permission-demo.vue', () => {
	let page,perPage,setPer,roles;
	beforeAll(async () => {
		// 重新reLaunch至首页，并获取首页page对象（其中 program 是uni-automator自动注入的全局对象）
		page = await program.reLaunch(
			'/pages/clientDB/permission-demo/permission-demo')
		await page.waitFor('view')
		page = await program.currentPage()
		perPage = await page.$('.page')
		
		if (process.env.UNI_PLATFORM === "h5" || process.env.UNI_PLATFORM.startsWith("app") ) {
			//底部角色控制条
			roles = await perPage.$$('.roles-item')
		}
		if (process.env.UNI_PLATFORM === "mp-weixin") {
			setPer = await perPage.$('set-permission')
			//底部角色控制条
			roles = await setPer.$$('.roles-item')
		}
		
	})
	it('未登陆', async () => {
		await roles[0].tap()
		const unlogin = await page.waitFor(async()=>{
			const unloginRole = await page.data('rulo_index')
			return unloginRole === 0 
		})
		const getData = await page.data('formData')
	})

	it('用户', async () => {
		await roles[1].tap()
		const user = await page.waitFor(async()=>{
			const userRole = await page.data('rulo_index')
			//console.log("userRole: ",userRole);
			return userRole === 1 
		})
		console.log("user: ",user);
		if(user){
			//更新一条数据
			const setDataA = await page.setData({
				"formData": {
					"_id": "60200c3554a29f0001d14586",
					"nickname": "我是学生",
					"username": "小明",
					"state": 0,
					"phone": "18890903030"
				}
			})
			const perPagea = await page.$('.page')
			const buttonGroup = await perPagea.$('.uni-button-group')
			const toButton = await buttonGroup.$('.uni-button')
			await toButton.tap()
			await page.waitFor(800)
		}
		
	})
	
	it('审核员', async () => {
		await roles[2].tap()
		const auditor = await page.waitFor(async()=>{
			const auditorRole = await page.data('rulo_index')
			return auditorRole === 2 
		})
		
		if(auditor){
			const setDataB = await page.setData({
				"formData": {
					"_id": "60200c3554a29f0001d14586",
					"nickname": "我是学生",
					"username": "小明",
					"state":1,
					"phone": "18890903030"
				}
			})
		}
		//console.log(await page.data('formData'), "setDataB-------");
	})

	it('管理员', async () => {
		await roles[3].tap()
		const admin = await page.waitFor(async()=>{
			const adminRole = await page.data('rulo_index')
			return adminRole === 3 
		})
		if(admin){
			const setDataC = await page.setData({
				"formData": {
					"_id": "60200c3554a29f0001d14586",
					"nickname": "我是学生",
					"username": "小明",
					"state":-1,
					"phone": "18890903030"
				}
			})
		}
	})
	
})
