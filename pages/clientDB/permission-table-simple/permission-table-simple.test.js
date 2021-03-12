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
		const createUnlogin = await page.waitFor(async()=>{
			const createUnlogintIndex = await page.data('typeIndex')
			const createUnloginRole = await page.data('currentRole')
			return createUnlogintIndex === 0 && createUnloginRole === 0 
		})
		
		
		await page.callMethod('myFn',{
			"type":"create",
			"index":0
		})
		
		const createA = await page.callMethod('myFn',{
			"type":"create","index":1
		})
		expect(createA).toBe('[permission-test-2.create]权限校验未通过')
		
		const createB = await page.callMethod('myFn',{
			"type":"create","index":2
		})
		//expect(createB).toBe('未能获取当前用户信息：30205 | 当前用户为匿名身份')
		
		const createC = await page.callMethod('myFn',{
			"type":"create","index":5
		})
		expect(createC).toBe('未能获取当前用户信息：30205 | 当前用户为匿名身份')
		
		const createD = await page.callMethod('myFn',{
			"type":"create","index":6
		})
		expect(createD).toBe('[permission-test-7.create]权限校验未通过')
		
		await page.callMethod('myFn',{
			"type":"create","index":6,"action":"add_view_count"
		})
		
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
		const readUnlogin = await page.waitFor(async()=>{
			const readUnloginIndex = await page.data('typeIndex')
			const readUnloginRole = await page.data('currentRole')
			return readUnloginIndex === 1 && readUnloginRole === 0 
		})
		
		
		await page.callMethod('myFn',{
			"type":"read","index":0
		})
		
		const readA = await page.callMethod('myFn',{
			"type":"read","index":1
		})
		//console.log(readA,"readA---------");
		//expect(readA).toBe('权限校验未通过')
		
		const readB = await page.callMethod('myFn',{
			"type":"read","index":2
		})
		expect(readB).toBe('未能获取当前用户信息：30205 | 当前用户为匿名身份')
		
		const readC = await page.callMethod('myFn',{
			"type":"create","index":3
		})
		expect(readC).toBe('未能获取当前用户信息：30205 | 当前用户为匿名身份')
		
		const readD = await page.callMethod('myFn',{
			"type":"read",
			"index":3,
			"where":"uid == $env.uid"
		})
		expect(readD).toBe('未能获取当前用户信息：30205 | 当前用户为匿名身份')
		
		
		const readE = await page.callMethod('myFn',{
			"type":"read","index":3
		})
		expect(readE).toBe('未能获取当前用户信息：30205 | 当前用户为匿名身份')
		
		const readF = await page.callMethod('myFn',{
			"type":"create","index":4
		})
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
		expect(readG).toBe('未能获取当前用户信息：30205 | 当前用户为匿名身份')
		
		
		const readH = await page.callMethod('myFn',{
			"type":"create","index":6
		})
		expect(readH).toBe('[permission-test-7.create]权限校验未通过')
		
		await page.callMethod('myFn',{
			"type":"read","index":6,"action":"add_view_count"
		})
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

		const updateUnlogin = await page.waitFor(async()=>{
			const updateUnloginIndex = await page.data('typeIndex')
			const updateUnloginRole = await page.data('currentRole')
			return updateUnloginIndex === 2 && updateUnloginRole === 0 
		})


		await page.callMethod('myFn',{
			"type":"update","index":0
		})
		
		const updateA = await page.callMethod('myFn',{
			"type":"update","index":1
		})
		expect(updateA).toBe('权限校验未通过')
		
		const updateB = await page.callMethod('myFn',{
			"type":"update","index":2
		})
		expect(updateB).toBe('未能获取当前用户信息：30205 | 当前用户为匿名身份')
		
		const updateC = await page.callMethod('myFn',{
			"type":"create","index":3
		})
		expect(updateC).toBe('未能获取当前用户信息：30205 | 当前用户为匿名身份')
		
		const updateD = await page.callMethod('myFn',{
			"type":"update","index":3,"where":"uid == $env.uid"
		})
		expect(updateD).toBe('未能获取当前用户信息：30205 | 当前用户为匿名身份')
		
		
		const updateE = await page.callMethod('myFn',{
			"type":"update","index":3
		})
		expect(updateE).toBe('未能获取当前用户信息：30205 | 当前用户为匿名身份')
		
		
		const updateF = await page.callMethod('myFn',{
			"type":"create","index":4
		})
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
		expect(updateG).toBe('未能获取当前用户信息：30205 | 当前用户为匿名身份')
		
		const updateH = await page.callMethod('myFn',{
			"type":"update","index":6
		})
		expect(updateH).toBe('权限校验未通过')
		
		
		await page.callMethod('myFn',{
			"type":"update","index":6,"action":"add_view_count"
		})
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
		
		const deleteUnlogin = await page.waitFor(async()=>{
			const deleteUnloginIndex = await page.data('typeIndex')
			const deleteUnloginRole = await page.data('currentRole')
			return deleteUnloginIndex === 3 && deleteUnloginRole === 0 
		})
		
			
		await page.callMethod('myFn',{
			"type":"delete","index":0
		})
		
		const deleteA = await page.callMethod('myFn',{
			"type":"delete","index":1
		})
		expect(deleteA).toBe('权限校验未通过')
		
		const deleteB = await page.callMethod('myFn',{
			"type":"delete","index":2
		})
		expect(deleteB).toBe('未能获取当前用户信息：30205 | 当前用户为匿名身份')
		
		const deleteC = await page.callMethod('myFn',{
			"type":"create","index":3
		})
		expect(deleteC).toBe('未能获取当前用户信息：30205 | 当前用户为匿名身份')
		
		const deleteD = await page.callMethod('myFn',{
			"type":"delete","index":3,"where":"uid == $env.uid"
		})
		expect(deleteD).toBe('未能获取当前用户信息：30205 | 当前用户为匿名身份')
		
		
		const deleteE = await page.callMethod('myFn',{
			"type":"delete","index":3
		})
		expect(deleteE).toBe('未能获取当前用户信息：30205 | 当前用户为匿名身份')
		
		
		const deleteF = await page.callMethod('myFn',{
			"type":"create","index":4
		})
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
		expect(deleteG).toBe('未能获取当前用户信息：30205 | 当前用户为匿名身份')
		
		const deleteH = await page.callMethod('myFn',{
			"type":"delete","index":6
		})
		expect(deleteH).toBe('权限校验未通过')
		
		
		await page.callMethod('myFn',{
			"type":"delete","index":6,"action":"add_view_count"
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
		const createUser = await page.waitFor(async()=>{
			const typeIndex = await page.data('typeIndex')
			const currentRole = await page.data('currentRole')
			return typeIndex === 0 && currentRole === 'user'
		})
		
		
		await page.callMethod('myFn',{
			"type":"create",
			"index":0
		})
		
		const createUserA = await page.callMethod('myFn',{
			"type":"create","index":1
		})
		expect(createUserA).toBe('[permission-test-2.create]权限校验未通过')
		
		await page.callMethod('myFn',{
			"type":"create","index":2
		})
		
		const createUserB = await page.callMethod('myFn',{
			"type":"create","index":5
		})
		expect(createUserB).toBe('[permission-test-6.create]权限校验未通过')
		//未能获取当前用户信息：30205 | 当前用户为匿名身份
		
		const createUserC = await page.callMethod('myFn',{
			"type":"create","index":6
		})
		expect(createUserC).toBe('[permission-test-7.create]权限校验未通过')
		
		await page.callMethod('myFn',{
			"type":"create","index":6,"action":"add_view_count"
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
		
		const readUser = await page.waitFor(async()=>{
			const readUserIndex = await page.data('typeIndex')
			const readUserRole = await page.data('currentRole')
			return readUserIndex === 1 && readUserRole === 'user' 
		})
		
		
		
		await page.callMethod('myFn',{
			"type":"read","index":0
		})
		
		const readUserA = await page.callMethod('myFn',{
			"type":"read","index":1
		})
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
		expect(readUserB).toBe('权限校验未通过')
		
		
		const readUserC = await page.callMethod('myFn',{
			"type":"read","index":6
		})
		expect(readUserC).toBe('权限校验未通过')
		
		await page.callMethod('myFn',{
			"type":"read","index":6,"action":"add_view_count"
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
		
		
		const updateUser = await page.waitFor(async()=>{
			const updateUserIndex = await page.data('typeIndex')
			const updateUserRole = await page.data('currentRole')
			return updateUserIndex === 2 && updateUserRole === 'user' 
		})
		
		
		await page.callMethod('myFn',{
			"type":"update","index":0
		})
		
		const updateUserA = await page.callMethod('myFn',{
			"type":"update","index":1
		})
		expect(updateUserA).toBe('权限校验未通过')
		
		const updateUserB = await page.callMethod('myFn',{
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
		
		
		const updateUserC = await page.callMethod('myFn',{
			"type":"update","index":5
		})
		expect(updateUserC).toBe('权限校验未通过')
		
		const updateUserD = await page.callMethod('myFn',{
			"type":"update","index":6
		})
		expect(updateUserD).toBe('权限校验未通过')
		
		
		await page.callMethod('myFn',{
			"type":"update","index":6,"action":"add_view_count"
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
		
		const deleteUser = await page.waitFor(async()=>{
			const deleteUserIndex = await page.data('typeIndex')
			const deleteUserRole = await page.data('currentRole')
			return deleteUserIndex === 3 && deleteUserRole === 'user' 
		})
		
		
			
		await page.callMethod('myFn',{
			"type":"delete","index":0
		})
		
		const deleteUserA = await page.callMethod('myFn',{
			"type":"delete","index":1
		})
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
		expect(deleteUserB).toBe('权限校验未通过')
		
		const deleteUserC = await page.callMethod('myFn',{
			"type":"delete","index":6
		})
		expect(deleteUserC).toBe('权限校验未通过')
		
		await page.callMethod('myFn',{
			"type":"delete","index":6,"action":"add_view_count"
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
		
		const createAuditor = await page.waitFor(async()=>{
			const createAuditorIndex = await page.data('typeIndex')
			const createAuditorRole = await page.data('currentRole')
			return createAuditorIndex === 0 && createAuditorRole === 'auditor' 
		})
		
			
		await page.callMethod('myFn',{
			"type":"create",
			"index":0
		})
		
		const createAuditorA = await page.callMethod('myFn',{
			"type":"create","index":1
		})
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
		expect(createAuditorB).toBe('[permission-test-7.create]权限校验未通过')
		
		await page.callMethod('myFn',{
			"type":"create","index":6,"action":"add_view_count"
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
		
		const readAuditor = await page.waitFor(async()=>{
			const readAuditorIndex = await page.data('typeIndex')
			const readAuditorRole = await page.data('currentRole')
			return readAuditorIndex === 1 && readAuditorRole === 'auditor' 
		})
		
		await page.callMethod('myFn',{
			"type":"read","index":0
		})
		
		const readAuditorA = await page.callMethod('myFn',{
			"type":"read","index":1
		})
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
		expect(readAuditorB).toBe('权限校验未通过')
		
		await page.callMethod('myFn',{
			"type":"read","index":6,"action":"add_view_count"
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
		
		const updateAuditor = await page.waitFor(async()=>{
			const updateAuditorIndex = await page.data('typeIndex')
			const updateAuditorRole = await page.data('currentRole')
			return updateAuditorIndex === 2 && updateAuditorRole === 'auditor' 
		})
		
		
			
		await page.callMethod('myFn',{
			"type":"update","index":0
		})
		
		const updateAuditorA = await page.callMethod('myFn',{
			"type":"update","index":1
		})
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
		expect(updateAuditorB).toBe('权限校验未通过')
		
		await page.callMethod('myFn',{
			"type":"update","index":6,"action":"add_view_count"
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
		
		const deleteAuditor = await page.waitFor(async()=>{
			const deleteAuditorIndex = await page.data('typeIndex')
			const deleteAuditorRole = await page.data('currentRole')
			return deleteAuditorIndex === 3 && deleteAuditorRole === 'auditor' 
		})
		
		
		
		await page.callMethod('myFn',{
			"type":"delete","index":0
		})
		
		const deleteAuditorA = await page.callMethod('myFn',{
			"type":"delete","index":1
		})
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
		expect(deleteAuditorB).toBe('权限校验未通过')
		
		await page.callMethod('myFn',{
			"type":"delete","index":6,"action":"add_view_count"
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
		
		
		const createAdmin = await page.waitFor(async()=>{
			const createAdminIndex = await page.data('typeIndex')
			const createAdminRole = await page.data('currentRole')
			return createAdminIndex === 0 && createAdminRole === 'admin' 
		})
		
		
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
		
		const readAdmin = await page.waitFor(async()=>{
			const readAdminIndex = await page.data('typeIndex')
			const readAdminRole = await page.data('currentRole')
			return readAdminIndex === 1 && readAdminRole === 'admin' 
		})
		
		
			
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
		
		const updateAdmin = await page.waitFor(async()=>{
			const updateAdminIndex = await page.data('typeIndex')
			const updateAdminRole = await page.data('currentRole')
			return updateAdminIndex === 2 && updateAdminRole === 'admin' 
		})
		
			
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
		
		const deleteAdmin = await page.waitFor(async()=>{
			const deleteAdminIndex = await page.data('typeIndex')
			const deleteAdminRole = await page.data('currentRole')
			return deleteAdminIndex === 3 && deleteAdminRole === 'admin' 
		})
		
			
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
	})
})

