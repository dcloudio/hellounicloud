<template>
	<view>
		<uni-popup ref="pop">
			<scroll-view scroll-x scroll-y class="box" show-scrollbar>
				<show-code v-if="codes" :codes="codes"></show-code>
				<!-- <text class="text" space="emsp">{{JSON.stringify(codes,null,' ')}}</text> -->
			</scroll-view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				codes: false
			}
		},
		mounted() {
			// this.open()
		},
		methods: {
			open(codes) {
				this.codes = codes||{}
				this.$refs.pop.open()
			}
		}
	}
</script>

<style lang="scss" scoped>
.box{
	width: 650rpx;
	overflow: auto;
	max-height:60vh;
	padding: 15rpx;
	background-color:#fffae7;
	color: #2b8300!important;
}
.text{
	font-size: 14px;
}
</style>
