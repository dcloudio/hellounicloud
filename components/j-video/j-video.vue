<template>
<view class="root" :style="{width,height}">
	<image :style="{width,height}" class="posterImg" :src="posterUrl" mode="aspectFit"></image>
	<view :style="{width,height}" @click="play" class="box">
		<image class="playIcon" src="../../static/play.png" mode="widthFix"></image>
	</view>
</view>
</template>

<script>
	export default {
		computed:{
			posterUrl(){
				if(this.poster) return this.poster
				return this.url + '?x-oss-process=video/snapshot,t_'+(parseInt(this.currentTime*1000))+',f_jpg,w_800,m_fast'
			}
		},
		methods:{
			fullscreenchange(e){
				console.log(e.detail.fullScreen);
				this.state = e.detail.fullScreen
			},
			play(){
				uni.navigateTo({
					url:"/pages/videoPlay/videoPlay?videoUrl="+this.url,
					complete: (e) => {
						console.log(e);
					},
					animationType:"fade-in",
					events:{
						timeupdate:(e)=>{
							console.log(e.detail);
							this.duration = e.detail.duration
							this.currentTime = e.detail.currentTime
						}
					}
				})
			}
		},
		watch: {
		},
		data() {
			return {
				state:false,
				currentTime:0,
				duration:0,
				videoId:''
			};
		},
		props: {
			poster: {
				type: [String,Boolean],
				default(){
					return ''
				}
			},
			url: {
				type: String,
				default(){
					return ''
				}
			},
			direction: {
				type: Number,
				default(){
					return 0
				}
			},
			width: {
				type: String,
				default(){
					return "750rpx";
				}
			},
			height: {
				type: String,
				default(){
					return "450rpx";
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
.root{
	position:relative;
	width: 750rpx;
	height: 300px;
	overflow: hidden;
}
.posterImg,.video,.box{
	display: flex;
	width: 750rpx;
	height: 300px;
	//border: solid 1px red;absolute
	position:absolute;
}
.posterImg{
	//border: solid red 1px;
}
.box{
	justify-content: center;
	align-items: center;
}
.playIcon{
	width: 100rpx;
}
</style>
