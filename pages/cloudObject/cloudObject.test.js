// uni-app自动化测试教程: uni-app自动化测试教程: https://uniapp.dcloud.io/collocation/auto/hbuilderx-extension/index

describe('pages/cloudObject/cloudObject.vue', () => {

	let page;
	beforeAll(async () => {
		page = await program.reLaunch('/pages/cloudObject/cloudObject')
		console.log("page: ",page);
		await page.waitFor(500);
	});
	
	it('云对象-检查标题',async()=>{
		expect.assertions(1);
		const title = await page.$('.title')
		console.log("title: ",await title.text());
		expect(await title.text()).toBe('基础示例-云对象');
	})

	it('新增一条数据',async()=>{
		expect.assertions(1);
		const addData = await page.callMethod('add')
		console.log("addData: ",addData);
		expect(addData).toBeDefined();
	})
	
	it('删除一条数据',async()=>{
		expect.assertions(1);
		const removeData = await page.callMethod('remove')
		console.log("removeData: ",removeData);
		expect(removeData).toBe('成功删除unicloud-test内第一条数据');
	}) 
	
	it('修改数据',async()=>{
		expect.assertions(1);
		const updateData = await page.callMethod('update')
		console.log("updateData: ",updateData);
		expect(updateData).toBeDefined();
	})
	
	it('查询前10条数据',async()=>{
		// expect.assertions(1);
		const getTenData = await page.callMethod('get')
		console.log("getTenData: ",getTenData);
		console.log("getTenData.data.length: ",getTenData.data.length);
		// expect(getTenData.length).not.toBeUndefined();
		expect(getTenData.data.length).toBeGreaterThanOrEqual(1);
		// expect(getTenData.length).toBeDefined();
		
	})
	
	it('使用公用模块',async()=>{
		expect.assertions(1);
		const useCommon = await page.callMethod('useCommon')
		console.log("useCommon: ",useCommon);
		const record = {"secret":"abcdefg","version":"1.0.0"}
		expect(useCommon).toEqual(record);
	})
	
	
	
});
