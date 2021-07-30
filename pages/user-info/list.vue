<template>
	<view class="container">
		<unicloud-db ref="udb" v-slot:default="{data, pagination, loading, hasMore, error}" @load="load"
			collection="user-info,book,opendb-city-china"
			field="username,gender,birth_date,weight,mobile,email,url,favorite_book_id{title},address_code{name},party_member,hobby,comment">
			<view v-if="error">{{error.message}}</view>
			<view v-else-if="data">
				<uni-list>
					<uni-list-item v-for="(item, index) in data" :key="index" showArrow :clickable="true"
						@click="handleItemClick(item._id)">
						<template v-slot:body>
							<!-- 此处默认显示为_id，请根据需要自行修改为其他字段 -->
							{{item._id}}
						</template>
					</uni-list-item>
				</uni-list>
			</view>
			<uni-load-more :status="loading?'loading':(hasMore ? 'more' : 'noMore')"></uni-load-more>
		</unicloud-db>
		<uni-fab ref="fab" horizontal="right" vertical="bottom" :pop-menu="false" @fabClick="fabClick" />
	</view>
</template>

<script>
	export default {
		data() {
			return {
				loadMore: {
					contentdown: '',
					contentrefresh: '',
					contentnomore: ''
				},
				dataList:[]
			}
		},
		onPullDownRefresh() {
			this.$refs.udb.loadData({
				clear: true
			}, () => {
				uni.stopPullDownRefresh()
			})
		},
		onReachBottom() {
			this.$refs.udb.loadMore()
		},
		methods: {
			load(e){
				console.log("e: ",e);
				this.dataList = e
			},
			handleItemClick(id) {
				uni.navigateTo({
					url: './detail?id=' + id
				})
			},
			fabClick() {
				// 打开新增页面
				uni.navigateTo({
					url: './add',
					events: {
						// 监听新增数据成功后, 刷新当前页面数据
						refreshData: () => {
							this.$refs.udb.loadData({
								clear: true
							})
						}
					},
					complete: (e) => {
						console.log("e: ", e);
					}
				})
			}
		}
	}
</script>

<style>
</style>
