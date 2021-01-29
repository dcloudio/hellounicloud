<template>
	<view class="page column">
		<template v-if="codes[0]">
			<text>[</text>
		</template>
		<text v-else>{{L}}</text>
		<view class="content">
			<eCode :codes="codes"></eCode>
		</view>
		<template v-if="codes[0]">
			<text>]</text>
		</template>
		<text v-else>{{R}}</text>
	</view>
</template>

<script>
	import eCode from '@/components/show-code/eCode.vue';
	export default {
		components: {
			eCode
		},
		data() {
			return {
				L: "{",
				R: "}",
				isArr: false
			}
		},
		mounted() {
			
			/* 	setTimeout(()=>{

				},1000) */
		},
		methods: {},
		props: {
			codes: {
				default () {
					return {}
				}
			}
		},
	}
</script>

<style lang="scss" scoped>
	.page {
		background-color: #fffae7;
	}

	.content {
		margin-left: 15px;
	}

	.column {
		flex-direction: column;
	}

	text {
		color: #555;
	}
</style>
