describe('权限表测试', () => {
	let page;
	let perPage;
	let segItems;
	let roles;

	// 添加等待状态变化的辅助函数
	const waitForStateChange = async (page, expectedTypeIndex, expectedRole, maxRetries = 5, interval = 1000) => {
		for (let i = 0; i < maxRetries; i++) {
			const typeIndex = await page.data('typeIndex');
			const currentRole = await page.data('currentRole');

			if (typeIndex === expectedTypeIndex && currentRole === expectedRole) {
				return true;
			}

			await page.waitFor(interval);
		}
		throw new Error(`State change timeout: expected typeIndex=${expectedTypeIndex}, role=${expectedRole}`);
	};

	beforeAll(async () => {
		page = await program.reLaunch('/pages/clientDB/permission-table-simple/permission-table-simple');
		// 设置测试模式
		await page.setData({
			isTestMode: true
		});
		// 获取页面元素
		perPage = await page.$('.page');
		// 头部操作控制条
		segItems = await perPage.$$('.segmented-control__item');
		// 底部角色控制条
		roles = await perPage.$$('.roles-item');
	});

	afterAll(async () => {
		// 关闭测试模式
		await page.setData({
			isTestMode: false
		});
	});

	// 测试创建操作
	describe('创建操作测试', () => {
		// 未登录用户测试
		describe('未登录用户创建测试', () => {
			beforeAll(async () => {
				// 点击：创建
				await segItems[0].tap();
				// 点击：未登录
				await roles[0].tap();
				await page.waitFor(500);
				// 验证状态
				const typeIndex = await page.data('typeIndex');
				const currentRole = await page.data('currentRole');
				expect(typeIndex).toBe(0);
				expect(currentRole).toBe(0);
			});

			it('无任何限制-创建数据', async () => {
				const res = await page.callMethod('myFn', {
					type: 'create',
					index: 0
				});
				expect(res.id).toBeTruthy();
			});

			it('完全拒绝-创建数据', async () => {
				const res = await page.callMethod('myFn', {
					type: 'create',
					index: 1
				});
				expect(res.errMsg).toContain('未能获取当前用户信息');
			});

			it('需要登录-创建数据', async () => {
				const res = await page.callMethod('myFn', {
					type: 'create',
					index: 2
				});
				expect(res.errMsg).toContain('未能获取当前用户信息');
			});

			it('限特定角色-创建数据', async () => {
				const res = await page.callMethod('myFn', {
					type: 'create',
					index: 5
				});
				expect(res.errMsg).toContain('未能获取当前用户信息');
			});

			it('读取必须带上action-创建数据', async () => {
				const res = await page.callMethod('myFn', {
					type: 'create',
					index: 6
				});
				expect(res.errMsg).toContain('未能获取当前用户信息');
			});

			it('读取必须带上action-创建数据(带action)', async () => {
				const res = await page.callMethod('myFn', {
					type: 'create',
					index: 6,
					action: 'add_view_count'
				});
				expect(res.id).toBeTruthy();
			});
		});

		// 普通用户测试
		describe('普通用户创建测试', () => {
			beforeAll(async () => {
				// 点击：创建
				await segItems[0].tap();
				// 点击：普通用户
				await roles[1].tap();
				// 等待状态切换完成
				await waitForStateChange(page, 0, 'user');
			});

			it('无任何限制-创建数据', async () => {
				const res = await page.callMethod('myFn', {
					type: 'create',
					index: 0
				});
				expect(res.id).toBeTruthy();
			});

			it('完全拒绝-创建数据', async () => {
				const res = await page.callMethod('myFn', {
					type: 'create',
					index: 1
				});
				expect(res.errMsg).toContain('权限校验未通过');
			});

			it('需要登录-创建数据', async () => {
				const res = await page.callMethod('myFn', {
					type: 'create',
					index: 2
				});
				expect(res.id).toBeTruthy();
			});

			it('限特定角色-创建数据', async () => {
				const res = await page.callMethod('myFn', {
					type: 'create',
					index: 5
				});
				expect(res.errMsg).toContain('权限校验未通过');
			});

			it('读取必须带上action-创建数据', async () => {
				const res = await page.callMethod('myFn', {
					type: 'create',
					index: 6
				});
				expect(res.errMsg).toContain('权限校验未通过');
			});

			it('读取必须带上action-创建数据(带action)', async () => {
				const res = await page.callMethod('myFn', {
					type: 'create',
					index: 6,
					action: 'add_view_count'
				});
				expect(res.id).toBeTruthy();
			});
		});

		// 审核员测试
		describe('审核员创建测试', () => {
			beforeAll(async () => {
				// 点击：创建
				await segItems[0].tap();
				// 点击：审核员
				await roles[2].tap();
				// 等待状态切换完成
				await waitForStateChange(page, 0, 'auditor');
			});

			it('无任何限制-创建数据', async () => {
				const res = await page.callMethod('myFn', {
					type: 'create',
					index: 0
				});
				expect(res.id).toBeTruthy();
			});

			it('完全拒绝-创建数据', async () => {
				const res = await page.callMethod('myFn', {
					type: 'create',
					index: 1
				});
				expect(res.errMsg).toContain('权限校验未通过');
			});

			it('需要登录-创建数据', async () => {
				const res = await page.callMethod('myFn', {
					type: 'create',
					index: 2
				});
				expect(res.id).toBeTruthy();
			});

			it('限特定角色-创建数据', async () => {
				const res = await page.callMethod('myFn', {
					type: 'create',
					index: 5
				});
				expect(res.id).toBeTruthy();
			});

			it('读取必须带上action-创建数据', async () => {
				const res = await page.callMethod('myFn', {
					type: 'create',
					index: 6
				});
				expect(res.errMsg).toContain('权限校验未通过');
			});

			it('读取必须带上action-创建数据(带action)', async () => {
				const res = await page.callMethod('myFn', {
					type: 'create',
					index: 6,
					action: 'add_view_count'
				});
				expect(res.id).toBeTruthy();
			});
		});

		// 管理员测试
		describe('管理员创建测试', () => {
			beforeAll(async () => {
				// 点击：创建
				await segItems[0].tap();
				// 点击：管理员
				await roles[3].tap();
				// 等待状态切换完成
				await waitForStateChange(page, 0, 'admin');
			});

			it('无任何限制-创建数据', async () => {
				const res = await page.callMethod('myFn', {
					type: 'create',
					index: 0
				});
				expect(res.id).toBeTruthy();
			});

			it('完全拒绝-创建数据', async () => {
				const res = await page.callMethod('myFn', {
					type: 'create',
					index: 1
				});
				expect(res.id).toBeTruthy();
			});

			it('需要登录-创建数据', async () => {
				const res = await page.callMethod('myFn', {
					type: 'create',
					index: 2
				});
				expect(res.id).toBeTruthy();
			});

			it('限特定角色-创建数据', async () => {
				const res = await page.callMethod('myFn', {
					type: 'create',
					index: 5
				});
				expect(res.id).toBeTruthy();
			});

			it('读取必须带上action-创建数据', async () => {
				const res = await page.callMethod('myFn', {
					type: 'create',
					index: 6
				});
				expect(res.id).toBeTruthy();
			});

			it('读取必须带上action-创建数据(带action)', async () => {
				const res = await page.callMethod('myFn', {
					type: 'create',
					index: 6,
					action: 'add_view_count'
				});
				expect(res.id).toBeTruthy();
			});
		});
	});

	// 测试读取操作
	describe('读取操作测试', () => {
		// 未登录用户测试
		describe('未登录用户读取测试', () => {
			beforeAll(async () => {
				// 点击：读取
				await segItems[1].tap();
				// 点击：未登录
				await roles[0].tap();
				await page.waitFor(500);
				// 验证状态
				const typeIndex = await page.data('typeIndex');
				const currentRole = await page.data('currentRole');
				expect(typeIndex).toBe(1);
				expect(currentRole).toBe(0);
			});

			it('无任何限制-读取数据', async () => {
				const res = await page.callMethod('myFn', {
					type: 'read',
					index: 0
				});
				expect(res.data.length).toBeGreaterThan(0);
			});

			it('完全拒绝-读取数据', async () => {
				const res = await page.callMethod('myFn', {
					type: 'read',
					index: 1
				});
				expect(res.errMsg).toContain('未能获取当前用户信息');
			});

			it('需要登录-读取数据', async () => {
				const res = await page.callMethod('myFn', {
					type: 'read',
					index: 2
				});
				expect(res.errMsg).toContain('未能获取当前用户信息');
			});

			it('限特定角色-读取数据', async () => {
				const res = await page.callMethod('myFn', {
					type: 'read',
					index: 5
				});
				expect(res.errMsg).toContain('未能获取当前用户信息');
			});

			it('读取必须带上action-读取数据', async () => {
				const res = await page.callMethod('myFn', {
					type: 'read',
					index: 6
				});
				expect(res.errMsg).toContain('未能获取当前用户信息');
			});

			it('读取必须带上action-读取数据(带action)', async () => {
				const res = await page.callMethod('myFn', {
					type: 'read',
					index: 6,
					action: 'add_view_count'
				});
				expect(res.data.length).toBeGreaterThan(0);
			});
		});

		// 普通用户测试
		describe('普通用户读取测试', () => {
			beforeAll(async () => {
				// 点击：读取
				await segItems[1].tap();
				// 点击：普通用户
				await roles[1].tap();
				// 等待状态切换完成
				await waitForStateChange(page, 1, 'user');
			});

			it('无任何限制-读取数据', async () => {
				const res = await page.callMethod('myFn', {
					type: 'read',
					index: 0
				});
				expect(res.data.length).toBeGreaterThan(0);
			});

			it('完全拒绝-读取数据', async () => {
				const res = await page.callMethod('myFn', {
					type: 'read',
					index: 1
				});
				expect(res.errMsg).toContain('权限校验未通过');
			});

			it('需要登录-读取数据', async () => {
				const res = await page.callMethod('myFn', {
					type: 'read',
					index: 2
				});
				expect(res.data.length).toBeGreaterThan(0);
			});

			it('限特定角色-读取数据', async () => {
				const res = await page.callMethod('myFn', {
					type: 'read',
					index: 5
				});
				expect(res.errMsg).toContain('权限校验未通过');
			});

			it('读取必须带上action-读取数据', async () => {
				const res = await page.callMethod('myFn', {
					type: 'read',
					index: 6
				});
				expect(res.errMsg).toContain('权限校验未通过');
			});

			it('读取必须带上action-读取数据(带action)', async () => {
				const res = await page.callMethod('myFn', {
					type: 'read',
					index: 6,
					action: 'add_view_count'
				});
				expect(res.data.length).toBeGreaterThan(0);
			});
		});

		// 审核员测试
		describe('审核员读取测试', () => {
			beforeAll(async () => {
				// 点击：读取
				await segItems[1].tap();
				// 点击：审核员
				await roles[2].tap();
				// 等待状态切换完成
				await waitForStateChange(page, 1, 'auditor');
			});

			it('无任何限制-读取数据', async () => {
				const res = await page.callMethod('myFn', {
					type: 'read',
					index: 0
				});
				expect(res.data.length).toBeGreaterThan(0);
			});

			it('完全拒绝-读取数据', async () => {
				const res = await page.callMethod('myFn', {
					type: 'read',
					index: 1
				});
				expect(res.errMsg).toContain('权限校验未通过');
			});

			it('需要登录-读取数据', async () => {
				const res = await page.callMethod('myFn', {
					type: 'read',
					index: 2
				});
				expect(res.data.length).toBeGreaterThan(0);
			});

			it('限特定角色-读取数据', async () => {
				const res = await page.callMethod('myFn', {
					type: 'read',
					index: 5
				});
				expect(res.data.length).toBeGreaterThan(0);
			});

			it('读取必须带上action-读取数据', async () => {
				const res = await page.callMethod('myFn', {
					type: 'read',
					index: 6
				});
				expect(res.errMsg).toContain('权限校验未通过');
			});

			it('读取必须带上action-读取数据(带action)', async () => {
				const res = await page.callMethod('myFn', {
					type: 'read',
					index: 6,
					action: 'add_view_count'
				});
				expect(res.data.length).toBeGreaterThan(0);
			});
		});

		// 管理员测试
		describe('管理员读取测试', () => {
			beforeAll(async () => {
				// 点击：读取
				await segItems[1].tap();
				// 点击：管理员
				await roles[3].tap();
				// 等待状态切换完成
				await waitForStateChange(page, 1, 'admin');
			});

			it('无任何限制-读取数据', async () => {
				const res = await page.callMethod('myFn', {
					type: 'read',
					index: 0
				});
				expect(res.data.length).toBeGreaterThan(0);
			});

			it('完全拒绝-读取数据', async () => {
				const res = await page.callMethod('myFn', {
					type: 'read',
					index: 1
				});
				expect(res.data.length).toBeGreaterThan(0);
			});

			it('需要登录-读取数据', async () => {
				const res = await page.callMethod('myFn', {
					type: 'read',
					index: 2
				});
				expect(res.data.length).toBeGreaterThan(0);
			});

			it('限特定角色-读取数据', async () => {
				const res = await page.callMethod('myFn', {
					type: 'read',
					index: 5
				});
				expect(res.data.length).toBeGreaterThan(0);
			});

			it('读取必须带上action-读取数据', async () => {
				const res = await page.callMethod('myFn', {
					type: 'read',
					index: 6
				});
				expect(res.data.length).toBeGreaterThan(0);
			});

			it('读取必须带上action-读取数据(带action)', async () => {
				const res = await page.callMethod('myFn', {
					type: 'read',
					index: 6,
					action: 'add_view_count'
				});
				expect(res.data.length).toBeGreaterThan(0);
			});
		});
	});

	// 测试更新操作
	describe('更新操作测试', () => {
		// 未登录用户测试
		describe('未登录用户更新测试', () => {
			beforeAll(async () => {
				// 点击：更新
				await segItems[2].tap();
				// 点击：未登录
				await roles[0].tap();
				await page.waitFor(500);
				// 验证状态
				const typeIndex = await page.data('typeIndex');
				const currentRole = await page.data('currentRole');
				expect(typeIndex).toBe(2);
				expect(currentRole).toBe(0);
			});

			it('无任何限制-更新数据', async () => {
				const res = await page.callMethod('myFn', {
					type: 'update',
					index: 0
				});
				expect(res.updated).toBeGreaterThan(0);
			});

			it('完全拒绝-更新数据', async () => {
				const res = await page.callMethod('myFn', {
					type: 'update',
					index: 1
				});
				expect(res.errMsg).toContain('未能获取当前用户信息');
			});

			it('需要登录-更新数据', async () => {
				const res = await page.callMethod('myFn', {
					type: 'update',
					index: 2
				});
				expect(res.errMsg).toContain('未能获取当前用户信息');
			});

			it('限特定角色-更新数据', async () => {
				const res = await page.callMethod('myFn', {
					type: 'update',
					index: 5
				});
				expect(res.errMsg).toContain('未能获取当前用户信息');
			});

			it('读取必须带上action-更新数据', async () => {
				const res = await page.callMethod('myFn', {
					type: 'update',
					index: 6
				});
				expect(res.errMsg).toContain('未能获取当前用户信息');
			});

			it('读取必须带上action-更新数据(带action)', async () => {
				const res = await page.callMethod('myFn', {
					type: 'update',
					index: 6,
					action: 'add_view_count'
				});
				expect(res.updated).toBeGreaterThan(0);
			});
		});

		// 普通用户测试
		describe('普通用户更新测试', () => {
			beforeAll(async () => {
				// 点击：更新
				await segItems[2].tap();
				// 点击：普通用户
				await roles[1].tap();
				// 等待状态切换完成
				await waitForStateChange(page, 2, 'user');
			});

			it('无任何限制-更新数据', async () => {
				const res = await page.callMethod('myFn', {
					type: 'update',
					index: 0
				});
				expect(res.updated).toBeGreaterThan(0);
			});

			it('完全拒绝-更新数据', async () => {
				const res = await page.callMethod('myFn', {
					type: 'update',
					index: 1
				});
				expect(res.errMsg).toContain('权限校验未通过');
			});

			it('需要登录-更新数据', async () => {
				const res = await page.callMethod('myFn', {
					type: 'update',
					index: 2
				});
				expect(res.updated).toBeGreaterThan(0);
			});

			it('限特定角色-更新数据', async () => {
				const res = await page.callMethod('myFn', {
					type: 'update',
					index: 5
				});
				expect(res.errMsg).toContain('权限校验未通过');
			});

			it('读取必须带上action-更新数据', async () => {
				const res = await page.callMethod('myFn', {
					type: 'update',
					index: 6
				});
				expect(res.errMsg).toContain('权限校验未通过');
			});

			it('读取必须带上action-更新数据(带action)', async () => {
				const res = await page.callMethod('myFn', {
					type: 'update',
					index: 6,
					action: 'add_view_count'
				});
				expect(res.updated).toBeGreaterThan(0);
			});
		});

		// 审核员测试
		describe('审核员更新测试', () => {
			beforeAll(async () => {
				// 点击：更新
				await segItems[2].tap();
				// 点击：审核员
				await roles[2].tap();
				// 等待状态切换完成
				await waitForStateChange(page, 2, 'auditor');
			});

			it('无任何限制-更新数据', async () => {
				const res = await page.callMethod('myFn', {
					type: 'update',
					index: 0
				});
				expect(res.updated).toBeGreaterThan(0);
			});

			it('完全拒绝-更新数据', async () => {
				const res = await page.callMethod('myFn', {
					type: 'update',
					index: 1
				});
				expect(res.errMsg).toContain('权限校验未通过');
			});

			it('需要登录-更新数据', async () => {
				const res = await page.callMethod('myFn', {
					type: 'update',
					index: 2
				});
				expect(res.updated).toBeGreaterThan(0);
			});

			it('限特定角色-更新数据', async () => {
				const res = await page.callMethod('myFn', {
					type: 'update',
					index: 5
				});
				expect(res.updated).toBeGreaterThan(0);
			});

			it('读取必须带上action-更新数据', async () => {
				const res = await page.callMethod('myFn', {
					type: 'update',
					index: 6
				});
				expect(res.errMsg).toContain('权限校验未通过');
			});

			it('读取必须带上action-更新数据(带action)', async () => {
				const res = await page.callMethod('myFn', {
					type: 'update',
					index: 6,
					action: 'add_view_count'
				});
				expect(res.updated).toBeGreaterThan(0);
			});
		});

		// 管理员测试
		describe('管理员更新测试', () => {
			beforeAll(async () => {
				// 点击：更新
				await segItems[2].tap();
				// 点击：管理员
				await roles[3].tap();
				// 等待状态切换完成
				await waitForStateChange(page, 2, 'admin');
			});

			it('无任何限制-更新数据', async () => {
				const res = await page.callMethod('myFn', {
					type: 'update',
					index: 0
				});
				expect(res.updated).toBeGreaterThan(0);
			});

			it('完全拒绝-更新数据', async () => {
				const res = await page.callMethod('myFn', {
					type: 'update',
					index: 1
				});
				expect(res.updated).toBeGreaterThan(0);
			});

			it('需要登录-更新数据', async () => {
				const res = await page.callMethod('myFn', {
					type: 'update',
					index: 2
				});
				expect(res.updated).toBeGreaterThan(0);
			});

			it('限特定角色-更新数据', async () => {
				const res = await page.callMethod('myFn', {
					type: 'update',
					index: 5
				});
				expect(res.updated).toBeGreaterThan(0);
			});

			it('读取必须带上action-更新数据', async () => {
				const res = await page.callMethod('myFn', {
					type: 'update',
					index: 6
				});
				expect(res.updated).toBeGreaterThan(0);
			});

			it('读取必须带上action-更新数据(带action)', async () => {
				const res = await page.callMethod('myFn', {
					type: 'update',
					index: 6,
					action: 'add_view_count'
				});
				expect(res.updated).toBeGreaterThan(0);
			});
		});
	});
});