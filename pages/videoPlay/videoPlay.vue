<template>
<view class="root">
	<video
		v-if="src"
		ref="video"
		id="myVideo"
		:src="src"
		:enable-progress-gesture="true"
		:page-gesture="true"
		:loop="true"
		:controls="true"
		:show-center-play-btn="true"
		:style="{
			height:windowHeight,
			width:windowWidth,
		}"
		@timeupdate="timeupdate"
		class="videoBox"
		:autoplay="true"
	></video>
</view>
</template>
<script>
var eventChannel;
	export default {
		data() {
			return {
				windowHeight : 0,
				windowWidth : 0,
				src   : false,
				state : 0,
				timeupdate_e:''
			}
		},
		methods:{
			close(){
				uni.navigateBack({
					animationType:"fade-out"
				})
			},
			timeupdate(e){
				this.timeupdate_e = e
			}
		},
		onHide(){
			console.log('onHide')
			//uni.hideLoading();
		},
		beforeDestroy() {
			eventChannel.emit('timeupdate', this.timeupdate_e);
		},
		onLoad: function(option) {
			eventChannel = this.getOpenerEventChannel()
			const res = uni.getSystemInfoSync();
			this.windowHeight = res.windowHeight+1+'px';
			this.windowWidth  = res.windowWidth+1+'px';
			
			this.src = option.videoUrl;
		}
	}
</script>

<style>
.root{
	background-color: #000000;
}
.videoBox{
	position: fixed;
	top: 0;
	left: 0;
}
</style>