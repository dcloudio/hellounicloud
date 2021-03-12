describe('pages/clientDB/permission-demo/readme.vue', () => {
	let page
	beforeAll(async () => {
		// 重新reLaunch至首页，并获取首页page对象（其中 program 是uni-automator自动注入的全局对象）
		page = await program.reLaunch(
			'/pages/clientDB/permission-demo/readme')
		if (process.env.UNI_PLATFORM === "h5") {
			await page.waitFor(1000)
		}
		if (process.env.UNI_PLATFORM === "mp-weixin") {
			await page.waitFor(10000)
		}
		page = await program.currentPage()
	})
	
	it('未登陆', async () => {
		
		if (process.env.UNI_PLATFORM === "h5" || process.env.UNI_PLATFORM === "app-plus" ) {
			const perPage = await page.$('.page')
			//底部角色控制条
			const roles = await perPage.$$('.roles-item')
			//点击创建
			await roles[0].tap()
		}
		
		if (process.env.UNI_PLATFORM === "mp-weixin") {
			const perPage = await page.$('.page')
			const setPer = await perPage.$('set-permission')
			//底部角色控制条
			const roles = await setPer.$$('.roles-item')
			//点击创建
			await roles[0].tap()
		}
		
		
		// const perPage = await page.$('.page')
		// //底部角色控制条
		// const roles = await perPage.$$('.roles-item')
		// //点击创建
		// await roles[0].tap()
		
		
		
		const unlogin = await page.waitFor(async()=>{
			const unloginRole = await page.data('currentRole')
			return unloginRole === 0 
		})
		
		
		const getData = await page.callMethod('getFn','uid,username,nickname,state') 
		expect(getData).not.toBeUndefined();
		
		//删除所有
		const removeAll = await page.callMethod('removeFn','uid,username,nickname,state')
		expect(removeAll.code).toBe('PERMISSION_ERROR')
		
		//创建一条数据
		const createOne = await page.callMethod('addFn') 
		expect(createOne.code).toBe('TOKEN_INVALID_ANONYMOUS_USER')
		
		const updateNickname = await page.callMethod(
			'updateFn',
			{"nickname":'新昵称'},'uid == $env.uid'
		)
		expect(updateNickname).toBe('未能获取当前用户信息：30205 | 当前用户为匿名身份')
		
		const updateAllNickname = await page.callMethod(
			'updateFn',
			{"nickname":'新昵称'}
		)
		expect(updateAllNickname).toBe('未能获取当前用户信息：30205 | 当前用户为匿名身份')
		
		
		const updateState = await page.callMethod('updateFn',{state:1})
		expect(updateState).toBe('未能获取当前用户信息：30205 | 当前用户为匿名身份')
		
		const updateAllUsername = await page.callMethod(
			'updateFn',
			{"username":"新姓名"}
		)
		expect(updateAllUsername).toBe('未能获取当前用户信息：30205 | 当前用户为匿名身份')
		
		
		const updateUsername = await page.callMethod(
			'updateFn',
			{"username":'新姓名'},'uid == $env.uid'
		)
		expect(updateUsername).toBe('未能获取当前用户信息：30205 | 当前用户为匿名身份')
		
		await page.callMethod(
			'getFn',
			'uid,username,nickname,state'
		)
		
		const readPhone = await page.callMethod(
			'getFn',
			'uid,username,nickname,state'
		)
	})
	
	
	it('用户', async () => {
		const perPage = await page.$('.page')
		//底部角色控制条
		const roles = await perPage.$$('.roles-item')
		//点击创建
		await roles[1].tap()
		const user = await page.waitFor(async()=>{
			const userRole = await page.data('currentRole')
			return userRole === 'user'
		})
		
		
		const getData = await page.callMethod('getFn','uid,username,nickname,state') 
		expect(getData).not.toBeUndefined();
		
		
		const removeAll = await page.callMethod('removeFn','uid,username,nickname,state')
		expect(removeAll.code).toBe('PERMISSION_ERROR')
		
		//创建一条数据
		await page.callMethod('addFn') 
		
		//更新创建者自己的昵称
		await page.callMethod(
			'updateFn',
			{"nickname":'新昵称'},'uid == $env.uid'
		)
		
		
		const updateAllNickname = await page.callMethod(
			'updateFn',
			{"nickname":'新昵称'}
		)
		//console.log(updateAllNickname,"updateAllNickname---------");
		//expect(updateAllNickname).toBe('权限校验未通过')
		//未能获取当前用户信息：30205 | 当前用户为匿名身份
		
		const updateState = await page.callMethod('updateFn',{state:1})
		expect(updateState).toBe('权限校验未通过')
		
		
		const updateAllUsername = await page.callMethod(
			'updateFn',
			{"username":"新姓名"}
		)
		expect(updateAllUsername).toBe('权限校验未通过')
		
		
		const updateUsername = await page.callMethod(
			'updateFn',
			{"username":'新姓名'},'uid == $env.uid'
		)
		expect(updateUsername).toBe('权限校验未通过')
		
		
		await page.callMethod(
			'getFn',
			'uid,username,nickname,state'
		)
		
		const readPhone = await page.callMethod(
			'getFn',
			'uid,username,nickname,state'
		)
	})
	
	
	
	it('审核员', async () => {
		const perPage = await page.$('.page')
		//底部角色控制条
		const roles = await perPage.$$('.roles-item')
		//点击创建
		await roles[2].tap()
		const auditor = await page.waitFor(async()=>{
			const auditorRole = await page.data('currentRole')
			return auditorRole === 'auditor'
		})
		
		
		const getData = await page.callMethod('getFn','uid,username,nickname,state') 
		expect(getData).not.toBeUndefined();
		
		
		const removeAll = await page.callMethod('removeFn','uid,username,nickname,state')
		expect(removeAll.code).toBe('PERMISSION_ERROR')
		
		
		await page.callMethod('addFn') 
		
		//更新创建者
		await page.callMethod(
			'updateFn',
			{"nickname":'新昵称'},'uid == $env.uid'
		)
		
		//更新表中所有
		const updateAllNickname = await page.callMethod(
			'updateFn',
			{"nickname":'新昵称'}
		)
		
		//state更新为1
		await page.callMethod('updateFn',{state:1})
		
		
		//更新表中所有
		await page.callMethod(
			'updateFn',
			{"username":"新姓名"}
		)
		
		
		//更新创建者
		await page.callMethod(
			'updateFn',
			{"username":'新姓名'},'uid == $env.uid'
		)
		
		
		//读不含phone
		await page.callMethod(
			'getFn',
			'uid,username,nickname,state'
		)
		
		//读含有phone
		await page.callMethod(
			'getFn',
			'uid,username,nickname,state'
		)
		
	})
	
	
	it('管理员', async () => {
		const perPage = await page.$('.page')
		//底部角色控制条
		const roles = await perPage.$$('.roles-item')
		//点击创建
		await roles[3].tap()
		const admin = await page.waitFor(async()=>{
			const adminRole = await page.data('currentRole')
			return adminRole === 'admin'
		})
		
		
		const getData = await page.callMethod('getFn','uid,username,nickname,state') 
		expect(getData).not.toBeUndefined();
		
		//删除所有
		await page.callMethod('removeFn','uid,username,nickname,state')
		
		//新增一条
		await page.callMethod('addFn') 
		
		//更新创建者
		await page.callMethod(
			'updateFn',
			{"nickname":'新昵称'},'uid == $env.uid'
		)
		
		//更新表中所有
		const updateAllNickname = await page.callMethod(
			'updateFn',
			{"nickname":'新昵称'}
		)
		
		//state更新为1
		await page.callMethod('updateFn',{state:1})
		
		
		//更新表中所有
		await page.callMethod(
			'updateFn',
			{"username":"新姓名"}
		)
		
		
		//更新创建者
		await page.callMethod(
			'updateFn',
			{"username":'新姓名'},'uid == $env.uid'
		)
		
		
		//读不含phone
		await page.callMethod(
			'getFn',
			'uid,username,nickname,state'
		)
		
		//读含有phone
		await page.callMethod(
			'getFn',
			'uid,username,nickname,state'
		)
	})
})