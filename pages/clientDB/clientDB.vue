<template>
	<view>
		<uni-list>
			<uni-list-item title="API" note="前端直接操作数据库的CURD,联表查询,查询指定返回字段,别名,排序,查询结果返回总数,查询单条记录,查询树形数据..." to="./clientDB-api/clientDB-api" link></uni-list-item>
			<uni-list-item title="unicloud-db组件" note="一个数据库查询组件，它是对clientDB的js库的再封装。前端通过组件方式直接获取uniCloud的云端数据库中的数据，并绑定在界面上进行渲染。" to="./unicloud-db-demo/unicloud-db-demo" link></uni-list-item>
			<uni-list-item title="控制前端操作数据库的权限" note="从表级,字段级根据:账户角色、权限、记录字段、账户uid等控制操作权限" to="./permission/permission" link></uni-list-item>
			<uni-list-item title="字段值域校验" note="是否必填（required）、数据类型（bsonType）、数字范围（maximum、minimum）、字符串长度范围（minLength、maxLength）、format、pattern正则表达式" to="./validate/validate" link></uni-list-item>
			<uni-list-item title="完整示例" to="./demo/demo" note="结合schema的api和组件前端操作数据库,权限控制,actions、foreignKey等,做一个:不同账户权限浏览、删除、审核的系统" link></uni-list-item>
			<!-- <uni-list-item title="schema2code" note="根据schema规范生成表单" link to="../schema2code-demo/schema2code-demo"></uni-list-item> -->
		</uni-list>
	</view>
</template>
<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			
		}
	}
</script>
<style>
</style>
