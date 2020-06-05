import {resdata, errdata} from '../../utils/serve';
import {messages} from '../modal/messages'


exports.messagesList = async (reqBody) => {
    try{
        let data = reqBody.data;
        let pageSize = data.pageSize || 10;
		let pageNumber = data.pageNumber || 1;
        // let whereTime = {"actTimeStr":{
        //     "$gt": new Date(`${reqBody.dateTime} 00:00:00`).toJSON(), 
        //     "$lt": new Date(`${reqBody.dateTime} 23:59:59`).toJSON()
        // }};
        let sec = {}
        const AllCount = await messages.count(sec);
		console.log('count:', AllCount);
        const where = {skip: (pageNumber - 1) * pageSize, limit:pageSize, sort:{"createTime":-1}}
        let list = await messages.find(sec, where);
		return resdata('0000', 'success', {
			pageInfo: {
				allCount: AllCount,
				allPage: Math.ceil(AllCount / pageSize),
				pageNumber: pageNumber,
				pageSize: pageSize
            },
            total: AllCount, 
            pages: Math.ceil(AllCount / pageSize),
			records: list
		});
    }catch(err){
        console.log(err);
        return errdata(err);
    }
}

exports.messagesCount = async (reqBody) => {
    try{
        // let whereTime = {"actTimeStr":{
        //     "$gt": new Date(`${reqBody.dateTime} 00:00:00`).toJSON(), 
        //     "$lt": new Date(`${reqBody.dateTime} 23:59:59`).toJSON()
        // }};
        let sec = {}
        const AllCount = await messages.count(sec);
		console.log('count:', AllCount);
        
		return resdata('0000', 'success', {
            total: AllCount, 
		});
    }catch(err){
        console.log(err);
        return errdata(err);
    }
}

exports.addMessages = async (reqBody) => {
    let data = reqBody.data || {};
    try {
        let dataReq = {
            userName: data.userName,
            phone: data.phone,
            email: data.email,
            message: data.message
        }
        let result = await messages.create(dataReq);
        let respon = resdata('0000', 'create success', result);
        return respon;
    } catch (err) {
        return errdata(err);
    }
}


exports.removeMessages = async (reqBody) => {
    if(!reqBody.id) return resdata('9999', 'id is required', {});
    try {
        let list = await messages.delete({id: reqBody.id});
        return resdata('0000', 'success', list);
    } catch (err) {
        return errdata(err);
    }
}
