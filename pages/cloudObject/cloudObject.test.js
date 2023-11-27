// uni-app自动化测试教程: uni-app自动化测试教程: https://uniapp.dcloud.io/collocation/auto/hbuilderx-extension/index

describe('pages/cloudObject/cloudObject.vue', () => {

	let page;
	beforeAll(async () => {
		page = await program.switchTab('/pages/cloudObject/cloudObject')
		await page.waitFor('view');
	});
	
	it('云对象-检查标题',async()=>{
		expect.assertions(1);
		const title = await page.$('.title')
		expect(await title.text()).toBe('基础示例-云对象');
	})

	it('新增一条数据',async()=>{
		expect.assertions(1);
		const addData = await page.callMethod('add')
		expect(addData).toBeDefined();
	})
	
	it('删除一条数据',async()=>{
		expect.assertions(1);
		const removeData = await page.callMethod('remove')
		expect(removeData).toBe('成功删除unicloud-test内第一条数据');
	}) 
	
	it('修改数据',async()=>{
		expect.assertions(1);
		const updateData = await page.callMethod('update')
		expect(updateData).toBeDefined();
	})
	
	it('查询前10条数据',async()=>{
		expect.assertions(1);
		const getTenData = await page.callMethod('get')
		expect(getTenData.data.length).toBeGreaterThanOrEqual(1);
	})
	
	it('使用公用模块',async()=>{
		expect.assertions(1);
		const useCommon = await page.callMethod('useCommon')
		const record = {"secret":"abcdefg","version":"1.0.0"}
		expect(useCommon).toEqual(record);
	})
	
});
