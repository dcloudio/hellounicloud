// 文档教程: https://uniapp.dcloud.net.cn/uniCloud/schema?id=validatefunction
// 扩展校验函数示例
module.exports = function(rule, value, data, callback) {
	console.log(data.organization, value);
	if (data.organization && !value) {
		callback('企业必须填写')
	}
	//callback('男生必须填写')
	// rule  当前规则
	// value 当前规则校验数据
	// data  全部校验数据
	// callback 可选，一般用于自定义 errorMessage，
	// 如果执行了callback return 值无效，
	// callback 传入的 message 将替换 errorMessage
	// callback(new Error('message')) 传入 Error 类型时校验不通过
	// callback('message') 传入 String 类型时通过
}
