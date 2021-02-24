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
		const perPage = await page.$('.page')
		//底部角色控制条
		const roles = await perPage.$$('.roles-item')
		//点击创建
		await roles[0].tap()
		//await page.waitFor(600)
		console.log(await roles[0].text())
		
		const unlogin = await page.waitFor(async () => {
		    return await roles[0].text() == '未登陆'
		}) // 等待
		console.log("unlogin: ",unlogin);
		
		
		if (unlogin) {
			const getData = await page.callMethod('getFn','uid,username,nickname,state') 
			expect(getData).not.toBeUndefined();
			
			//删除所有
			const removeAll = await page.callMethod('removeFn','uid,username,nickname,state')
			//console.log(removeAll,"removeAll---------");
			expect(removeAll.code).toBe('PERMISSION_ERROR')
			
			//创建一条数据
			const createOne = await page.callMethod('addFn') 
			//console.log(createOne,"createOne---------");
			expect(createOne.code).toBe('TOKEN_INVALID_ANONYMOUS_USER')
			
			const updateNickname = await page.callMethod(
				'updateFn',
				{"nickname":'新昵称'},'uid == $env.uid'
			)
			//console.log(updateNickname,"updateNickname---------");
			expect(updateNickname).toBe('未能获取当前用户信息：30205 | 当前用户为匿名身份')
			
			const updateAllNickname = await page.callMethod(
				'updateFn',
				{"nickname":'新昵称'}
			)
			//console.log(updateAllNickname,"updateAllNickname---------");
			expect(updateAllNickname).toBe('未能获取当前用户信息：30205 | 当前用户为匿名身份')
			
			
			const updateState = await page.callMethod('updateFn',{state:1})
			//console.log(updateState,"updateState---------");
			expect(updateState).toBe('未能获取当前用户信息：30205 | 当前用户为匿名身份')
			
			const updateAllUsername = await page.callMethod(
				'updateFn',
				{"username":"新姓名"}
			)
			//console.log(updateAllUsername,"updateAllUsername---------");
			expect(updateAllUsername).toBe('未能获取当前用户信息：30205 | 当前用户为匿名身份')
			
			
			const updateUsername = await page.callMethod(
				'updateFn',
				{"username":'新姓名'},'uid == $env.uid'
			)
			//console.log(updateUsername,"updateUsername---------");
			expect(updateUsername).toBe('未能获取当前用户信息：30205 | 当前用户为匿名身份')
			
			await page.callMethod(
				'getFn',
				'uid,username,nickname,state'
			)
			
			const readPhone = await page.callMethod(
				'getFn',
				'uid,username,nickname,state'
			)
			//console.log(readPhone,"readPhone---------");
			//expect(readPhone).toBe('未能获取当前用户信息：30205 | 当前用户为匿名身份')
		}
	})
	
	
	it('用户', async () => {
		const perPage = await page.$('.page')
		//底部角色控制条
		const roles = await perPage.$$('.roles-item')
		//点击创建
		await roles[1].tap()
		//await page.waitFor(600)
		console.log(await roles[1].text())
		
		const user = await page.waitFor(async () => {
		    return await roles[1].text() == '用户'
		}) // 等待
		console.log("user: ",user);
		
		
		if (user) {
			const getData = await page.callMethod('getFn','uid,username,nickname,state') 
			//console.log(getData,"getData---------");
			expect(getData).not.toBeUndefined();
			
			
			const removeAll = await page.callMethod('removeFn','uid,username,nickname,state')
			//console.log(removeAll,"removeAll---------");
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
			//console.log(updateState,"updateState---------");
			//expect(updateState).toBe('权限校验未通过')
			
			
			const updateAllUsername = await page.callMethod(
				'updateFn',
				{"username":"新姓名"}
			)
			expect(updateAllUsername).toBe('权限校验未通过')
			
			
			const updateUsername = await page.callMethod(
				'updateFn',
				{"username":'新姓名'},'uid == $env.uid'
			)
			//console.log(updateUsername,"updateUsername---------");
			expect(updateUsername).toBe('权限校验未通过')
			
			
			
			await page.callMethod(
				'getFn',
				'uid,username,nickname,state'
			)
			
			const readPhone = await page.callMethod(
				'getFn',
				'uid,username,nickname,state'
			)
			//console.log(readPhone,"readPhone---------");
			//expect(readPhone.code).toBe('TOKEN_INVALID_ANONYMOUS_USER')
		
		}
	})
	
	
	
	it('审核员', async () => {
		const perPage = await page.$('.page')
		//底部角色控制条
		const roles = await perPage.$$('.roles-item')
		//点击创建
		await roles[2].tap()
		//await page.waitFor(600)
		console.log(await roles[2].text())
		
		
		const auditor = await page.waitFor(async () => {
		    return await roles[2].text() == '审核员'
		}) // 等待
		console.log("auditor: ",auditor);
		
		
		if (auditor) {
			const getData = await page.callMethod('getFn','uid,username,nickname,state') 
			//console.log(getData,"getData---------");
			expect(getData).not.toBeUndefined();
			
			
			const removeAll = await page.callMethod('removeFn','uid,username,nickname,state')
			//console.log(removeAll,"removeAll---------");
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
		//await page.waitFor(600)
		console.log(await roles[3].text())
		
		const admin = await page.waitFor(async () => {
		    return await roles[3].text() == '管理员'
		}) // 等待
		console.log("admin: ",admin);
		
		
		if (admin) {
			const getData = await page.callMethod('getFn','uid,username,nickname,state') 
			//console.log(getData,"getData---------");
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