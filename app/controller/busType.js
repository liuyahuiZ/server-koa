import {resdata, errdata} from '../../utils/serve';
import {busType} from '../modal/busType'

exports.findType = async (reqBody) => {
    try {
        let data = reqBody.data||{};
        let list = await busType.find(data);
        return resdata('0000', 'success', list);
    } catch (err) {
        return errdata(err);
    }
}

exports.findTheType = async (reqBody) => {
    try {
        let data = reqBody.data;
        let where = {
            _id: data._id
        }
        let result = await busType.find(where);
        return resdata('0000', 'success', result[0]);
    } catch (err) {
        return errdata(err);
    }
}

exports.typeList = async (reqBody) => {
    try{
        let data = reqBody.data;
        let pageSize = data.pageSize || 10;
		let pageNumber = data.pageNumber || 1;
        let sec = {
            typecode: data.typecode,
            user: data.user
        }
        for(let it in sec){
            if(!(sec[it]&&sec[it]!=='')) {
                delete sec[it]
            }
        }
        // let whereTime = {"actTimeStr":{
        //     "$gt": new Date(`${reqBody.dateTime} 00:00:00`).toJSON(), 
        //     "$lt": new Date(`${reqBody.dateTime} 23:59:59`).toJSON()
        // }};
        sec = Object.assign({}, sec);
        console.log('sec:', sec)

        const AllCount = await busType.count(sec);
		console.log('count:', AllCount);
        const where = {skip: (pageNumber - 1) * pageSize, limit:pageSize}
        console.log('where:', where);
        let list = await busType.find(sec, where);
        console.log('list:', list);
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

exports.addType = async (reqBody) => {
    let data = reqBody.data || {};
    try {
        let list = await busType.find({typeKey: data.typeKey});
        let dataReq = {
            typeKey: data.typeKey,
            typeValue: data.typeValue,
            remark: data.remark,
            user: data.user
        }
        let respon = {}
        if(list && list.length > 0) {
            respon = resdata('0000', 'the type is exist', {});
        } else{
            let result = await busType.create(dataReq);
            respon = resdata('0000', 'create success', result);
        }
        return respon;
    } catch (err) {
        return errdata(err);
    }
}

exports.updateType = async (reqBody) => {
    let data = reqBody.data || {};
    try {
        let list = await busType.find({_id: data._id});
        let dataReq = {
            typeKey: data.typeKey,
            typeValue: data.typeValue,
            remark: data.remark,
            user: data.user
        }
        let respon = {}
        if(list && list.length > 0) {
            let result = await busType.update({_id: data._id}, dataReq);
            respon = resdata('0000', 'create success', result);
        } else{
            respon = resdata('0000', 'the type is not exist', {});
        }
        return respon;
    } catch (err) {
        return errdata(err);
    }
}

exports.removeType = async (reqBody) => {
    let data = reqBody.data || {};
    if(!data._id) return resdata('9999', 'id is required', {});
    try {
        let list = await busType.delete({id: data._id});
        return resdata('0000', 'success', list);
    } catch (err) {
        return errdata(err);
    }
}
