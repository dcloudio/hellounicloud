<template>
	<view class="page">
		<uni-segmented-control class="segmented-control" :current="current" :values="items" @clickItem="clickItem"></uni-segmented-control>
		<view class="content">
			<view v-show="current === 0">
				<uni-list>
					<uni-section title="函数验证器 validateFunction" type="line"></uni-section>
					<uni-list-item title="表级动态验证" rightText="组织名称" note="类型为企业、个人时分别设置验证规则\n 个人:限输入4个字;企业:限32字 \n 你可以尝试选择个人后,填写企业名称,则会报错!"/>
					<uni-list-item title="可联网的验证" rightText="备注" note="典型功能:敏感词过滤.需要连网调用api验证。"/>
					
					<uni-section title="常规验证 pattern" type="line"></uni-section>
					<uni-list-item title="正则验证" rightText="姓名" note="通过正则表达式满足各类验证需求"/>
					<uni-section title="内置验证器format" type="line"></uni-section>
					<uni-list-item title="邮箱、网址" note="后续会持续新增" rightText="email、url" />
					
					<uni-section title="数据类型 bsonType" type="line"></uni-section>
					<uni-list-item title="整数" note="数值框" rightText="int" />
					<uni-list-item title="数组" note="如:单选/多选框" rightText="array" />
					<uni-list-item title="布尔值" note="如:开关switch" rightText="bool" />
					
					<uni-section title="数据范围" type="line"></uni-section>
					<uni-list-item title="数值范围" note="最大值:maximum,最小值minimum \n 含最大值exclusiveMaximum,含最小值exclusiveMinimum"/>
					<uni-list-item title="字符串长度" note="maxLength限输入的文本长度不超过10" />
					<uni-list-item title="是否必填" note="required:[title, slider]列举必填字段" rightText="文本框、slider" />
					
					
				</uni-list>
			</view>
			<view v-show="current === 1">
				<uni-section title="enum完全列举" type="line"></uni-section>
				<uni-list-item title="完全列举范围" note="enum支持三种类型:简单数组、支持描述的复杂数组、数据查询; \n schema2code不支持简单数组" rightText="多选单选框" />
				<uni-list-item title="来源数据查询" note="一个数据查询而来。也即，在enum中可以配置jql查询语句。本示例的地址就是从表opendb-city-china中查询" rightText="地址" />

				<uni-section title="设置变量的值" type="line"></uni-section>
				<uni-list-item title="预置字段值 defaultValue" note="为字段设置默认值，可用schema直接修改" rightText="" />
				<uni-list-item title="强制字段值 forceDefaultValue" note="强制设置字段值,无法用schema直接修改;但可以通过云函数(含action)修改。支持插入:当前时间戳、当前客户端IP、当前用户Id。" rightText="" />
			</view>
			<view v-show="current === 2">
<pre>
DB Schema配置的字段，在生成页面时使用什么组件渲染？决定关系如下：	
 ·如果配置了字段的component属性，则严格按component的配置执行。
 ·如果没有配置component属性，那么默认有如下策略：
 ·字段类型为bool时，默认使用switch组件
 ·字段类型为Array时，默认使用uni-data-checkbox组件
 ·字段类型为int时，满足以下条件，默认使用slider组件
	必填字段
	配置 minimum 或 maximum
 ·其他字段类型，将生成uni-easyinput组件。如果是数字类型，会同时把input的键盘类型设为数字。
 ·如果没有配label，则以title作为label，渲染在表单项前面
 ·description在渲染为input时会被设为placehold
</pre>
			</view>
		</view>
	</view>
</template>

<script>
	import myForm from '../article/add.vue';
	import checkData from '../checkData/checkData.vue';
	export default {
		components:{myForm,checkData},
		data() {
			return {
				items: ['验证','数据','组件'],
				current:0
			}
		},
		methods: {
			clickItem(e){
				console.log(e);
				this.current = e.currentIndex
			}
		}
	}
</script>

<style>
.page{
	padding-top: 45px;
}
.segmented-control{
	margin-top: -45px;
	background-color: #FFFFFF;
	position: fixed;
	width: 700rpx;
	left: 25rpx;
	z-index: 99;
}
pre{
	padding: 16rpx 26rpx;
	white-space: pre-wrap;
}
</style>
