describe('pages/clientDB/permission-table-simple/permission-table-simple.vue', () => {
	let page
	beforeAll(async () => {
		// 重新reLaunch至首页，并获取首页page对象（其中 program 是uni-automator自动注入的全局对象）
		page = await program.reLaunch(
		'/pages/clientDB/permission-table-simple/permission-table-simple')
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
		//await page.waitFor(1400)
		/* console.log(
			await segItems[0].text(),
			await roles[0].text()
		) */
		
		const createUnlogin = await page.waitFor(async () => {
		    return await segItems[0].text() == '创建' && await roles[0].text() == '未登陆'
		}) // 等待
		console.log("createUnlogin: ",createUnlogin);
		
		
		if(createUnlogin){
			
			await page.callMethod('myFn',{
				"type":"create",
				"index":0
			})
			
			const createA = await page.callMethod('myFn',{
				"type":"create","index":1
			})
			console.log(createA,"createA---------");
			/* expect(createA).toBe('[permission-test-2.create]权限校验未通过') */
			
			
			
			
			const createB = await page.callMethod('myFn',{
				"type":"create","index":2
			})
			//console.log(createB,"createB---------");
			//expect(createB).toBe('未能获取当前用户信息：30205 | 当前用户为匿名身份')
			
			const createC = await page.callMethod('myFn',{
				"type":"create","index":5
			})
			//console.log(createC,"createC---------");
			expect(createC).toBe('未能获取当前用户信息：30205 | 当前用户为匿名身份')
			
			const createD = await page.callMethod('myFn',{
				"type":"create","index":6
			})
			//console.log(createD,"createD---------");
			expect(createD).toBe('[permission-test-7.create]权限校验未通过')
			
			
			await page.callMethod('myFn',{
				"type":"create","index":6,"action":"add_view_count"
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
			
			await page.callMethod('myFn',{
				"type":"read","index":0
			})
			
			const readA = await page.callMethod('myFn',{
				"type":"read","index":1
			})
			//console.log(readA,"readA---------");
			expect(readA).toBe('权限校验未通过')
			
			const readB = await page.callMethod('myFn',{
				"type":"read","index":2
			})
			//console.log(readB,"readB---------");
			expect(readB).toBe('未能获取当前用户信息：30205 | 当前用户为匿名身份')
			
			const readC = await page.callMethod('myFn',{
				"type":"create","index":3
			})
			//console.log(readC,"readC---------");
			expect(readC).toBe('未能获取当前用户信息：30205 | 当前用户为匿名身份')
			
			const readD = await page.callMethod('myFn',{
				"type":"read",
				"index":3,
				"where":"uid == $env.uid"
			})
			//console.log(readD,"readD---------");
			expect(readD).toBe('未能获取当前用户信息：30205 | 当前用户为匿名身份')
			
			
			const readE = await page.callMethod('myFn',{
				"type":"read","index":3
			})
			//console.log(readE,"readE---------");
			expect(readE).toBe('未能获取当前用户信息：30205 | 当前用户为匿名身份')
			
			const readF = await page.callMethod('myFn',{
				"type":"create","index":4
			})
			//console.log(readF,"readF---------");
			expect(readF).toBe('未能获取当前用户信息：30205 | 当前用户为匿名身份')
			
			
			await page.callMethod('myFn',{
				"type":"read",
				"index":4,
				"where":"create_time > 1613541303576"
			})
			
			await page.callMethod('myFn',{
				"type":"read",
				"index":4
			})
			
			const readG = await page.callMethod('myFn',{
				"type":"create","index":5
			})
			//console.log(readG,"readG---------");
			expect(readG).toBe('未能获取当前用户信息：30205 | 当前用户为匿名身份')
			
			
			const readH = await page.callMethod('myFn',{
				"type":"create","index":6
			})
			//console.log(readH,"readH---------");
			expect(readH).toBe('[permission-test-7.create]权限校验未通过')
			
			await page.callMethod('myFn',{
				"type":"read","index":6,"action":"add_view_count"
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
		//await page.waitFor(1400)
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
			
			await page.callMethod('myFn',{
				"type":"update","index":0
			})
			
			const updateA = await page.callMethod('myFn',{
				"type":"update","index":1
			})
			//console.log(updateA,"updateA---------");
			expect(updateA).toBe('权限校验未通过')
			
			const updateB = await page.callMethod('myFn',{
				"type":"update","index":2
			})
			//console.log(updateB,"updateB---------");
			expect(updateB).toBe('未能获取当前用户信息：30205 | 当前用户为匿名身份')
			
			const updateC = await page.callMethod('myFn',{
				"type":"create","index":3
			})
			//console.log(updateC,"updateC---------");
			expect(updateC).toBe('未能获取当前用户信息：30205 | 当前用户为匿名身份')
			
			const updateD = await page.callMethod('myFn',{
				"type":"update","index":3,"where":"uid == $env.uid"
			})
			//console.log(updateD,"updateD---------");
			expect(updateD).toBe('未能获取当前用户信息：30205 | 当前用户为匿名身份')
			
			
			const updateE = await page.callMethod('myFn',{
				"type":"update","index":3
			})
			//console.log(updateE,"updateE---------");
			expect(updateE).toBe('未能获取当前用户信息：30205 | 当前用户为匿名身份')
			
			
			const updateF = await page.callMethod('myFn',{
				"type":"create","index":4
			})
			//console.log(updateF,"updateF---------");
			expect(updateF).toBe('未能获取当前用户信息：30205 | 当前用户为匿名身份')
			
			
			await page.callMethod('myFn',{
				"type":"update","index":4,"where":"create_time > 1613546251521"
			})
			
			await page.callMethod('myFn',{
				"type":"update","index":4
			})
			
			
			const updateG = await page.callMethod('myFn',{
				"type":"update","index":5
			})
			//console.log(updateG,"updateG---------");
			expect(updateG).toBe('未能获取当前用户信息：30205 | 当前用户为匿名身份')
			
			const updateH = await page.callMethod('myFn',{
				"type":"update","index":6
			})
			//console.log(updateH,"updateH---------");
			expect(updateH).toBe('权限校验未通过')
			
			
			await page.callMethod('myFn',{
				"type":"update","index":6,"action":"add_view_count"
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
		//await page.waitFor(500)
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
				"type":"delete","index":0
			})
			
			const deleteA = await page.callMethod('myFn',{
				"type":"delete","index":1
			})
			//console.log(deleteA,"deleteA---------");
			expect(deleteA).toBe('权限校验未通过')
			
			const deleteB = await page.callMethod('myFn',{
				"type":"delete","index":2
			})
			//console.log(deleteB,"deleteB---------");
			expect(deleteB).toBe('未能获取当前用户信息：30205 | 当前用户为匿名身份')
			
			const deleteC = await page.callMethod('myFn',{
				"type":"create","index":3
			})
			//console.log(deleteC,"deleteC---------");
			expect(deleteC).toBe('未能获取当前用户信息：30205 | 当前用户为匿名身份')
			
			const deleteD = await page.callMethod('myFn',{
				"type":"delete","index":3,"where":"uid == $env.uid"
			})
			//console.log(deleteD,"deleteD---------");
			expect(deleteD).toBe('未能获取当前用户信息：30205 | 当前用户为匿名身份')
			
			
			const deleteE = await page.callMethod('myFn',{
				"type":"delete","index":3
			})
			//console.log(deleteE,"deleteE---------");
			expect(deleteE).toBe('未能获取当前用户信息：30205 | 当前用户为匿名身份')
			
			
			const deleteF = await page.callMethod('myFn',{
				"type":"create","index":4
			})
			//console.log(deleteF,"deleteF---------");
			expect(deleteF).toBe('未能获取当前用户信息：30205 | 当前用户为匿名身份')
			
			
			await page.callMethod('myFn',{
				"type":"delete","index":4,"where":"create_time > 1613546644107"
			})
			
			await page.callMethod('myFn',{
				"type":"delete","index":4
			})
			
			
			const deleteG = await page.callMethod('myFn',{
				"type":"delete","index":5
			})
			//console.log(deleteG,"deleteG---------");
			expect(deleteG).toBe('未能获取当前用户信息：30205 | 当前用户为匿名身份')
			
			const deleteH = await page.callMethod('myFn',{
				"type":"delete","index":6
			})
			//console.log(deleteH,"deleteH---------");
			expect(deleteH).toBe('权限校验未通过')
			
			
			await page.callMethod('myFn',{
				"type":"delete","index":6,"action":"add_view_count"
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
				"type":"create",
				"index":0
			})
			
			const createUserA = await page.callMethod('myFn',{
				"type":"create","index":1
			})
			//console.log(createUserA,"createUserA---------");
			expect(createUserA).toBe('[permission-test-2.create]权限校验未通过')
			
			await page.callMethod('myFn',{
				"type":"create","index":2
			})
			
			const createUserB = await page.callMethod('myFn',{
				"type":"create","index":5
			})
			//console.log(createUserB,"createUserB---------");
			/* expect(createUserB).toBe('未能获取当前用户信息：30205 | 当前用户为匿名身份')
			[permission-test-6.create]权限校验未通过 */
			
			const createUserC = await page.callMethod('myFn',{
				"type":"create","index":6
			})
			//console.log(createUserC,"createUserC---------");
			expect(createUserC).toBe('[permission-test-7.create]权限校验未通过')
			
			await page.callMethod('myFn',{
				"type":"create","index":6,"action":"add_view_count"
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
			
			await page.callMethod('myFn',{
				"type":"read","index":0
			})
			
			const readUserA = await page.callMethod('myFn',{
				"type":"read","index":1
			})
			//console.log(readUserA,"readUserA---------");
			expect(readUserA).toBe('权限校验未通过')
			
			await page.callMethod('myFn',{
				"type":"read","index":2
			})
			
			await page.callMethod('myFn',{
				"type":"create","index":3
			})
			
			await page.callMethod('myFn',{
				"type":"read",
				"index":3,
				"where":"uid == $env.uid"
			})
			
			await page.callMethod('myFn',{
				"type":"read","index":3
			})
			
			await page.callMethod('myFn',{
				"type":"create","index":4
			})
			
			await page.callMethod('myFn',{
				"type":"read",
				"index":4,
				"where":"create_time > 1613541303576"
			})
			
			await page.callMethod('myFn',{
				"type":"read",
				"index":4
			})
			
			const readUserB = await page.callMethod('myFn',{
				"type":"read","index":5
			})
			//console.log(readUserB,"readUserB---------");
			expect(readUserB).toBe('权限校验未通过')
			
			
			const readUserC = await page.callMethod('myFn',{
				"type":"read","index":6
			})
			//console.log(readUserC,"readUserC---------");
			expect(readUserC).toBe('权限校验未通过')
			
			await page.callMethod('myFn',{
				"type":"read","index":6,"action":"add_view_count"
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
		await page.waitFor(1400)
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
				"type":"update","index":0
			})
			
			const updateUserA = await page.callMethod('myFn',{
				"type":"update","index":1
			})
			//console.log(updateUserA,"updateUserA---------");
			expect(updateUserA).toBe('权限校验未通过')
			
			const updateUserB = await page.callMethod('myFn',{
				"type":"update","index":2
			})
			//console.log(updateUserB,"updateUserB---------");
			
			
			await page.callMethod('myFn',{
				"type":"create","index":3
			})
		
			
			await page.callMethod('myFn',{
				"type":"update","index":3,"where":"uid == $env.uid"
			})
			
			await page.callMethod('myFn',{
				"type":"update","index":3
			})
			
			
			await page.callMethod('myFn',{
				"type":"create","index":4
			})
			
			
			await page.callMethod('myFn',{
				"type":"update","index":4,"where":"create_time > 1613546251521"
			})
			
			await page.callMethod('myFn',{
				"type":"update","index":4
			})
			
			
			const updateUserC = await page.callMethod('myFn',{
				"type":"update","index":5
			})
			//console.log(updateUserC,"updateUserC---------");
			expect(updateUserC).toBe('权限校验未通过')
			
			const updateUserD = await page.callMethod('myFn',{
				"type":"update","index":6
			})
			//console.log(updateUserD,"updateUserD---------");
			expect(updateUserD).toBe('权限校验未通过')
			
			
			await page.callMethod('myFn',{
				"type":"update","index":6,"action":"add_view_count"
			})
		}
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
				"type":"delete","index":0
			})
			
			const deleteUserA = await page.callMethod('myFn',{
				"type":"delete","index":1
			})
			//console.log(deleteUserA,"deleteUserA---------");
			expect(deleteUserA).toBe('权限校验未通过')
			
			await page.callMethod('myFn',{
				"type":"delete","index":2
			})
			
			await page.callMethod('myFn',{
				"type":"create","index":3
			})
			
			await page.callMethod('myFn',{
				"type":"delete","index":3,"where":"uid == $env.uid"
			})
			
			await page.callMethod('myFn',{
				"type":"delete","index":3
			})
			
			await page.callMethod('myFn',{
				"type":"create","index":4
			})
		
			await page.callMethod('myFn',{
				"type":"delete","index":4,"where":"create_time > 1613547725091"
			})
			
			await page.callMethod('myFn',{
				"type":"delete","index":4
			})
			
			const deleteUserB = await page.callMethod('myFn',{
				"type":"delete","index":5
			})
			//console.log(deleteUserB,"deleteUserB---------");
			expect(deleteUserB).toBe('权限校验未通过')
			
			const deleteUserC = await page.callMethod('myFn',{
				"type":"delete","index":6
			})
			//console.log(deleteUserC,"deleteUserC---------");
			expect(deleteUserC).toBe('权限校验未通过')
			
			await page.callMethod('myFn',{
				"type":"delete","index":6,"action":"add_view_count"
			})

		}
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
				"type":"create",
				"index":0
			})
			
			const createAuditorA = await page.callMethod('myFn',{
				"type":"create","index":1
			})
			//console.log(createAuditorA,"createAuditorA---------");
			expect(createAuditorA).toBe('[permission-test-2.create]权限校验未通过')
			
			await page.callMethod('myFn',{
				"type":"create","index":2
			})
			
			await page.callMethod('myFn',{
				"type":"create","index":5
			})
			
			
			const createAuditorB = await page.callMethod('myFn',{
				"type":"create","index":6
			})
			//console.log(createAuditorB,"createAuditorB---------");
			expect(createAuditorB).toBe('[permission-test-7.create]权限校验未通过')
			
			await page.callMethod('myFn',{
				"type":"create","index":6,"action":"add_view_count"
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
		//await page.waitFor(1000)
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
				"type":"read","index":0
			})
			
			const readAuditorA = await page.callMethod('myFn',{
				"type":"read","index":1
			})
			//console.log(readAuditorA,"readAuditorA---------");
			expect(readAuditorA).toBe('权限校验未通过')
			
			await page.callMethod('myFn',{
				"type":"read","index":2
			})
			
			await page.callMethod('myFn',{
				"type":"create","index":3
			})
			
			await page.callMethod('myFn',{
				"type":"read",
				"index":3,
				"where":"uid == $env.uid"
			})
			
			await page.callMethod('myFn',{
				"type":"read","index":3
			})
			
			await page.callMethod('myFn',{
				"type":"create","index":4
			})
			
			await page.callMethod('myFn',{
				"type":"read",
				"index":4,
				"where":"create_time > 1613541303576"
			})
			
			
			await page.callMethod('myFn',{
				"type":"read","index":4
			})
			
			
			await page.callMethod('myFn',{
				"type":"read",
				"index":5
			})
			
			
			const readAuditorB = await page.callMethod('myFn',{
				"type":"read","index":6
			})
			//console.log(readAuditorB,"readAuditorB---------");
			expect(readAuditorB).toBe('权限校验未通过')
			
			await page.callMethod('myFn',{
				"type":"read","index":6,"action":"add_view_count"
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
				"type":"update","index":0
			})
			
			const updateAuditorA = await page.callMethod('myFn',{
				"type":"update","index":1
			})
			//console.log(updateAuditorA,"updateAuditorA---------");
			expect(updateAuditorA).toBe('权限校验未通过')
			
			await page.callMethod('myFn',{
				"type":"update","index":2
			})
			
			await page.callMethod('myFn',{
				"type":"create","index":3
			})
		
			await page.callMethod('myFn',{
				"type":"update","index":3,"where":"uid == $env.uid"
			})
			
			await page.callMethod('myFn',{
				"type":"update","index":3
			})
			
			
			await page.callMethod('myFn',{
				"type":"create","index":4
			})
			
			await page.callMethod('myFn',{
				"type":"update","index":4,"where":"create_time > 1613546251521"
			})
			
			await page.callMethod('myFn',{
				"type":"update","index":4
			})
			
			await page.callMethod('myFn',{
				"type":"update","index":5
			})
			
			const updateAuditorB = await page.callMethod('myFn',{
				"type":"update","index":6
			})
			//console.log(updateAuditorB,"updateAuditorB---------");
			expect(updateAuditorB).toBe('权限校验未通过')
			
			await page.callMethod('myFn',{
				"type":"update","index":6,"action":"add_view_count"
			})
		}
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
				"type":"delete","index":0
			})
			
			const deleteAuditorA = await page.callMethod('myFn',{
				"type":"delete","index":1
			})
			//console.log(deleteAuditorA,"deleteAuditorA---------");
			expect(deleteAuditorA).toBe('权限校验未通过')
			
			await page.callMethod('myFn',{
				"type":"delete","index":2
			})
			
			await page.callMethod('myFn',{
				"type":"create","index":3
			})
			
			await page.callMethod('myFn',{
				"type":"delete","index":3,"where":"uid == $env.uid"
			})
			
			await page.callMethod('myFn',{
				"type":"delete","index":3
			})
			
			await page.callMethod('myFn',{
				"type":"create","index":4
			})
		
			await page.callMethod('myFn',{
				"type":"delete","index":4,"where":"create_time > 1613547725091"
			})
			
			
			await page.callMethod('myFn',{
				"type":"delete","index":4
			})
			
			
			
			await page.callMethod('myFn',{
				"type":"delete","index":5
			})
			
			
			const deleteAuditorB = await page.callMethod('myFn',{
				"type":"delete","index":6
			})
			//console.log(deleteAuditorB,"deleteAuditorB---------");
			expect(deleteAuditorB).toBe('权限校验未通过')
			
			await page.callMethod('myFn',{
				"type":"delete","index":6,"action":"add_view_count"
			})
	
		}
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
				"index":0
			})
			
			await page.callMethod('myFn',{
				"type":"create","index":1
			})
			
			
			await page.callMethod('myFn',{
				"type":"create","index":2
			})
			
			await page.callMethod('myFn',{
				"type":"create","index":5
			})
			
			
			await page.callMethod('myFn',{
				"type":"create","index":6
			})
			
			
			await page.callMethod('myFn',{
				"type":"create","index":6,"action":"add_view_count"
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
				"type":"read","index":0
			})
			
			await page.callMethod('myFn',{
				"type":"read","index":1
			})
			
			await page.callMethod('myFn',{
				"type":"read","index":2
			})
			
			await page.callMethod('myFn',{
				"type":"create","index":3
			})
			
			await page.callMethod('myFn',{
				"type":"read",
				"index":3,
				"where":"uid == $env.uid"
			})
			
			await page.callMethod('myFn',{
				"type":"read","index":3
			})
			
			await page.callMethod('myFn',{
				"type":"create","index":4
			})
			
			await page.callMethod('myFn',{
				"type":"read",
				"index":4,
				"where":"create_time > 1613541303576"
			})
			
			
			
			await page.callMethod('myFn',{
				"type":"read","index":4
			})
			
			
			await page.callMethod('myFn',{
				"type":"read",
				"index":5
			})
			
			await page.callMethod('myFn',{
				"type":"read","index":6
			})
			
			await page.callMethod('myFn',{
				"type":"read","index":6,"action":"add_view_count"
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
				"type":"update","index":0
			})
			
			await page.callMethod('myFn',{
				"type":"update","index":1
			})
			
			await page.callMethod('myFn',{
				"type":"update","index":2
			})
			
			await page.callMethod('myFn',{
				"type":"create","index":3
			})
		
			await page.callMethod('myFn',{
				"type":"update","index":3,"where":"uid == $env.uid"
			})
			
			await page.callMethod('myFn',{
				"type":"update","index":3
			})
			
			
			await page.callMethod('myFn',{
				"type":"create","index":4
			})
			
			await page.callMethod('myFn',{
				"type":"update","index":4,"where":"create_time > 1613546251521"
			})
			
			await page.callMethod('myFn',{
				"type":"update","index":4
			})
			
			await page.callMethod('myFn',{
				"type":"update","index":5
			})
			
			await page.callMethod('myFn',{
				"type":"update","index":6
			})
			
			await page.callMethod('myFn',{
				"type":"update","index":6,"action":"add_view_count"
			})
		}
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
				"type":"delete","index":0
			})
			
			await page.callMethod('myFn',{
				"type":"delete","index":1
			})
			
			await page.callMethod('myFn',{
				"type":"delete","index":2
			})
			
			await page.callMethod('myFn',{
				"type":"create","index":3
			})
			
			await page.callMethod('myFn',{
				"type":"delete","index":3,"where":"create_time > 1613572491536"
			})
			
			await page.callMethod('myFn',{
				"type":"delete","index":3
			})
			
			await page.callMethod('myFn',{
				"type":"create","index":4
			})
		
			await page.callMethod('myFn',{
				"type":"delete","index":4,"where":"create_time > 1613547725091"
			})
			
			await page.callMethod('myFn',{
				"type":"delete","index":4
			})
			
			await page.callMethod('myFn',{
				"type":"delete","index":5
			})
			
			await page.callMethod('myFn',{
				"type":"delete","index":6
			})
			
			await page.callMethod('myFn',{
				"type":"delete","index":6,"action":"add_view_count"
			})
	
		}
	})
	
	
	
})

