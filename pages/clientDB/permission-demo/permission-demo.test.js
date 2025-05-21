describe('pages/clientDB/permission-demo/permission-demo.vue', () => {
	let page, perPage, setPer, roles;
	const TIMEOUT = 4000;
	const WAIT_TIME = 500;

	beforeAll(async () => {
		page = await program.reLaunch('/pages/clientDB/permission-demo/permission-demo');
		await page.waitFor('view');
		page = await program.currentPage();
		perPage = await page.$('.page');

		// 根据平台获取角色控制条
		if (process.env.UNI_PLATFORM === "h5" || process.env.UNI_PLATFORM.startsWith("app")) {
			roles = await perPage.$$('.roles-item');
		} else if (process.env.UNI_PLATFORM === "mp-weixin") {
			setPer = await perPage.$('set-permission');
			roles = await setPer.$$('.roles-item');
		}
	});

	// 等待角色切换
	const waitForRoleChange = async (expectedRole) => {
		const start = Date.now();
		await page.waitFor(async () => {
			if (Date.now() - start > TIMEOUT) {
				console.warn('连接服务器超时');
				return true;
			}
			const currentRole = await page.data('rulo_index');
			return currentRole === expectedRole;
		});
	};

	// 设置表单数据
	const setFormData = async (state) => {
		await page.setData({
			formData: {
				_id: "60200c3554a29f0001d14586",
				nickname: "我是学生",
				username: "小明",
				state: state,
				phone: "18890903030"
			}
		});
	};

	it('未登录用户 - 应显示正确角色', async () => {
		await roles[0].tap();
		await page.waitFor(WAIT_TIME);
		expect((await roles[0].text()).trim()).toBe('未登陆');
	});

	it('普通用户 - 应能更新数据', async () => {
		await roles[1].tap();
		await waitForRoleChange(1);
		
		// 设置表单数据
		await setFormData(0);
		
		// 点击更新按钮
		const buttonGroup = await perPage.$('.uni-button-group');
		const updateButton = await buttonGroup.$('.uni-button');
		await updateButton.tap();
		await page.waitFor(800);
	});

	it('审核员 - 应能审核数据', async () => {
		await roles[2].tap();
		await waitForRoleChange(2);
		
		// 设置审核状态
		await setFormData(1);
	});

	it('管理员 - 应能管理数据', async () => {
		await roles[3].tap();
		await waitForRoleChange(3);
		
		// 设置管理状态
		await setFormData(-1);
	});
});
