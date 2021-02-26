describe('pages/clientDB/demo/demo.vue', () => {
	let page
	beforeAll(async () => {
		// 重新reLaunch至首页，并获取首页page对象（其中 program 是uni-automator自动注入的全局对象）
		page = await program.reLaunch(
			'/pages/clientDB/demo/demo')
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
		await page.waitFor(2000)
		
		const unLogin = await page.waitFor(async()=>{
			const unLoginRole = await page.data('currentRole')
			return unLoginRole === 0 
		})
		//console.log(unLogin,"unLogin------------------------------");
		
		const commentBtn = await page.$('.comment-btn')
		expect(await commentBtn.text()).toBe('写留言')
		
	})


	it('用户', async () => {
		const perPage = await page.$('.page')
		//底部角色控制条
		const roles = await perPage.$$('.roles-item')
		//点击创建
		await roles[1].tap()
		
		const user = await page.waitFor(async()=>{
			const userRole = await page.data('currentRole')
			return userRole === 'user' 
		})
		//console.log(user,"user------------------------------");
		
		//新增一条留言
		
		const userWrite = await page.callMethod('submitComment', '我是用户')
		//console.log(userWrite,"userWrite--------");
		const usId = userWrite.id
		//console.log("usId: ",usId);
		//expect(usId).not.toBeUndefined();
		await page.waitFor(1000)
		
		
	})


	it('审核员', async () => {
		const perPage = await page.$('.page')
		//底部角色控制条
		const roles = await perPage.$$('.roles-item')
		//点击创建
		await roles[2].tap()
		
		const auditor = await page.waitFor(async()=>{
			const auditorRole = await page.data('currentRole')
			return auditorRole === 'auditor' 
		})
		//console.log(auditor,"auditor------------------------------");
		
		
		//新增一条留言
		const auditorWrite = await page.callMethod('submitComment', '我是审核员11')
		//console.log("auditorWrite: ",auditorWrite);
		const audId = auditorWrite.id
		//console.log(audId, "audId----------");
		expect(audId).not.toBeUndefined();
		await page.waitFor(1000)
		// 审核一条为通过
		await page.callMethod('updateState', 
			{
				"detail": {
					"value": true
				},
			},
			audId
		)
		await page.waitFor(1000)
		
		//审核员更改留言 
		const setUid = await page.setData({
			"activeNoticeId":audId
		})
		//console.log(await page.data('activeNoticeId'),"setUid-----------");
		const auditorUpdate = await page.callMethod('updateComment',
			"我是审核员123"
		) 
		//console.log(auditorUpdate,"auditorUpdate--------");
		await page.waitFor(1000)

	})


	it('管理员', async () => {
		const perPage = await page.$('.page')
		//底部角色控制条
		const roles = await perPage.$$('.roles-item')
		//点击创建
		await roles[3].tap()
		
		const admin = await page.waitFor(async()=>{
			const adminRole = await page.data('currentRole')
			return adminRole === 'admin' 
		})
		//console.log(admin,"admin------------------------------");
		
		
		//管理员写入一条留言
		const adminWrite = await page.callMethod('submitComment','我是管理员') 
		//console.log("adminWrite: ",adminWrite);
		var admId = adminWrite.id
		//console.log(admId,"admId----------");
		expect(admId).not.toBeUndefined();
		await page.waitFor(1000)
		
		// 审核一条为通过
		await page.callMethod('updateState', 
			{
				"detail": {
					"value": true
				},
			},
			admId
		)
		await page.waitFor(1000)
		
		
		//审核一条为拒绝
		const adminRefuse = await page.callMethod('updateState',
			{
				"detail": {
					"value": false
				},
			},
			admId
		)
		
		//管理员删除创建的这条留言   弹框无法操作，点击确定才能删除
		await page.callMethod('clickIcon',
			1,
			{
				"state": 0,
				"text": "我是管理员",
				"_id": admId
			}
		) 
		
	})


})
