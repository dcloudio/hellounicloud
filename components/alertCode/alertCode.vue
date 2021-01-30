<template>
	<view class="box" @click="isShow=false" :class="{isShow:isShow}">
		<scroll-view scroll-x scroll-y @click.stop="" class="scroll-view" style="overflow: auto;">
			<show-code v-if="codes" :codes="codes"></show-code>
		</scroll-view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				codes: false,
				isShow:false
			}
		},
		methods: {
			open(codes) {
				this.codes = codes||{}
				this.isShow = true
			}
		}
	}
</script>
<style lang="scss" scoped>
.box{
	width: 100vw;
	height: 100vh;
	background-color: rgba(0,0,0,0.2);
	position: fixed;
	top: 0;
	left: 100vw;
	z-index: 999;
	opacity:0;
	transition: opacity 0.3s;
	justify-content: center;
	align-items: center;
	display: flex;
}
.scroll-view{
	background-color: #FFFAE7;
	padding:14px 18rpx;
	width: 610rpx;
	max-height: 60vh;
}
.isShow{
	opacity:1;
	left: 0;
}
</style>