<template>
	<view>
		<view class="tips">
			<view>clientDB可以直接查询数据，也可以联查数据。</view>
			<view>schema配置详见uniCloud-aliyun/database下的comment.schema.json、uni-id-users.schema.json</view>
		</view>

		<uni-section title="指定返回字段" subTitle="查询时可以使用field方法指定返回字段" type="line"></uni-section>
		<button @click="getUserData" type="primary">字段筛选</button>

		<uni-section title="查询结果返回总数getcount" subTitle="在get方法内传入getCount:true来同时返回总数" type="line"></uni-section>
		<button @click="getUserData" type="primary">总记录条数</button>

		<!-- <textarea class="textarea" :value="JSON.stringify(msg.result.data)" placeholder="" /> -->
		<uni-section title="查询单条comment表数据" subTitle="get方法内传入getOne:true来返回一条数据" type="line"></uni-section>
		<button @click="getCommentData" type="primary">返回单条记录</button>

		<uni-section title="获取多条含用户信息的评论数据" subTitle="get方法内传入getTree参数查询树状结构数据" type="line"></uni-section>
		<button @click="getAllData" type="primary">查询树形数据</button>

		<!-- <uni-section title="查询多条comment表数据" subTitle="含字段text,_id,uid" type="line"></uni-section>
		<button @click="getCommentDatas" type="primary">获取多条评论数据</button>
		<uni-section title="查询多条uni-id-users表数据" subTitle="含字段username,_id" type="line"></uni-section>
		<button @click="getUserData" type="primary">获取多条用户数据</button>
		<uni-section title="查询多条来源comment和uni-id-users表数据" subTitle="其中comment表字段uid设置了foreignKey:uni-id-users._id" type="line"></uni-section>
		<button @click="getAllData" type="primary">获取多条含用户信息的评论数据</button> -->
	</view>
</template>

<script>
	const db = uniCloud.database();
	export default {
		data() {
			return {
				msg: {
					result: {
						data: ''
					}
				}
			}
		},
		methods: {
			async getCommentData() {
				uni.showLoading()
				let res = await db.collection('comment').field('text,_id,uid').get({
					getOne: true
				})
				uni.hideLoading()
				uni.showModal({
					content: JSON.stringify(res.result.data),
					showCancel: false
				});
			},
			async getCommentDatas() {
				uni.showLoading()
				let res = await db.collection('comment').field('text,_id,uid').get()
				uni.hideLoading()
				uni.showModal({
					content: JSON.stringify(res.result.data),
					showCancel: false
				});
			},
			async getUserData() {
				uni.showLoading()
				let res = await db.collection('uni-id-users').field('_id,username').get({
					getCount: true
				})
				uni.hideLoading()
				uni.showModal({
					content: JSON.stringify(res.result.data),
					showCancel: false
				});
			},
			async getAllData() {
				uni.showLoading()
				let res = await db.collection('comment,uni-id-users').field('text,_id,uid{_id,username}').get()
				uni.hideLoading()
				uni.showModal({
					content: JSON.stringify(res.result.data),
					showCancel: false
				});
			}
		}
	}
</script>

<style>
	.tips {
		color: #999999;
		font-size: 14px;
		padding: 15px 20px;
	}

	button {
		width: 650rpx;
		margin: 25rpx 50rpx;
	}
</style>
