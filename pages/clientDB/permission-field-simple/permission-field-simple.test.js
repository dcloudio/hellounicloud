jest.setTimeout(30000)
describe('pages/clientDB/permission-field-simple/permission-field-simple.nvue', () => {
	let page,perPage,segItems,roles;
	beforeAll(async () => {
		// 重新reLaunch至首页，并获取首页page对象（其中 program 是uni-automator自动注入的全局对象）
		page = await program.reLaunch(
			'/pages/clientDB/permission-field-simple/permission-field-simple')
		await page.waitFor('view')
		page = await program.currentPage()
		perPage = await page.$('.page')
		//头部操作控制条
		segItems = await perPage.$$('.segmented-control__item')
		//底部角色控制条
		roles = await perPage.$$('.roles-item')
	})

	it('创建--未登陆', async () => {
		await segItems[0].tap()
		await roles[0].tap()
    const start = Date.now()
		await page.waitFor(async () => {
      if(Date.now() - start > 5000){
      	console.warn('链接服务器超时')
      	return true
      }
			const createUnloginIndex = await page.data('typeIndex')
			const createUnloginRole = await page.data('currentRole')
			return createUnloginIndex === 0 && createUnloginRole === 0
		})

		const createA = await page.callMethod('myFn', {
			"type": "create",
			"index": 0
		})
    console.log("createA",createA)
    expect(createA).toContain("权限校验未通过");

		await page.callMethod('myFn', {
			"type": "create",
			"index": 0,
			"field": "_id,state,create_time,text",
		})

		const createB = await page.callMethod('myFn', {
			"type": "create",
			"index": 1,
		})
    // console.log("createB",createB)
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
		// console.log('createC: ',createC);

		await page.callMethod('myFn', {
			"type": "create",
			"index": 2,
			"field": "_id,state,create_time,text",
		})
	})

	it('读取--未登陆', async () => {
		await segItems[1].tap()
		await roles[0].tap()
    const start = Date.now()
		await page.waitFor(async () => {
      if(Date.now() - start > 5000){
      	console.warn('链接服务器超时')
      	return true
      }
			const readUnloginIndex = await page.data('typeIndex')
			const readUnloginRole = await page.data('currentRole')
			return readUnloginIndex === 1 && readUnloginRole === 0
		})

		const readA = await page.callMethod('myFn', {
			"type": "read",
			"index": 0
		})
		// console.log("readA: ",readA);

		await page.callMethod('myFn', {
			"type": "read",
			"index": 0,
			"field": "_id,state,create_time,text"
		})

		const readB = await page.callMethod('myFn', {
			"type": "read",
			"index": 1
		})

		await page.callMethod('myFn', {
			"type": "read",
			"index": 1,
			"field": "_id,state,create_time,text"
		})

		const readC = await page.callMethod('myFn', {
			"type": "read",
			"index": 2
		})

		await page.callMethod('myFn', {
			"type": "read",
			"index": 2,
			"field": "_id,state,create_time,text"
		})
	})

	it('更新--未登陆', async () => {
		await segItems[2].tap()
		await roles[0].tap()
    const start = Date.now()
		await page.waitFor(async () => {
      if(Date.now() - start > 5000){
      	console.warn('链接服务器超时')
      	return true
      }
			const updateUnloginIndex = await page.data('typeIndex')
			const updateUnloginRole = await page.data('currentRole')
			return updateUnloginIndex === 2 && updateUnloginRole === 0
		})
		const updateA = await page.callMethod('myFn', {
			"type": "update",
			"index": 0
		})
		// console.log("updateA: ",updateA);

		await page.callMethod('myFn', {
			"type": "update",
			"index": 0,
			"field": "_id,state,create_time,text"
		})

		const updateB = await page.callMethod('myFn', {
			"type": "update",
			"index": 1
		})

		await page.callMethod('myFn', {
			"type": "update",
			"index": 1,
			"field": "_id,state,create_time,text"
		})

		const updateC = await page.callMethod('myFn', {
			"type": "update",
			"index": 2
		})

		await page.callMethod('myFn', {
			"type": "update",
			"index": 2,
			"field": "_id,state,create_time,text"
		})
	})

	it('创建--用户', async () => {
		//点击创建
		await segItems[0].tap()
		await roles[1].tap()
		const start = Date.now()
		await page.waitFor(async () => {
			if(Date.now() - start > 8000){
				console.warn('连接服务器超时')
				return true
			}
			const createUserIndex = await page.data('typeIndex')
			const createUserRole = await page.data('currentRole')
			return createUserIndex === 0 && createUserRole == 'user'
		})

		const createUserA = await page.callMethod('myFn', {
			"type": "create",
			"index": 0,
		})
		// console.log("createUserA: ",createUserA);

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
		await page.callMethod('myFn', {
			"type": "create",
			"index": 2,
			"field": "_id,state,create_time,text",
		})
	})

	it('读取--用户', async () => {
		await segItems[1].tap()
		await roles[1].tap()

		await page.waitFor(async () => {
			const readUserIndex = await page.data('typeIndex')
			const readUserRole = await page.data('currentRole')
			return readUserIndex === 1 && readUserRole == 'user'
		})
		
		const readUserA = await page.callMethod('myFn', {
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

		const readUserB = await page.callMethod('myFn', {
			"type": "read",
			"index": 2
		})

		await page.callMethod('myFn', {
			"type": "read",
			"index": 2,
			"field": "_id,state,create_time,text"
		})

	})

	it('更新--用户', async () => {
		await segItems[2].tap()
		await roles[1].tap()

		const readUser = await page.waitFor(async () => {
			const updateUserIndex = await page.data('typeIndex')
			const updateUserRole = await page.data('currentRole')
			return updateUserIndex === 2 && updateUserRole == 'user'
		})
    // console.log('readUser',readUser)
		if(readUser){
			const updateUserA = await page.callMethod('myFn', {
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
			
			const updateUserB = await page.callMethod('myFn', {
				"type": "update",
				"index": 2
			})
			
			await page.callMethod('myFn', {
				"type": "update",
				"index": 2,
				"field": "_id,state,create_time,text"
			})
		}

	})

	it('创建--审核员', async () => {
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
		await segItems[2].tap()
		await roles[2].tap()

		const updateAuditor = await page.waitFor(async () => {
			const updateAuditorIndex = await page.data('typeIndex')
			const updateAuditorRole = await page.data('currentRole')
			return updateAuditorIndex === 2 && updateAuditorRole == 'auditor'
		})
		// console.log('updateAuditor: ',updateAuditor);

		const updateAuditorA = await page.callMethod('myFn', {
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

	it('创建--管理员', async () => {
		await segItems[0].tap()
		await roles[3].tap()

		const createAdmin = await page.waitFor(async () => {
			const createAdminIndex = await page.data('typeIndex')
			const createAdminRole = await page.data('currentRole')
			return createAdminIndex === 0 && createAdminRole == 'admin'
		})
		// console.log('createAdmin: ',createAdmin);

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
		await segItems[1].tap()
		await roles[3].tap()

		const readAdmin = await page.waitFor(async () => {
			const readAdminIndex = await page.data('typeIndex')
			const readAdminRole = await page.data('currentRole')
			return readAdminIndex === 1 && readAdminRole == 'admin'
		})
		// console.log('readAdmin: ',readAdmin);

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
		await segItems[2].tap()
		await roles[3].tap()
		
		const updateAdmin = await page.waitFor(async () => {
			const updateAdminIndex = await page.data('typeIndex')
			const updateAdminRole = await page.data('currentRole')
			return updateAdminIndex === 2 && updateAdminRole == 'admin'
		})
		// console.log('updateAdmin: ',updateAdmin);
		
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
