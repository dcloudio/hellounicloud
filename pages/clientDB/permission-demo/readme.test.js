describe('pages/clientDB/permission-demo/readme.vue', () => {
	let page,perPage,setPer,roles;
	beforeAll(async () => {
		// 重新reLaunch至首页，并获取首页page对象（其中 program 是uni-automator自动注入的全局对象）
		page = await program.reLaunch(
			'/pages/clientDB/permission-demo/readme')
		await page.waitFor('view')
		perPage = await page.$('.page')
		if (process.env.UNI_PLATFORM === "h5" || process.env.UNI_PLATFORM.startsWith("app") ) {
			roles = await perPage.$$('.roles-item')
		}
		if (process.env.UNI_PLATFORM === "mp-weixin") {
			setPer = await perPage.$('set-permission')
			//底部角色控制条
			roles = await setPer.$$('.roles-item')
		}
	})
	
	it('用户', async () => {
		await roles[1].tap()
		const start = Date.now()
		const user = await page.waitFor(async()=>{
			if(Date.now() - start > 4000){
				console.warn('连接服务器超时')
				return true
			}
			const userRole = await page.data('currentRole')
			return userRole == 'user'
		})
		console.log("user: ",user);
		const getData = await page.callMethod('getFn','uid,username,nickname,state')
		expect(getData).not.toBeUndefined();
		const removeAll = await page.callMethod('removeFn','uid,username,nickname,state')
    // console.log('removeAll',removeAll)
		expect(removeAll.errCode).toBe('PERMISSION_ERROR')
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
	})
	it('未登陆', async () => {
		await roles[0].tap()
		const unlogin = await page.waitFor(async()=>{
			const unloginRole = await page.data('currentRole')
			return unloginRole === 0 
		})
		// console.log("unlogin: ",unlogin);
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
		await roles[2].tap()
		const auditor = await page.waitFor(async()=>{
			const auditorRole = await page.data('currentRole')
			return auditorRole == 'auditor'
		})
		// console.log("auditor",auditor);
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
		await roles[3].tap()
		const admin = await page.waitFor(async()=>{
			const adminRole = await page.data('currentRole')
			return adminRole == 'admin'
		})
		// console.log("admin",admin);
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