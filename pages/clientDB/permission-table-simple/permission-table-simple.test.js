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
			const createData = await page.callMethod('myFn', {
				"type": "create",
				"index": 0
			})
			expect(createData.success).toBeTruthy()
			
			const createA = await page.callMethod('myFn', {
				"type": "create",
				"index": 1
			})
			// expect(createA).toBe('[permission-test-2.create]权限校验未通过')

			const createB = await page.callMethod('myFn', {
				"type": "create",
				"index": 2
			})
			//expect(createB).toBe('未能获取当前用户信息：30205 | 当前用户为匿名身份')

			const createC = await page.callMethod('myFn', {
				"type": "create",
				"index": 5
			})
			// expect(createC).toBe('未能获取当前用户信息：30205 | 当前用户为匿名身份')


			const createD = await page.callMethod('myFn', {
				"type": "create",
				"index": 6
			})
			// expect(createD.errMsg).toBe(errMsgB)

			await page.callMethod('myFn', {
				"type": "create",
				"index": 6,
				"action": "add_view_count"
			})

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
			const readAll = await page.callMethod('myFn', {
				"type": "read",
				"index": 0
			})
			expect(readAll.errCode).toBe(0)
			
			// 禁止任何角色读取
			const readA = await page.callMethod('myFn', {
				"type": "read",
				"index": 1
			})
			//expect(readA).toBe('权限校验未通过')

			const readB = await page.callMethod('myFn', {
				"type": "read",
				"index": 2
			})
			expect(readB.errMsg).toBe(errMsgB)
			
			// 只能读取自己创建的数据
			const readC = await page.callMethod('myFn', {
				"type": "create",
				"index": 3
			})
			// expect(readC.errMsg).toBe(errMsgB)

			const readD = await page.callMethod('myFn', {
				"type": "read",
				"index": 3,
				"where": "uid == $env.uid"
			})
			expect(readD.errMsg).toBe(errMsgC)

			
			const readE = await page.callMethod('myFn', {
				"type": "read",
				"index": 3
			})
			// expect(readE.errCode).toBe(0)

			const readF = await page.callMethod('myFn', {
				"type": "create",
				"index": 4
			})
			// expect(readF.errCode).toBe(0)


			await page.callMethod('myFn', {
				"type": "read",
				"index": 4,
				"where": "create_time > 1613541303576"
			})

			await page.callMethod('myFn', {
				"type": "read",
				"index": 4
			})
			// 限审核员读取
			const readG = await page.callMethod('myFn', {
				"type": "create",
				"index": 5
			})
			expect(readG.errMsg).toBe(errMsgC)


			const readH = await page.callMethod('myFn', {
				"type": "create",
				"index": 6
			})
			expect(readH.errMsg).toBe(errMsgB)
			// expect(readH).toBe('[permission-test-7.create]权限校验未通过')

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

			await page.callMethod('myFn', {
				"type": "update",
				"index": 0
			})

			const updateA = await page.callMethod('myFn', {
				"type": "update",
				"index": 1
			})
			expect(updateA.errMsg).toBe(errMsgB)

			const updateB = await page.callMethod('myFn', {
				"type": "update",
				"index": 2
			})
			expect(updateB.errMsg).toBe(errMsgB)

			const updateC = await page.callMethod('myFn', {
				"type": "create",
				"index": 3
			})
			expect(updateC.errMsg).toBe(errMsgC)

			const updateD = await page.callMethod('myFn', {
				"type": "update",
				"index": 3,
				"where": "uid == $env.uid"
			})
			expect(updateD.errMsg).toBe(errMsgC)


			const updateE = await page.callMethod('myFn', {
				"type": "update",
				"index": 3
			})
			expect(updateE.success).toBeTruthy()


			const updateF = await page.callMethod('myFn', {
				"type": "create",
				"index": 4
			})
			// expect(updateF.errCode).toBe(0)


			await page.callMethod('myFn', {
				"type": "update",
				"index": 4,
				"where": "create_time > 1613546251521"
			})

			await page.callMethod('myFn', {
				"type": "update",
				"index": 4
			})


			const updateG = await page.callMethod('myFn', {
				"type": "update",
				"index": 5
			})
			expect(updateG.errMsg).toBe(errMsgB)

			const updateH = await page.callMethod('myFn', {
				"type": "update",
				"index": 6
			})
			// expect(updateH.errMsg).toBe(errMsgB)


			await page.callMethod('myFn', {
				"type": "update",
				"index": 6,
				"action": "add_view_count"
			})

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
		//console.log(deleteUnlogin, '删除--未登陆');




		await page.callMethod('myFn', {
			"type": "delete",
			"index": 0
		})

		const deleteA = await page.callMethod('myFn', {
			"type": "delete",
			"index": 1
		})
		expect(deleteA.errMsg).toBe(errMsgB)
		// expect(deleteA).toBe('权限校验未通过')

		const deleteB = await page.callMethod('myFn', {
			"type": "delete",
			"index": 2
		})
		expect(deleteB.errMsg).toBe(errMsgB)

		const deleteC = await page.callMethod('myFn', {
			"type": "create",
			"index": 3
		})
		expect(deleteC.errMsg).toBe(errMsgC)

		const deleteD = await page.callMethod('myFn', {
			"type": "delete",
			"index": 3,
			"where": "uid == $env.uid"
		})
		expect(deleteD.errMsg).toBe(errMsgC)


		const deleteE = await page.callMethod('myFn', {
			"type": "delete",
			"index": 3
		})
		expect(deleteE.success).toBeTruthy()


		const deleteF = await page.callMethod('myFn', {
			"type": "create",
			"index": 4
		})
		console.log('deleteF: ',deleteF);
		expect(deleteF.errMsg).toBe(errMsgC)


		await page.callMethod('myFn', {
			"type": "delete",
			"index": 4,
			"where": "create_time > 1613546644107"
		})

		await page.callMethod('myFn', {
			"type": "delete",
			"index": 4
		})


		const deleteG = await page.callMethod('myFn', {
			"type": "delete",
			"index": 5
		})
		// expect(deleteG).toBe(errMsgB)

		const deleteH = await page.callMethod('myFn', {
			"type": "delete",
			"index": 6
		})
		console.log('deleteH: ',deleteH);
		expect(deleteH.errMsg).toBe(errMsgB)


		await page.callMethod('myFn', {
			"type": "delete",
			"index": 6,
			"action": "add_view_count"
		})




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



		await page.callMethod('myFn', {
			"type": "create",
			"index": 0
		})

		const createUserA = await page.callMethod('myFn', {
			"type": "create",
			"index": 1
		})
		console.log('createUserA: ',createUserA);

		await page.callMethod('myFn', {
			"type": "create",
			"index": 2
		})

		const createUserB = await page.callMethod('myFn', {
			"type": "create",
			"index": 5
		})
		// expect(createUserB).toBe('[permission-test-6.create]权限校验未通过')

		const createUserC = await page.callMethod('myFn', {
			"type": "create",
			"index": 6
		})
		// expect(createUserC.id).toBeTruthy()
		// expect(createUserC).toBe('[permission-test-7.create]权限校验未通过')

		await page.callMethod('myFn', {
			"type": "create",
			"index": 6,
			"action": "add_view_count"
		})

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
		//console.log(readUser, '读取--用户');


		await page.callMethod('myFn', {
			"type": "read",
			"index": 0
		})

		const readUserA = await page.callMethod('myFn', {
			"type": "read",
			"index": 1
		})
		// console.log('readUserA: ',readUserA);
		// expect(readUserA.errMsg).toBe(errMsgA)

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

		const readUserB = await page.callMethod('myFn', {
			"type": "read",
			"index": 5
		})
		expect(readUserB.errMsg).toBe(errMsgA)


		const readUserC = await page.callMethod('myFn', {
			"type": "read",
			"index": 6
		})
		expect(readUserC.errMsg).toBe(errMsgA)

		await page.callMethod('myFn', {
			"type": "read",
			"index": 6,
			"action": "add_view_count"
		})



	})

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


		await page.callMethod('myFn', {
			"type": "update",
			"index": 0
		})

		const updateUserA = await page.callMethod('myFn', {
			"type": "update",
			"index": 1
		})
		expect(updateUserA.errMsg).toBe(errMsgA)

		const updateUserB = await page.callMethod('myFn', {
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


		const updateUserC = await page.callMethod('myFn', {
			"type": "update",
			"index": 5
		})
		expect(updateUserC.errMsg).toBe(errMsgA)

		const updateUserD = await page.callMethod('myFn', {
			"type": "update",
			"index": 6
		})
		expect(updateUserD.errMsg).toBe(errMsgA)


		await page.callMethod('myFn', {
			"type": "update",
			"index": 6,
			"action": "add_view_count"
		})




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
		//console.log(deleteUser, '删除--用户');

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
