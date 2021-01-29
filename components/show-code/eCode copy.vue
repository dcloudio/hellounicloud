<template>
	<view>
		<view class="column page" :style="{left:kl*7*-1+'px'}">
			<view v-for="(value,k) in codes" class="row" :key="k">
				<view v-if="!isArr(codes)" class="key"><text>"</text><text>{{k}}</text><text>":</text></view>
				<template v-if="!['array','object'].includes(typeof(value))">
					<view v-if="tf(value) == 'string'" class="string">
						<text>"</text><text>{{value}}</text><text>"</text><text>,</text>
					</view>
					<template v-else>
						<view class="root" :class="{number:tf(value) == 'number'}">{{value}}</view><text>,</text>
					</template>
				</template>
				<view v-else class="column">
					<template v-if="!value[0]">
						<text class="L">{{L}}</text>
						<e-code :codes="value" :kl="k.length"></e-code>
						<view class="row">
							<text class="R" :style="{left:k.length*9*-1+'px'}">{{R}}</text>
							<text class="R" :style="{left:k.length*9*-1+'px'}">,</text>
						</view>
					</template>
					<template v-else>
						<view class="row arr">
							<text class="b">[</text>
							<view v-for="item in value">
								<template v-if="tf(item)=='string'">
									<text>"</text><text>{{item}}</text><text>"</text>
								</template>
								<template v-else>
									<e-code :codes="item"></e-code>
								</template>
							</view>
							<text class="b">]</text><text>,</text>
						</view>
					</template>

				</view>
			</view>

			<!-- <text v-if="['string','number'].includes(typeof(data))">"{{data}}"</text>
		<template v-else v-for="(key,value) in data">
			<text class="root">"{{key}}"</text>:
			<template v-if="['string','number'].includes(typeof(value))">
				<e-code :value="value"></e-code>
			</template>
		</template> -->
		</view>
	</view>
</template>

<script>
	import eCode from '@/components/show-code/eCode.vue';
	export default {
		name: "e-code",
		components: {
			"e-code": eCode
		},
		data() {
			return {
				L: "{",
				R: "}"
			}
		},
		methods: {
			tf(e) {
				return typeof e
			},
			isArr(e) {
				return e instanceof Array
			}
		},
		props: {
			codes: {
				default () {
					return ""
				}
			},
			kl: {
				type: Number,
				default () {
					return 0
				}
			},

		},
	}
</script>

<style>
	view,
	text {
		display: flex;
	}

	.column {
		flex-direction: column;
	}

	.root {
		color: #0077CC;
	}

	.page {
		background-color: #fffae7;
		position: relative;
	}

	.row {
		/* 	border: solid 1px #007AFF; */
	}

	text {
		color: #2f897d;
		font-weight: 400;
	}

	.key text {
		color: #2B8300;
	}

	.boole {
		color: #34629d;
	}

	.L,
	.R,
	.b {
		color: #555;
	}

	.R {
		position: relative;
	}

	.number {
		color: #9661ef;
	}
</style>
