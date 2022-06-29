<template>
	<view class="uni-file-picker__container">
		<view class="file-picker__box" v-for="(item,index) in filesList" :key="index" :style="boxStyle">
			<view class="file-picker__box-content" :style="borderStyle">
				<image class="file-image" :src="item.url" mode="aspectFill" @click.stop="prviewImage(item,index)"></image>
				<view v-if="delIcon && !readonly" class="icon-del-box" @click.stop="delFile(index)">
					<view class="icon-del"></view>
					<view class="icon-del rotate"></view>
				</view>
				<view v-if="(item.progress && item.progress !== 100) ||item.progress===0 " class="file-picker__progress">
					<progress class="file-picker__progress-item" :percent="item.progress === -1?0:item.progress" stroke-width="4"
					 :backgroundColor="item.errMsg?'#ff5a5f':'#EBEBEB'" />
				</view>
				<view v-if="item.errMsg" class="file-picker__mask" @click.stop="uploadFiles(item,index)">
					点击重试
				</view>
			</view>
		</view>
		<view v-if="filesList.length < limit && !readonly" class="file-picker__box" :style="boxStyle">
			<view class="file-picker__box-content is-add" :style="borderStyle" @click="choose">
				<slot>
					<view class="icon-add"></view>
					<view class="icon-add rotate"></view>
				</slot>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		name: "uploadImage",
		emits:['uploadFiles','choose','delFile'],
		props: {
			filesList: {
				type: Array,
				default () {
					return []
				}
			},
			disabled:{
				type: Boolean,
				default: false
			},
			disablePreview: {
				type: Boolean,
				default: false
			},
			limit: {
				type: [Number, String],
				default: 9
			},
			imageStyles: {
				type: Object,
				default () {
					return {
						width: 'auto',
						height: 'auto',
						border: {}
					}
				}
			},
			delIcon: {
				type: Boolean,
				default: true
			},
			readonly:{
				type:Boolean,
				default:false
			}
		},
		computed: {
			styles() {
				let styles = {
					width: 'auto',
					height: 'auto',
					border: {}
				}
				return Object.assign(styles, this.imageStyles)
			},
			boxStyle() {
				const {
					width = 'auto',
						height = 'auto'
				} = this.styles
				let obj = {}
				if (height === 'auto') {
					if (width !== 'auto') {
						obj.height = this.value2px(width)
						obj['padding-top'] = 0
					} else {
						obj.height = 0
					}
				} else {
					obj.height = this.value2px(height)
					obj['padding-top'] = 0
				}

				if (width === 'auto') {
					if (height !== 'auto') {
						obj.width = this.value2px(height)
					} else {
						obj.width = '33.3%'
					}
				} else {
					obj.width = this.value2px(width)
				}

				let classles = ''
				for(let i in obj){
					classles+= `${i}:${obj[i]};`
				}
				return classles
			},
			borderStyle() {
				let {
					border
				} = this.styles
				let obj = {}
				const widthDefaultValue = 1
				const radiusDefaultValue = 3
				if (typeof border === 'boolean') {
					obj.border = border ? '1px #eee solid' : 'none'
				} else {
					let width = (border && border.width) || widthDefaultValue
					width = this.value2px(width)
					let radius = (border && border.radius) || radiusDefaultValue
					radius = this.value2px(radius)
					obj = {
						'border-width': width,
						'border-style': (border && border.style) || 'solid',
						'border-color': (border && border.color) || '#eee',
						'border-radius': radius
					}
				}
				let classles = ''
				for(let i in obj){
					classles+= `${i}:${obj[i]};`
				}
				return classles
			}
		},
		methods: {
			uploadFiles(item, index) {
				this.$emit("uploadFiles", item)
			},
			choose() {
				this.$emit("choose")
			},
			delFile(index) {
				this.$emit('delFile', index)
			},
			prviewImage(img, index) {
				let urls = []
				if(Number(this.limit) === 1&&this.disablePreview&&!this.disabled){
					this.$emit("choose")
				}
				if(this.disablePreview) return
				this.filesList.forEach(i => {
					urls.push(i.path)
				})

				uni.previewImage({
					urls: urls,
					current: index
				});
			},
			value2px(value) {
				if (typeof value === 'number') {
					value += 'px'
				} else {
					if (value.indexOf('%') === -1) {
						value = value.indexOf('px') !== -1 ? value : value + 'px'
					}
				}
				return value
			}
		}
	}
</script>

	.icon-del {
		width: 15px;
		height: 2px;
		background-color: #fff;
		border-radius: 2px;
		align-items: center;
		justify-content: center;
		position: absolute;
		top: 3px;
		right: 3px;
		height: 26px;
		width: 26px;
		border-radius: 50%;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 2;
		transform: rotate(-45deg);
	}

	.icon-del {
		height: 2px;
		background-color: #fff;
		border-radius: 2px;
	}
</style>
