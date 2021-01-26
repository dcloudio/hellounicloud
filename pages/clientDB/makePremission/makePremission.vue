<template>
	<view>
		<uni-forms-item label="types" name="">
			<uni-data-checkbox :multiple="false" v-model="types"
			:localdata="mArrJson(typesData)" />
		</uni-forms-item>
		<uni-forms-item label="modes" name="">
			<uni-data-checkbox :multiple="false" v-model="modes"
			:localdata="mArrJson(modesData)" />
		</uni-forms-item>
		<uni-forms-item label="content" name="">
			<uni-data-checkbox :multiple="true" v-model="content"
			:localdata="mArrJson(contentData)" />
		</uni-forms-item>

		
		<view class="auto">
			<uni-forms-item label="账户" name="">
				<uni-data-checkbox  
				:localdata='mArrJson(["登陆即可","根据uni-id"])'/>
			</uni-forms-item>
		</view>
		<view class="auto">
			<uni-forms-item label="根据uni-id" name="">
				<uni-data-checkbox  :multiple="true"
				:localdata='mArrJson(["uni-id权限","uni-id角色"])'/>
			</uni-forms-item>
		</view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				typesData:['table','field'],
				types:'table',
				modes:"c",
				modesData:["c","u","r","d"],
				content:['auto','doc'],
				contentData:['auto','doc'],
				'auto':"",
				'doc':""
			}
		},
		methods: {
			mArrJson(arr){
				let arrJson = []
				arr.forEach((i)=>{
					arrJson.push({'text':i,value:i})
				})
				return arrJson
			},
		}
	}
</script>

<style>

</style>
