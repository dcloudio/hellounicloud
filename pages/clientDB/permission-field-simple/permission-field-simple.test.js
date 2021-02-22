describe('pages/clientDB/permission-field-simple/permission-field-simple.nvue', () => {
	let page
	beforeAll(async () => {
		// 重新reLaunch至首页，并获取首页page对象（其中 program 是uni-automator自动注入的全局对象）
		page = await program.reLaunch(
		'/pages/clientDB/permission-field-simple/permission-field-simple')
		if (process.env.UNI_PLATFORM === "h5") {
			await page.waitFor(1000)
		}
		if (process.env.UNI_PLATFORM === "mp-weixin") {
			await page.waitFor(10000)
		}
		page = await program.currentPage()
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
		await page.waitFor(1400)
		console.log(
			await segItems[0].text(),
			await roles[0].text()
		)
		
		const createUnlogin = await page.waitFor(async () => {
		    return await segItems[0].text() == '创建' && await roles[0].text() == '未登陆'
		}) // 等待
		console.log("createUnlogin: ",createUnlogin);
		
		
		
		if(createUnlogin){
			const createA = await page.callMethod('myFn',{
				"type":"create","index":0
			})
			//console.log(createA,"createA---------");
			/* expect(createA).toBe('[permission-test-10.ip.write]权限校验未通过') */
			
			await page.callMethod('myFn',{
				"type":"create",
				"index":0,
				"field":"_id,state,create_time,text",
			})
			
			const createB = await page.callMethod('myFn',{
				"type":"create",
				"index":1,
			})
			//console.log(createB,"createB---------");
			expect(createB).toBe('未能获取当前用户信息：30205 | 当前用户为匿名身份')
			
			await page.callMethod('myFn',{
				"type":"create",
				"index":1,
				"field":"_id,state,create_time,text",
			})
			
			const createC = await page.callMethod('myFn',{
				"type":"create",
				"index":2,
			})
			//console.log(createC,"createC---------");
			expect(createC).toBe('未能获取当前用户信息：30205 | 当前用户为匿名身份')
			
			
			
			await page.callMethod('myFn',{
				"type":"create",
				"index":2,
				"field":"_id,state,create_time,text",
			})
		}
	})

	it('读取--未登陆', async () => {
		const perPage = await page.$('.page')
		//头部操作控制条
		const segItems = await perPage.$$('.segmented-control__item')
		//底部角色控制条
		const roles = await perPage.$$('.roles-item')
		
		//点击读取
		await segItems[1].tap()
		await roles[0].tap()
		//await page.waitFor(1400)
		console.log(
			await segItems[1].text(),
			await roles[0].text()
		)
		
		const readUnlogin = await page.waitFor(async () => {
		    return await segItems[1].text() == '读取' && await roles[0].text() == '未登陆'
		}) // 等待
		console.log("readUnlogin: ",readUnlogin);
		
		
		if(readUnlogin){
			
			
			const readA = await page.callMethod('myFn',{
				"type":"read","index":0
			})
			//console.log(readA,"readA---------");
			expect(readA).toBe('权限校验未通过')
			
			await page.callMethod('myFn',{
				"type":"read",
				"index":0,
				"field":"_id,state,create_time,text"
			})
			
			const readB = await page.callMethod('myFn',{
				"type":"read",
				"index":1
			})
			//console.log(readB,"readB---------");
			expect(readB).toBe('未能获取当前用户信息：30205 | 当前用户为匿名身份')
			
			await page.callMethod('myFn',{
				"type":"read",
				"index":1,
				"field":"_id,state,create_time,text"
			})
			
			const readC = await page.callMethod('myFn',{
				"type":"read",
				"index":2
			})
			//console.log(readC,"readC---------");
			expect(readC).toBe('未能获取当前用户信息：30205 | 当前用户为匿名身份')
			
			await page.callMethod('myFn',{
				"type":"read",
				"index":2,
				"field":"_id,state,create_time,text"
			})
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
		//await page.waitFor(1400)
		console.log(
			await segItems[2].text(),
			await roles[0].text()
		)
		
		const updateUnlogin = await page.waitFor(async () => {
		    return await segItems[2].text() == '更新' && await roles[0].text() == '未登陆'
		}) // 等待
		console.log("updateUnlogin: ",updateUnlogin);
		
		
		if(updateUnlogin){
			const updateA = await page.callMethod('myFn',{
				"type":"update","index":0
			})
			//console.log(updateA,"updateA---------");
			expect(updateA).toBe('权限校验未通过')
			
			await page.callMethod('myFn',{
				"type":"update",
				"index":0,
				"field":"_id,state,create_time,text"
			})
			
			const updateB = await page.callMethod('myFn',{
				"type":"update",
				"index":1
			})
			//console.log(updateB,"updateB---------");
			expect(updateB).toBe('未能获取当前用户信息：30205 | 当前用户为匿名身份')
			
			await page.callMethod('myFn',{
				"type":"update",
				"index":1,
				"field":"_id,state,create_time,text"
			})
			
			const updateC = await page.callMethod('myFn',{
				"type":"update",
				"index":2
			})
			//console.log(updateC,"updateC---------");
			expect(updateC).toBe('未能获取当前用户信息：30205 | 当前用户为匿名身份')
			
			await page.callMethod('myFn',{
				"type":"update",
				"index":2,
				"field":"_id,state,create_time,text"
			})
		}
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
		await page.waitFor(1400)
		console.log(
			await segItems[0].text(),
			await roles[1].text()
		)
		
		
		const createUser = await page.waitFor(async () => {
		    return await segItems[0].text() == '创建' && await roles[1].text() == '用户'
		}) // 等待
		console.log("createUser: ",createUser);
		
		
		if(createUser){
			const createUserA = await page.callMethod('myFn',{
				"type":"create",
				"index":0,
			})
			//console.log(createUserA,"createUserA---------");
			expect(createUserA).toBe('[permission-test-10.ip.write]权限校验未通过')
			
			await page.callMethod('myFn',{
				"type":"create",
				"index":0,
				"field":"_id,state,create_time,text"
			})
			
			await page.callMethod('myFn',{
				"type":"create",
				"index":1,
			})
			
			
			await page.callMethod('myFn',{
				"type":"create",
				"index":1,
				"field":"_id,state,create_time,text",
			})
			
			const createUserB = await page.callMethod('myFn',{
				"type":"create",
				"index":2,
			})
			//console.log(createUserB,"createUserB---------");
			/* expect(createUserB).toBe('未能获取当前用户信息：30205 | 当前用户为匿名身份') */
			
			//[permission-test-12.ip.write]权限校验未通过
			//未能获取当前用户信息：30205 | 当前用户为匿名身份
			
			await page.callMethod('myFn',{
				"type":"create",
				"index":2,
				"field":"_id,state,create_time,text",
			})
		}
		
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
		//await page.waitFor(1400)
		console.log(
			await segItems[1].text(),
			await roles[1].text()
		)
		
		const readUser = await page.waitFor(async () => {
		    return await segItems[1].text() == '读取' && await roles[1].text() == '用户'
		}) // 等待
		console.log("readUser: ",readUser);
		
		
		
		if(readUser){
			const readUserA = await page.callMethod('myFn',{
				"type":"read",
				"index":0
			})
			//console.log(readUserA,"readUserA---------");
			expect(readUserA).toBe('权限校验未通过')
			
			await page.callMethod('myFn',{
				"type":"read",
				"index":0,
				"field":"_id,state,create_time,text"
			})
			
			await page.callMethod('myFn',{
				"type":"read",
				"index":1
			})
			
			await page.callMethod('myFn',{
				"type":"read",
				"index":1,
				"field":"_id,state,create_time,text"
			})
			
			const readUserB = await page.callMethod('myFn',{
				"type":"read",
				"index":2
			})
			//console.log(readUserB,"readUserB---------");
			expect(readUserB).toBe('权限校验未通过')
			
			await page.callMethod('myFn',{
				"type":"read",
				"index":2,
				"field":"_id,state,create_time,text"
			})
		}
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
		//await page.waitFor(1400)
		console.log(
			await segItems[2].text(),
			await roles[1].text()
		)
		
		const updateUser = await page.waitFor(async () => {
		    return await segItems[2].text() == '更新' && await roles[1].text() == '用户'
		}) // 等待
		console.log("updateUser: ",updateUser);
		
		
		
		if(updateUser){
			
			const updateUserA = await page.callMethod('myFn',{
				"type":"update",
				"index":0
			})
			//console.log(updateUserA,"updateUserA---------");
			expect(updateUserA).toBe('权限校验未通过')
			
			await page.callMethod('myFn',{
				"type":"update",
				"index":0,
				"field":"_id,state,create_time,text"
			})
			
			await page.callMethod('myFn',{
				"type":"update",
				"index":1
			})
			
			
			await page.callMethod('myFn',{
				"type":"update",
				"index":1,
				"field":"_id,state,create_time,text"
			})
			
			const updateUserB = await page.callMethod('myFn',{
				"type":"update",
				"index":2
			})
			//console.log(updateUserB,"updateUserB---------");
			expect(updateUserB).toBe('权限校验未通过')
			
			await page.callMethod('myFn',{
				"type":"update",
				"index":2,
				"field":"_id,state,create_time,text"
			})
		}
	})
	
	
	it('创建--审核员', async () => {
		const perPage = await page.$('.page')
		//头部操作控制条
		const segItems = await perPage.$$('.segmented-control__item')
		//底部角色控制条
		const roles = await perPage.$$('.roles-item')
		
		//点击创建
		await segItems[0].tap()
		await roles[2].tap()
		//await page.waitFor(1400)
		console.log(
			await segItems[0].text(),
			await roles[2].text()
		)
		
		
		const createAuditor = await page.waitFor(async () => {
		    return await segItems[0].text() == '创建' && await roles[2].text() == '审核员'
		}) // 等待
		console.log("createAuditor: ",createAuditor);
		
		
		
		
		if(createAuditor){
			const createAuditorA = await page.callMethod('myFn',{
				"type":"create",
				"index":0,
			})
			//console.log(createAuditorA,"createAuditorA---------");
			expect(createAuditorA).toBe('[permission-test-10.ip.write]权限校验未通过')
			
			await page.callMethod('myFn',{
				"type":"create",
				"index":0,
				"field":"_id,state,create_time,text"
			})
			
			await page.callMethod('myFn',{
				"type":"create",
				"index":1,
			})
			
			await page.callMethod('myFn',{
				"type":"create",
				"index":1,
				"field":"_id,state,create_time,text",
			})
			
			await page.callMethod('myFn',{
				"type":"create",
				"index":2,
			})
			
			await page.callMethod('myFn',{
				"type":"create",
				"index":2,
				"field":"_id,state,create_time,text",
			})
		}
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
		//await page.waitFor(1400)
		
		console.log(
			await segItems[1].text(),
			await roles[2].text()
		)
		
		const readAuditor = await page.waitFor(async () => {
		    return await segItems[1].text() == '读取' && await roles[2].text() == '审核员'
		}) // 等待
		console.log("readAuditor: ",readAuditor);
		
		
		if(readAuditor){
			const readAuditorA = await page.callMethod('myFn',{
				"type":"read",
				"index":0
			})
			//console.log(readAuditorA,"readAuditorA---------");
			expect(readAuditorA).toBe('权限校验未通过')
			
			await page.callMethod('myFn',{
				"type":"read",
				"index":0,
				"field":"_id,state,create_time,text"
			})
			
			await page.callMethod('myFn',{
				"type":"read",
				"index":1
			})
			
			await page.callMethod('myFn',{
				"type":"read",
				"index":1,
				"field":"_id,state,create_time,text"
			})
			
			await page.callMethod('myFn',{
				"type":"read",
				"index":2
			})
			
			await page.callMethod('myFn',{
				"type":"read",
				"index":2,
				"field":"_id,state,create_time,text"
			})
		}
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
		//await page.waitFor(1400)
		console.log(
			await segItems[2].text(),
			await roles[2].text()
		)
		
		const updateAuditor = await page.waitFor(async () => {
		    return await segItems[2].text() == '更新' && await roles[2].text() == '审核员'
		}) // 等待
		console.log("updateAuditor: ",updateAuditor);
		
		
		if(updateAuditor){
			const updateAuditorA = await page.callMethod('myFn',{
				"type":"update",
				"index":0
			})
			//console.log(updateAuditorA,"updateAuditorA---------");
			expect(updateAuditorA).toBe('权限校验未通过')
			
			await page.callMethod('myFn',{
				"type":"update",
				"index":0,
				"field":"_id,state,create_time,text"
			})
			
			await page.callMethod('myFn',{
				"type":"update",
				"index":1
			})
			
			await page.callMethod('myFn',{
				"type":"update",
				"index":1,
				"field":"_id,state,create_time,text"
			})
			
			await page.callMethod('myFn',{
				"type":"update",
				"index":2
			})
			
			await page.callMethod('myFn',{
				"type":"update",
				"index":2,
				"field":"_id,state,create_time,text"
			})
		}
	})


	it('创建--管理员', async () => {
		const perPage = await page.$('.page')
		//头部操作控制条
		const segItems = await perPage.$$('.segmented-control__item')
		//底部角色控制条
		const roles = await perPage.$$('.roles-item')
		//点击创建
		await segItems[0].tap()
		await roles[3].tap()
		//await page.waitFor(1400)
		console.log(
			await segItems[0].text(),
			await roles[3].text()
		)
		
		const createAdmin = await page.waitFor(async () => {
		    return await segItems[0].text() == '创建' && await roles[3].text() == '管理员'
		}) // 等待
		console.log("createAdmin: ",createAdmin);
		
		
		if(createAdmin){
			await page.callMethod('myFn',{
				"type":"create",
				"index":0,
			})
			
			await page.callMethod('myFn',{
				"type":"create",
				"index":0,
				"field":"_id,state,create_time,text"
			})
			
			await page.callMethod('myFn',{
				"type":"create",
				"index":1,
			})
			
			await page.callMethod('myFn',{
				"type":"create",
				"index":1,
				"field":"_id,state,create_time,text",
			})
			
			await page.callMethod('myFn',{
				"type":"create",
				"index":2,
			})
			
			await page.callMethod('myFn',{
				"type":"create",
				"index":2,
				"field":"_id,state,create_time,text",
			})
		}
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
		//await page.waitFor(1400)
		console.log(
			await segItems[1].text(),
			await roles[3].text()
		)
		
		const readAdmin = await page.waitFor(async () => {
		    return await segItems[1].text() == '读取' && await roles[3].text() == '管理员'
		}) // 等待
		console.log("readAdmin: ",readAdmin);
		
		
		
		if(readAdmin){
			await page.callMethod('myFn',{
				"type":"read",
				"index":0
			})
			
			await page.callMethod('myFn',{
				"type":"read",
				"index":0,
				"field":"_id,state,create_time,text"
			})
			
			await page.callMethod('myFn',{
				"type":"read",
				"index":1
			})
			
			await page.callMethod('myFn',{
				"type":"read",
				"index":1,
				"field":"_id,state,create_time,text"
			})
			
			await page.callMethod('myFn',{
				"type":"read",
				"index":2
			})
			
			await page.callMethod('myFn',{
				"type":"read",
				"index":2,
				"field":"_id,state,create_time,text"
			})
		}
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
		//await page.waitFor(1400)
		console.log(
			await segItems[2].text(),
			await roles[3].text()
		)
		
		
		const updateAdmin = await page.waitFor(async () => {
		    return await segItems[2].text() == '更新' && await roles[3].text() == '管理员'
		}) // 等待
		console.log("updateAdmin: ",updateAdmin);
		
		
		
		if(updateAdmin){
			await page.callMethod('myFn',{
				"type":"update",
				"index":0
			})
			
			await page.callMethod('myFn',{
				"type":"update",
				"index":0,
				"field":"_id,state,create_time,text"
			})
			
			await page.callMethod('myFn',{
				"type":"update",
				"index":1
			})
			
			await page.callMethod('myFn',{
				"type":"update",
				"index":1,
				"field":"_id,state,create_time,text"
			})
			
			await page.callMethod('myFn',{
				"type":"update",
				"index":2
			})
	
			await page.callMethod('myFn',{
				"type":"update",
				"index":2,
				"field":"_id,state,create_time,text"
			})
		}
	})

})
