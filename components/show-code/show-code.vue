<template>
	<view style="background-color: #FFFAE7;">
		<view class="column">
			<view class="row" v-if="!isObject" :class="{'val':e!=':'}">
				<text :class="[codesType]">{{codes}}</text>
				<text>{{e}}</text>
			</view>
			<view v-else class="column">
				<text v-if="isJson">{{L}}</text>
				<text v-else>{{La}}</text>
				<view v-for="(value,key) in codes" :key="key" class="pr ml" :style="{'left':kl*8*-1+'px'}">
					<show-code v-if="isJson" :codes="key" e=":"></show-code>
					<show-code :codes="value" :kl="key.length"></show-code>
				</view>
				<view class="row" :style="{'left':kl*8*-1+'px'}">
					<text v-if="isJson">{{R}}</text>
					<text v-else>{{Ra}}</text>
					<text>,</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import showCode from '@/components/show-code/show-code.vue';
	export default {
		name: "show-code",
		components: {
			"show-code": showCode
		},
		data() {
			return {
				L: "{",
				R: "}",
				La: "[",
				Ra: "]"
			}
		},
		computed: {
			codesType() {
				return this.tf(this.codes)
			},
			isJson(){
				return this.tf(this.codes) == 'json'
			},
			isObject(){
				return typeof(this.codes) == 'object'
			}
		},
		methods: {
			classNNN(){
				return this.tf(this.codes)
			},
			tf(codes) {
				let cType = typeof(codes)
				if (cType == 'object') {
					if (!codes) {
						return 'null'
					} else if (Array.isArray(codes)) {
						return 'array'
					} else {
						return 'json'
					}
				} else {
					return cType
				}
			},
			isArr(e) {
				//	return e[0] == true
			}
		},
		props: {
			codes: {
				default () {
					return {}
				}
			},
			kl: {
				type: Number,
				default () {
					return 0
				}
			},
			e: {
				default () {
					return ","
				}
			},
		},
	}
</script>

<style lang="scss" scoped>
	view,
	text {
		display: flex;
	}
	.column {
		flex-direction: column;
		flex-shrink: 0;
	}
	.row {
		position: relative;
	}
	.pr{
		position: relative;
	}
	text{
		font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		font-weight: 500;
		color: #555;
	}
	.string {
		color: #2f897d;
	}
	.string::before {
		content: '"';
	}
	.string::after {
		content: '"';
	}
	
	.boolean{
		color: #34629d;
	}
	text.string{
		color: #447b15;
	}
	.val text.string{
		color: #2f897d;
	}
	.number {
		color: #9661ef;
	}
	.ml{
		margin-left: 15px;
	}
</style>
