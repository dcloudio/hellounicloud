<template>
	<view>
		<uni-popup ref="pop">
			<scroll-view scroll-x scroll-y class="box" show-scrollbar>
				<text class="text" space="emsp">{{JSON.stringify(obj,null,' ')}}</text>
			</scroll-view>
		</uni-popup>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				obj: {
					"@odata.context": "$metadata#AddTableOne_466281s",
					"value": [{
						"NAME": "李四",
						"BIRTHDAY": "2018-10-03T11:33:50+08:00",
						"AGE": "0",
						"ID": "111111"
					}]
				}
			}
		},
		mounted() {
			// this.open()
		},
		methods: {
			open(obj) {
				this.obj = obj||{}
				this.$refs.pop.open()
			}
		}
	}
</script>

<style>
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
