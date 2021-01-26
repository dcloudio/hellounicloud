<template>
	<view class="root">
		<unicloud-db ref="udb" v-slot:default="{data, loading, error, options}" collection="article,comment,uni-id-users"
		 :field="fields" getone @load="udbLoad">
			<view v-if="error">{{error.message}}</view>
			<view v-else>
				<uni-group title="文章" margin-top="20">
					<uni-list>
						<uni-list-item title="标题" :rightText="data.title"></uni-list-item>
						<uni-list-item title="推出时间">
							<template slot="body">
								<view class="title">推出时间</view>
								<uni-dateformat class="value-box" :date="data.birth_date"></uni-dateformat>
							</template>
						</uni-list-item>
						<!-- <uni-list-item title="语言" :rightText="data.language"></uni-list-item>
				    	<uni-list-item title="操作系统" :rightText="trArr(data.system)"></uni-list-item>
				    	<uni-list-item title="市场占有率" :rightText="data.market_share+'%'"></uni-list-item>
				    	<uni-list-item title="邮箱" :rightText="data.email"></uni-list-item> -->
						<uni-list-item title="下载地址" :rightText="data.dowload_url?data.dowload_url:'游客不可见'"></uni-list-item>
						<uni-list-item title="是否收费" :rightText="data.charge?'是':'否'"></uni-list-item>
					</uni-list>
				</uni-group>
				<uni-group title="评论列表" margin-top="20" v-if="typeof data._id != 'string'">
					<uni-list>
						<uni-list-item v-for="item in data._id" :key="item._id" :title="'用户名 : '+item.uid[0].username" :rightText="'内容：'+item.text"></uni-list-item>
					</uni-list>
				</uni-group>
			</view>
		</unicloud-db>
		<uni-popup ref="dialog" type="dialog">
			<uni-popup-dialog mode="input" @confirm="submitComment" title="提交评论" placeholder="评论内容不能含单词test"></uni-popup-dialog>
		</uni-popup>
		<view class="bottom-box">
			<view style="display: flex;flex-direction: row;">
				<navigator :url="'./edit?id='+article_id">
					<button type="default">
						<uni-icons type="compose"></uni-icons>
						<text>编辑文章</text>
					</button>
				</navigator>
				<button type="default" @click="$refs.dialog.open()">
					<uni-icons type="compose" />
					<text>发布评论</text>
				</button>
			</view>
			<uni-data-checkbox v-model="role" :localdata="roles" />
		</view>
	</view>
</template>
<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupMessage from '@/components/uni-popup/uni-popup-message.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	export default {
		components: {
			uniPopup,
			uniPopupMessage,
			uniPopupDialog
		},
		watch: {
			async role(role, oldRole) {
				uni.showLoading({
					title: '切换账号类型中',
					mask: false
				});
				if (!role) {
					this.setFields(0)
					let res = await uniCloud.callFunction({
						name: 'user-center',
						data: {
							action: 'logout'
						}
					})
					console.log(res.result.msg);
					uni.hideLoading()
					return false
				}
				uniCloud.callFunction({
					name: "user-center",
					data: {
						action: 'login',
						params: {
							username: role === 1 ? "ordinary" : "admin",
							password: "123456",
							needPermission: true
						}
					},
					complete: (res) => {
						this.setFields(1)
						uni.setStorageSync('uni_id_token', res.result.token)
						uni.setStorageSync('uni_id_token_expired', res.result.tokenExpired)
						uni.hideLoading()
					}
				})
			}
		},
		data() {
			return {
				article_id: null,
				role: 0,
				roles: [{
						"value": 0,
						"text": "游客"
					},
					{
						"value": 1,
						"text": "普通用户"
					},
					{
						"value": 2,
						"text": "超级管理员"
					}
				],
				fields: "_id,title,birth_date,language,system,market_share,email,charge"
			}
		},
		onShow() {
			this.$nextTick(()=>{
				this.getNewData()
			})
		},
		methods: {
			getNewData(){
				this.$refs.udb.loadData()
			},
			submitComment(text) {
				console.log(text);
				if (!text) {
					uni.showToast({
						title: '评论内容不能为空',
						icon: 'none'
					});
					return false
				}
				this.$refs.dialog.close()
				const db = uniCloud.database()
				db.collection('comment').add({
					text,
					article_id: this.article_id
				}).then(res => {
					console.log(res);
					this.getNewData()
				}).catch((err)=>{
					uni.showToast({
						title: err.message,
						icon: 'none'
					});
				})
			},
			setFields(n) {
				let fields = '_id,title,birth_date,language,system,market_share,email,charge'
				if (n) {
					fields += ',dowload_url,_id{text,uid{username},article_id}'
				}
				this.fields = fields
			},
			udbLoad({_id}) {
				this.article_id = (typeof _id == 'string') ? _id : _id[0].article_id
			},
			trArr(arr) {
				var s = ''
				if (typeof arr == 'object') {
					arr.forEach((item, index) => {
						s += item
						if (arr.length - 1 != index) {
							s += ','
						}
					})
				}
				return s
			}
		}
	}
</script>
<style>
	.title {
		font-size: 26rpx;
		color: #666666;
		flex: 1;
	}

	.value-box {}

	.root {
		display: flex;
		width: 750rpx;
		height: 100vh;
		flex-direction: column;
		padding-bottom: 100px;
	}

	.comment-box {
		width: 620rpx;
		margin: 50rpx;
		padding: 15rpx;
		border-radius: 10px;
		border: solid 1px #EFEFF4;
	}

	.bottom-box {
		width: 650rpx;
		padding: 0 50rpx;

		bottom: 0;
		position: fixed;
		background-color: #FFFFFF;
		flex-direction: column;
		display: flex;
	}

	button {
		width: 220rpx;
	}
</style>
