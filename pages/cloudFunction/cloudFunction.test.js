describe('pages/cloudFunction/cloudFunction.vue', () => {
	
	let page
	beforeAll(async () => {
	    // 重新reLaunch至首页，并获取首页page对象（其中 program 是uni-automator自动注入的全局对象）
	    page = await program.reLaunch('/pages/cloudFunction/cloudFunction')
	    if (process.env.UNI_PLATFORM === "h5"|| process.env.UNI_PLATFORM === "app-plus") {
	    	await page.waitFor(1000)
	    }
	    if (process.env.UNI_PLATFORM === "mp-weixin") {
	    	await page.waitFor(1000);//微信等待
	    }
	    
	    page = await program.currentPage()
	})
	
	beforeEach(async()=>{
		jest.setTimeout(5000)
		return false
	})
	
	it('云函数页-检查标题',async()=>{
		expect.assertions(1);
		const title = await page.$('.title')
		expect(await title.text()).toBe('基础示例-云函数');
	})
	
	
	it('添加一条数据',async()=>{
		expect.assertions(1);
		const addData = await page.callMethod('add')
		expect(addData).toBeDefined();
	})
	
	/* it('删除一条数据',async()=>{
		expect.assertions(1);
		const removeData = await page.callMethod('remove')
		//console.log(removeData);
		expect(removeData).toBe('成功删除unicloud-test内第一条数据');
	}) */
	
	
	it('修改数据',async()=>{
		expect.assertions(1);
		const updateData = await page.callMethod('update')
		expect(updateData).toBeDefined();
	})
	
	it('查询前10条数据',async()=>{
		expect.assertions(1);
		const getTenData = await page.callMethod('get')
		expect(getTenData.length).not.toBeUndefined();
	})
	
	it('使用公用模块',async()=>{
		expect.assertions(1);
		const useCommon = await page.callMethod('useCommon')
		const record = {"secret":"abcdefg","version":"1.0.0"}
		expect(useCommon).toEqual(record);
	})
	
	
})