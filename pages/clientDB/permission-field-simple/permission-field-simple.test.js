jest.setTimeout(30000)
describe('权限字段测试', () => {
  let page;
  let perPage;
  let segItems;
  let roles;
  
  beforeAll(async () => {
    page = await program.reLaunch('/pages/clientDB/permission-field-simple/permission-field-simple');
    // 设置测试模式
    await page.callMethod('setTestMode', true);
    // 获取页面元素
    perPage = await page.$('.page');
    // 头部操作控制条
    segItems = await perPage.$$('.segmented-control__item');
    // 底部角色控制条
    roles = await perPage.$$('.roles-item');
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

      it('直接禁止-创建含ip记录', async () => {
        const res = await page.callMethod('myFn', { type: 'create', index: 0 });
        expect(res).toContain('权限校验未通过');
      });

      it('直接禁止-创建不含ip记录', async () => {
        const res = await page.callMethod('myFn', { type: 'create', index: 0, field: '_id,state,create_time,text' });
        expect(res.errCode).toBe(0);
      });

      it('需要登录-创建含ip记录', async () => {
        const res = await page.callMethod('myFn', { type: 'create', index: 1 });
        expect(res).toContain('权限校验未通过');
      });

      it('需要登录-创建不含ip记录', async () => {
        const res = await page.callMethod('myFn', { type: 'create', index: 1, field: '_id,state,create_time,text' });
        expect(res.errCode).toBe(0);
      });

      it('指定角色-创建含ip记录', async () => {
        const res = await page.callMethod('myFn', { type: 'create', index: 2 });
        expect(res).toContain('权限校验未通过');
      });

      it('指定角色-创建不含ip记录', async () => {
        const res = await page.callMethod('myFn', { type: 'create', index: 2, field: '_id,state,create_time,text' });
        expect(res.errCode).toBe(0);
      });
    });

    // 普通用户测试
    describe('普通用户创建测试', () => {
      beforeAll(async () => {
        // 点击：创建
        await segItems[0].tap();
        // 点击：普通用户
        await roles[1].tap();
        await page.waitFor(500);
				console.log('page.data: ',page.data());
        // 验证状态
        const typeIndex = await page.data('typeIndex');
        const currentRole = await page.data('currentRole');
        expect(typeIndex).toBe(0);
        expect(currentRole).toBe('user');
      });

      it('直接禁止-创建含ip记录', async () => {
        const res = await page.callMethod('myFn', { type: 'create', index: 0 });
        expect(res).toContain('权限校验未通过');
      });

      it('直接禁止-创建不含ip记录', async () => {
        const res = await page.callMethod('myFn', { type: 'create', index: 0, field: '_id,state,create_time,text' });
        expect(res.errCode).toBe(0);
      });

      it('需要登录-创建含ip记录', async () => {
        const res = await page.callMethod('myFn', { type: 'create', index: 1 });
        expect(res.errCode).toBe(0);
      });

      it('需要登录-创建不含ip记录', async () => {
        const res = await page.callMethod('myFn', { type: 'create', index: 1, field: '_id,state,create_time,text' });
        expect(res.errCode).toBe(0);
      });

      it('指定角色-创建含ip记录', async () => {
        const res = await page.callMethod('myFn', { type: 'create', index: 2 });
        expect(res).toContain('权限校验未通过');
      });

      it('指定角色-创建不含ip记录', async () => {
        const res = await page.callMethod('myFn', { type: 'create', index: 2, field: '_id,state,create_time,text' });
        expect(res.errCode).toBe(0);
      });
    });

    // 审核员测试
    describe('审核员创建测试', () => {
      beforeAll(async () => {
        // 点击：创建
        await segItems[0].tap();
        // 点击：审核员
        await roles[2].tap();
        await page.waitFor(500);
        // 验证状态
        const typeIndex = await page.data('typeIndex');
        const currentRole = await page.data('currentRole');
        expect(typeIndex).toBe(0);
        expect(currentRole).toBe('auditor');
      });

      it('直接禁止-创建含ip记录', async () => {
        const res = await page.callMethod('myFn', { type: 'create', index: 0 });
        expect(res).toContain('权限校验未通过');
      });

      it('直接禁止-创建不含ip记录', async () => {
        const res = await page.callMethod('myFn', { type: 'create', index: 0, field: '_id,state,create_time,text' });
        expect(res.errCode).toBe(0);
      });

      it('需要登录-创建含ip记录', async () => {
        const res = await page.callMethod('myFn', { type: 'create', index: 1 });
        expect(res.errCode).toBe(0);
      });

      it('需要登录-创建不含ip记录', async () => {
        const res = await page.callMethod('myFn', { type: 'create', index: 1, field: '_id,state,create_time,text' });
        expect(res.errCode).toBe(0);
      });

      it('指定角色-创建含ip记录', async () => {
        const res = await page.callMethod('myFn', { type: 'create', index: 2 });
        expect(res.errCode).toBe(0);
      });

      it('指定角色-创建不含ip记录', async () => {
        const res = await page.callMethod('myFn', { type: 'create', index: 2, field: '_id,state,create_time,text' });
        expect(res.errCode).toBe(0);
      });
    });

    // 管理员测试
    describe('管理员创建测试', () => {
      beforeAll(async () => {
        // 点击：创建
        await segItems[0].tap();
        // 点击：管理员
        await roles[3].tap();
        await page.waitFor(500);
        // 验证状态
        const typeIndex = await page.data('typeIndex');
        const currentRole = await page.data('currentRole');
        expect(typeIndex).toBe(0);
        expect(currentRole).toBe('admin');
      });

      it('直接禁止-创建含ip记录-管理员角色除外', async () => {
        const res = await page.callMethod('myFn', { type: 'create', index: 0 });
        expect(res.errCode).toBe(0);
      });

      it('直接禁止-创建不含ip记录', async () => {
        const res = await page.callMethod('myFn', { type: 'create', index: 0, field: '_id,state,create_time,text' });
        expect(res.errCode).toBe(0);
      });

      it('需要登录-创建含ip记录', async () => {
        const res = await page.callMethod('myFn', { type: 'create', index: 1 });
        expect(res.errCode).toBe(0);
      });

      it('需要登录-创建不含ip记录', async () => {
        const res = await page.callMethod('myFn', { type: 'create', index: 1, field: '_id,state,create_time,text' });
        expect(res.errCode).toBe(0);
      });

      it('指定角色-创建含ip记录', async () => {
        const res = await page.callMethod('myFn', { type: 'create', index: 2 });
        expect(res.errCode).toBe(0);
      });

      it('指定角色-创建不含ip记录', async () => {
        const res = await page.callMethod('myFn', { type: 'create', index: 2, field: '_id,state,create_time,text' });
        expect(res.errCode).toBe(0);
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

      it('直接禁止-读取含ip记录', async () => {
        const res = await page.callMethod('myFn', { type: 'read', index: 0 });
        expect(res).toContain('权限校验未通过');
      });

      it('直接禁止-读取不含ip记录', async () => {
        const res = await page.callMethod('myFn', { type: 'read', index: 0, field: '_id,state,create_time,text' });
        expect(res.result.data.length).toBeGreaterThan(0);
      });

      it('需要登录-读取含ip记录', async () => {
        const res = await page.callMethod('myFn', { type: 'read', index: 1 });
        expect(res).toContain('权限校验未通过');
      });

      it('需要登录-读取不含ip记录', async () => {
        const res = await page.callMethod('myFn', { type: 'read', index: 1, field: '_id,state,create_time,text' });
        expect(res.result.data.length).toBeGreaterThan(0);
      });

      it('指定角色-读取含ip记录', async () => {
        const res = await page.callMethod('myFn', { type: 'read', index: 2 });
        expect(res).toContain('权限校验未通过');
      });

      it('指定角色-读取不含ip记录', async () => {
        const res = await page.callMethod('myFn', { type: 'read', index: 2, field: '_id,state,create_time,text' });
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
        await page.waitFor(500);
        // 验证状态
        const typeIndex = await page.data('typeIndex');
        const currentRole = await page.data('currentRole');
        expect(typeIndex).toBe(1);
        expect(currentRole).toBe('user');
      });

      it('直接禁止-读取含ip记录', async () => {
        const res = await page.callMethod('myFn', { type: 'read', index: 0 });
        expect(res).toContain('权限校验未通过');
      });

      it('直接禁止-读取不含ip记录', async () => {
        const res = await page.callMethod('myFn', { type: 'read', index: 0, field: '_id,state,create_time,text' });
        expect(res.result.data.length).toBeGreaterThan(0);
      });

      it('需要登录-读取含ip记录', async () => {
        const res = await page.callMethod('myFn', { type: 'read', index: 1 });
        expect(res.result.data.length).toBeGreaterThan(0);
      });

      it('需要登录-读取不含ip记录', async () => {
        const res = await page.callMethod('myFn', { type: 'read', index: 1, field: '_id,state,create_time,text' });
        expect(res.result.data.length).toBeGreaterThan(0);
      });

      it('指定角色-读取含ip记录', async () => {
        const res = await page.callMethod('myFn', { type: 'read', index: 2 });
        expect(res).toContain('权限校验未通过');
      });

      it('指定角色-读取不含ip记录', async () => {
        const res = await page.callMethod('myFn', { type: 'read', index: 2, field: '_id,state,create_time,text' });
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
        await page.waitFor(500);
        // 验证状态
        const typeIndex = await page.data('typeIndex');
        const currentRole = await page.data('currentRole');
        expect(typeIndex).toBe(1);
        expect(currentRole).toBe('auditor');
      });

      it('直接禁止-读取含ip记录', async () => {
        const res = await page.callMethod('myFn', { type: 'read', index: 0 });
        expect(res).toContain('权限校验未通过');
      });

      it('直接禁止-读取不含ip记录', async () => {
        const res = await page.callMethod('myFn', { type: 'read', index: 0, field: '_id,state,create_time,text' });
        expect(res.result.data.length).toBeGreaterThan(0);
      });

      it('需要登录-读取含ip记录', async () => {
        const res = await page.callMethod('myFn', { type: 'read', index: 1 });
        expect(res.result.data.length).toBeGreaterThan(0);
      });

      it('需要登录-读取不含ip记录', async () => {
        const res = await page.callMethod('myFn', { type: 'read', index: 1, field: '_id,state,create_time,text' });
        expect(res.result.data.length).toBeGreaterThan(0);
      });

      it('指定角色-读取含ip记录', async () => {
        const res = await page.callMethod('myFn', { type: 'read', index: 2 });
        expect(res.result.data.length).toBeGreaterThan(0);
      });

      it('指定角色-读取不含ip记录', async () => {
        const res = await page.callMethod('myFn', { type: 'read', index: 2, field: '_id,state,create_time,text' });
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
        await page.waitFor(500);
        // 验证状态
        const typeIndex = await page.data('typeIndex');
        const currentRole = await page.data('currentRole');
        expect(typeIndex).toBe(1);
        expect(currentRole).toBe('admin');
      });

      it('直接禁止-读取含ip记录', async () => {
        const res = await page.callMethod('myFn', { type: 'read', index: 0 });
        expect(res.result.data.length).toBeGreaterThan(0);
      });

      it('直接禁止-读取不含ip记录', async () => {
        const res = await page.callMethod('myFn', { type: 'read', index: 0, field: '_id,state,create_time,text' });
        expect(res.result.data.length).toBeGreaterThan(0);
      });

      it('需要登录-读取含ip记录', async () => {
        const res = await page.callMethod('myFn', { type: 'read', index: 1 });
        expect(res.result.data.length).toBeGreaterThan(0);
      });

      it('需要登录-读取不含ip记录', async () => {
        const res = await page.callMethod('myFn', { type: 'read', index: 1, field: '_id,state,create_time,text' });
        expect(res.result.data.length).toBeGreaterThan(0);
      });

      it('指定角色-读取含ip记录', async () => {
        const res = await page.callMethod('myFn', { type: 'read', index: 2 });
        expect(res.result.data.length).toBeGreaterThan(0);
      });

      it('指定角色-读取不含ip记录', async () => {
        const res = await page.callMethod('myFn', { type: 'read', index: 2, field: '_id,state,create_time,text' });
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
        await page.waitFor(500);
        // 验证状态
        const typeIndex = await page.data('typeIndex');
        const currentRole = await page.data('currentRole');
        expect(typeIndex).toBe(2);
        expect(currentRole).toBe(0);
      });

      it('直接禁止-更新含ip记录', async () => {
        const res = await page.callMethod('myFn', { type: 'update', index: 0 });
        expect(res).toContain('权限校验未通过');
      });

      it('直接禁止-更新不含ip记录', async () => {
        const res = await page.callMethod('myFn', { type: 'update', index: 0, field: '_id,state,create_time,text' });
        expect(res.result.updated).toBeGreaterThan(0);
      });

      it('需要登录-更新含ip记录', async () => {
        const res = await page.callMethod('myFn', { type: 'update', index: 1 });
        expect(res).toContain('权限校验未通过');
      });

      it('需要登录-更新不含ip记录', async () => {
        const res = await page.callMethod('myFn', { type: 'update', index: 1, field: '_id,state,create_time,text' });
        expect(res.result.updated).toBeGreaterThan(0);
      });

      it('指定角色-更新含ip记录', async () => {
        const res = await page.callMethod('myFn', { type: 'update', index: 2 });
        expect(res).toContain('权限校验未通过');
      });

      it('指定角色-更新不含ip记录', async () => {
        const res = await page.callMethod('myFn', { type: 'update', index: 2, field: '_id,state,create_time,text' });
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
        await page.waitFor(500);
        // 验证状态
        const typeIndex = await page.data('typeIndex');
        const currentRole = await page.data('currentRole');
        expect(typeIndex).toBe(2);
        expect(currentRole).toBe('user');
      });

      it('直接禁止-更新含ip记录', async () => {
        const res = await page.callMethod('myFn', { type: 'update', index: 0 });
        expect(res).toContain('权限校验未通过');
      });

      it('直接禁止-更新不含ip记录', async () => {
        const res = await page.callMethod('myFn', { type: 'update', index: 0, field: '_id,state,create_time,text' });
        expect(res.result.updated).toBeGreaterThan(0);
      });

      it('需要登录-更新含ip记录', async () => {
        const res = await page.callMethod('myFn', { type: 'update', index: 1 });
        expect(res.result.updated).toBeGreaterThan(0);
      });

      it('需要登录-更新不含ip记录', async () => {
        const res = await page.callMethod('myFn', { type: 'update', index: 1, field: '_id,state,create_time,text' });
        expect(res.result.updated).toBeGreaterThan(0);
      });

      it('指定角色-更新含ip记录', async () => {
        const res = await page.callMethod('myFn', { type: 'update', index: 2 });
        expect(res).toContain('权限校验未通过');
      });

      it('指定角色-更新不含ip记录', async () => {
        const res = await page.callMethod('myFn', { type: 'update', index: 2, field: '_id,state,create_time,text' });
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
        await page.waitFor(500);
        // 验证状态
        const typeIndex = await page.data('typeIndex');
        const currentRole = await page.data('currentRole');
        expect(typeIndex).toBe(2);
        expect(currentRole).toBe('auditor');
      });

      it('直接禁止-更新含ip记录', async () => {
        const res = await page.callMethod('myFn', { type: 'update', index: 0 });
        expect(res).toContain('权限校验未通过');
      });

      it('直接禁止-更新不含ip记录', async () => {
        const res = await page.callMethod('myFn', { type: 'update', index: 0, field: '_id,state,create_time,text' });
        expect(res.result.updated).toBeGreaterThan(0);
      });

      it('需要登录-更新含ip记录', async () => {
        const res = await page.callMethod('myFn', { type: 'update', index: 1 });
        expect(res.result.updated).toBeGreaterThan(0);
      });

      it('需要登录-更新不含ip记录', async () => {
        const res = await page.callMethod('myFn', { type: 'update', index: 1, field: '_id,state,create_time,text' });
        expect(res.result.updated).toBeGreaterThan(0);
      });

      it('指定角色-更新含ip记录', async () => {
        const res = await page.callMethod('myFn', { type: 'update', index: 2 });
        expect(res.result.updated).toBeGreaterThan(0);
      });

      it('指定角色-更新不含ip记录', async () => {
        const res = await page.callMethod('myFn', { type: 'update', index: 2, field: '_id,state,create_time,text' });
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
        await page.waitFor(500);
        // 验证状态
        const typeIndex = await page.data('typeIndex');
        const currentRole = await page.data('currentRole');
        expect(typeIndex).toBe(2);
        expect(currentRole).toBe('admin');
      });

      it('直接禁止-更新含ip记录', async () => {
        const res = await page.callMethod('myFn', { type: 'update', index: 0 });
        expect(res.result.updated).toBeGreaterThan(0);
      });

      it('直接禁止-更新不含ip记录', async () => {
        const res = await page.callMethod('myFn', { type: 'update', index: 0, field: '_id,state,create_time,text' });
        expect(res.result.updated).toBeGreaterThan(0);
      });

      it('需要登录-更新含ip记录', async () => {
        const res = await page.callMethod('myFn', { type: 'update', index: 1 });
        expect(res.result.updated).toBeGreaterThan(0);
      });

      it('需要登录-更新不含ip记录', async () => {
        const res = await page.callMethod('myFn', { type: 'update', index: 1, field: '_id,state,create_time,text' });
        expect(res.result.updated).toBeGreaterThan(0);
      });

      it('指定角色-更新含ip记录', async () => {
        const res = await page.callMethod('myFn', { type: 'update', index: 2 });
        expect(res.result.updated).toBeGreaterThan(0);
      });

      it('指定角色-更新不含ip记录', async () => {
        const res = await page.callMethod('myFn', { type: 'update', index: 2, field: '_id,state,create_time,text' });
        expect(res.result.updated).toBeGreaterThan(0);
      });
    });
  });

  afterAll(async () => {
    // 关闭测试模式
    await page.callMethod('setTestMode', false);
  });
}); 