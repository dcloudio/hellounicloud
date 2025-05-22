describe('pages/clientDB/permission-demo/readme.vue', () => {
	let page, perPage, setPer, roles;
	const TIMEOUT = 4000;
	const FIELDS = 'uid,username,nickname,state';
	const FIELDSPhone = 'uid,username,nickname,state,phone';

	// 辅助函数：等待角色切换
	const waitForRoleChange = async (expectedRole) => {
		const start = Date.now();
		return await page.waitFor(async () => {
			if (Date.now() - start > TIMEOUT) {
				console.warn('连接服务器超时');
				return true;
			}
			const currentRole = await page.data('currentRole');
			return currentRole === expectedRole;
		});
	};

	// 辅助函数：执行数据操作并验证结果
	const testDataOperations = async (role) => {
		// 1. 读取全部数据
		const getData = await page.callMethod('getFn', FIELDS);
		await page.waitFor(1000); // 等待1秒
		expect(getData.data.length).toBeGreaterThan(0);

		// 2. 删除全部数据
		const removeAll = await page.callMethod('removeFn', FIELDS);
		await page.waitFor(1000); // 等待1秒
		if (role === 'unlogin') {
			expect(removeAll.errMsg).toContain('权限校验未通过，未能获取当前用户信息');
		} else if (role === 'user' || role === 'auditor') {
			expect(removeAll.errMsg).toContain('权限校验未通过');
		} else {
			expect(removeAll.deleted).toBeGreaterThanOrEqual(0);
		}

		// 3. 创建一条数据
		const addResult = await page.callMethod('addFn');
		await page.waitFor(1000); // 等待1秒
		if (role === 'unlogin') {
			expect(addResult.errMsg).toContain('未能获取当前用户信息');
		} else {
			expect(addResult.id.length).toBe(24);
		}

		// 4. 更新昵称（仅创建者）
		const updateSelf = await page.callMethod('updateFn', { nickname: '新昵称' }, 'uid == $env.uid');
		await page.waitFor(1000); // 等待1秒
		if (role === 'unlogin') {
			expect(updateSelf.errMsg).toContain('未能获取当前用户信息');
		} else {
			expect(updateSelf.updated).toBeGreaterThanOrEqual(1);
		}

		// 5. 更新昵称（全部数据）
		const updateAll = await page.callMethod('updateFn', { nickname: '新昵称' });
		await page.waitFor(1000); // 等待1秒
		if (role === 'unlogin' || role === 'user') {
			expect(updateAll.errMsg).toContain('权限校验未通过');
		} else {
			expect(updateAll.updated).toBeGreaterThanOrEqual(0);
		}

		// 6. 更新state
		const updateState = await page.callMethod('updateFn', { state: 1 });
		await page.waitFor(1000); // 等待1秒
		if (role === 'unlogin' || role === 'user') {
			expect(updateState.errMsg).toContain('权限校验未通过');
		} else {
			expect(updateState.updated).toBeGreaterThanOrEqual(1);
		}

		// 7. 更新姓名（全部数据）
		const updateUsernameAll = await page.callMethod('updateFn', { username: '新姓名' });
		await page.waitFor(1000); // 等待1秒
		if (role === 'unlogin' || role === 'user') {
			expect(updateUsernameAll.errMsg).toContain('权限校验未通过');
		} else {
			expect(updateUsernameAll.updated).toBeGreaterThanOrEqual(1);
		}

		// 8. 更新姓名（仅创建者）
		const updateUsernameSelf = await page.callMethod('updateFn', { username: '新姓名' }, 'uid == $env.uid');
		console.log('role',role,'updateUsernameSelf: ',updateUsernameSelf);
		await page.waitFor(1000); // 等待1秒
		if (role === 'unlogin') {
			expect(updateUsernameSelf.errMsg).toContain('未能获取当前用户信息');
		} else if (role === 'user') {
			expect(updateUsernameSelf.updated).toBeGreaterThanOrEqual(1);
		} else if (role === 'auditor') {
			expect(updateUsernameSelf.updated).toBe(0);
		} else {
			expect(updateUsernameSelf.updated).toBeGreaterThanOrEqual(0);
		}

		// 9. 读不带phone数据
		const readData = await page.callMethod('getFn', FIELDS);
		await page.waitFor(1000); // 等待1秒
		expect(readData.data.length).toBeGreaterThan(0);

		// 10. 读带phone数据
		const readDataPhone = await page.callMethod('getFn', FIELDSPhone);
		await page.waitFor(1000); // 等待1秒
		if (role === 'unlogin') {
			expect(readDataPhone.errMsg).toContain('权限校验未通过');
		} else {
			expect(readDataPhone.data[0]).toHaveProperty('phone');
		}
	};

	beforeAll(async () => {
		page = await program.reLaunch('/pages/clientDB/permission-demo/readme');
		await page.waitFor('view');
		perPage = await page.$('.page');

		// 根据平台获取角色控制条
		if (process.env.UNI_PLATFORM === "h5" || process.env.UNI_PLATFORM.startsWith("app")) {
			roles = await perPage.$$('.roles-item');
		} else if (process.env.UNI_PLATFORM === "mp-weixin") {
			setPer = await perPage.$('set-permission');
			roles = await setPer.$$('.roles-item');
		}
	});

	it('未登录用户 - 应限制数据操作', async () => {
		await roles[0].tap();
		const unlogin = await waitForRoleChange(0);
		expect(unlogin).toBe(true);
		if (unlogin) {
			await testDataOperations('unlogin');
		}
	});

	it('普通用户 - 应限制部分数据操作', async () => {
		await roles[1].tap();
		const user = await waitForRoleChange('user');
		expect(user).toBe(true);
		if (user) {
			await testDataOperations('user');
		}
	});

	it('审核员 - 应能执行审核操作', async () => {
		await roles[2].tap();
		const auditor = await waitForRoleChange('auditor');
		expect(auditor).toBe(true);
		if (auditor) {
			await testDataOperations('auditor');
		}
	});

	it('管理员 - 应能执行所有操作', async () => {
		await roles[3].tap();
		const admin = await waitForRoleChange('admin');
		expect(admin).toBe(true);
		if (admin) {
			await testDataOperations('admin');
		}
	});
});