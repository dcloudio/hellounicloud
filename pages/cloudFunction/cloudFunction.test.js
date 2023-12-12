describe('pages/cloudFunction/cloudFunction.vue', () => {
	
	let page
	beforeAll(async () => {
	    // 重新reLaunch至首页，并获取首页page对象（其中 program 是uni-automator自动注入的全局对象）
	    page = await program.switchTab('/pages/cloudFunction/cloudFunction')
	    await page.waitFor('view')
	})
	it('云函数页-检查标题',async()=>{
		expect.assertions(1);
		const title = await page.$('.title')
		expect(await title.text()).toBe('基础示例-云函数');
	})
	it('添加一条数据',async()=>{
		expect.assertions(1);
		const addData = await page.callMethod('add')
		expect(addData.length).toBe(24);
	})
	it('删除一条数据',async()=>{
		expect.assertions(1);
		const removeData = await page.callMethod('remove')
		expect(removeData).toBe('成功删除unicloud-test内第一条数据');
	})
	it('修改数据',async()=>{
		expect.assertions(1);
		const updateData = await page.callMethod('update')
		if(updateData.status == -1){
			expect(updateData.msg).toBe('集合unicloud-test内没有数据');
		}else{
			expect(updateData.msg).toBeDefined();
		}
	})
	it('查询前10条数据',async()=>{
		const getTenData = await page.callMethod('get')
		// 首次可能也会没有数据
		if(getTenData.affectedDocs>0){
			expect(getTenData.data.length).toBeGreaterThanOrEqual(1);
		}else{
			console.log('no data')
		}
	})
	it('使用公用模块',async()=>{
		expect.assertions(1);
		const useCommon = await page.callMethod('useCommon')
		const record = {"secret":"abcdefg","version":"1.0.0"}
		expect(useCommon).toEqual(record);
	})
})