describe('pages/clientDB/permission-demo/readme.vue', () => {
	
	let page
	beforeAll(async () => {
		// 重新reLaunch至首页，并获取首页page对象（其中 program 是uni-automator自动注入的全局对象）
		page = await program.reLaunch(
			'/pages/clientDB/permission-demo/readme')
		await page.waitFor(1000)
		// page = await program.currentPage()
	})
	
	// beforeEach(async()=>{
	// 	jest.setTimeout(30000)
	// 	return false
	// })
	
	
	it('用户', async () => {
		const perPage = await page.$('.page')
		//底部角色控制条
		const roles = await perPage.$$('.roles-item')
		//点击创建
		await roles[1].tap()
		
		const user = await page.waitFor(async()=>{
			const userRole = await page.data('currentRole')
			return userRole == 'user'
		})
		console.log("user: ",user);

		
		if(user){
			
			const getData = await page.callMethod('getFn','uid,username,nickname,state')
			expect(getData).not.toBeUndefined();
			
			
			const removeAll = await page.callMethod('removeFn','uid,username,nickname,state')
			// expect(removeAll.code).toBe('PERMISSION_ERROR')
			
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
			// expect(updateAllNickname.code).toBe("PERMISSION_ERROR")
			
			const updateState = await page.callMethod('updateFn',{state:1})
			// expect(updateState.code).toBe('PERMISSION_ERROR')
			
			
			
			
			const updateAllUsername = await page.callMethod(
				'updateFn',
				{"username":"新姓名"}
			)
			// expect(updateAllUsername.code).toBe('PERMISSION_ERROR')
			
			const updateUsername = await page.callMethod(
				'updateFn',
				{"username":'新姓名'},'uid == $env.uid'
			)
			// expect(updateUsername.code).toBe('PERMISSION_ERROR')
			
			
			await page.callMethod(
				'getFn',
				'uid,username,nickname,state'
			)
			
			const readPhone = await page.callMethod(
				'getFn',
				'uid,username,nickname,state'
			)
		}
		
		
	})
	
	it('未登陆', async () => {
		
		
		if (process.env.UNI_PLATFORM === "h5" || process.env.UNI_PLATFORM === "app-plus" ) {
			
			
			console.log("h5");
			await page.waitFor(2000)
			const perPage = await page.$('.page')
			//底部角色控制条
			const roles = await perPage.$$('.roles-item')
			//点击创建
			await roles[0].tap()
			
			await page.waitFor(500)
		}
		
		if (process.env.UNI_PLATFORM === "mp-weixin") {
			
			
			await page.waitFor(300)
			console.log("mp-weixin");
			const perPage = await page.$('.page')
			const setPer = await perPage.$('set-permission')
			//底部角色控制条
			const roles = await setPer.$$('.roles-item')
			//点击创建
			await roles[0].tap()
			await page.waitFor(500)
		}
		
		
		const unlogin = await page.waitFor(async()=>{
			const unloginRole = await page.data('currentRole')
			return unloginRole === 0 
		})
		console.log("unlogin: ",unlogin);
	
		
		if(unlogin){
			
			const getData = await page.callMethod('getFn','uid,username,nickname,state')
			expect(getData.data).not.toBeUndefined();
			
			// console.log("getData: ",getData.data);
			
			//删除所有
			const removeAll = await page.callMethod('removeFn','uid,username,nickname,state')
			// expect(removeAll.code).toBe('PERMISSION_ERROR')
			
			//创建一条数据
			const createOne = await page.callMethod('addFn') 
			
			const updateNickname = await page.callMethod(
				'updateFn',
				{"nickname":'新昵称'},'uid == $env.uid'
			)
			// expect(updateNickname.code).toBe('TOKEN_INVALID_ANONYMOUS_USER')
			
			const updateAllNickname = await page.callMethod(
				'updateFn',
				{"nickname":'新昵称'}
			)
			// expect(updateAllNickname.code).toBe('TOKEN_INVALID_ANONYMOUS_USER')
			
			
			const updateState = await page.callMethod('updateFn',{state:1})
			// expect(updateState.code).toBe('TOKEN_INVALID_ANONYMOUS_USER')
			
			const updateAllUsername = await page.callMethod(
				'updateFn',
				{"username":"新姓名"}
			)
			// console.log("updateAllUsername: ",updateAllUsername);
			// expect(updateAllUsername.code).toBe('TOKEN_INVALID_ANONYMOUS_USER')
			
			
			const updateUsername = await page.callMethod(
				'updateFn',
				{"username":'新姓名'},'uid == $env.uid'
			)
			// expect(updateUsername.code).toBe('TOKEN_INVALID_ANONYMOUS_USER')
			
			await page.callMethod(
				'getFn',
				'uid,username,nickname,state'
			)
			
			const readPhone = await page.callMethod(
				'getFn',
				'uid,username,nickname,state'
			)
			
		}
		
	})
	
	it('审核员', async () => {
		const perPage = await page.$('.page')
		//底部角色控制条
		const roles = await perPage.$$('.roles-item')
		//点击创建
		await roles[2].tap()
		const auditor = await page.waitFor(async()=>{
			const auditorRole = await page.data('currentRole')
			return auditorRole == 'auditor'
		})
		// console.log(auditor);
		
		
		if(auditor){
			
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
			
			
		}
		
		
	})
	
	
	it('管理员', async () => {
		const perPage = await page.$('.page')
		//底部角色控制条
		const roles = await perPage.$$('.roles-item')
		//点击创建
		await roles[3].tap()
		const admin = await page.waitFor(async()=>{
			const adminRole = await page.data('currentRole')
			return adminRole == 'admin'
		})
		console.log(admin);

		
		if(admin){
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
			
		}
		
	})

})