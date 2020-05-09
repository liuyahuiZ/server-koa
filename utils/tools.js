// 系统级别错误 token过期 无权限 业务级别错误  网络级别错误  数据库错误
exports.filer=function (obj) {
	let keys = Object.keys(obj);
	let values =  Object.values(obj);
	let newObj = {};
	for(let i=0;i<keys.length;i++){
		if(values[i]!==undefined){
			newObj[keys[i]] = values[i]
		}
	}
	return newObj;
};