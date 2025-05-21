jest.setTimeout(30000)
describe('ClientDB API 测试', () => {
	let page
	beforeAll(async () => {
		// 重新reLaunch至首页，并获取首页page对象（其中 program 是uni-automator自动注入的全局对象）
		page = await program.reLaunch('/pages/clientDB/clientDB-api/clientDB-api')
		await page.waitFor("view")
	})

	describe('基础查询测试', () => {
		it('查询图书表数据 - 应返回4条记录', async () => {
			const bookData = await page.callMethod('getData', 'book')
			expect(bookData).toHaveLength(4)
		})

		it('查询订单表数据 - 应返回有效数据', async () => {
			const orderData = await page.callMethod('getData', 'order')
			expect(orderData).toBeDefined()
			expect(Array.isArray(orderData)).toBe(true)
		})
	})

	describe('分页查询测试', () => {
		it('分页查询图书数据 - 验证分页参数和结果', async () => {
			// 获取分页参数
			const numBox1 = await page.$('.num-box1')
			const numBox2 = await page.$('.num-box2')
			const pageSize = await numBox1.property('value')
			const pageCurrent = await numBox2.property('value')

			// 验证特定分页条件下的数据
			if (pageSize === 1 && pageCurrent === 2) {
				const orderData = await page.callMethod('getPageData', 'order')
				expect(orderData).toHaveLength(2)
			}

			// 增加页码
			const numBox1Add = await numBox1.$('.uni-numbox__plus')
			await numBox1Add.tap()
			await page.waitFor(1000)
			const pageSizeAfter = await page.data('pageSize')
			expect(Number(pageSizeAfter)).toBeGreaterThanOrEqual(Number(pageSize))

			// 增加每页查询数量
			const numBox2Add = await numBox2.$('.uni-numbox__plus')
			await numBox2Add.tap()
			await page.waitFor(1000)
			const pageCurrentAfter = await page.data('pageCurrent')
			expect(Number(pageCurrentAfter)).toBeGreaterThanOrEqual(Number(pageCurrent))

			// 验证分页数据
			const bookData = await page.callMethod('getPageData')
			expect(bookData).toBeDefined()
			expect(Array.isArray(bookData)).toBe(true)
		})
	})

	describe('联表查询测试', () => {
		it('联表查询订单和图书 - 应返回有效数据', async () => {
			const orderBookData = await page.callMethod('getOrder')
			expect(orderBookData).toBeDefined()
			expect(Array.isArray(orderBookData)).toBe(true)
		})
	})

	describe('单条记录查询测试', () => {
		it('查询单本图书数据 - 应返回指定图书信息', async () => {
			const getOneBook = await page.callMethod('getOneBook')
			const expectedBook = {
				"_id": "1",
				"author": "吴承恩",
				"title": "西游记"
			}
			expect(getOneBook).toEqual(expectedBook)
		})
	})

	describe('查询结果统计测试', () => {
		it('查询结果返回总数 - 应返回4条记录', async () => {
			const getBookHasCount = await page.callMethod('getBookHasCount')
			expect(getBookHasCount.count).toBe(4)
		})
	})

	describe('字段查询测试', () => {
		it('仅查询图书书名 - 应返回包含指定字段的记录', async () => {
			const getBookTitle = await page.callMethod('getBookTitle')
			const expectedRecord = {
				_id: '1',
				title: '西游记'
			}
			expect(getBookTitle).toContainEqual(expectedRecord)
		})

		it('查询带别名的数据 - 应返回正确别名的记录', async () => {
			const getBookAs = await page.callMethod('getBookAs')
			const expectedRecord = {
				_id: '1',
				title: '西游记',
				book_author: '吴承恩'
			}
			expect(getBookAs).toContainEqual(expectedRecord)
		})
	})

	describe('排序查询测试', () => {
		it('按质量升序排序 - 应返回有序数据', async () => {
			const quantityData = await page.callMethod('getOrderOrderBy', 'quantity asc')
			expect(quantityData).toBeDefined()
			expect(Array.isArray(quantityData)).toBe(true)
			// 验证排序
			for (let i = 1; i < quantityData.length; i++) {
				expect(quantityData[i].quantity).toBeGreaterThanOrEqual(quantityData[i-1].quantity)
			}
		})

		it('按创建时间降序排序 - 应返回有序数据', async () => {
			const createDateData = await page.callMethod('getOrderOrderBy', 'create_date desc')
			expect(createDateData).toBeDefined()
			expect(Array.isArray(createDateData)).toBe(true)
			
			// 修改日期比较逻辑
			for (let i = 1; i < createDateData.length; i++) {
				const prevDate = new Date(createDateData[i-1].create_date).getTime()
				const currentDate = new Date(createDateData[i].create_date).getTime()
				expect(prevDate).toBeGreaterThanOrEqual(currentDate)
			}
		})

		it('多字段排序 - 应返回正确排序的数据', async () => {
			const resData = await page.callMethod('getOrderOrderBy', 'quantity asc, create_date desc')
			expect(resData).toBeDefined()
			expect(Array.isArray(resData)).toBe(true)
			
			// 修改排序验证逻辑
			for (let i = 1; i < resData.length; i++) {
				if (resData[i].quantity === resData[i-1].quantity) {
					const prevDate = new Date(resData[i-1].create_date).getTime()
					const currentDate = new Date(resData[i].create_date).getTime()
					expect(prevDate).toBeGreaterThanOrEqual(currentDate)
				} else {
					expect(Number(resData[i].quantity)).toBeGreaterThanOrEqual(Number(resData[i-1].quantity))
				}
			}
		})
	})

	describe('树形数据查询测试', () => {
		it('查询树形数据 - 应返回包含子节点的数据', async () => {
			const treeData = await page.callMethod('getTreeFn')
			expect(treeData).toBeDefined()
			expect(Array.isArray(treeData)).toBe(true)
			expect(treeData[0].children).toBeDefined()
			expect(Array.isArray(treeData[0].children)).toBe(true)
		})
	})
})
