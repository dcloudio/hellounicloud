describe('pages/storage/storage.vue', () => {
	let page, btnText;
	beforeAll(async () => {
		page = await program.switchTab('/pages/storage/storage')
		await page.waitFor('view')
		btnText = await page.$$('button')
	})
	it('云存储', async () => {
		expect.assertions(2);
		expect(await btnText[0].text()).toBe('空间内置云存储');
		expect(await btnText[1].text()).toBe('扩展存储-七牛云');
	})
})