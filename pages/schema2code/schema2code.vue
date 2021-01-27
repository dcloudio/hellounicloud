<template>
    <view class="root">
		<view class="uni-title dashed-box">
			schema路径:
			<text>\n uniCloud/database/user-info.schema.json \n</text>
			<text class="link" @click="showSchemaCode">查看详情</text>
		</view>
		<video src="/static/show-schema2code.mov"></video>
		<showJson ref="showJson"></showJson>
		<button class="toForm" @click="toForm" type="primary" size="mini">前往生成的云端一体页面</button>
    </view>
</template>

<script>
import schemaCode from './schemaCode';
    export default {
        data() {
            return {
				schemaCode:schemaCode
            }
        },
        methods: {
			showSchemaCode(){
				this.$refs.showJson.open(schemaCode)
			},
			toForm(){
				uni.navigateTo({
					url:'../user-info/list'
				})
			}
        }
    }
</script>

<style lang="scss">
.code-view{
	height:750rpx;
	width: 750rpx;
	padding:5px 8px;
	overflow: scroll;
	background-color:#fffae7;
}
.code-box{
    white-space:nowrap;
	color: #447315;
	font-size: 12px;
}
.root{
	//padding-bottom: 86px;
}
.tip{
	background-color: #FFFFFF;
	padding: x 0;
	height: 80px;
}
.dashed-box{
	border: dashed 1px #EEEEEE;
	border-radius: 5px;
	position: relative;
}
.uni-title {
	width: 680rpx;
	margin: 15rpx;
	font-size:30rpx;
	font-weight:500;
	padding:20rpx;
	line-height:1.5;
	background-color: #FFFFFF;
}
.uni-title text{
	font-size:24rpx;
	color:#888;
}
.toForm{
}
.uni-title text.link{
	color: #586b95;
}
video{
	width: 750rpx;
	height: 600rpx;
}
</style>
