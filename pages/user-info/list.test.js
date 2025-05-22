// 	jest.setTimeout(20000)
describe('pages/user-info/list.vue', () => {
  let page, currentPage;
  if (process.env.uniTestPlatformInfo == 'ios_simulator 13.7') {
    it('ios', async () => {
      expect(1).toBe(1)
    })
    return
  }
  beforeAll(async () => {
    page = await program.navigateTo('/pages/user-info/list')
    await page.waitFor('view')
  })
  async function waitTime() {
		const time = process.env.UNI_PLATFORM == 'mp-weixin'? 2000:1000
		await page.waitFor(time)
  }
  it('点击fab跳转到add页', async () => {
    await page.callMethod('fabClick')
    await page.waitFor('view')
    await waitTime()
    const jestResult = await page.data('jestResult')
    expect(jestResult).toBe(true)
    currentPage = await program.currentPage()
    expect(currentPage.path).toBe('pages/user-info/add')
    await program.navigateBack()
    await page.waitFor('view')
  })
  it('点击第一条跳转到detail页', async () => {
    await waitTime()
    const items = await page.$$('.uni-list-item')
    if (items.length > 0) {
      await items[0].tap()
      await waitTime()
      currentPage = await program.currentPage()
      expect(currentPage.path).toBe('pages/user-info/detail')
      // await program.navigateBack()
    } else {
      console.log('no items');
    }
  })
})