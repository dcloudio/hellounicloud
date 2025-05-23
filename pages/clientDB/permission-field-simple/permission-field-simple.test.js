jest.setTimeout(30000)
describe('权限字段测试', () => {
	let page;
	let perPage;
	let segItems;
	let roles;

	beforeAll(async () => {
		page = await program.reLaunch('/pages/clientDB/permission-field-simple/permission-field-simple');
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

	/**
	 * 切换角色并校验状态
	 * @param {Object} segItem - 操作类型按钮（如创建/读取/更新）
	 * @param {Object} role - 角色按钮（如未登录/普通用户/审核员/管理员）
	 * @param {number} expectedTypeIndex - 期望的typeIndex
	 * @param {string|number} expectedRole - 期望的currentRole
	 */
	async function switchRole(segItem, role, expectedTypeIndex, expectedRole) {
		await segItem.tap();
		await role.tap();
		const start = Date.now();
		await page.waitFor(async () => {
			if (Date.now() - start > 5000) {
				console.warn('链接服务器超时');
				return true;
			}
			const typeIndex = await page.data('typeIndex');
			const currentRole = await page.data('currentRole');
			return typeIndex === expectedTypeIndex && currentRole === expectedRole;
		});
		const typeIndex = await page.data('typeIndex');
		const currentRole = await page.data('currentRole');
		console.log(`角色切换测试 - typeIndex: ${typeIndex}, currentRole: ${currentRole}`);
		expect(typeIndex).toBe(expectedTypeIndex);
		expect(currentRole).toBe(expectedRole);
	}

	// 测试创建操作
	describe('创建操作测试', () => {
		// 未登录用户测试
		describe('未登录用户创建测试', () => {
			// 操作：创建
			// 角色：未登录
			beforeAll(async () => {
				await switchRole(segItems[0], roles[0], 0, 0);
			});

			it('直接禁止-创建含ip记录', async () => {
				const res = await page.callMethod('myFn', {
					type: 'create',
					index: 0
				});
				expect(res).toContain('权限校验未通过');
			});

			it('直接禁止-创建不含ip记录', async () => {
				const res = await page.callMethod('myFn', {
					type: 'create',
					index: 0,
					field: '_id,state,create_time,text'
				});
				expect(res.errCode).toBe(0);
			});

			it('需要登录-创建含ip记录', async () => {
				const res = await page.callMethod('myFn', {
					type: 'create',
					index: 1
				});
				expect(res).toContain('权限校验未通过');
			});

			it('需要登录-创建不含ip记录', async () => {
				const res = await page.callMethod('myFn', {
					type: 'create',
					index: 1,
					field: '_id,state,create_time,text'
				});
				expect(res.errCode).toBe(0);
			});

			it('指定角色-创建含ip记录', async () => {
				const res = await page.callMethod('myFn', {
					type: 'create',
					index: 2
				});
				expect(res).toContain('权限校验未通过');
			});

			it('指定角色-创建不含ip记录', async () => {
				const res = await page.callMethod('myFn', {
					type: 'create',
					index: 2,
					field: '_id,state,create_time,text'
				});
				expect(res.errCode).toBe(0);
			});
		});

		// 普通用户测试
		describe('普通用户创建测试', () => {
			// 操作：创建
			// 角色：普通用户
			beforeAll(async () => {
				await switchRole(segItems[0], roles[1], 0, 'user');
			});

			it('直接禁止-创建含ip记录', async () => {
				const res = await page.callMethod('myFn', {
					type: 'create',
					index: 0
				});
				expect(res).toContain('权限校验未通过');
			});

			it('直接禁止-创建不含ip记录', async () => {
				const res = await page.callMethod('myFn', {
					type: 'create',
					index: 0,
					field: '_id,state,create_time,text'
				});
				expect(res.errCode).toBe(0);
			});

			it('需要登录-创建含ip记录', async () => {
				const res = await page.callMethod('myFn', {
					type: 'create',
					index: 1
				});
				expect(res.errCode).toBe(0);
			});

			it('需要登录-创建不含ip记录', async () => {
				const res = await page.callMethod('myFn', {
					type: 'create',
					index: 1,
					field: '_id,state,create_time,text'
				});
				expect(res.errCode).toBe(0);
			});

			it('指定角色-创建含ip记录', async () => {
				const res = await page.callMethod('myFn', {
					type: 'create',
					index: 2
				});
				expect(res).toContain('权限校验未通过');
			});

			it('指定角色-创建不含ip记录', async () => {
				const res = await page.callMethod('myFn', {
					type: 'create',
					index: 2,
					field: '_id,state,create_time,text'
				});
				expect(res.errCode).toBe(0);
			});
		});

		// 审核员测试
		describe('审核员创建测试', () => {
			// 操作：创建
			// 角色：审核员
			beforeAll(async () => {
				await switchRole(segItems[0], roles[2], 0, 'auditor');
			});

			it('直接禁止-创建含ip记录', async () => {
				const res = await page.callMethod('myFn', {
					type: 'create',
					index: 0
				});
				expect(res).toContain('权限校验未通过');
			});

			it('直接禁止-创建不含ip记录', async () => {
				const res = await page.callMethod('myFn', {
					type: 'create',
					index: 0,
					field: '_id,state,create_time,text'
				});
				expect(res.errCode).toBe(0);
			});

			it('需要登录-创建含ip记录', async () => {
				const res = await page.callMethod('myFn', {
					type: 'create',
					index: 1
				});
				expect(res.errCode).toBe(0);
			});

			it('需要登录-创建不含ip记录', async () => {
				const res = await page.callMethod('myFn', {
					type: 'create',
					index: 1,
					field: '_id,state,create_time,text'
				});
				expect(res.errCode).toBe(0);
			});

			it('指定角色-创建含ip记录', async () => {
				const res = await page.callMethod('myFn', {
					type: 'create',
					index: 2
				});
				expect(res.errCode).toBe(0);
			});

			it('指定角色-创建不含ip记录', async () => {
				const res = await page.callMethod('myFn', {
					type: 'create',
					index: 2,
					field: '_id,state,create_time,text'
				});
				expect(res.errCode).toBe(0);
			});
		});

		// 管理员测试
		describe('管理员创建测试', () => {
			// 操作：创建
			// 角色：管理员
			beforeAll(async () => {
				await switchRole(segItems[0], roles[3], 0, 'admin');
			});

			it('直接禁止-创建含ip记录-管理员角色除外', async () => {
				const res = await page.callMethod('myFn', {
					type: 'create',
					index: 0
				});
				expect(res.errCode).toBe(0);
			});

			it('直接禁止-创建不含ip记录', async () => {
				const res = await page.callMethod('myFn', {
					type: 'create',
					index: 0,
					field: '_id,state,create_time,text'
				});
				expect(res.errCode).toBe(0);
			});

			it('需要登录-创建含ip记录', async () => {
				const res = await page.callMethod('myFn', {
					type: 'create',
					index: 1
				});
				expect(res.errCode).toBe(0);
			});

			it('需要登录-创建不含ip记录', async () => {
				const res = await page.callMethod('myFn', {
					type: 'create',
					index: 1,
					field: '_id,state,create_time,text'
				});
				expect(res.errCode).toBe(0);
			});

			it('指定角色-创建含ip记录', async () => {
				const res = await page.callMethod('myFn', {
					type: 'create',
					index: 2
				});
				expect(res.errCode).toBe(0);
			});

			it('指定角色-创建不含ip记录', async () => {
				const res = await page.callMethod('myFn', {
					type: 'create',
					index: 2,
					field: '_id,state,create_time,text'
				});
				expect(res.errCode).toBe(0);
			});
		});
	});

	// 测试读取操作
	describe('读取操作测试', () => {
		// 未登录用户测试
		describe('未登录用户读取测试', () => {
			// 操作：读取
			// 角色：未登录
			beforeAll(async () => {
				await switchRole(segItems[1], roles[0], 1, 0);
			});

			it('直接禁止-读取含ip记录', async () => {
				const res = await page.callMethod('myFn', {
					type: 'read',
					index: 0
				});
				expect(res).toContain('权限校验未通过');
			});

			it('直接禁止-读取不含ip记录', async () => {
				const res = await page.callMethod('myFn', {
					type: 'read',
					index: 0,
					field: '_id,state,create_time,text'
				});
				expect(res.result.data.length).toBeGreaterThan(0);
			});

			it('需要登录-读取含ip记录', async () => {
				const res = await page.callMethod('myFn', {
					type: 'read',
					index: 1
				});
				expect(res).toContain('权限校验未通过');
			});

			it('需要登录-读取不含ip记录', async () => {
				const res = await page.callMethod('myFn', {
					type: 'read',
					index: 1,
					field: '_id,state,create_time,text'
				});
				expect(res.result.data.length).toBeGreaterThan(0);
			});

			it('指定角色-读取含ip记录', async () => {
				const res = await page.callMethod('myFn', {
					type: 'read',
					index: 2
				});
				expect(res).toContain('权限校验未通过');
			});

			it('指定角色-读取不含ip记录', async () => {
				const res = await page.callMethod('myFn', {
					type: 'read',
					index: 2,
					field: '_id,state,create_time,text'
				});
				expect(res.result.data.length).toBeGreaterThan(0);
			});
		});

		// 普通用户测试
		describe('普通用户读取测试', () => {
			// 操作：读取
			// 角色：普通用户
			beforeAll(async () => {
				await switchRole(segItems[1], roles[1], 1, 'user');
			});

			it('直接禁止-读取含ip记录', async () => {
				const res = await page.callMethod('myFn', {
					type: 'read',
					index: 0
				});
				expect(res).toContain('权限校验未通过');
			});

			it('直接禁止-读取不含ip记录', async () => {
				const res = await page.callMethod('myFn', {
					type: 'read',
					index: 0,
					field: '_id,state,create_time,text'
				});
				expect(res.result.data.length).toBeGreaterThan(0);
			});

			it('需要登录-读取含ip记录', async () => {
				const res = await page.callMethod('myFn', {
					type: 'read',
					index: 1
				});
				expect(res.result.data.length).toBeGreaterThan(0);
			});

			it('需要登录-读取不含ip记录', async () => {
				const res = await page.callMethod('myFn', {
					type: 'read',
					index: 1,
					field: '_id,state,create_time,text'
				});
				expect(res.result.data.length).toBeGreaterThan(0);
			});

			it('指定角色-读取含ip记录', async () => {
				const res = await page.callMethod('myFn', {
					type: 'read',
					index: 2
				});
				expect(res).toContain('权限校验未通过');
			});

			it('指定角色-读取不含ip记录', async () => {
				const res = await page.callMethod('myFn', {
					type: 'read',
					index: 2,
					field: '_id,state,create_time,text'
				});
				expect(res.result.data.length).toBeGreaterThan(0);
			});
		});

		// 审核员测试
		describe('审核员读取测试', () => {
			// 操作：读取
			// 角色：审核员
			beforeAll(async () => {
				await switchRole(segItems[1], roles[2], 1, 'auditor');
			});

			it('直接禁止-读取含ip记录', async () => {
				const res = await page.callMethod('myFn', {
					type: 'read',
					index: 0
				});
				expect(res).toContain('权限校验未通过');
			});

			it('直接禁止-读取不含ip记录', async () => {
				const res = await page.callMethod('myFn', {
					type: 'read',
					index: 0,
					field: '_id,state,create_time,text'
				});
				expect(res.result.data.length).toBeGreaterThan(0);
			});

			it('需要登录-读取含ip记录', async () => {
				const res = await page.callMethod('myFn', {
					type: 'read',
					index: 1
				});
				expect(res.result.data.length).toBeGreaterThan(0);
			});

			it('需要登录-读取不含ip记录', async () => {
				const res = await page.callMethod('myFn', {
					type: 'read',
					index: 1,
					field: '_id,state,create_time,text'
				});
				expect(res.result.data.length).toBeGreaterThan(0);
			});

			it('指定角色-读取含ip记录', async () => {
				const res = await page.callMethod('myFn', {
					type: 'read',
					index: 2
				});
				expect(res.result.data.length).toBeGreaterThan(0);
			});

			it('指定角色-读取不含ip记录', async () => {
				const res = await page.callMethod('myFn', {
					type: 'read',
					index: 2,
					field: '_id,state,create_time,text'
				});
				expect(res.result.data.length).toBeGreaterThan(0);
			});
		});

		// 管理员测试
		describe('管理员读取测试', () => {
			// 操作：读取
			// 角色：管理员
			beforeAll(async () => {
				await switchRole(segItems[1], roles[3], 1, 'admin');
			});

			it('直接禁止-读取含ip记录', async () => {
				const res = await page.callMethod('myFn', {
					type: 'read',
					index: 0
				});
				expect(res.result.data.length).toBeGreaterThan(0);
			});

			it('直接禁止-读取不含ip记录', async () => {
				const res = await page.callMethod('myFn', {
					type: 'read',
					index: 0,
					field: '_id,state,create_time,text'
				});
				expect(res.result.data.length).toBeGreaterThan(0);
			});

			it('需要登录-读取含ip记录', async () => {
				const res = await page.callMethod('myFn', {
					type: 'read',
					index: 1
				});
				expect(res.result.data.length).toBeGreaterThan(0);
			});

			it('需要登录-读取不含ip记录', async () => {
				const res = await page.callMethod('myFn', {
					type: 'read',
					index: 1,
					field: '_id,state,create_time,text'
				});
				expect(res.result.data.length).toBeGreaterThan(0);
			});

			it('指定角色-读取含ip记录', async () => {
				const res = await page.callMethod('myFn', {
					type: 'read',
					index: 2
				});
				expect(res.result.data.length).toBeGreaterThan(0);
			});

			it('指定角色-读取不含ip记录', async () => {
				const res = await page.callMethod('myFn', {
					type: 'read',
					index: 2,
					field: '_id,state,create_time,text'
				});
				expect(res.result.data.length).toBeGreaterThan(0);
			});
		});
	});

	// 测试更新操作
	describe('更新操作测试', () => {
		// 未登录用户测试
		describe('未登录用户更新测试', () => {
			// 操作：更新
			// 角色：未登录
			beforeAll(async () => {
				await switchRole(segItems[2], roles[0], 2, 0);
			});

			it('直接禁止-更新含ip记录', async () => {
				const res = await page.callMethod('myFn', {
					type: 'update',
					index: 0
				});
				expect(res).toContain('权限校验未通过');
			});

			it('直接禁止-更新不含ip记录', async () => {
				const res = await page.callMethod('myFn', {
					type: 'update',
					index: 0,
					field: '_id,state,create_time,text'
				});
				expect(res.result.updated).toBeGreaterThan(0);
			});

			it('需要登录-更新含ip记录', async () => {
				const res = await page.callMethod('myFn', {
					type: 'update',
					index: 1
				});
				expect(res).toContain('权限校验未通过');
			});

			it('需要登录-更新不含ip记录', async () => {
				const res = await page.callMethod('myFn', {
					type: 'update',
					index: 1,
					field: '_id,state,create_time,text'
				});
				expect(res.result.updated).toBeGreaterThan(0);
			});

			it('指定角色-更新含ip记录', async () => {
				const res = await page.callMethod('myFn', {
					type: 'update',
					index: 2
				});
				expect(res).toContain('权限校验未通过');
			});

			it('指定角色-更新不含ip记录', async () => {
				const res = await page.callMethod('myFn', {
					type: 'update',
					index: 2,
					field: '_id,state,create_time,text'
				});
				expect(res.result.updated).toBeGreaterThan(0);
			});
		});

		// 普通用户测试
		describe('普通用户更新测试', () => {
			// 操作：更新
			// 角色：普通用户
			beforeAll(async () => {
				await switchRole(segItems[2], roles[1], 2, 'user');
			});

			it('直接禁止-更新含ip记录', async () => {
				const res = await page.callMethod('myFn', {
					type: 'update',
					index: 0
				});
				expect(res).toContain('权限校验未通过');
			});

			it('直接禁止-更新不含ip记录', async () => {
				const res = await page.callMethod('myFn', {
					type: 'update',
					index: 0,
					field: '_id,state,create_time,text'
				});
				expect(res.result.updated).toBeGreaterThan(0);
			});

			it('需要登录-更新含ip记录', async () => {
				const res = await page.callMethod('myFn', {
					type: 'update',
					index: 1
				});
				expect(res.result.updated).toBeGreaterThan(0);
			});

			it('需要登录-更新不含ip记录', async () => {
				const res = await page.callMethod('myFn', {
					type: 'update',
					index: 1,
					field: '_id,state,create_time,text'
				});
				expect(res.result.updated).toBeGreaterThan(0);
			});

			it('指定角色-更新含ip记录', async () => {
				const res = await page.callMethod('myFn', {
					type: 'update',
					index: 2
				});
				expect(res).toContain('权限校验未通过');
			});

			it('指定角色-更新不含ip记录', async () => {
				const res = await page.callMethod('myFn', {
					type: 'update',
					index: 2,
					field: '_id,state,create_time,text'
				});
				expect(res.result.updated).toBeGreaterThan(0);
			});
		});

		// 审核员测试
		describe('审核员更新测试', () => {
			// 操作：更新
			// 角色：审核员
			beforeAll(async () => {
				await switchRole(segItems[2], roles[2], 2, 'auditor');
			});

			it('直接禁止-更新含ip记录', async () => {
				const res = await page.callMethod('myFn', {
					type: 'update',
					index: 0
				});
				expect(res).toContain('权限校验未通过');
			});

			it('直接禁止-更新不含ip记录', async () => {
				const res = await page.callMethod('myFn', {
					type: 'update',
					index: 0,
					field: '_id,state,create_time,text'
				});
				expect(res.result.updated).toBeGreaterThan(0);
			});

			it('需要登录-更新含ip记录', async () => {
				const res = await page.callMethod('myFn', {
					type: 'update',
					index: 1
				});
				expect(res.result.updated).toBeGreaterThan(0);
			});

			it('需要登录-更新不含ip记录', async () => {
				const res = await page.callMethod('myFn', {
					type: 'update',
					index: 1,
					field: '_id,state,create_time,text'
				});
				expect(res.result.updated).toBeGreaterThan(0);
			});

			it('指定角色-更新含ip记录', async () => {
				const res = await page.callMethod('myFn', {
					type: 'update',
					index: 2
				});
				expect(res.result.updated).toBeGreaterThan(0);
			});

			it('指定角色-更新不含ip记录', async () => {
				const res = await page.callMethod('myFn', {
					type: 'update',
					index: 2,
					field: '_id,state,create_time,text'
				});
				expect(res.result.updated).toBeGreaterThan(0);
			});
		});

		// 管理员测试
		describe('管理员更新测试', () => {
			// 操作：更新
			// 角色：管理员
			beforeAll(async () => {
				await switchRole(segItems[2], roles[3], 2, 'admin');
			});

			it('直接禁止-更新含ip记录', async () => {
				const res = await page.callMethod('myFn', {
					type: 'update',
					index: 0
				});
				expect(res.result.updated).toBeGreaterThan(0);
			});

			it('直接禁止-更新不含ip记录', async () => {
				const res = await page.callMethod('myFn', {
					type: 'update',
					index: 0,
					field: '_id,state,create_time,text'
				});
				expect(res.result.updated).toBeGreaterThan(0);
			});

			it('需要登录-更新含ip记录', async () => {
				const res = await page.callMethod('myFn', {
					type: 'update',
					index: 1
				});
				expect(res.result.updated).toBeGreaterThan(0);
			});

			it('需要登录-更新不含ip记录', async () => {
				const res = await page.callMethod('myFn', {
					type: 'update',
					index: 1,
					field: '_id,state,create_time,text'
				});
				expect(res.result.updated).toBeGreaterThan(0);
			});

			it('指定角色-更新含ip记录', async () => {
				const res = await page.callMethod('myFn', {
					type: 'update',
					index: 2
				});
				expect(res.result.updated).toBeGreaterThan(0);
			});

			it('指定角色-更新不含ip记录', async () => {
				const res = await page.callMethod('myFn', {
					type: 'update',
					index: 2,
					field: '_id,state,create_time,text'
				});
				expect(res.result.updated).toBeGreaterThan(0);
			});
		});
	});

	

	// 使用封装后的方法进行角色切换
	it('创建--审核员', async () => {
		await switchRole(segItems[0], roles[2], 0, 'auditor');
		await page.callMethod('myFn', {
			"type": "create",
			"index": 0,
		});
		await page.callMethod('myFn', {
			"type": "create",
			"index": 0,
			"field": "_id,state,create_time,text"
		});
		await page.callMethod('myFn', {
			"type": "create",
			"index": 1,
		});
		await page.callMethod('myFn', {
			"type": "create",
			"index": 1,
			"field": "_id,state,create_time,text",
		});
		await page.callMethod('myFn', {
			"type": "create",
			"index": 2,
		});
		await page.callMethod('myFn', {
			"type": "create",
			"index": 2,
			"field": "_id,state,create_time,text",
		});
	});

	it('读取--审核员', async () => {
		await switchRole(segItems[1], roles[2], 1, 'auditor');
		await page.callMethod('myFn', {
			"type": "read",
			"index": 0
		});
		await page.callMethod('myFn', {
			"type": "read",
			"index": 0,
			"field": "_id,state,create_time,text"
		});
		await page.callMethod('myFn', {
			"type": "read",
			"index": 1
		});
		await page.callMethod('myFn', {
			"type": "read",
			"index": 1,
			"field": "_id,state,create_time,text"
		});
		await page.callMethod('myFn', {
			"type": "read",
			"index": 2
		});
		await page.callMethod('myFn', {
			"type": "read",
			"index": 2,
			"field": "_id,state,create_time,text"
		});
	});

	it('更新--审核员', async () => {
		await switchRole(segItems[2], roles[2], 2, 'auditor');
		await page.callMethod('myFn', {
			"type": "update",
			"index": 0
		});
		await page.callMethod('myFn', {
			"type": "update",
			"index": 0,
			"field": "_id,state,create_time,text"
		});
		await page.callMethod('myFn', {
			"type": "update",
			"index": 1
		});
		await page.callMethod('myFn', {
			"type": "update",
			"index": 1,
			"field": "_id,state,create_time,text"
		});
		await page.callMethod('myFn', {
			"type": "update",
			"index": 2
		});
		await page.callMethod('myFn', {
			"type": "update",
			"index": 2,
			"field": "_id,state,create_time,text"
		});
	});
});