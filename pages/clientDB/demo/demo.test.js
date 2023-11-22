describe('pages/clientDB/demo/demo.vue', () => {
	let page,perPage,roles;
	beforeAll(async () => {
		// 重新reLaunch至首页，并获取首页page对象（其中 program 是uni-automator自动注入的全局对象）
		page = await program.reLaunch(
			'/pages/clientDB/demo/demo')
		await page.waitFor("view")
		perPage = await page.$('.page')
		//底部角色控制条
		roles = await perPage.$$('.roles-item')
	})
	it('未登陆', async () => {
		await roles[0].tap()
		const start = Date.now()
		const unLogin = await page.waitFor(async()=>{
			if(Date.now() - start > 4000){
				console.warn('连接服务器超时')
				return true
			}
			const unLoginRole = await page.data('currentRole')
			return unLoginRole === 0 
		})
		console.log("未登陆: ",unLogin );
		const commentBtn = await page.$('.comment-btn')
		console.log(await commentBtn.text(),"text---------");
		expect((await commentBtn.text()).trim()).toBe('写留言')
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
			return userRole === 'user' 
		})
		console.log("用户: ",user);
		if(user){
			//新增一条留言
			const userWrite = await page.callMethod('submitComment', '我是用户')
			const usId = userWrite.id
			console.log('usId: ',usId);
			//expect(usId).not.toBeUndefined();
		}
	})
	it('审核员', async () => {
		await roles[2].tap()
		const start = Date.now()
		const auditor = await page.waitFor(async()=>{
			if(Date.now() - start > 4000){
				console.warn('连接服务器超时')
				return true
			}
			const auditorRole = await page.data('currentRole')
			return auditorRole === 'auditor' 
		})
		console.log("审核员: ",auditor);
		if(auditor){
			//新增一条留言
			const auditorWrite = await page.callMethod('submitComment', '我是审核员11')
			const audId = auditorWrite.id
			expect(audId).not.toBeUndefined();
			await page.waitFor(500)
			// 审核一条为通过
			await page.callMethod('updateState', 
				{
					"detail": {
						"value": true
					},
				},
				audId
			)
			await page.waitFor(500)
			//审核员更改留言 
			await page.setData({
				"activeNoticeId":audId
			})
			await page.callMethod('updateComment',
				"我是审核员123"
			) 
		}
	})
	it('管理员', async () => {
		await roles[3].tap()
		const start = Date.now()
		const admin = await page.waitFor(async()=>{
			if(Date.now() - start > 4000){
				console.warn('连接服务器超时')
				return true
			}
			const adminRole = await page.data('currentRole')
			return adminRole === 'admin' 
		})
		// await page.setData({'currentRole':'admin'})
		// const adminRole = await page.data('currentRole')
		console.log("管理员: ",admin);
		if(admin){
			//管理员写入一条留言
			const adminWrite = await page.callMethod('submitComment','我是管理员') 
			var admId = adminWrite.id
			expect(admId).not.toBeUndefined();
			await page.waitFor(500)
			// 审核一条为通过
			await page.callMethod('updateState', 
				{
					"detail": {
						"value": true
					},
				},
				admId
			)
			await page.waitFor(500)
			//审核一条为拒绝
			await page.callMethod('updateState',
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
		}
	})
})
