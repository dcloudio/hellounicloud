jest.setTimeout(50000)
describe('pages/schema2code/schema2code.nvue', () => {
  let page
  beforeAll(async () => {
    // 重新reLaunch至首页，并获取首页page对象（其中 program 是uni-automator自动注入的全局对象）
    page = await program.switchTab('/pages/schema2code/schema2code')
    await page.waitFor('view')
	await page.setData({ isTest: true })
  })
  it('schema2code-点击', async () => {
    const title = await page.$('.uni-title')
    const showSchemaCode = await title.$('.showSchemaCode')
    await showSchemaCode.tap()
    await page.waitFor(300)
  })
})
