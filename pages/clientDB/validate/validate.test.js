// 设置全局超时时间为30秒
jest.setTimeout(30000);
describe('表单验证页面测试', () => {
	let page, segmentedControl, seControl, myForm;
	const WAIT_TIME = {
		SHORT: 500, // 短等待
		MEDIUM: 1000, // 中等等待
		LONG: 2000 // 长等待
	};
	// 测试前准备
	beforeAll(async () => {
		// 重新启动页面
		page = await program.reLaunch('/pages/clientDB/validate/validate');
		await page.waitFor('view');
		await page.waitFor(WAIT_TIME.MEDIUM);
		// 获取分段控制器元素
		segmentedControl = await page.$('.segmented-control');
		seControl = await segmentedControl.$$('.segmented-control__item');
		// 获取表单组件
		myForm = await page.$('.uni-container');
		// isTestMode为true
		await myForm.setData({isTestMode:true})
	});
	
	afterAll( async() => {
		// isTestMode为false
		await myForm.setData({isTestMode:false})
	});

	// 表单提交测试
	describe('表单提交测试', () => {
		it('提交表单并验证成功', async () => {
			// 确保在第一个标签页
			const current = await page.data('current');
			if (current !== 0) {
				await seControl[0].tap();
				await page.waitFor(WAIT_TIME.SHORT);
			}
			// 等待表单组件加载
			await page.waitFor(WAIT_TIME.MEDIUM);
			// 获取表单组件的数据
			const formData = await myForm.data('formData');
			expect(formData).toBeTruthy();
			// 设置表单数据
			await myForm.setData({
				formData: {
					"type": 1,
					"type_name": "数字天堂",
					"comment": "这是一条测试评论",
					"username": "统一",
					"email": "test@dcloud.io",
					"dowload_url": "https://www.dcloud.io",
					"weight": 70,
					"favorite_book": "4",
					"party_member": true,
					"hobby": [],
					"address": ""
				}
			});
			await page.waitFor(WAIT_TIME.SHORT);
			// 提交表单
			const res = await myForm.callMethod('submit');
			await page.waitFor(WAIT_TIME.MEDIUM);
			
			// 验证提交结果
			expect(res.result.id).toBeTruthy();
			expect(res.success).toBe(true);
		});
	});

	// 标签切换测试
	describe('标签切换测试', () => {
		it('可以正常切换标签', async () => {
			// 切换到值校验文档
			await seControl[1].tap();
			await page.waitFor(WAIT_TIME.SHORT);
			let current = await page.data('current');
			expect(current).toBe(1);

			// 切换到域校验文档
			await seControl[2].tap();
			await page.waitFor(WAIT_TIME.SHORT);
			current = await page.data('current');
			expect(current).toBe(2);

			// 切换回实例demo
			await seControl[0].tap();
			await page.waitFor(WAIT_TIME.SHORT);
			current = await page.data('current');
			expect(current).toBe(0);
		});
	});
});