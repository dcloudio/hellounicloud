describe('pages/clientDB/permission-table-simple/permission-table-simple.vue', () => {
	let page,errMsgA,errMsgB,errMsgC;
	beforeAll(async () => {
		// 重新reLaunch至首页，并获取首页page对象（其中 program 是uni-automator自动注入的全局对象）
		page = await program.reLaunch(
			'/pages/clientDB/permission-table-simple/permission-table-simple')
		
		await page.waitFor(1000)
		
		errMsgA = "权限校验未通过，参与权限校验的集合：[]，请参考文档：https://uniapp.dcloud.net.cn/uniCloud/schema.html#handler-permission-error"
		
		errMsgB = "权限校验未通过，未能获取当前用户信息，当前用户为匿名身份 ，参与权限校验的集合：[]，请参考文档：https://uniapp.dcloud.net.cn/uniCloud/schema.html#handler-permission-error"
		
		errMsgC = "未能获取当前用户信息：当前用户为匿名身份"
		
		page = await program.currentPage()
	})

	beforeEach(async()=>{
		jest.setTimeout(20000)
		return false
	})


	it('创建--未登陆', async () => {
		const perPage = await page.$('.page')
		//头部操作控制条
		const segItems = await perPage.$$('.segmented-control__item')
		//底部角色控制条
		const roles = await perPage.$$('.roles-item')

		//点击创建
		await segItems[0].tap()
		await roles[0].tap()


		const createUnlogin = await page.waitFor(async () => {
			const createUnlogintIndex = await page.data('typeIndex')
			const createUnloginRole = await page.data('currentRole')
			// console.log({
			// 	createUnlogintIndex,
			// 	createUnloginRole
			// });
			return createUnlogintIndex === 0 && createUnloginRole === 0
		})
		console.log(createUnlogin, "创建--未登陆");

		if (createUnlogin) {
			// 允许任何角色创建本表
			const createA = await page.callMethod('myFn', {
				"type": "create",
				"index": 0
			})
			expect(createA.success).toBeTruthy()
			
			// 禁止任何角色创建，管理员除外
			const createB = await page.callMethod('myFn', {
				"type": "create",
				"index": 1
			})
			expect(createB.errMsg).toBe(errMsgC)
			
			// 需要登录后
			const createC = await page.callMethod('myFn', {
				"type": "create",
				"index": 2
			})
			expect(createC.errMsg).toBe(errMsgC)
			
			// 限审核员角色创建
			const createD = await page.callMethod('myFn', {
				"type": "create",
				"index": 5
			})
			expect(createD.errMsg).toBe(errMsgC)

			// 请求同时必须同时附带执行一个action云函数，如未触发该action则权限验证失败
			const createE = await page.callMethod('myFn', {
				"type": "create",
				"index": 6
			})
			expect(createE.errMsg).toBe(errMsgB)
			
			// 附带执行一个action云函数
			const createAction = await page.callMethod('myFn', {
				"type": "create",
				"index": 6,
				"action": "add_view_count"
			})
			expect(createAction.success).toBeTruthy()
		}

	})

	it('读取--未登陆', async () => {
		const perPage = await page.$('.page')
		//头部操作控制条
		const segItems = await perPage.$$('.segmented-control__item')
		//底部角色控制条
		const roles = await perPage.$$('.roles-item')
		//点击创建
		await segItems[1].tap()
		await roles[0].tap()


		const readUnlogin = await page.waitFor(async () => {
			const readUnloginIndex = await page.data('typeIndex')
			const readUnloginRole = await page.data('currentRole')
			return readUnloginIndex === 1 && readUnloginRole === 0
		})
		//console.log(readUnlogin, '读取--未登陆');


		if (readUnlogin) {
			// 含义解释：允许任何角色【读取】
			const readA = await page.callMethod('myFn', {
				"type": "read",
				"index": 0
			})
			expect(readA.success).toBeTruthy()
			
			// 禁止任何角色读取
			const readB = await page.callMethod('myFn', {
				"type": "read",
				"index": 1
			})
			expect(readB.errMsg).toBe(errMsgB)
			
			// 需登录后读取
			const readC = await page.callMethod('myFn', {
				"type": "read",
				"index": 2
			})
			expect(readC.errMsg).toBe(errMsgB)
			
			// 只能读取自己创建的数据，先创建数据
			const readD = await page.callMethod('myFn', {
				"type": "create",
				"index": 3
			})
			expect(readD.errMsg).toBe(errMsgC)
			
			// 只能读取自己创建的数据
			const readE = await page.callMethod('myFn', {
				"type": "read",
				"index": 3,
				"where": "uid == $env.uid"
			})
			expect(readE.errMsg).toBe(errMsgC)

			// 读取全表数据
			const readF = await page.callMethod('myFn', {
				"type": "read",
				"index": 3
			})
			console.log('readF: ',readF);
			// expect(readF.errMsg).toBe(errMsgC)
			
			
			// 只能读取1分钟内创建的数据，先创建数据
			const readG = await page.callMethod('myFn', {
				"type": "create",
				"index": 4
			})
			expect(readG.errMsg).toBe(errMsgC)
			
			// 只能读取1分钟内创建的数据
			const readH = await page.callMethod('myFn', {
				"type": "read",
				"index": 4,
				"where": "create_time > 1613541303576"
				})
			console.log('readH: ',readH);
			// expect(readH.success).toBeTruthy()
			
			
			// 读取全表数据
			const readI =await page.callMethod('myFn', {
				"type": "read",
				"index": 4
			})
			console.log('readI: ',readI);
			// expect(readI.errCode).toBe(0)
			
			
			// 限审核员读取
			const readJ = await page.callMethod('myFn', {
				"type": "create",
				"index": 5
			})
			expect(readJ.errMsg).toBe(errMsgC)

			// 请求同时必须同时附带执行一个action云函数，如未触发该action则权限验证失败 读取全表数据
			const readK = await page.callMethod('myFn', {
				"type": "create",
				"index": 6
			})
			expect(readK.errMsg).toBe(errMsgB)
			
			// 执行一个action云函数
			const actionRead = await page.callMethod('myFn', {
				"type": "read",
				"index": 6,
				"action": "add_view_count"
			})
			expect(actionRead.errCode).toBe(0)
		}

	})

	it('更新--未登陆', async () => {
		const perPage = await page.$('.page')
		//头部操作控制条
		const segItems = await perPage.$$('.segmented-control__item')
		//底部角色控制条
		const roles = await perPage.$$('.roles-item')

		//点击更新
		await segItems[2].tap()
		await roles[0].tap()

		const updateUnlogin = await page.waitFor(async () => {
			const updateUnloginIndex = await page.data('typeIndex')
			const updateUnloginRole = await page.data('currentRole')
			return updateUnloginIndex === 2 && updateUnloginRole === 0
		})
		//console.log(updateUnlogin, '更新--未登陆');


		if (updateUnlogin) {
			
			// 允许任何角色更新此表
			const updateA = await page.callMethod('myFn', {
				"type": "update",
				"index": 0
			})
			expect(updateA.result.updated).toBeGreaterThanOrEqual(1)
			
			// 禁止任何角色更新，管理员除外
			const updateB = await page.callMethod('myFn', {
				"type": "update",
				"index": 1
			})
			expect(updateB.errMsg).toBe(errMsgB)
			
			// 需要登录后
			const updateC = await page.callMethod('myFn', {
				"type": "update",
				"index": 2
			})
			expect(updateC.errMsg).toBe(errMsgB)
			
			// 只能更新自己创建的数据，先创建数据
			const updateD = await page.callMethod('myFn', {
				"type": "create",
				"index": 3
			})
			expect(updateD.errMsg).toBe(errMsgC)
			
			// 只能更新自己创建的数据
			const updateE = await page.callMethod('myFn', {
				"type": "update",
				"index": 3,
				"where": "uid == $env.uid"
			})
			expect(updateE.errMsg).toBe(errMsgC)

			//更新全表数据表
			const updateF = await page.callMethod('myFn', {
				"type": "update",
				"index": 3
			})
			expect(updateF.result.updated).toBe(0)

			// 只更新1分钟内创建的数据，先创建数据
			const updateG = await page.callMethod('myFn', {
				"type": "create",
				"index": 4
			})
			expect(updateG.errMsg).toBe(errMsgC)

			// 只更新1分钟内创建的数据
			const updateH = await page.callMethod('myFn', {
				"type": "update",
				"index": 4,
				"where": "create_time > 1613546251521"
			})
			expect(updateH.result.updated).toBe(0)
			
			// 更新全表数据
			const updateI = await page.callMethod('myFn', {
				"type": "update",
				"index": 4
			})
			expect(updateI.success).toBeTruthy()

			//限审核员更新全表数据
			const updateJ = await page.callMethod('myFn', {
				"type": "update",
				"index": 5
			})
			expect(updateJ.errMsg).toBe(errMsgB)
			
			// 更新全表 请求同时必须同时附带执行一个action云函数
			const updateK = await page.callMethod('myFn', {
				"type": "update",
				"index": 6
			})
			expect(updateK.errMsg).toBe(errMsgB)

			// 执行一个action云函数
			const updateAction = await page.callMethod('myFn', {
				"type": "update",
				"index": 6,
				"action": "add_view_count"
			})
			expect(updateAction.result.updated).toBe(1)

		}

	})

	it('删除--未登陆', async () => {
		const perPage = await page.$('.page')
		//头部操作控制条
		const segItems = await perPage.$$('.segmented-control__item')
		//底部角色控制条
		const roles = await perPage.$$('.roles-item')

		//点击更新
		await segItems[3].tap()
		await roles[0].tap()

		const deleteUnlogin = await page.waitFor(async () => {
			const deleteUnloginIndex = await page.data('typeIndex')
			const deleteUnloginRole = await page.data('currentRole')
			return deleteUnloginIndex === 3 && deleteUnloginRole === 0
		})
		console.log(deleteUnlogin, '删除--未登陆');

		// 允许任何角色删除全表
		const deleteA = await page.callMethod('myFn', {
			"type": "delete",
			"index": 0
		})
		expect(deleteA.result.deleted).toBeGreaterThan(0)
		
		// 禁止任何角色删除，管理员除外
		const deleteB = await page.callMethod('myFn', {
			"type": "delete",
			"index": 1
		})
		expect(deleteB.errMsg).toBe(errMsgB)
		
		// 需登录后可删除
		const deleteC = await page.callMethod('myFn', {
			"type": "delete",
			"index": 2
		})
		expect(deleteC.errMsg).toBe(errMsgB)
		
		// 只能删除自己创建的数据，先创建数据
		const deleteD = await page.callMethod('myFn', {
			"type": "create",
			"index": 3
		})
		expect(deleteD.errMsg).toBe(errMsgC)
		
		// 只能删除自己创建的数据
		const deleteE = await page.callMethod('myFn', {
			"type": "delete",
			"index": 3,
			"where": "uid == $env.uid"
		})
		expect(deleteE.errMsg).toBe(errMsgC)

		// 删除全表数据
		const deleteF = await page.callMethod('myFn', {
			"type": "delete",
			"index": 3
		})
		console.log('deleteF: ',deleteF);
		// expect(deleteF.success).toBeTruthy()

		// 只更新1分钟内创建的数据，先创建数据
		const deleteG = await page.callMethod('myFn', {
			"type": "create",
			"index": 4
		})
		expect(deleteG.errMsg).toBe(errMsgC)

		// 只更新1分钟内创建的数据
		expect((
			await page.callMethod('myFn', {
				"type": "delete",
				"index": 4,
				"where": "create_time > 1613546644107"
			})
		).success).toBeTruthy()
		
		// 删除全表数据
		expect((
			await page.callMethod('myFn', {
				"type": "delete",
				"index": 4
			})
		).success).toBeTruthy()

		// 删除全表 仅审核员
		const deleteH = await page.callMethod('myFn', {
			"type": "delete",
			"index": 5
		})
		expect(deleteH.errMsg).toBe(errMsgB)
		
		// 更新全表 请求同时必须同时附带执行一个action云函数
		const deleteI = await page.callMethod('myFn', {
			"type": "delete",
			"index": 6
		})
		expect(deleteI.errMsg).toBe(errMsgB)

		// 附带执行一个action云函数
		const deleteAction = await page.callMethod('myFn', {
			"type": "delete",
			"index": 6,
			"action": "add_view_count"
		})
		expect(deleteAction.result.deleted).toBe(1)
	})



	it('创建--用户', async () => {
		const perPage = await page.$('.page')
		//头部操作控制条
		const segItems = await perPage.$$('.segmented-control__item')
		//底部角色控制条
		const roles = await perPage.$$('.roles-item')


		//点击创建
		await segItems[0].tap()
		await roles[1].tap()
		const createUser = await page.waitFor(async () => {
			const typeIndex = await page.data('typeIndex')
			const currentRole = await page.data('currentRole')
			return typeIndex === 0 && currentRole == 'user'
		})
		console.log(createUser, '创建--用户');


		// 任何角色可创建
		const createUserA = await page.callMethod('myFn', {
			"type": "create",
			"index": 0
		})
		expect(createUserA.result.id).toHaveLength(24)
		
		// 禁止任何角色创建，仅管理员
		const createUserB = await page.callMethod('myFn', {
			"type": "create",
			"index": 1
		})
		expect(createUserB.errMsg).toBe(errMsgA)
		
		// 已登录 可创建
		const createUserC = await page.callMethod('myFn', {
			"type": "create",
			"index": 2
		})
		expect(createUserC.result.id).toHaveLength(24)

		// 仅审核员可创建
		const createUserD = await page.callMethod('myFn', {
			"type": "create",
			"index": 5
		})
		expect(createUserD.errMsg).toBe(errMsgA)

		// 请求同时必须同时附带执行一个action云函数，如未触发该action则权限验证失败
		const createUserE = await page.callMethod('myFn', {
			"type": "create",
			"index": 6
		})
		expect(createUserE.errMsg).toBe(errMsgA)
		
		// 附带执行一个action云函数
		const createUserF = await page.callMethod('myFn', {
			"type": "create",
			"index": 6,
			"action": "add_view_count"
		})
		expect(createUserF.result.id).toHaveLength(24)

	})

	it('读取--用户', async () => {
		const perPage = await page.$('.page')
		//头部操作控制条
		const segItems = await perPage.$$('.segmented-control__item')
		//底部角色控制条
		const roles = await perPage.$$('.roles-item')

		//点击读取
		await segItems[1].tap()
		await roles[1].tap()

		const readUser = await page.waitFor(async () => {
			const readUserIndex = await page.data('typeIndex')
			const readUserRole = await page.data('currentRole')
			return readUserIndex === 1 && readUserRole == 'user'
		})
		console.log(readUser, '读取--用户');

		// 任何人可读取
		const readUserA = await page.callMethod('myFn', {
			"type": "read",
			"index": 0
		})
		expect(readUserA.result.data.length).toBeGreaterThan(0)
		
		// 仅管理员可读
		const readUserB = await page.callMethod('myFn', {
			"type": "read",
			"index": 1
		})
		expect(readUserB.errMsg).toBe(errMsgA)
		
		// 登录后可读取
		const readUserC = await page.callMethod('myFn', {
			"type": "read",
			"index": 2
		})
		expect(readUserC.result.data.length).toBeGreaterThan(0)
		
		// 只能读取自己创建的数据，先创建数据
		const readUserD = await page.callMethod('myFn', {
			"type": "create",
			"index": 3
		})
		expect(readUserD.result.id).toHaveLength(24)
		
		// 只能读取自己创建的数据
		const readUserE = await page.callMethod('myFn', {
			"type": "read",
			"index": 3,
			"where": "uid == $env.uid"
		})
		expect(readUserE.result.data.length).toBeGreaterThan(0)
		
		// 读取全表数据
		const readUserF = await page.callMethod('myFn', {
			"type": "read",
			"index": 3
		})
		expect(readUserF.result.data.length).toBeGreaterThan(0)
		
		// 只读取1分钟内创建的数据，先创建数据
		const readUserG = await page.callMethod('myFn', {
			"type": "create",
			"index": 4
		})
		expect(readUserG.result.id).toHaveLength(24)
		
		// 只读取1分钟内创建的数据
		const readUserH = await page.callMethod('myFn', {
			"type": "read",
			"index": 4,
			"where": "create_time > 1613541303576"
		})
		expect(readUserH.result.data.length).toBeGreaterThan(0)
		
		// 读取全表数据
		const readUserI = await page.callMethod('myFn', {
			"type": "read",
			"index": 4
		})
		expect(readUserI.result.data.length).toBeGreaterThanOrEqual(1)
		
		// 仅审核员读取全表数据
		const readUserJ = await page.callMethod('myFn', {
			"type": "read",
			"index": 5
		})
		expect(readUserJ.errMsg).toBe(errMsgA)

		// 请求同时必须同时附带执行一个action云函数，如未触发该action则权限验证失败
		const readUserK = await page.callMethod('myFn', {
			"type": "read",
			"index": 6
		})
		expect(readUserK.errMsg).toBe(errMsgA)
		
		// 执行一个action云函数
		const readUserO = await page.callMethod('myFn', {
			"type": "read",
			"index": 6,
			"action": "add_view_count"
		})
		expect(readUserO.result.data.length).toBeGreaterThan(0)

	})
	// ----------------------------------------------
	it('更新--用户', async () => {
		const perPage = await page.$('.page')
		//头部操作控制条
		const segItems = await perPage.$$('.segmented-control__item')
		//底部角色控制条
		const roles = await perPage.$$('.roles-item')

		//点击更新
		await segItems[2].tap()
		await roles[1].tap()


		const updateUser = await page.waitFor(async () => {
			const updateUserIndex = await page.data('typeIndex')
			const updateUserRole = await page.data('currentRole')
			return updateUserIndex === 2 && updateUserRole == 'user'
		})
		console.log(updateUser, '更新--用户');

		// 允许任何人更新
		const updateUserA = await page.callMethod('myFn', {
			"type": "update",
			"index": 0
		})
		expect(updateUserA.result.updated).toBeGreaterThanOrEqual(1)
		
		// 禁止任何人更新 除管理员
		const updateUserB = await page.callMethod('myFn', {
			"type": "update",
			"index": 1
		})
		expect(updateUserB.errMsg).toBe(errMsgA)
		
		// 需要登录后更新
		const updateUserC = await page.callMethod('myFn', {
			"type": "update",
			"index": 2
		})
		console.log('updateUserC: ',updateUserC);
		
		
		// 仅更新自己创建的数据 先创建数据
		const updateUserD = await page.callMethod('myFn', {
			"type": "create",
			"index": 3
		})
		expect(updateUserD.result.id).toHaveLength(24)

		// 仅更新自己创建的数据 
		const updateUserE = await page.callMethod('myFn', {
			"type": "update",
			"index": 3,
			"where": "uid == $env.uid"
		})
		expect(updateUserE.result.updated).toBeGreaterThanOrEqual(1)
		
		// 更新全部数据
		const updateUserF = await page.callMethod('myFn', {
			"type": "update",
			"index": 3
		})
		expect(updateUserF.result.updated).toBeGreaterThanOrEqual(1)
		
		// 只更新1分钟内创建的数据 先创建数据
		const updateUserG = await page.callMethod('myFn', {
			"type": "create",
			"index": 4
		})
		expect(updateUserG.result.id).toHaveLength(24)

		// 只更新1分钟内创建的数据
		const updateUserH = await page.callMethod('myFn', {
			"type": "update",
			"index": 4,
			"where": "create_time > 1613546251521"
		})
		expect(updateUserH.result.updated).toBeGreaterThanOrEqual(1)
		
		// 更新全部数据
		const updateUserI = await page.callMethod('myFn', {
			"type": "update",
			"index": 4
		})
		expect(updateUserI.result.updated).toBeGreaterThanOrEqual(1)
		
		// 限审核员更新数据
		const updateUserJ = await page.callMethod('myFn', {
			"type": "update",
			"index": 5
		})
		expect(updateUserJ.errMsg).toBe(errMsgA)
		
		// 请求同时必须同时附带执行一个action云函数，如未触发该action则权限验证失败
		const updateUserK = await page.callMethod('myFn', {
			"type": "update",
			"index": 6
		})
		expect(updateUserK.errMsg).toBe(errMsgA)

		// 请求同时必须同时附带执行一个action云函数
		const updateUserAction = await page.callMethod('myFn', {
			"type": "update",
			"index": 6,
			"action": "add_view_count"
		})
		console.log('updateUserAction: ',updateUserAction);

	})

	it('删除--用户', async () => {
		const perPage = await page.$('.page')
		//头部操作控制条
		const segItems = await perPage.$$('.segmented-control__item')
		//底部角色控制条
		const roles = await perPage.$$('.roles-item')

		//点击更新
		await segItems[3].tap()
		await roles[1].tap()

		const deleteUser = await page.waitFor(async () => {
			const deleteUserIndex = await page.data('typeIndex')
			const deleteUserRole = await page.data('currentRole')
			return deleteUserIndex === 3 && deleteUserRole == 'user'
		})
		console.log(deleteUser, '删除--用户');

		await page.callMethod('myFn', {
			"type": "delete",
			"index": 0
		})

		const deleteUserA = await page.callMethod('myFn', {
			"type": "delete",
			"index": 1
		})
		expect(deleteUserA.errMsg).toBe(errMsgA)

		await page.callMethod('myFn', {
			"type": "delete",
			"index": 2
		})

		await page.callMethod('myFn', {
			"type": "create",
			"index": 3
		})

		await page.callMethod('myFn', {
			"type": "delete",
			"index": 3,
			"where": "uid == $env.uid"
		})

		await page.callMethod('myFn', {
			"type": "delete",
			"index": 3
		})

		await page.callMethod('myFn', {
			"type": "create",
			"index": 4
		})

		await page.callMethod('myFn', {
			"type": "delete",
			"index": 4,
			"where": "create_time > 1613547725091"
		})

		await page.callMethod('myFn', {
			"type": "delete",
			"index": 4
		})

		const deleteUserB = await page.callMethod('myFn', {
			"type": "delete",
			"index": 5
		})
		expect(deleteUserB.errMsg).toBe(errMsgA)

		const deleteUserC = await page.callMethod('myFn', {
			"type": "delete",
			"index": 6
		})
		expect(deleteUserC.errMsg).toBe(errMsgA)

		await page.callMethod('myFn', {
			"type": "delete",
			"index": 6,
			"action": "add_view_count"
		})

	})



	it('创建--审核员Auditor', async () => {
		const perPage = await page.$('.page')
		//头部操作控制条
		const segItems = await perPage.$$('.segmented-control__item')
		//底部角色控制条
		const roles = await perPage.$$('.roles-item')

		//点击创建
		await segItems[0].tap()
		await roles[2].tap()

		const createAuditor = await page.waitFor(async () => {
			const createAuditorIndex = await page.data('typeIndex')
			const createAuditorRole = await page.data('currentRole')
			return createAuditorIndex === 0 && createAuditorRole == 'auditor'
		})
		//console.log(createAuditor, '创建--审核员');


		await page.callMethod('myFn', {
			"type": "create",
			"index": 0
		})

		const createAuditorA = await page.callMethod('myFn', {
			"type": "create",
			"index": 1
		})
		expect(createAuditorA.errMsg).toBe(errMsgA)

		await page.callMethod('myFn', {
			"type": "create",
			"index": 2
		})

		await page.callMethod('myFn', {
			"type": "create",
			"index": 5
		})


		const createAuditorB = await page.callMethod('myFn', {
			"type": "create",
			"index": 6
		})
		// expect(createAuditorB.id).toBeTruthy()
		// expect(createAuditorB).toBe('[permission-test-7.create]权限校验未通过')

		await page.callMethod('myFn', {
			"type": "create",
			"index": 6,
			"action": "add_view_count"
		})

	})

	it('读取--审核员', async () => {
		const perPage = await page.$('.page')
		//头部操作控制条
		const segItems = await perPage.$$('.segmented-control__item')
		//底部角色控制条
		const roles = await perPage.$$('.roles-item')

		//点击读取
		await segItems[1].tap()
		await roles[2].tap()

		const readAuditor = await page.waitFor(async () => {
			const readAuditorIndex = await page.data('typeIndex')
			const readAuditorRole = await page.data('currentRole')
			return readAuditorIndex === 1 && readAuditorRole == 'auditor'
		})
		console.log(readAuditor, '读取--审核员');


		await page.callMethod('myFn', {
			"type": "read",
			"index": 0
		})

		const readAuditorA = await page.callMethod('myFn', {
			"type": "read",
			"index": 1
		})
		expect(readAuditorA.errMsg).toBe(errMsgA)

		await page.callMethod('myFn', {
			"type": "read",
			"index": 2
		})

		await page.callMethod('myFn', {
			"type": "create",
			"index": 3
		})

		await page.callMethod('myFn', {
			"type": "read",
			"index": 3,
			"where": "uid == $env.uid"
		})

		await page.callMethod('myFn', {
			"type": "read",
			"index": 3
		})

		await page.callMethod('myFn', {
			"type": "create",
			"index": 4
		})

		await page.callMethod('myFn', {
			"type": "read",
			"index": 4,
			"where": "create_time > 1613541303576"
		})


		await page.callMethod('myFn', {
			"type": "read",
			"index": 4
		})


		await page.callMethod('myFn', {
			"type": "read",
			"index": 5
		})


		const readAuditorB = await page.callMethod('myFn', {
			"type": "read",
			"index": 6
		})
		expect(readAuditorB.errMsg).toBe(errMsgA)

		await page.callMethod('myFn', {
			"type": "read",
			"index": 6,
			"action": "add_view_count"
		})





	})

	it('更新--审核员', async () => {
		const perPage = await page.$('.page')
		//头部操作控制条
		const segItems = await perPage.$$('.segmented-control__item')
		//底部角色控制条
		const roles = await perPage.$$('.roles-item')

		//点击更新
		await segItems[2].tap()
		await roles[2].tap()

		const updateAuditor = await page.waitFor(async () => {
			const updateAuditorIndex = await page.data('typeIndex')
			const updateAuditorRole = await page.data('currentRole')
			return updateAuditorIndex === 2 && updateAuditorRole == 'auditor'
		})
		console.log(updateAuditor, '更新--审核员');


		await page.callMethod('myFn', {
			"type": "update",
			"index": 0
		})

		const updateAuditorA = await page.callMethod('myFn', {
			"type": "update",
			"index": 1
		})
		expect(updateAuditorA.errMsg).toBe(errMsgA)

		await page.callMethod('myFn', {
			"type": "update",
			"index": 2
		})

		await page.callMethod('myFn', {
			"type": "create",
			"index": 3
		})

		await page.callMethod('myFn', {
			"type": "update",
			"index": 3,
			"where": "uid == $env.uid"
		})

		await page.callMethod('myFn', {
			"type": "update",
			"index": 3
		})


		await page.callMethod('myFn', {
			"type": "create",
			"index": 4
		})

		await page.callMethod('myFn', {
			"type": "update",
			"index": 4,
			"where": "create_time > 1613546251521"
		})

		await page.callMethod('myFn', {
			"type": "update",
			"index": 4
		})

		await page.callMethod('myFn', {
			"type": "update",
			"index": 5
		})

		const updateAuditorB = await page.callMethod('myFn', {
			"type": "update",
			"index": 6
		})
		expect(updateAuditorB.errMsg).toBe(errMsgA)

		await page.callMethod('myFn', {
			"type": "update",
			"index": 6,
			"action": "add_view_count"
		})




	})

	it('删除--审核员', async () => {
		const perPage = await page.$('.page')
		//头部操作控制条
		const segItems = await perPage.$$('.segmented-control__item')
		//底部角色控制条
		const roles = await perPage.$$('.roles-item')

		//点击更新
		await segItems[3].tap()
		await roles[2].tap()

		const deleteAuditor = await page.waitFor(async () => {
			const deleteAuditorIndex = await page.data('typeIndex')
			const deleteAuditorRole = await page.data('currentRole')
			return deleteAuditorIndex === 3 && deleteAuditorRole == 'auditor'
		})
		//console.log(deleteAuditor, '删除--审核员');


		await page.callMethod('myFn', {
			"type": "delete",
			"index": 0
		})

		const deleteAuditorA = await page.callMethod('myFn', {
			"type": "delete",
			"index": 1
		})
		expect(deleteAuditorA.errMsg).toBe(errMsgA)

		await page.callMethod('myFn', {
			"type": "delete",
			"index": 2
		})

		await page.callMethod('myFn', {
			"type": "create",
			"index": 3
		})

		await page.callMethod('myFn', {
			"type": "delete",
			"index": 3,
			"where": "uid == $env.uid"
		})

		await page.callMethod('myFn', {
			"type": "delete",
			"index": 3
		})

		await page.callMethod('myFn', {
			"type": "create",
			"index": 4
		})

		await page.callMethod('myFn', {
			"type": "delete",
			"index": 4,
			"where": "create_time > 1613547725091"
		})


		await page.callMethod('myFn', {
			"type": "delete",
			"index": 4
		})



		await page.callMethod('myFn', {
			"type": "delete",
			"index": 5
		})


		const deleteAuditorB = await page.callMethod('myFn', {
			"type": "delete",
			"index": 6
		})
		expect(deleteAuditorB.errMsg).toBe(errMsgA)

		await page.callMethod('myFn', {
			"type": "delete",
			"index": 6,
			"action": "add_view_count"
		})

	})

	it('创建--管理员admin', async () => {
		const perPage = await page.$('.page')
		//头部操作控制条
		const segItems = await perPage.$$('.segmented-control__item')
		//底部角色控制条
		const roles = await perPage.$$('.roles-item')

		//点击创建
		await segItems[0].tap()
		await roles[3].tap()


		const createAdmin = await page.waitFor(async () => {
			const createAdminIndex = await page.data('typeIndex')
			const createAdminRole = await page.data('currentRole')
			return createAdminIndex === 0 && createAdminRole == 'admin'
		})
		console.log(createAdmin, '创建--管理员');


		await page.callMethod('myFn', {
			"type": "create",
			"index": 0
		})

		await page.callMethod('myFn', {
			"type": "create",
			"index": 1
		})


		await page.callMethod('myFn', {
			"type": "create",
			"index": 2
		})

		await page.callMethod('myFn', {
			"type": "create",
			"index": 5
		})


		await page.callMethod('myFn', {
			"type": "create",
			"index": 6
		})


		await page.callMethod('myFn', {
			"type": "create",
			"index": 6,
			"action": "add_view_count"
		})


	})

	it('读取--管理员', async () => {
		const perPage = await page.$('.page')
		//头部操作控制条
		const segItems = await perPage.$$('.segmented-control__item')
		//底部角色控制条
		const roles = await perPage.$$('.roles-item')

		//点击读取
		await segItems[1].tap()
		await roles[3].tap()

		const readAdmin = await page.waitFor(async () => {
			const readAdminIndex = await page.data('typeIndex')
			const readAdminRole = await page.data('currentRole')
			return readAdminIndex === 1 && readAdminRole == 'admin'
		})
		//console.log(readAdmin, '读取--管理员');




		await page.callMethod('myFn', {
			"type": "read",
			"index": 0
		})

		await page.callMethod('myFn', {
			"type": "read",
			"index": 1
		})

		await page.callMethod('myFn', {
			"type": "read",
			"index": 2
		})

		await page.callMethod('myFn', {
			"type": "create",
			"index": 3
		})

		await page.callMethod('myFn', {
			"type": "read",
			"index": 3,
			"where": "uid == $env.uid"
		})

		await page.callMethod('myFn', {
			"type": "read",
			"index": 3
		})

		await page.callMethod('myFn', {
			"type": "create",
			"index": 4
		})

		await page.callMethod('myFn', {
			"type": "read",
			"index": 4,
			"where": "create_time > 1613541303576"
		})



		await page.callMethod('myFn', {
			"type": "read",
			"index": 4
		})


		await page.callMethod('myFn', {
			"type": "read",
			"index": 5
		})

		await page.callMethod('myFn', {
			"type": "read",
			"index": 6
		})

		await page.callMethod('myFn', {
			"type": "read",
			"index": 6,
			"action": "add_view_count"
		})





	})

	it('更新--管理员', async () => {
		const perPage = await page.$('.page')
		//头部操作控制条
		const segItems = await perPage.$$('.segmented-control__item')
		//底部角色控制条
		const roles = await perPage.$$('.roles-item')

		//点击更新
		await segItems[2].tap()
		await roles[3].tap()

		const updateAdmin = await page.waitFor(async () => {
			const updateAdminIndex = await page.data('typeIndex')
			const updateAdminRole = await page.data('currentRole')
			return updateAdminIndex === 2 && updateAdminRole == 'admin'
		})
		//console.log(updateAdmin, '更新--管理员');


		await page.callMethod('myFn', {
			"type": "update",
			"index": 0
		})

		await page.callMethod('myFn', {
			"type": "update",
			"index": 1
		})

		await page.callMethod('myFn', {
			"type": "update",
			"index": 2
		})

		await page.callMethod('myFn', {
			"type": "create",
			"index": 3
		})

		await page.callMethod('myFn', {
			"type": "update",
			"index": 3,
			"where": "uid == $env.uid"
		})

		await page.callMethod('myFn', {
			"type": "update",
			"index": 3
		})


		await page.callMethod('myFn', {
			"type": "create",
			"index": 4
		})

		await page.callMethod('myFn', {
			"type": "update",
			"index": 4,
			"where": "create_time > 1613546251521"
		})

		await page.callMethod('myFn', {
			"type": "update",
			"index": 4
		})

		await page.callMethod('myFn', {
			"type": "update",
			"index": 5
		})

		await page.callMethod('myFn', {
			"type": "update",
			"index": 6
		})

		await page.callMethod('myFn', {
			"type": "update",
			"index": 6,
			"action": "add_view_count"
		})





	})

	it('删除--管理员', async () => {
		const perPage = await page.$('.page')
		//头部操作控制条
		const segItems = await perPage.$$('.segmented-control__item')
		//底部角色控制条
		const roles = await perPage.$$('.roles-item')

		//点击更新
		await segItems[3].tap()
		await roles[3].tap()

		const deleteAdmin = await page.waitFor(async () => {
			const deleteAdminIndex = await page.data('typeIndex')
			const deleteAdminRole = await page.data('currentRole')
			return deleteAdminIndex === 3 && deleteAdminRole === 'admin'
		})
		//console.log(deleteAdmin, '删除--管理员');



		await page.callMethod('myFn', {
			"type": "delete",
			"index": 0
		})

		await page.callMethod('myFn', {
			"type": "delete",
			"index": 1
		})

		await page.callMethod('myFn', {
			"type": "delete",
			"index": 2
		})

		await page.callMethod('myFn', {
			"type": "create",
			"index": 3
		})

		await page.callMethod('myFn', {
			"type": "delete",
			"index": 3,
			"where": "create_time > 1613572491536"
		})

		await page.callMethod('myFn', {
			"type": "delete",
			"index": 3
		})

		await page.callMethod('myFn', {
			"type": "create",
			"index": 4
		})

		await page.callMethod('myFn', {
			"type": "delete",
			"index": 4,
			"where": "create_time > 1613547725091"
		})

		await page.callMethod('myFn', {
			"type": "delete",
			"index": 4
		})

		await page.callMethod('myFn', {
			"type": "delete",
			"index": 5
		})

		await page.callMethod('myFn', {
			"type": "delete",
			"index": 6
		})

		await page.callMethod('myFn', {
			"type": "delete",
			"index": 6,
			"action": "add_view_count"
		})

	})

})
