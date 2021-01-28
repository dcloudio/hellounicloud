<template>
<view class="root">
	<video
		id="myVideo"
		:src="src"
		:enable-progress-gesture="true"
		:page-gesture="true"
		:loop="true"
		:controls="true"
		:show-center-play-btn="true"
		@timeupdate="timeupdate"
		:direction="direction"
		@fullscreenchange="fullscreenchange"
	></video>
</view>
</template>
<script>
var eventChannel,videoContext;
	export default {
		data() {
			return {
				windowHeight : 0,
				windowWidth : 0,
				src   : false,
				state : 0,
				timeupdate_e:'',
				direction:0
			}
		},
		methods:{
			close(){
				uni.navigateBack({
					animationType:"fade-out",
					animationDuration:1000
				})
			},
			timeupdate(e){
				this.timeupdate_e = e
			},
			fullscreenchange({detail}){
				console.log(detail);
				if(!detail.fullScreen){
					uni.navigateBack({
						animationType:"fade-out",
						animationDuration:1000
					})
				}
			}
		},
		onHide(){
			console.log('onHide')
		},
		beforeDestroy() {
			eventChannel.emit('timeupdate', this.timeupdate_e);
		},
		onLoad({videoUrl,title,direction}){ console.log({videoUrl,title,direction});
			eventChannel = this.getOpenerEventChannel()
			this.direction = direction/1;
			this.src = videoUrl;
			if(title){ uni.setNavigationBarTitle({title}) }
		},
		onReady() {
			videoContext = uni.createVideoContext('myVideo',this)
			videoContext.play()
			videoContext.requestFullScreen()
		}
	}
</script>

<style>
.root{
	background-color: #000000;
	height: 100vh;
	width: 100vw;
	display: flex;
	justify-content: center;
	align-items: center;
}
#myVideo{
	position: fixed;
	top: 0;
	width: 1px;
	height: 1px;
	left: 0;
}
</style>