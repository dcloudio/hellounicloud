// 文档教程: https://uniapp.dcloud.net.cn/uniCloud/schema?id=validatefunction
// 扩展校验函数示例
module.exports = function (rule, value, data, callback) {
	console.log('vvvvv',data);
	if(data.type===0&&data.type_name.length>5){
		callback('姓名不能超过5位数')
	}
	if(data.type===1&&data.type_name.length<4){
		callback('企业名称不能低于4位数')
	}
	// rule  当前规则
	// value 当前规则校验数据
	// data  全部校验数据
	// callback 可选，一般用于自定义 errorMessage，如果执行了callback return 值无效，callback 传入的 message 将替换 errorMessage
	// callback(new Error('message')) 传入 Error 类型时校验不通过
	// callback('message') 传入 String 类型时通过
	return value.length < 10
}
