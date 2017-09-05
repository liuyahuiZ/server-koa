// 系统级别错误 token过期 无权限 业务级别错误  网络级别错误  数据库错误
exports.resdata=function (code, msg, data) {
    let _code = code ? code : '0000';
    let _msg = msg ? msg : 'success';
	let respon={
		'respHead':{
			'code': _code,
			'message': _msg
		},
		'respBody':{data}
	}
	return respon;
};

exports.errdata=function (err, code, msg) {
    let _code = code ? code : '9999';
    let _msg = msg ? msg : 'error';
	let respon={
		'respHead':{
			'code': _code,
            'message': _msg,
        },
        'respBody':{
            'err': err
        }
	}
	return respon;
};