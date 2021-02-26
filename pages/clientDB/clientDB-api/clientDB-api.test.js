describe('pages/clientDB/clientDB-api/clientDB-api.nvue', () => {

	let page
	beforeAll(async () => {
		// 重新reLaunch至首页，并获取首页page对象（其中 program 是uni-automator自动注入的全局对象）
		page = await program.reLaunch('/pages/clientDB/clientDB-api/clientDB-api')
		if (process.env.UNI_PLATFORM === "h5") {
			await page.waitFor(1000)
		}
		if (process.env.UNI_PLATFORM === "mp-weixin") {
			await page.waitFor(10000)
		}

		page = await program.currentPage()
	})


	it('查图书book表的数据', async () => {
		expect.assertions(1);
		const bookData = await page.callMethod('getData', 'book')
		expect(bookData.length).toBe(4)
	})

	it('查订单order表的数据', async () => {
		expect.assertions(1);
		const orderData = await page.callMethod('getData', 'order')
		//console.log("orderData: ",orderData);
		expect(orderData.length).not.toBeUndefined();
	})

	it('分页查图书book表的数据', async () => {
		//expect.assertions(1);
		//获取页码
		const numBox1 = await page.$('.num-box1')
		const pageSize = await numBox1.property('value')
		//获取当前页
		const numBox2 = await page.$('.num-box2')
		const pageCurrent = await numBox2.property('value')

		if (pageSize === 1 && pageCurrent == 2) {
			const orderData = await page.callMethod('getPageData', 'order')
			expect(orderData.length).toBe(2)
		}
		
		
		//增加页码
		const numBox1Add = await numBox1.$('.uni-numbox__plus')
		await numBox1Add.tap()
		await page.waitFor(1000)
		const pageSizeAfter = await page.data('pageSize')
		//console.log("pageSizeAfter: ",pageSizeAfter);
		
		//增加每页查询数量
		const numBox2Add = await numBox2.$('.uni-numbox__plus')
		await numBox2Add.tap()
		await page.waitFor(1000)
		const pageCurrentAfter = await page.data('pageCurrent')
		//console.log("pageCurrentAfter: ",pageCurrentAfter);
		
		const bookData = await page.callMethod('getPageData')
		//console.log("bookData: ",bookData);
		
	})


	it('联表查询订单和图书', async () => {
		expect.assertions(1);
		const orderBookData = await page.callMethod('getOrder')
		expect(orderBookData.length).not.toBeUndefined();
	})

	it('查询一本图书数据', async () => {
		const getOneBook = await page.callMethod('getOneBook')
		//console.log("getOneBook: ", getOneBook);
		expect(getOneBook).toEqual({
			"_id": "1",
			"author": "吴承恩",
			"title": "西游记"
		});
	})

	it('查询结果返回总数', async () => {
		const getBookHasCount = await page.callMethod('getBookHasCount')
		expect(getBookHasCount.count).toEqual(4)
	})

	it('仅查询图书数据的书名', async () => {
		const getBookTitle = await page.callMethod('getBookTitle')
		const aTitleRecord = {
			_id: '1',
			title: '西游记'
		};
		expect(getBookTitle).toContainEqual(aTitleRecord);
	})

	it('获得被设置别名的数据', async () => {
		const getBookAs = await page.callMethod('getBookAs')
		//console.log(getBookAs,"333");
		const aBookAsRecord = {
			_id: '1',
			title: '西游记',
			book_author: '吴承恩'
		};
		expect(getBookAs).toContainEqual(aBookAsRecord);
	})

	it('按质量升序', async () => {
		const quantityData = await page.callMethod('getOrderOrderBy',
			'quantity asc')
		expect(quantityData.length).not.toBeUndefined();
	})

	it('按创建时间降序', async () => {
		const createDateData = await page.callMethod('getOrderOrderBy',
			'create_date desc')
		expect(createDateData.length).not.toBeUndefined();
		//console.log(createDateData, "333");
		/* const lastDateRecord = {
			_id: '6001a5755c2b510001a64508',
			book_id: '2',
			create_date: 3,
			quantity: 222,
		}
		for (var i = 0; i < createDateData.length; i++) {
			if (i == 5) {
				expect(createDateData[5]).toEqual(lastDateRecord);
			}
		} */
	})

	it('质量相同时，按创建时间降序', async () => {
		const resData = await page.callMethod(
			'getOrderOrderBy',
			'quantity asc, create_date desc'
		)
		expect(resData.length).not.toBeUndefined();
	})
	
	it('查询树形数据', async () => {
		const treeData = await page.callMethod('getTreeFn')
		const children = treeData[0].children
		const childrenRecod = {
			_id: '5fe77232974b6900018c6cb1',
			name: '一级部门A',
			parent_id: '5fe77207974b6900018c6c9c',
			status: 0,
			children: []
		}
		expect(children).toContainEqual(childrenRecod);
	})


})
