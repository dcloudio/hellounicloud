<template>
	<!-- #ifdef MP -->
	<view class="box isShow" @click="closeMe" v-if="isShow">
	<!-- #endif -->
	<!-- #ifndef MP -->
	<view class="box" @click="closeMe" :class="{isShow:isShow}">
	<!-- #endif -->
	<!-- 小程序存在动画切换的bug本版本先用 v-if="isShow" 处理 -->
		<scroll-view scroll-x scroll-y @click.stop="tapCode" class="scroll-view" style="overflow: auto;">
			<show-code :codes="codes"></show-code>
		</scroll-view>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				codes: {},
				isShow:false
			}
		},
		methods: {
			open(codes) {
				this.codes = codes
				this.isShow = true
			},
			tapCode(e){
				console.log(e);
				e.stopPropagation()
			},
			closeMe(e){
				console.log('closeMe',e);
				this.isShow = false
			}
		}
	}
</script>
<style scoped>
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