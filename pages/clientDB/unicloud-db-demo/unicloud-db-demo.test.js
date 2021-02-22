describe('pages/clientDB/unicloud-db-demo/unicloud-db-demo', () => {

	let page
	beforeAll(async () => {
		// 重新reLaunch至首页，并获取首页page对象（其中 program 是uni-automator自动注入的全局对象）
		page = await program.reLaunch('/pages/clientDB/unicloud-db-demo/unicloud-db-demo')
		if (process.env.UNI_PLATFORM === "h5") {
			await page.waitFor(1000)
		}
		if (process.env.UNI_PLATFORM === "mp-weixin") {
			await page.waitFor(10000)
		}
		page = await program.currentPage()
	})

	it("增", async () => {
		expect.assertions(1);
		const count = await page.data('getcount')
		expect(count).toBeTruthy();
		const addData = await page.callMethod('add')
	})

	/* it("删除",async()=>{
		const removeData = await page.callMethod('remove')
		//console.log(removeData,"11");
	}) */

	it("改", async () => {
		const updateData = await page.callMethod('update')
	})

	it("查", async () => {
		const getFnData = await page.callMethod('getFn')
	})

	it("只查一条数据", async () => {
		const swGetone = await page.$('.switch-getone')
		await swGetone.tap()
		await page.waitFor(500)
		const getoneBool = await page.data('getone')
		expect.assertions(1);
		expect(getoneBool).toBeTruthy();
		await swGetone.tap()
		await page.waitFor(500)
	})

	it("数据翻页", async () => {
		expect.assertions(3);
		//判断类型为翻页加载
		const replace = await page.data('pageData')
		expect(replace).toBe('replace')
		//增加当前页码
		const numBox1 = await page.$('.num-box1')
		const numboxAdd1 = await numBox1.$('.uni-numbox__plus')
		await numboxAdd1.tap()
		await page.waitFor(500)
		//获取增加后的页码
		const pageCurrent = await page.data('pageCurrent')
		expect(pageCurrent).toBe(2)
		//增加当前每页数量
		const numBox2 = await page.$('.num-box2')
		const numboxAdd2 = await numBox2.$('.uni-numbox__plus')
		await numboxAdd2.tap()
		await page.waitFor(500)
		//增加每页数据数量
		const pageSize = await page.data('pageSize')
		expect(pageSize).toBe(3)
	})

	it("add追加数据", async () => {
		//改变分页策略为add
		const pageCheckbox = await page.$('.page-checkbox')
		//console.log(pageCheckbox, "9090");

		await page.setData({
			pageData: "add"
		})

		//加载更多
		const loadMore = await page.$('.loadMore')
		await loadMore.tap()
		await page.waitFor(300)

		//每页数据数量减去1
		const numBox2 = await page.$('.num-box2')
		const numboxMin2 = await numBox2.$('.uni-numbox__minus')
		await numboxMin2.tap()
		await page.waitFor(500)

		//减少数据数量，由3页变为2页
		const pageSize = await page.data('pageSize')
		expect(pageSize).toBe(2)

	})

	/* 
	设置排序字段，待补充
	it("orderBy book_id", async () => {
		setOrderby-checkbox
	}) */



	it("是否查询总数据条数", async () => {
		const swGetcount = await page.$('.switch-getcount')
		//console.log(swGetcount,"swGetcount-------");
		await swGetcount.tap()
		await page.waitFor(500)
		const getcountBool = await page.data('getcount')
		//console.log(getcountBool,"getcountBool-------");
		expect.assertions(1);
		expect(getcountBool).toBeFalsy();

	})

	it("指定要查询的字段", async () => {
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
