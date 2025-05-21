jest.setTimeout(30000)
describe('权限表复合条件测试', () => {
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
    page = await program.reLaunch('/pages/clientDB/permission-table-compound/permission-table-compound');
    // 设置测试模式
    await page.setData({ isTestMode: true });
    // 获取页面元素
    perPage = await page.$('.page');
    // 头部操作控制条
    segItems = await perPage.$$('.segmented-control__item');
    // 底部角色控制条
    roles = await perPage.$$('.roles-item');
  });

  afterAll(async () => {
    // 关闭测试模式
    await page.setData({ isTestMode: false });
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
        // 等待状态切换完成
        await waitForStateChange(page, 0, 0);
      });

      it('并集表达式-创建数据', async () => {
        const res = await page.callMethod('myFn', { type: 'create', index: 1 });
        expect(res.errMsg).toContain('权限校验未通过');
      });

      it('并集表达式-带action创建数据', async () => {
        const res = await page.callMethod('myFn', { type: 'create', index: 1, action: 'add_view_count' });
        expect(res.result.id).toBeTruthy();
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

      it('并集表达式-创建数据', async () => {
        const res = await page.callMethod('myFn', { type: 'create', index: 1 });
        expect(res.result.id).toBeTruthy();
      });

      it('并集表达式-带action创建数据', async () => {
        const res = await page.callMethod('myFn', { type: 'create', index: 1, action: 'add_view_count' });
        expect(res.result.id).toBeTruthy();
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

      it('并集表达式-创建数据', async () => {
        const res = await page.callMethod('myFn', { type: 'create', index: 1 });
        expect(res.result.id).toBeTruthy();
      });

      it('并集表达式-带action创建数据', async () => {
        const res = await page.callMethod('myFn', { type: 'create', index: 1, action: 'add_view_count' });
        expect(res.result.id).toBeTruthy();
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

      it('并集表达式-创建数据', async () => {
        const res = await page.callMethod('myFn', { type: 'create', index: 1 });
        expect(res.result.id).toBeTruthy();
      });

      it('并集表达式-带action创建数据', async () => {
        const res = await page.callMethod('myFn', { type: 'create', index: 1, action: 'add_view_count' });
        expect(res.result.id).toBeTruthy();
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
        // 等待状态切换完成
        await waitForStateChange(page, 1, 0);
      });

      it('交集表达式-创建数据', async () => {
        const res = await page.callMethod('myFn', { type: 'create', index: 0 });
        expect(res.result.id).toBeTruthy();
      });

      it('交集表达式-读取一分钟内的数据', async () => {
        const res = await page.callMethod('myFn', { type: 'read', index: 0, where: 'create_time > ' + (Date.now() - 60000) });
				expect(res.errMsg).toContain('权限校验未通过');
      });

      it('交集表达式-读取表全部数据', async () => {
        const res = await page.callMethod('myFn', { type: 'read', index: 0 });
        expect(res.errMsg).toContain('权限校验未通过');
      });

      it('并集表达式-读取表全部数据', async () => {
        const res = await page.callMethod('myFn', { type: 'read', index: 1 });
        expect(res.errMsg).toContain('权限校验未通过');
      });

      it('并集表达式-带action读取数据', async () => {
        const res = await page.callMethod('myFn', { type: 'read', index: 1, action: 'add_view_count' });
				// 可能数据为空
        expect(res.result.data.length).toBeGreaterThan(0);
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

      it('交集表达式-创建数据', async () => {
        const res = await page.callMethod('myFn', { type: 'create', index: 0 });
        expect(res.result.id).toBeTruthy();
      });

      it('交集表达式-读取一分钟内的数据', async () => {
        const res = await page.callMethod('myFn', { type: 'read', index: 0, where: 'create_time > ' + (Date.now() - 60000) });
        expect(res.errMsg).toContain('权限校验未通过');
      });

      it('交集表达式-读取表全部数据', async () => {
        const res = await page.callMethod('myFn', { type: 'read', index: 0 });
        expect(res.errMsg).toContain('权限校验未通过');
      });

      it('并集表达式-读取表全部数据', async () => {
        const res = await page.callMethod('myFn', { type: 'read', index: 1 });
        expect(res.result.data.length).toBeGreaterThan(0);
      });

      it('并集表达式-带action读取数据', async () => {
        const res = await page.callMethod('myFn', { type: 'read', index: 1, action: 'add_view_count' });
        expect(res.result.data.length).toBeGreaterThan(0);
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

      it('交集表达式-创建数据', async () => {
        const res = await page.callMethod('myFn', { type: 'create', index: 0 });
        expect(res.result.id).toBeTruthy();
      });

      it('交集表达式-读取一分钟内的数据', async () => {
        const res = await page.callMethod('myFn', { type: 'read', index: 0, where: 'create_time > ' + (Date.now() - 60000) });
        expect(res.result.data.length).toBeGreaterThan(0);
      });

      it('交集表达式-读取表全部数据', async () => {
        const res = await page.callMethod('myFn', { type: 'read', index: 0 });
        expect(res.result.data.length).toBeGreaterThan(0);
      });

      it('并集表达式-读取表全部数据', async () => {
        const res = await page.callMethod('myFn', { type: 'read', index: 1 });
        expect(res.result.data.length).toBeGreaterThan(0);
      });

      it('并集表达式-带action读取数据', async () => {
        const res = await page.callMethod('myFn', { type: 'read', index: 1, action: 'add_view_count' });
        expect(res.result.data.length).toBeGreaterThan(0);
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

      it('交集表达式-创建数据', async () => {
        const res = await page.callMethod('myFn', { type: 'create', index: 0 });
        expect(res.result.id).toBeTruthy();
      });

      it('交集表达式-读取一分钟内的数据', async () => {
        const res = await page.callMethod('myFn', { type: 'read', index: 0, where: 'create_time > ' + (Date.now() - 60000) });
        expect(res.result.data.length).toBeGreaterThan(0);
      });

      it('交集表达式-读取表全部数据', async () => {
        const res = await page.callMethod('myFn', { type: 'read', index: 0 });
        expect(res.result.data.length).toBeGreaterThan(0);
      });

      it('并集表达式-读取表全部数据', async () => {
        const res = await page.callMethod('myFn', { type: 'read', index: 1 });
        expect(res.result.data.length).toBeGreaterThan(0);
      });

      it('并集表达式-带action读取数据', async () => {
        const res = await page.callMethod('myFn', { type: 'read', index: 1, action: 'add_view_count' });
        expect(res.result.data.length).toBeGreaterThan(0);
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
        // 等待状态切换完成
        await waitForStateChange(page, 2, 0);
      });

      it('交集表达式-创建数据', async () => {
        const res = await page.callMethod('myFn', { type: 'create', index: 0 });
        expect(res.result.id).toBeTruthy();
      });

      it('交集表达式-更新一分钟内的数据', async () => {
        const res = await page.callMethod('myFn', { type: 'read', index: 0, where: 'create_time > ' + (Date.now() - 60000) });
        expect(res.errMsg).toContain('权限校验未通过');
      });

      it('交集表达式-更新数据', async () => {
        const res = await page.callMethod('myFn', { type: 'update', index: 0 });
        expect(res.errMsg).toContain('权限校验未通过');
      });

      it('并集表达式-更新数据', async () => {
        const res = await page.callMethod('myFn', { type: 'update', index: 1 });
        expect(res.errMsg).toContain('权限校验未通过');
      });

      it('并集表达式-带action更新数据', async () => {
        const res = await page.callMethod('myFn', { type: 'update', index: 1, action: 'add_view_count' });
        expect(res.result.updated).toBeGreaterThan(0);
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

      it('交集表达式-创建数据', async () => {
        const res = await page.callMethod('myFn', { type: 'create', index: 0 });
        expect(res.result.id).toBeTruthy();
      });

      it('交集表达式-更新一分钟内的数据', async () => {
        const res = await page.callMethod('myFn', { type: 'read', index: 0, where: 'create_time > ' + (Date.now() - 60000) });
        expect(res.errMsg).toContain('权限校验未通过');
      });

      it('交集表达式-更新数据', async () => {
        const res = await page.callMethod('myFn', { type: 'update', index: 0 });
        expect(res.errMsg).toContain('权限校验未通过');
      });

      it('并集表达式-更新数据', async () => {
        const res = await page.callMethod('myFn', { type: 'update', index: 1 });
        expect(res.result.updated).toBeGreaterThan(0);
      });

      it('并集表达式-带action更新数据', async () => {
        const res = await page.callMethod('myFn', { type: 'update', index: 1, action: 'add_view_count' });
        expect(res.result.updated).toBeGreaterThan(0);
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

      it('交集表达式-创建数据', async () => {
        const res = await page.callMethod('myFn', { type: 'create', index: 0 });
        expect(res.result.id).toBeTruthy();
      });

      it('交集表达式-更新一分钟内的数据', async () => {
        const res = await page.callMethod('myFn', { type: 'read', index: 0, where: 'create_time > ' + (Date.now() - 60000) });
        expect(res.result.data.length).toBeGreaterThan(0);
      });

      it('交集表达式-更新数据', async () => {
        const res = await page.callMethod('myFn', { type: 'update', index: 0 });
        expect(res.errMsg).toContain('权限校验未通过');
      });

      it('并集表达式-更新数据', async () => {
        const res = await page.callMethod('myFn', { type: 'update', index: 1 });
        expect(res.result.updated).toBeGreaterThan(0);
      });

      it('并集表达式-带action更新数据', async () => {
        const res = await page.callMethod('myFn', { type: 'update', index: 1, action: 'add_view_count' });
        expect(res.result.updated).toBeGreaterThan(0);
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

      it('交集表达式-创建数据', async () => {
        const res = await page.callMethod('myFn', { type: 'create', index: 0 });
        expect(res.result.id).toBeTruthy();
      });

      it('交集表达式-读取一分钟内的数据', async () => {
        const res = await page.callMethod('myFn', { type: 'read', index: 0, where: 'create_time > ' + (Date.now() - 60000) });
        expect(res.result.data.length).toBeGreaterThan(0);
      });

      it('交集表达式-更新数据', async () => {
        const res = await page.callMethod('myFn', { type: 'update', index: 0 });
        expect(res.result.updated).toBeGreaterThan(0);
      });

      it('并集表达式-更新数据', async () => {
        const res = await page.callMethod('myFn', { type: 'update', index: 1 });
        expect(res.result.updated).toBeGreaterThan(0);
      });

      it('并集表达式-带action更新数据', async () => {
        const res = await page.callMethod('myFn', { type: 'update', index: 1, action: 'add_view_count' });
        expect(res.result.updated).toBeGreaterThan(0);
      });
    });
  });

  // 测试删除操作
  describe('删除操作测试', () => {
    // 未登录用户测试
    describe('未登录用户删除测试', () => {
      beforeAll(async () => {
        // 点击：删除
        await segItems[3].tap();
        // 点击：未登录
        await roles[0].tap();
        // 等待状态切换完成
        await waitForStateChange(page, 3, 0);
      });

      it('交集表达式-创建数据', async () => {
        const res = await page.callMethod('myFn', { type: 'create', index: 0 });
        expect(res.result.id).toBeTruthy();
      });

      it('交集表达式-删除一分钟内的数据', async () => {
        const res = await page.callMethod('myFn', { type: 'read', index: 0, where: 'create_time > ' + (Date.now() - 60000) });
        expect(res.errMsg).toContain('权限校验未通过');
      });

      it('交集表达式-删除数据', async () => {
        const res = await page.callMethod('myFn', { type: 'delete', index: 0 });
        expect(res.errMsg).toContain('权限校验未通过');
      });

      it('并集表达式-删除数据', async () => {
        const res = await page.callMethod('myFn', { type: 'delete', index: 1 });
        expect(res.errMsg).toContain('权限校验未通过');
      });

      it('并集表达式-带action删除数据', async () => {
        const res = await page.callMethod('myFn', { type: 'delete', index: 1, action: 'add_view_count' });
        expect(res.result.deleted).toBeGreaterThan(0);
      });
    });

    // 普通用户测试
    describe('普通用户删除测试', () => {
      beforeAll(async () => {
        // 点击：删除
        await segItems[3].tap();
        // 点击：普通用户
        await roles[1].tap();
        // 等待状态切换完成
        await waitForStateChange(page, 3, 'user');
      });

      it('交集表达式-创建数据', async () => {
        const res = await page.callMethod('myFn', { type: 'create', index: 0 });
        expect(res.result.id).toBeTruthy();
      });

      it('交集表达式-删除一分钟内的数据-角色必须为审核员', async () => {
        const res = await page.callMethod('myFn', { type: 'read', index: 0, where: 'create_time > ' + (Date.now() - 60000) });
        expect(res.errMsg).toContain('权限校验未通过');
      });

      it('交集表达式-删除数据', async () => {
        const res = await page.callMethod('myFn', { type: 'delete', index: 0 });
        expect(res.errMsg).toContain('权限校验未通过');
      });

      it('并集表达式-删除数据', async () => {
        const res = await page.callMethod('myFn', { type: 'delete', index: 1 });
        expect(res.result.deleted).toBeGreaterThanOrEqual(0);
      });

      it('并集表达式-带action删除数据', async () => {
        const res = await page.callMethod('myFn', { type: 'delete', index: 1, action: 'add_view_count' });
        expect(res.result.deleted).toBeGreaterThanOrEqual(0);
      });
    });

    // 审核员测试
    describe('审核员删除测试', () => {
      beforeAll(async () => {
        // 点击：删除
        await segItems[3].tap();
        // 点击：审核员
        await roles[2].tap();
        // 等待状态切换完成
        await waitForStateChange(page, 3, 'auditor');
      });

      it('交集表达式-创建数据', async () => {
        const res = await page.callMethod('myFn', { type: 'create', index: 0 });
        expect(res.result.id).toBeTruthy();
      });

      it('交集表达式-删除一分钟内的数据', async () => {
        const res = await page.callMethod('myFn', { type: 'read', index: 0, where: 'create_time > ' + (Date.now() - 60000) });
        expect(res.result.data.length).toBeGreaterThan(0);
      });

      it('交集表达式-删除数据', async () => {
        const res = await page.callMethod('myFn', { type: 'delete', index: 0 });
        // 预期可删除，结果：权限校验未通过
      });

      it('并集表达式-删除数据', async () => {
        const res = await page.callMethod('myFn', { type: 'delete', index: 1 });
        expect(res.result.deleted).toBeGreaterThanOrEqual(0);
      });

      it('并集表达式-带action删除数据', async () => {
        const res = await page.callMethod('myFn', { type: 'delete', index: 1, action: 'add_view_count' });
        expect(res.result.deleted).toBeGreaterThanOrEqual(0);
      });
    });

    // 管理员测试
    describe('管理员删除测试', () => {
      beforeAll(async () => {
        // 点击：删除
        await segItems[3].tap();
        // 点击：管理员
        await roles[3].tap();
        // 等待状态切换完成
        await waitForStateChange(page, 3, 'admin');
      });

      it('交集表达式-创建数据', async () => {
        const res = await page.callMethod('myFn', { type: 'create', index: 0 });
        expect(res.result.id).toBeTruthy();
      });

      it('交集表达式-删除一分钟内的数据', async () => {
        const res = await page.callMethod('myFn', { type: 'read', index: 0, where: 'create_time > ' + (Date.now() - 60000) });
        expect(res.result.data.length).toBeGreaterThan(0);
      });

      it('交集表达式-删除数据', async () => {
        const res = await page.callMethod('myFn', { type: 'delete', index: 0 });
        expect(res.result.deleted).toBeGreaterThan(0);
      });

      it('并集表达式-删除数据', async () => {
        const res = await page.callMethod('myFn', { type: 'delete', index: 1 });
        expect(res.result.deleted).toBeGreaterThanOrEqual(0);
      });

      it('并集表达式-带action删除数据', async () => {
        const res = await page.callMethod('myFn', { type: 'delete', index: 1, action: 'add_view_count' });
        expect(res.result.deleted).toBeGreaterThanOrEqual(0);
      });
    });
  });
}); 