jest.setTimeout(50000)

describe('pages/schema2code/schema2code.nvue', () => {
	let page
	
	beforeAll(async () => {
		// 重新reLaunch至首页，并获取首页page对象
		page = await program.switchTab('/pages/schema2code/schema2code')
		await page.waitFor('view')
		await page.waitFor(800) // 增加等待时间，确保弹窗显示
		await page.setData({ isTest: true })
	})
	
	// 获取页面元素
	async function getPageElements() {
		const title = await page.$('.uni-title')
		const showSchemaCode = await title.$('.showSchemaCode')
		return { title, showSchemaCode }
	}
	
	// 显示代码弹框
	async function showCodeBox() {
		const { showSchemaCode } = await getPageElements()
		await showSchemaCode.tap()
		await page.waitFor(800) // 等待动画完成
	}
	
	describe('页面基础功能', () => {
		it('应该正确显示页面标题和schema代码按钮', async () => {
			const { title, showSchemaCode } = await getPageElements()
			
			// 验证标题
			expect(title).toBeTruthy()
			const titleText = await title.text()
			expect(titleText).toContain('schema2code')
			
			// 验证按钮
			expect(showSchemaCode).toBeTruthy()
			const buttonText = await showSchemaCode.text()
			expect(buttonText).toBe('查看schema代码')
		})
	})
	
	describe('交互和内容验证', () => {
		it('点击schema代码按钮应该显示代码内容并验证schema结构', async () => {
			// 显示代码弹框
			await showCodeBox()
			
			// 验证弹窗是否显示
			const alertBox = await page.$('.box')
			expect(alertBox).toBeTruthy()
			
			// 验证弹窗内容
			const scrollView = await page.$('.scroll-view')
			expect(scrollView).toBeTruthy()
			
			// 获取代码内容
			const codeText = await scrollView.text()
			expect(codeText).toBeTruthy()
			
			// 验证代码包含必要的schema结构
			expect(codeText).toContain('bsonType')
			expect(codeText).toContain('required')
			expect(codeText).toContain('permission')
		})
	})
})
