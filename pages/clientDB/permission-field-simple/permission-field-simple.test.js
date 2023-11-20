describe('pages/clientDB/permission-field-simple/permission-field-simple.nvue', () => {
	let page,errMsgA,errMsgB,perPage,segItems,roles;
	beforeAll(async () => {
		// 重新reLaunch至首页，并获取首页page对象（其中 program 是uni-automator自动注入的全局对象）
		page = await program.reLaunch(
			'/pages/clientDB/permission-field-simple/permission-field-simple')
		await page.waitFor('view')
		page = await program.currentPage()
		
		errMsgA = "权限校验未通过，参与权限校验的集合：[]，请参考文档：https://uniapp.dcloud.net.cn/uniCloud/schema.html#handler-permission-error"
		
		errMsgB = "权限校验未通过，未能获取当前用户信息，当前用户为匿名身份 ，参与权限校验的集合：[]，请参考文档：https://uniapp.dcloud.net.cn/uniCloud/schema.html#handler-permission-error"
		
		perPage = await page.$('.page')
		//头部操作控制条
		segItems = await perPage.$$('.segmented-control__item')
		//底部角色控制条
		roles = await perPage.$$('.roles-item')
		
	})

	it('创建--未登陆', async () => {
		// const perPage = await page.$('.page')
		//头部操作控制条
		// const segItems = await perPage.$$('.segmented-control__item')
		//底部角色控制条
		// const roles = await perPage.$$('.roles-item')
		//点击创建
		await segItems[0].tap()
		await roles[0].tap()

		const createUnlogin = await page.waitFor(async () => {
			const createUnloginIndex = await page.data('typeIndex')
			const createUnloginRole = await page.data('currentRole')
			return createUnloginIndex === 0 && createUnloginRole === 0
		})

		// console.log("createUnlogin: ",createUnlogin);

		const createA = await page.callMethod('myFn', {
			"type": "create",
			"index": 0
		})
		/* expect(createA).toBe('[permission-test-10.ip.write]权限校验未通过') */

		await page.callMethod('myFn', {
			"type": "create",
			"index": 0,
			"field": "_id,state,create_time,text",
		})

		const createB = await page.callMethod('myFn', {
			"type": "create",
			"index": 1,
		})
		// expect(createB).toBe('未能获取当前用户信息：30205 | 当前用户为匿名身份')

		await page.callMethod('myFn', {
			"type": "create",
			"index": 1,
			"field": "_id,state,create_time,text",
		})

		const createC = await page.callMethod('myFn', {
			"type": "create",
			"index": 2,
		})
		expect(createC).toBe(errMsgB)

		await page.callMethod('myFn', {
			"type": "create",
			"index": 2,
			"field": "_id,state,create_time,text",
		})

	})

	it('读取--未登陆', async () => {
		// const perPage = await page.$('.page')
		//头部操作控制条
		// const segItems = await perPage.$$('.segmented-control__item')
		//底部角色控制条
		// const roles = await perPage.$$('.roles-item')

		//点击读取
		await segItems[1].tap()
		await roles[0].tap()


		const readUnlogin = await page.waitFor(async () => {
			const readUnloginIndex = await page.data('typeIndex')
			const readUnloginRole = await page.data('currentRole')
			return readUnloginIndex === 1 && readUnloginRole === 0
		})
		// console.log("readUnlogin: ",readUnlogin);

		const readA = await page.callMethod('myFn', {
			"type": "read",
			"index": 0
		})
		// console.log("readA: ",readA);
		expect(readA).toBe(errMsgB)

		await page.callMethod('myFn', {
			"type": "read",
			"index": 0,
			"field": "_id,state,create_time,text"
		})

		const readB = await page.callMethod('myFn', {
			"type": "read",
			"index": 1
		})
		expect(readB).toBe(errMsgB)

		await page.callMethod('myFn', {
			"type": "read",
			"index": 1,
			"field": "_id,state,create_time,text"
		})

		const readC = await page.callMethod('myFn', {
			"type": "read",
			"index": 2
		})
		expect(readC).toBe(errMsgB)

		await page.callMethod('myFn', {
			"type": "read",
			"index": 2,
			"field": "_id,state,create_time,text"
		})
	})

	it('更新--未登陆', async () => {
		// const perPage = await page.$('.page')
		//头部操作控制条
		// const segItems = await perPage.$$('.segmented-control__item')
		//底部角色控制条
		// const roles = await perPage.$$('.roles-item')
		//点击更新
		await segItems[2].tap()
		await roles[0].tap()

		const updateUnlogin = await page.waitFor(async () => {
			const updateUnloginIndex = await page.data('typeIndex')
			const updateUnloginRole = await page.data('currentRole')
			return updateUnloginIndex === 2 && updateUnloginRole === 0
		})
		// console.log("updateUnlogin: ",updateUnlogin);

		const updateA = await page.callMethod('myFn', {
			"type": "update",
			"index": 0
		})
		// console.log("updateA: ",updateA);
		expect(updateA).toBe(errMsgB)

		await page.callMethod('myFn', {
			"type": "update",
			"index": 0,
			"field": "_id,state,create_time,text"
		})

		const updateB = await page.callMethod('myFn', {
			"type": "update",
			"index": 1
		})
		// expect(updateB).toBe('未能获取当前用户信息：30205 | 当前用户为匿名身份')
		expect(updateB).toBe(errMsgB)

		await page.callMethod('myFn', {
			"type": "update",
			"index": 1,
			"field": "_id,state,create_time,text"
		})

		const updateC = await page.callMethod('myFn', {
			"type": "update",
			"index": 2
		})
		expect(updateC).toBe(errMsgB)

		await page.callMethod('myFn', {
			"type": "update",
			"index": 2,
			"field": "_id,state,create_time,text"
		})

	})



	it('创建--用户', async () => {
		// const perPage = await page.$('.page')
		//头部操作控制条
		// const segItems = await perPage.$$('.segmented-control__item')
		//底部角色控制条
		// const roles = await perPage.$$('.roles-item')

		//点击创建
		await segItems[0].tap()
		await roles[1].tap()

		const createUser = await page.waitFor(async () => {
			const createUserIndex = await page.data('typeIndex')
			const createUserRole = await page.data('currentRole')
			return createUserIndex === 0 && createUserRole == 'user'
		})
		console.log("createUser: ",createUser);

		const createUserA = await page.callMethod('myFn', {
			"type": "create",
			"index": 0,
		})
		// console.log("createUserA: ",createUserA);
		expect(createUserA).toBe(errMsgA)

		await page.callMethod('myFn', {
			"type": "create",
			"index": 0,
			"field": "_id,state,create_time,text"
		})

		await page.callMethod('myFn', {
			"type": "create",
			"index": 1,
		})
		await page.callMethod('myFn', {
			"type": "create",
			"index": 1,
			"field": "_id,state,create_time,text",
		})

		const createUserB = await page.callMethod('myFn', {
			"type": "create",
			"index": 2,
		})
		// expect(createUserB).toBe('[permission-test-12.ip.write]权限校验未通过')
		//未能获取当前用户信息：30205 | 当前用户为匿名身份
		await page.callMethod('myFn', {
			"type": "create",
			"index": 2,
			"field": "_id,state,create_time,text",
		})

	})

	it('读取--用户', async () => {
		// const perPage = await page.$('.page')
		//头部操作控制条
		// const segItems = await perPage.$$('.segmented-control__item')
		//底部角色控制条
		// const roles = await perPage.$$('.roles-item')
		//点击读取
		await segItems[1].tap()
		await roles[1].tap()

		const readUser = await page.waitFor(async () => {
			const readUserIndex = await page.data('typeIndex')
			const readUserRole = await page.data('currentRole')
			return readUserIndex === 1 && readUserRole == 'user'
		})

		// console.log("readUser: ",readUser);
		
		const readUserA = await page.callMethod('myFn', {
			"type": "read",
			"index": 0
		})
		expect(readUserA).toBe(errMsgA)

		await page.callMethod('myFn', {
			"type": "read",
			"index": 0,
			"field": "_id,state,create_time,text"
		})

		await page.callMethod('myFn', {
			"type": "read",
			"index": 1
		})

		await page.callMethod('myFn', {
			"type": "read",
			"index": 1,
			"field": "_id,state,create_time,text"
		})

		const readUserB = await page.callMethod('myFn', {
			"type": "read",
			"index": 2
		})
		expect(readUserB).toBe(errMsgA)

		await page.callMethod('myFn', {
			"type": "read",
			"index": 2,
			"field": "_id,state,create_time,text"
		})

	})

	it('更新--用户', async () => {
		// const perPage = await page.$('.page')
		//头部操作控制条
		// const segItems = await perPage.$$('.segmented-control__item')
		//底部角色控制条
		// const roles = await perPage.$$('.roles-item')
		//点击更新
		await segItems[2].tap()
		await roles[1].tap()

		const readUser = await page.waitFor(async () => {
			const updateUserIndex = await page.data('typeIndex')
			const updateUserRole = await page.data('currentRole')
			return updateUserIndex === 2 && updateUserRole == 'user'
		})


		const updateUserA = await page.callMethod('myFn', {
			"type": "update",
			"index": 0
		})
		expect(updateUserA).toBe(errMsgA)

		await page.callMethod('myFn', {
			"type": "update",
			"index": 0,
			"field": "_id,state,create_time,text"
		})

		await page.callMethod('myFn', {
			"type": "update",
			"index": 1
		})

		await page.callMethod('myFn', {
			"type": "update",
			"index": 1,
			"field": "_id,state,create_time,text"
		})

		const updateUserB = await page.callMethod('myFn', {
			"type": "update",
			"index": 2
		})
		expect(updateUserB).toBe(errMsgA)

		await page.callMethod('myFn', {
			"type": "update",
			"index": 2,
			"field": "_id,state,create_time,text"
		})

	})


	it('创建--审核员', async () => {
		// const perPage = await page.$('.page')
		//头部操作控制条
		// const segItems = await perPage.$$('.segmented-control__item')
		//底部角色控制条
		// const roles = await perPage.$$('.roles-item')

		//点击创建
		await segItems[0].tap()
		await roles[2].tap()

		const createAuditor = await page.waitFor(async () => {
			const createAuditorIndex = await page.data('typeIndex')
			const createAuditorRole = await page.data('currentRole')
			return createAuditorIndex === 0 && createAuditorRole == 'auditor'
		})

		const createAuditorA = await page.callMethod('myFn', {
			"type": "create",
			"index": 0,
		})
		// console.log("createAuditorA: ",createAuditorA);
		// expect(createAuditorA).toBe('[permission-test-10.ip.write]权限校验未通过')
		expect(createAuditorA).toBe(errMsgA)

		await page.callMethod('myFn', {
			"type": "create",
			"index": 0,
			"field": "_id,state,create_time,text"
		})

		await page.callMethod('myFn', {
			"type": "create",
			"index": 1,
		})

		await page.callMethod('myFn', {
			"type": "create",
			"index": 1,
			"field": "_id,state,create_time,text",
		})

		await page.callMethod('myFn', {
			"type": "create",
			"index": 2,
		})

		await page.callMethod('myFn', {
			"type": "create",
			"index": 2,
			"field": "_id,state,create_time,text",
		})

	})

	it('读取--审核员', async () => {
		// const perPage = await page.$('.page')
		//头部操作控制条
		// const segItems = await perPage.$$('.segmented-control__item')
		//底部角色控制条
		// const roles = await perPage.$$('.roles-item')
		//点击读取
		await segItems[1].tap()
		await roles[2].tap()

		const readAuditor = await page.waitFor(async () => {
			const readAuditorIndex = await page.data('typeIndex')
			const readAuditorRole = await page.data('currentRole')
			return readAuditorIndex === 1 && readAuditorRole == 'auditor'
		})

		const readAuditorA = await page.callMethod('myFn', {
			"type": "read",
			"index": 0
		})
		expect(readAuditorA).toBe(errMsgA)

		await page.callMethod('myFn', {
			"type": "read",
			"index": 0,
			"field": "_id,state,create_time,text"
		})

		await page.callMethod('myFn', {
			"type": "read",
			"index": 1
		})

		await page.callMethod('myFn', {
			"type": "read",
			"index": 1,
			"field": "_id,state,create_time,text"
		})

		await page.callMethod('myFn', {
			"type": "read",
			"index": 2
		})

		await page.callMethod('myFn', {
			"type": "read",
			"index": 2,
			"field": "_id,state,create_time,text"
		})
	})

	it('更新--审核员', async () => {
		// const perPage = await page.$('.page')
		//头部操作控制条
		// const segItems = await perPage.$$('.segmented-control__item')
		//底部角色控制条
		// const roles = await perPage.$$('.roles-item')
		//点击更新
		await segItems[2].tap()
		await roles[2].tap()

		const updateAuditor = await page.waitFor(async () => {
			const updateAuditorIndex = await page.data('typeIndex')
			const updateAuditorRole = await page.data('currentRole')
			return updateAuditorIndex === 2 && updateAuditorRole == 'auditor'
		})

		const updateAuditorA = await page.callMethod('myFn', {
			"type": "update",
			"index": 0
		})
		expect(updateAuditorA).toBe(errMsgA)

		await page.callMethod('myFn', {
			"type": "update",
			"index": 0,
			"field": "_id,state,create_time,text"
		})

		await page.callMethod('myFn', {
			"type": "update",
			"index": 1
		})

		await page.callMethod('myFn', {
			"type": "update",
			"index": 1,
			"field": "_id,state,create_time,text"
		})

		await page.callMethod('myFn', {
			"type": "update",
			"index": 2
		})

		await page.callMethod('myFn', {
			"type": "update",
			"index": 2,
			"field": "_id,state,create_time,text"
		})

	})


	it('创建--管理员', async () => {
		// const perPage = await page.$('.page')
		//头部操作控制条
		// const segItems = await perPage.$$('.segmented-control__item')
		//底部角色控制条
		// const roles = await perPage.$$('.roles-item')
		//点击创建
		await segItems[0].tap()
		await roles[3].tap()

		const createAdmin = await page.waitFor(async () => {
			const createAdminIndex = await page.data('typeIndex')
			const createAdminRole = await page.data('currentRole')
			return createAdminIndex === 0 && createAdminRole == 'admin'
		})

		await page.callMethod('myFn', {
			"type": "create",
			"index": 0,
		})

		await page.callMethod('myFn', {
			"type": "create",
			"index": 0,
			"field": "_id,state,create_time,text"
		})

		await page.callMethod('myFn', {
			"type": "create",
			"index": 1,
		})

		await page.callMethod('myFn', {
			"type": "create",
			"index": 1,
			"field": "_id,state,create_time,text",
		})

		await page.callMethod('myFn', {
			"type": "create",
			"index": 2,
		})

		await page.callMethod('myFn', {
			"type": "create",
			"index": 2,
			"field": "_id,state,create_time,text",
		})

	})

	it('读取--管理员', async () => {
		// const perPage = await page.$('.page')
		//头部操作控制条
		// const segItems = await perPage.$$('.segmented-control__item')
		//底部角色控制条
		// const roles = await perPage.$$('.roles-item')
		//点击读取
		await segItems[1].tap()
		await roles[3].tap()

		const readAdmin = await page.waitFor(async () => {
			const readAdminIndex = await page.data('typeIndex')
			const readAdminRole = await page.data('currentRole')
			return readAdminIndex === 1 && readAdminRole == 'admin'
		})

		await page.callMethod('myFn', {
			"type": "read",
			"index": 0
		})

		await page.callMethod('myFn', {
			"type": "read",
			"index": 0,
			"field": "_id,state,create_time,text"
		})

		await page.callMethod('myFn', {
			"type": "read",
			"index": 1
		})

		await page.callMethod('myFn', {
			"type": "read",
			"index": 1,
			"field": "_id,state,create_time,text"
		})

		await page.callMethod('myFn', {
			"type": "read",
			"index": 2
		})

		await page.callMethod('myFn', {
			"type": "read",
			"index": 2,
			"field": "_id,state,create_time,text"
		})

	})

	it('更新--管理员', async () => {
		// const perPage = await page.$('.page')
		//头部操作控制条
		// const segItems = await perPage.$$('.segmented-control__item')
		//底部角色控制条
		// const roles = await perPage.$$('.roles-item')
		//点击更新
		await segItems[2].tap()
		await roles[3].tap()
		const updateAdmin = await page.waitFor(async () => {
			const updateAdminIndex = await page.data('typeIndex')
			const updateAdminRole = await page.data('currentRole')
			return updateAdminIndex === 2 && updateAdminRole == 'admin'
		})

		await page.callMethod('myFn', {
			"type": "update",
			"index": 0
		})

		await page.callMethod('myFn', {
			"type": "update",
			"index": 0,
			"field": "_id,state,create_time,text"
		})

		await page.callMethod('myFn', {
			"type": "update",
			"index": 1
		})

		await page.callMethod('myFn', {
			"type": "update",
			"index": 1,
			"field": "_id,state,create_time,text"
		})

		await page.callMethod('myFn', {
			"type": "update",
			"index": 2
		})

		await page.callMethod('myFn', {
			"type": "update",
			"index": 2,
			"field": "_id,state,create_time,text"
		})
	})

})
