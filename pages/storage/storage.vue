<template>
	<view class="content">
		<view class="title">直接上传文件到云存储</view>
		<view class="tips">
			<text>
				阿里云单文件大小限制为100M，腾讯云单文件最大为5G
				支付宝小程序开发工具上传文件到腾讯云时可能会返回失败，请以真机为准
				各个小程序平台运行时，网络相关的 API 在使用前需要配置域名白名单。
			</text>
			<j-link text="参考" url="https://uniapp.dcloud.io/uniCloud/quickstart?id=%e5%b0%8f%e7%a8%8b%e5%ba%8f%e4%b8%ad%e4%bd%bf%e7%94%a8unicloud%e7%9a%84%e7%99%bd%e5%90%8d%e5%8d%95%e9%85%8d%e7%bd%ae"></j-link>
		</view>
		<view class="btn-list">
			<button type="primary" @click="upload">上传文件</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {}
		},
		methods: {
			add() {
				uni.showLoading({
					title: '处理中...'
				})
				uniCloud.callFunction({
					name: 'add',
					data: {
						name: 'DCloud',
						subType: 'uniCloud',
						createTime: Date.now()
					}
				}).then((res) => {
					uni.hideLoading()
					uni.showModal({
						content: `成功添加一条数据，文档id为：${res.result.id}`,
						showCancel: false
					})
					console.log(res)
				}).catch((err) => {
					uni.hideLoading()
					uni.showModal({
						content: `添加数据失败，错误信息为：${err.message}`,
						showCancel: false
					})
					console.error(err)
				})
			},
			remove() {
				uni.showLoading({
					title: '处理中...'
				})
				uniCloud.callFunction({
					name: 'remove'
				}).then((res) => {
					uni.hideLoading()
					uni.showModal({
						content: res.result.msg,
						showCancel: false
					})
					console.log(res)
				}).catch((err) => {
					uni.hideLoading()
					uni.showModal({
						content: `删除失败，错误信息为：${err.message}`,
						showCancel: false
					})
					console.error(err)
				})
			},
			update() {
				uni.showLoading({
					title: '处理中...'
				})
				uniCloud.callFunction({
					name: 'update',
					data: {
						name: 'DCloud',
						subType: 'html 5+',
						createTime: Date.now()
					}
				}).then((res) => {
					uni.hideLoading()
					uni.showModal({
						content: res.result.msg,
						showCancel: false
					})
					console.log(res)
				}).catch((err) => {
					uni.hideLoading()
					uni.showModal({
						content: `更新操作执行失败，错误信息为：${err.message}`,
						showCancel: false
					})
					console.error(err)
				})
			},
			get() {
				uni.showLoading({
					title: '处理中...'
				})
				uniCloud.callFunction({
					name: 'get'
				}).then((res) => {
					uni.hideLoading()
					uni.showModal({
						content: `查询成功，获取数据列表为：${JSON.stringify(res.result.data)}`,
						showCancel: false
					})
					console.log(res)
				}).catch((err) => {
					uni.hideLoading()
					uni.showModal({
						content: `查询失败，错误信息为：${err.message}`,
						showCancel: false
					})
					console.error(err)
				})
			},
			useCommon() {
				console.log('请确保自己已经阅读并按照公用模块文档操作 https://uniapp.dcloud.io/uniCloud/cf-common')
				uniCloud.callFunction({
					name: 'use-common'
				}).then((res) => {
					uni.hideLoading()
					uni.showModal({
						content: '云函数use-common返回结果：' + JSON.stringify(res.result),
						showCancel: false
					})
					console.log(res)
				}).catch((err) => {
					uni.hideLoading()
					uni.showModal({
						content: `云函数use-common执行失败，错误信息为：${err.message}`,
						showCancel: false
					})
					console.error(err)
				})
			},
			upload() {
				new Promise((resolve, reject) => {
					uni.chooseImage({
						count: 1,
						success: res => {
							const path = res.tempFilePaths[0]
							let ext
							// #ifdef H5
							ext = res.tempFiles[0].name.split('.').pop()
							const options = {
								filePath: path,
								cloudPath: Date.now() + '.' + ext
							}
							resolve(options)
							// #endif
							// #ifndef H5
							uni.getImageInfo({
								src: path,
								success(info) {
									const options = {
										filePath: path,
										cloudPath: Date.now() + '.' + info.type.toLowerCase()
									}
									resolve(options)
								},
								fail(err) {
									reject(new Error(err.errMsg || '未能获取图片类型'))
								}
							})
							// #endif
						},
						fail: () => {
							reject(new Error('Fail_Cancel'))
						}
					})
				}).then((options) => {
					uni.showLoading({
						title: '文件上传中...'
					})
					return uniCloud.uploadFile({
						...options,
						onUploadProgress(e) {
							console.log(e)
						}
					})
				}).then(res => {
					uni.hideLoading()
					console.log(res);
					uni.showModal({
						content: '图片上传成功，fileId为：' + res.fileID,
						showCancel: false
					})
				}).catch((err) => {
					uni.hideLoading()
					console.log(err);
					if (err.message !== 'Fail_Cancel') {
						uni.showModal({
							content: `图片上传失败，错误信息为：${err.message}`,
							showCancel: false
						})
					}
				})
			}
		}
	}
</script>

<style>
	.content {
		padding-bottom: 30px;
	}

	.title {
		font-weight: bold;
		text-align: center;
		padding: 20px 0px;
		font-size: 20px;
	}

	.tips {
		color: #999999;
		font-size: 14px;
		padding: 20px 30px;
	}

	.btn-list {
		padding: 0px 30px;
	}

	.btn-list button {
		margin-bottom: 20px;
	}

	.upload-preview {
		width: 100%;
	}
</style>
