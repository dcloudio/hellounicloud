describe('pages/clientDB/permission-table-compound/permission-table-compound.vue', () => {
	let page
	beforeAll(async () => {
		// 重新reLaunch至首页，并获取首页page对象（其中 program 是uni-automator自动注入的全局对象）
		page = await program.reLaunch(
		'/pages/clientDB/permission-table-compound/permission-table-compound')
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
				"type":"create",
				"index":1
			})
			console.log(createA,"createA---------");
			/* expect(createA).toBe('未能获取当前用户信息：30205 | 当前用户为匿名身份') */
			
			await page.callMethod('myFn',{
				"type":"create",
				"index":1,
				"action":"add_view_count"
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
		await page.waitFor(1400)
		console.log(
			await segItems[1].text(),
			await roles[0].text()
		)
		
		const readUnlogin = await page.waitFor(async () => {
		    return await segItems[1].text() == '读取' && await roles[0].text() == '未登陆'
		}) // 等待
		console.log("readUnlogin: ",readUnlogin);
		
		
		if(readUnlogin){
			
			await page.callMethod('myFn',{
				"type":"create",
				"index":0
			})
		
			const readA = await page.callMethod('myFn',{
				"type":"read",
				"index":0,
				"where":"create_time > 1613534788761"
			})
			//console.log(readA,"readA---------");
			/* expect(readA).toBe('未能获取当前用户信息：30205 | 当前用户为匿名身份') */
			
			const readB = await page.callMethod('myFn',{
				"type":"read",
				"index":0
			})
			//console.log(readB,"readB---------");
			expect(readB).toBe('未能获取当前用户信息：30205 | 当前用户为匿名身份')
			
			const readC = await page.callMethod('myFn',{
				"type":"read",
				"index":1
			})
			//console.log(readC,"readC---------");
			expect(readC).toBe('未能获取当前用户信息：30205 | 当前用户为匿名身份')
					
			await page.callMethod('myFn',{
				"type":"read",
				"index":1,
				"action":"add_view_count"
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
		await page.waitFor(1400)
		console.log(
			await segItems[2].text(),
			await roles[0].text()
		)
		
		const updateUnlogin = await page.waitFor(async () => {
		    return await segItems[2].text() == '更新' && await roles[0].text() == '未登陆'
		}) // 等待
		console.log("updateUnlogin: ",updateUnlogin);
		
		
		if(updateUnlogin){
			
			await page.callMethod('myFn',{
				"type":"create",
				"index":0
			})
		
			const updateA = await page.callMethod('myFn',{
				"type":"read",
				"index":0,
				"where":"create_time > 1613534788761"
			})
			//console.log(readA,"readA---------");
			/* expect(updateA).toBe('未能获取当前用户信息：30205 | 当前用户为匿名身份') */
			
			const updateB = await page.callMethod('myFn',{
				"type":"update",
				"index":0
			})
			//console.log(readB,"readB---------");
			expect(updateB).toBe('权限校验未通过')
			
			const updateC = await page.callMethod('myFn',{
				"type":"update",
				"index":1
			})
			//console.log(readC,"readC---------");
			expect(updateC).toBe('未能获取当前用户信息：30205 | 当前用户为匿名身份')
					
			await page.callMethod('myFn',{
				"type":"update",
				"index":1,
				"action":"add_view_count"
			})
		}
	})
	
	it('删除--未登陆', async () => {
		const perPage = await page.$('.page')
		//头部操作控制条
		const segItems = await perPage.$$('.segmented-control__item')
		//底部角色控制条
		const roles = await perPage.$$('.roles-item')
		
		//点击删除
		await segItems[3].tap()
		await roles[0].tap()
		//await page.waitFor(1400)
		console.log(
			await segItems[3].text(),
			await roles[0].text()
		)
		
		const deleteUnlogin = await page.waitFor(async () => {
		    return await segItems[3].text() == '删除' && await roles[0].text() == '未登陆'
		}) // 等待
		console.log("deleteUnlogin: ",deleteUnlogin);
		
		
		
		if(deleteUnlogin){
			
			await page.callMethod('myFn',{
				"type":"create",
				"index":0
			})
		
			const deleteA = await page.callMethod('myFn',{
				"type":"read",
				"index":0,
				"where":"create_time > 1613534788761"
			})
			//console.log(deleteA,"deleteA---------");
			expect(deleteA).toBe('未能获取当前用户信息：30205 | 当前用户为匿名身份')
			
			const deleteB = await page.callMethod('myFn',{
				"type":"delete",
				"index":0
			})
			//console.log(deleteB,"deleteB---------");
			expect(deleteB).toBe('权限校验未通过')
			
			const deleteC = await page.callMethod('myFn',{
				"type":"delete",
				"index":1
			})
			//console.log(deleteC,"deleteC---------");
			expect(deleteC).toBe('未能获取当前用户信息：30205 | 当前用户为匿名身份')
					
			await page.callMethod('myFn',{
				"type":"delete",
				"index":1,
				"action":"add_view_count"
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
		//await page.waitFor(1400)
		console.log(
			await segItems[0].text(),
			await roles[1].text()
		)
		
		const createUser = await page.waitFor(async () => {
		    return await segItems[0].text() == '创建' && await roles[1].text() == '用户'
		}) // 等待
		console.log("createUser: ",createUser);
		
		
		if(createUser){
			
			await page.callMethod('myFn',{
				"type":"create","index":1
			})
			
			await page.callMethod('myFn',{
				"type":"create",
				"index":1,
				"action":"add_view_count"
			})
		}
	})

	it('读取--用户', async () => {
		const perPage = await page.$('.page')
		//头部操作控制条
		const segItems = await perPage.$$('.segmented-control__item')
		//底部角色控制条
		const roles = await perPage.$$('.roles-item')
		
		//点击创建
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
			
			await page.callMethod('myFn',{
				"type":"create",
				"index":0
			})
		
			const readUserA = await page.callMethod('myFn',{
				"type":"read",
				"index":0,
				"where":"create_time > 1613534788761"
			})
			//console.log(readUserA,"readUserA---------");
			//未能获取当前用户信息：30205 | 当前用户为匿名身份
			//expect(readUserA).toBe('权限校验未通过')
			
			const readUserB = await page.callMethod('myFn',{
				"type":"read","index":0
			})
			//console.log(readUserB,"readUserB---------");
			//expect(readUserB).toBe('权限校验未通过')
			
			await page.callMethod('myFn',{
				"type":"read",
				"index":1
			})
			
			await page.callMethod('myFn',{
				"type":"read",
				"index":1,
				"action":"add_view_count"
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
			
			await page.callMethod('myFn',{
				"type":"create",
				"index":0
			})
		
			const updateUserA = await page.callMethod('myFn',{
				"type":"read",
				"index":0,
				"where":"create_time > 1613534788761"
			})
			console.log(updateUserA,"updateUserA---------");
			//expect(updateUserA).toBe('权限校验未通过')
			//未能获取当前用户信息：30205 | 当前用户为匿名身份
			
			
			const updateUserB = await page.callMethod('myFn',{
				"type":"update","index":0
			})
			//console.log(updateUserB,"updateUserB---------");
			expect(updateUserB).toBe('权限校验未通过')
			
			await page.callMethod('myFn',{
				"type":"update","index":1
			})
			
			await page.callMethod('myFn',{
				"type":"update",
				"index":1,
				"action":"add_view_count"
			})
		}
	})

	it('删除--用户', async () => {
		const perPage = await page.$('.page')
		//头部操作控制条
		const segItems = await perPage.$$('.segmented-control__item')
		//底部角色控制条
		const roles = await perPage.$$('.roles-item')
		
		//点击删除
		await segItems[3].tap()
		await roles[1].tap()
		//await page.waitFor(1400)
		console.log(
			await segItems[3].text(),
			await roles[1].text()
		)
		
		const deleteUser = await page.waitFor(async () => {
		    return await segItems[3].text() == '删除' && await roles[1].text() == '用户'
		}) // 等待
		console.log("deleteUser: ",deleteUser);
		
		
		
		if(deleteUser){
			
			await page.callMethod('myFn',{
				"type":"create",
				"index":0
			})
		
			const deleteUserA = await page.callMethod('myFn',{
				"type":"read",
				"index":0,
				"where":"create_time > 1613534788761"
			})
			//console.log(deleteUserA,"deleteUserA---------");
			expect(deleteUserA).toBe('权限校验未通过')
			
			const deleteUserB = await page.callMethod('myFn',{
				"type":"delete",
				"index":0
			})
			//console.log(deleteUserB,"deleteUserB---------");
			expect(deleteUserB).toBe('权限校验未通过')
			
			await page.callMethod('myFn',{
				"type":"delete",
				"index":1
			})
			
			await page.callMethod('myFn',{
				"type":"delete",
				"index":1,
				"action":"add_view_count"
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
			
			await page.callMethod('myFn',{
				"type":"create","index":1
			})
			
			await page.callMethod('myFn',{
				"type":"create",
				"index":1,
				"action":"add_view_count"
			})
		}
	})
	
	it('读取--审核员', async () => {
		const perPage = await page.$('.page')
		//头部操作控制条
		const segItems = await perPage.$$('.segmented-control__item')
		//底部角色控制条
		const roles = await perPage.$$('.roles-item')
		
		//点击创建
		await segItems[1].tap()
		await roles[2].tap()
		await page.waitFor(1000)
		console.log(
			await segItems[1].text(),
			await roles[2].text()
		)
		
		const readAuditor = await page.waitFor(async () => {
		    return await segItems[1].text() == '读取' && await roles[2].text() == '审核员'
		}) // 等待
		console.log("readAuditor: ",readAuditor);
		
		
		
		if(readAuditor){
			
			await page.callMethod('myFn',{
				"type":"create",
				"index":0
			})
		
			await page.callMethod('myFn',{
				"type":"read",
				"index":0,
				"where":"create_time > 1613534788761"
			})
			
			const readAuditorA = await page.callMethod('myFn',{
				"type":"read","index":0
			})
			
			console.log(readAuditorA,"readAuditorA---------");
			//expect(readAuditorA).toBe('权限校验未通过')
			
			await page.callMethod('myFn',{
				"type":"read",
				"index":1
			})
			
			await page.callMethod('myFn',{
				"type":"read",
				"index":1,
				"action":"add_view_count"
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
			
			await page.callMethod('myFn',{
				"type":"create",
				"index":0
			})
		
			await page.callMethod('myFn',{
				"type":"read",
				"index":0,
				"where":"create_time > 1613534788761"
			})
			
			
			const updateAuditorA = await page.callMethod('myFn',{
				"type":"update","index":0
			})
			//console.log(updateAuditorA,"updateAuditorA---------");
			expect(updateAuditorA).toBe('权限校验未通过')
			
			await page.callMethod('myFn',{
				"type":"update","index":1
			})
			
			await page.callMethod('myFn',{
				"type":"update",
				"index":1,
				"action":"add_view_count"
			})
		}
	})
	
	it('删除--审核员', async () => {
		const perPage = await page.$('.page')
		//头部操作控制条
		const segItems = await perPage.$$('.segmented-control__item')
		//底部角色控制条
		const roles = await perPage.$$('.roles-item')
		
		//点击删除
		await segItems[3].tap()
		await roles[2].tap()
		//await page.waitFor(1400)
		console.log(
			await segItems[3].text(),
			await roles[2].text()
		)
		
		const deleteAuditor = await page.waitFor(async () => {
		    return await segItems[3].text() == '删除' && await roles[2].text() == '审核员'
		}) // 等待
		console.log("deleteAuditor: ",deleteAuditor);
		
		
		if(deleteAuditor){
			
			await page.callMethod('myFn',{
				"type":"create",
				"index":0
			})
		
			await page.callMethod('myFn',{
				"type":"read",
				"index":0,
				"where":"create_time > 1613534788761"
			})
			
			
			const deleteAuditorB = await page.callMethod('myFn',{
				"type":"delete",
				"index":0
			})
			//console.log(deleteAuditorB,"deleteAuditorB---------");
			expect(deleteAuditorB).toBe('权限校验未通过')
			
			await page.callMethod('myFn',{
				"type":"delete",
				"index":1
			})
			
			await page.callMethod('myFn',{
				"type":"delete",
				"index":1,
				"action":"add_view_count"
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
		
		const deleteAdmin = await page.waitFor(async () => {
		    return await segItems[0].text() == '创建' && await roles[3].text() == '管理员'
		}) // 等待
		console.log("deleteAdmin: ",deleteAdmin);
		
		
		if(deleteAdmin){
			
			await page.callMethod('myFn',{
				"type":"create","index":1
			})
			
			await page.callMethod('myFn',{
				"type":"create",
				"index":1,
				"action":"add_view_count"
			})
		}
	})
	
	it('读取--管理员', async () => {
		const perPage = await page.$('.page')
		//头部操作控制条
		const segItems = await perPage.$$('.segmented-control__item')
		//底部角色控制条
		const roles = await perPage.$$('.roles-item')
		
		//点击创建
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
				"type":"create",
				"index":0
			})
		
			await page.callMethod('myFn',{
				"type":"read",
				"index":0,
				"where":"create_time > 1613534788761"
			})
			
			await page.callMethod('myFn',{
				"type":"read","index":0
			})
			
			
			await page.callMethod('myFn',{
				"type":"read",
				"index":1
			})
			
			await page.callMethod('myFn',{
				"type":"read",
				"index":1,
				"action":"add_view_count"
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
				"type":"create",
				"index":0
			})
		
			await page.callMethod('myFn',{
				"type":"read",
				"index":0,
				"where":"create_time > 1613534788761"
			})
			
			await page.callMethod('myFn',{
				"type":"update","index":0
			})
			
			await page.callMethod('myFn',{
				"type":"update","index":1
			})
			
			await page.callMethod('myFn',{
				"type":"update",
				"index":1,
				"action":"add_view_count"
			})
		}
	})
	
	it('删除--管理员', async () => {
		const perPage = await page.$('.page')
		//头部操作控制条
		const segItems = await perPage.$$('.segmented-control__item')
		//底部角色控制条
		const roles = await perPage.$$('.roles-item')
		
		//点击删除
		await segItems[3].tap()
		await roles[3].tap()
		//await page.waitFor(1400)
		console.log(
			await segItems[3].text(),
			await roles[3].text()
		)
		
		const deleteAdmin = await page.waitFor(async () => {
		    return await segItems[3].text() == '删除' && await roles[3].text() == '管理员'
		}) // 等待
		console.log("deleteAdmin: ",deleteAdmin);
		
		
		if(deleteAdmin){
			
			await page.callMethod('myFn',{
				"type":"create",
				"index":0
			})
		
			await page.callMethod('myFn',{
				"type":"read",
				"index":0,
				"where":"create_time > 1613534788761"
			})
			
			
			await page.callMethod('myFn',{
				"type":"delete",
				"index":0
			})
			
			
			await page.callMethod('myFn',{
				"type":"delete",
				"index":1
			})
			
			await page.callMethod('myFn',{
				"type":"delete",
				"index":1,
				"action":"add_view_count"
			})
		}
	})
	


})