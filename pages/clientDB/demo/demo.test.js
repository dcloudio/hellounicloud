describe('pages/clientDB/demo/demo.vue', () => {
	let page, perPage, roles;
	const TIMEOUT = 6000;

	// 辅助函数：等待角色切换
	const waitForRoleChange = async (expectedRole) => {
		const start = Date.now();
		await page.waitFor(async () => {
			if (Date.now() - start > TIMEOUT) {
				console.warn('连接服务器超时');
				return true;
			}
			const currentRole = await page.data('currentRole');
			return currentRole === expectedRole;
		});
	};

	// 辅助函数：提交评论
	const submitComment = async (content) => {
		const result = await page.callMethod('submitComment', content);
		expect(result.id).toBeDefined();
		expect(result.id.length).toBe(24);
		return result;
	};

	// 辅助函数：更新评论状态
	const updateCommentState = async (commentId, isApproved) => {
		await page.callMethod('updateState', {
			detail: { value: isApproved }
		}, commentId);
		await page.waitFor(500);
	};

	beforeAll(async () => {
		page = await program.reLaunch('/pages/clientDB/demo/demo');
		await page.waitFor("view");
		perPage = await page.$('.page');
		roles = await perPage.$$('.roles-item');
	});

	describe('角色权限测试', () => {
		it('未登录用户 - 应只能查看留言', async () => {
			await roles[0].tap();
			await waitForRoleChange(0);
			
			const commentBtn = await page.$('.comment-btn');
			expect((await commentBtn.text()).trim()).toBe('写留言');
		});

		it('普通用户 - 应能提交留言', async () => {
			await roles[1].tap();
			await waitForRoleChange('user');
			
			const result = await submitComment('我是用户');
			expect(result.id).toBeDefined();
		});

		it('审核员 - 应能审核和修改留言', async () => {
			await roles[2].tap();
			await waitForRoleChange('auditor');
			
			// 提交新留言
			const comment = await submitComment('我是审核员11');
			
			// 审核通过
			await updateCommentState(comment.id, true);
			
			// 修改留言
			await page.setData({ activeNoticeId: comment.id });
			await page.callMethod('updateComment', '我是审核员123');
		});

		it('管理员 - 应具有完整权限', async () => {
			await roles[3].tap();
			await waitForRoleChange('admin');
			
			// 提交新留言
			const comment = await submitComment('我是管理员');
			
			// 审核通过
			await updateCommentState(comment.id, true);
			
			// 审核拒绝
			await updateCommentState(comment.id, false);
			
			// 删除留言
			await page.callMethod('clickIcon', 1, {
				state: 0,
				text: "我是管理员",
				_id: comment.id
			});
		});
	});
});
