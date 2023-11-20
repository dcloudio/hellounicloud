describe('pages/clientDB/unicloud-db-demo/unicloud-db-demo', () => {

	let page
	beforeAll(async () => {
		// 重新reLaunch至首页，并获取首页page对象（其中 program 是uni-automator自动注入的全局对象）
		page = await program.reLaunch('/pages/clientDB/unicloud-db-demo/unicloud-db-demo')
		await page.waitFor('view')
	})

	it("增-删", async () => {
		const count = await page.data('getcount')
		console.log("count: ",count);
		/* expect.assertions(1);
		const count = await page.data('getcount')
		expect(count).toBeTruthy(); */
		const addData = await page.callMethod('add')
		await page.waitFor(500)
		const getDataList = await page.data('dataList')
		// console.log("getDataList: ",getDataList);
		// expect(await getDataList.length).toBeGreaterThanOrEqual(1);
		const removeData = await page.callMethod('remove')
	})


	it("改", async () => {
		const updateData = await page.callMethod('update')
	})

	it("查", async () => {
		const getFnData = await page.callMethod('getFn')
	})

	it("只查一条数据", async () => {
		//开启只查一条
		const swGetone = await page.$('.switch-getone')
		await swGetone.tap()
		await page.waitFor(500)
		const getoneBool = await page.data('getone')
		expect.assertions(1);
		expect(getoneBool).toBeTruthy();
		//关闭只查一条
		await swGetone.tap()
		await page.waitFor(500)
	})

	it("数据翻页-replace", async () => {
		expect.assertions(3);
		//判断类型为翻页加载
		const replace = await page.data('pageData')
		expect(replace).toBe('replace')
		
		//增加当前页码
		const pageCurrentBefore = await page.data('pageCurrent')
		const numBox1 = await page.$('.num-box1')
		const numboxAdd1 = await numBox1.$('.uni-numbox__plus')
		await numboxAdd1.tap()
		await page.waitFor(500)
		
		//获取增加后的页码
		const pageCurrentAfter = await page.data('pageCurrent')
		expect(pageCurrentAfter).toBeGreaterThanOrEqual(pageCurrentBefore);//大于/toBeGreaterThan
		
		
		//增加当前每页数量
		const pageSizeBefore = await page.data('pageSize')
		const numBox2 = await page.$('.num-box2')
		const numboxAdd2 = await numBox2.$('.uni-numbox__plus')
		await numboxAdd2.tap()
		await page.waitFor(500)
		//增加每页数据数量
		const pageSizeAfter = await page.data('pageSize')
		expect(pageSizeAfter).toBeGreaterThanOrEqual(pageSizeBefore);//大于
		
	})

	it("追加数据-add", async () => {
		
		//改变分页策略为add
		const pageCheckbox = await page.$('.page-checkbox')
		const addSet = await page.setData({"pageData": "add"})
		const isAdd = await page.waitFor(async()=>{
			const addText = await page.data('pageData')
			return addText === 'add'
		})
		
		if(isAdd){//加载更多
			/* if (process.env.UNI_PLATFORM === "mp-weixin") {
				const toLoadMore = await page.$('.toLoadMore')
				const loadMore = await toLoadMore.$('.loadMore')
				await loadMore.tap()
				await page.waitFor(300)
			} */
			if (process.env.UNI_PLATFORM === "h5" || process.env.UNI_PLATFORM.startsWith("app")) {
				const loadMore = await page.$('.loadMore')
				await loadMore.tap()
				await page.waitFor(300)
			}
		}
		

		//每页数据数量减去1
		const pageSizeSubBefore = await page.data('pageSize')
		
		const numBox2 = await page.$('.num-box2')
		const numboxMin2 = await numBox2.$('.uni-numbox__minus')
		await numboxMin2.tap()
		await page.waitFor(500)

		//减少数据数量，由3页变为2页
		const pageSizeSubAfter = await page.data('pageSize')
		expect(pageSizeSubAfter).toBeLessThanOrEqual(pageSizeSubBefore);//小于

	})

	
	it("设置排序字段-orderBy", async () => {
		await page.setData({"orderby": 'create_date asc'})
	})



	it("是否查询总数据条数", async () => {
		const swGetcount = await page.$('.switch-getcount')
		await swGetcount.tap()
		await page.waitFor(500)
		const getcountBool = await page.data('getcount')
		expect.assertions(1);
		expect(getcountBool).toBeFalsy();

	})

	it("指定要查询的字段", async () => {
		expect.assertions(1);
		const arr =  [ 'book_id', 'create_date', 'quantity' ] 
		const getFields = await page.data('fields')
		//expect(getFields).toContain('book_id');
		expect(getFields).toEqual(arr);
		//指定字段create_date
		const fieldCheckbox = await page.$('.field-checkbox')
		await fieldCheckbox.setData({
			field: ['create_date'],
		})
	})

})
