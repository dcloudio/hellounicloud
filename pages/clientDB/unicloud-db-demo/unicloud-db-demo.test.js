// 设置全局超时时间为30秒
jest.setTimeout(30000);

describe('pages/clientDB/unicloud-db-demo/unicloud-db-demo', () => {
	let page;
	const WAIT_TIME = {
		SHORT: 500,    // 短等待
		MEDIUM: 1000,  // 中等等待
		LONG: 2000     // 长等待
	};

	// 测试前准备
	beforeAll(async () => {
		try {
			page = await program.reLaunch('/pages/clientDB/unicloud-db-demo/unicloud-db-demo');
			await page.waitFor('view');
		} catch (error) {
			console.error('页面启动失败:', error);
			throw error;
		}
	});

	// 测试后清理
	afterAll(async () => {
		try {
			await page.setData({
				'getone': false,
				'getcount': true
			});
		} catch (error) {
			console.error('清理数据失败:', error);
		}
	});

	// 基础CRUD测试
	describe('基础数据操作', () => {
		it("增加数据", async () => {
			const count = await page.data('getcount');
			expect(count).toBeTruthy();
			await page.callMethod('add');
			await page.waitFor(WAIT_TIME.SHORT);
		});

		it("删除数据", async () => {
			await page.callMethod('remove');
			await page.waitFor(WAIT_TIME.SHORT);
		});

		it("更新数据", async () => {
			await page.callMethod('update');
			await page.waitFor(WAIT_TIME.SHORT);
		});

		it("查询数据", async () => {
			await page.callMethod('getFn');
			await page.waitFor(WAIT_TIME.SHORT);
		});
	});

	// 分页测试
	describe('分页功能测试', () => {
		it("数据翻页-replace模式", async () => {
			expect.assertions(3);

			// 验证翻页模式
			const replace = await page.data('pageData');
			expect(replace).toBe('replace');

			// 增加页码
			const pageCurrentBefore = await page.data('pageCurrent');
			const numBox1 = await page.$('.num-box1');
			const numboxAdd1 = await numBox1.$('.uni-numbox__plus');
			await numboxAdd1.tap();
			await page.waitFor(WAIT_TIME.SHORT);

			const pageCurrentAfter = await page.data('pageCurrent');
			expect(pageCurrentAfter).toBeGreaterThanOrEqual(pageCurrentBefore);

			// 增加每页数量
			const pageSizeBefore = await page.data('pageSize');
			const numBox2 = await page.$('.num-box2');
			const numboxAdd2 = await numBox2.$('.uni-numbox__plus');
			await numboxAdd2.tap();
			await page.waitFor(WAIT_TIME.SHORT);

			const pageSizeAfter = await page.data('pageSize');
			expect(pageSizeAfter).toBeGreaterThanOrEqual(pageSizeBefore);
		});

		it("追加数据-add模式", async () => {
			// 切换分页策略
			await page.setData({"pageData": "add"});
			await page.waitFor(WAIT_TIME.MEDIUM);

			// 加载更多数据
			if (process.env.UNI_PLATFORM === "h5" || process.env.UNI_PLATFORM.startsWith("app")) {
				const loadMore = await page.$('.loadMore');
				await loadMore.tap();
				await page.waitFor(WAIT_TIME.SHORT);
			}

			// 减少每页数据数量
			const pageSizeSubBefore = await page.data('pageSize');
			const numBox2 = await page.$('.num-box2');
			const numboxMin2 = await numBox2.$('.uni-numbox__minus');
			await numboxMin2.tap();
			await page.waitFor(WAIT_TIME.SHORT);

			const pageSizeSubAfter = await page.data('pageSize');
			expect(pageSizeSubAfter).toBeLessThanOrEqual(pageSizeSubBefore);
		});
	});

	// 查询配置测试
	describe('查询配置测试', () => {
		it("设置排序字段", async () => {
			await page.setData({"orderby": 'create_date asc'});
			await page.waitFor(WAIT_TIME.SHORT);
		});

		it("查询总数据条数配置", async () => {
			await page.setData({'getcount': false});
			await page.waitFor(WAIT_TIME.LONG);

			const dataListTest = await page.data('dataListTest');
			expect(dataListTest.length).toBe(await page.data('pageSize'));
		});

		it("指定查询字段", async () => {
			expect.assertions(1);
			const expectedFields = ['book_id', 'create_date', 'quantity'];
			const getFields = await page.data('fields');
			expect(getFields).toEqual(expectedFields);

			// 更新查询字段
			const fieldCheckbox = await page.$('.field-checkbox');
			await fieldCheckbox.setData({
				field: ['create_date'],
			});
			await page.waitFor(WAIT_TIME.SHORT);
		});

		it("只查询一条数据", async () => {
			await page.setData({'getone': true});
			await page.waitFor(WAIT_TIME.LONG);

			const dataList = await page.data('dataListTest');
			expect(dataList.book_id == '这条数据被改' || dataList.book_id == 'add-test').toBe(true);
		});
	});
});
