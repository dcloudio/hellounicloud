<template>
	<view class="content">
		<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type="button" active-color="#4cd964"></uni-segmented-control>
		<unicloudDbs v-if="current"></unicloudDbs>
		<tradition v-else></tradition>
	</view>
</template>

<script>
import tradition from './tradition.vue';
import unicloudDbs from './unicloud-db.vue';
	export default {
		components: {tradition,unicloudDbs},
		data() {
			return {
				items: ['传统的','unicloud-db'],
				current: 0
			}
		},
		methods: {
			onClickItem(e) {
			
				if (this.current !== e.currentIndex) {
					this.current = e.currentIndex;
				}
			}
		}
	}
</script>
<style>
</style>
