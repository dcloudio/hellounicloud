// uni-app自动化测试教程: https://uniapp.dcloud.io/collocation/auto/hbuilderx-extension/index

describe('pages/cloudObject/cloudObject.vue', () => {
	let page
	
	beforeAll(async () => {
		page = await program.switchTab('/pages/cloudObject/cloudObject')
		await page.waitFor('view')
	})
	
	afterAll(async () => {
		// 清理测试数据
		try {
			await page.callMethod('remove')
		} catch (error) {
			console.log('清理测试数据失败:', error)
		}
	})
	
	describe('页面基础功能', () => {
		it('应该正确显示页面标题', async () => {
			const title = await page.$('.title')
			expect((await title.text()).trim()).toBe('基础示例-云对象')
		})
	})
	
	describe('数据操作功能', () => {
		it('应该能够添加新数据', async () => {
			const addData = await page.callMethod('add')
			expect(addData).toHaveLength(24) // MongoDB ObjectId 长度为24
		})
		
		it('应该能够查询数据', async () => {
			const getTenData = await page.callMethod('get')
			expect(getTenData).toBeDefined()
			expect(getTenData.affectedDocs).toBeGreaterThanOrEqual(0)
			if (getTenData.affectedDocs > 0) {
				expect(Array.isArray(getTenData.data)).toBe(true)
				expect(getTenData.data.length).toBeGreaterThanOrEqual(1)
			}
		})
		
		it('应该能够更新数据', async () => {
			const updateData = await page.callMethod('update')
			if (updateData.status === -1) {
				expect(updateData.msg).toBe('集合unicloud-test内没有数据')
			} else {
				expect(updateData.msg).toBeDefined()
				expect(updateData.status).toBe(0)
			}
		})
		
		it('应该能够删除数据', async () => {
			const removeData = await page.callMethod('remove')
			expect(removeData).toBe('成功删除unicloud-test内第一条数据')
		})
	})
	
	describe('模块功能', () => {
		it('应该能够正确使用公用模块', async () => {
			const useCommon = await page.callMethod('useCommon')
			const expectedRecord = {
				secret: 'abcdefg',
				version: '1.0.0'
			}
			expect(useCommon).toEqual(expectedRecord)
		})
	})
	
	describe('错误处理', () => {
		it('应该在数据不存在时正确处理更新操作', async () => {
			// 先删除所有数据（通过多次调用remove直到没有数据）
			let removeResult
			do {
				removeResult = await page.callMethod('remove')
			} while (removeResult === '成功删除unicloud-test内第一条数据')
			
			// 尝试更新
			const updateData = await page.callMethod('update')
			expect(updateData.status).toBe(-1)
			expect(updateData.msg).toBe('集合unicloud-test内没有数据')
		})
		
		it('应该在数据不存在时正确处理查询操作', async () => {
			// 先删除所有数据（通过多次调用remove直到没有数据）
			let removeResult
			do {
				removeResult = await page.callMethod('remove')
			} while (removeResult === '成功删除unicloud-test内第一条数据')
			
			// 尝试查询
			const getTenData = await page.callMethod('get')
			expect(getTenData.affectedDocs).toBe(0)
			expect(Array.isArray(getTenData.data)).toBe(true)
			expect(getTenData.data.length).toBe(0)
		})
	})
})
