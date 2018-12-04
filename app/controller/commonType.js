import {resdata, errdata} from '../../utils/serve';
import {commonType} from '../modal/commonType'

exports.findType = async (reqBody) => {
    try {
        let dataArr = {};
        dataArr = JSON.stringify(reqBody)!=='{}' ? reqBody: {};
        let list = await commonType.find(dataArr);
        return resdata('0000', 'success', list);
    } catch (err) {
        return errdata(err);
    }
}

exports.addType = async (reqBody) => {
    if(!reqBody.typeKey) return resdata('9999', 'typeKey is required', {});
    if(!reqBody.typeValue) return resdata('9999', 'typeValue is required', {});
    try {
        let list = await commonType.find({typeKey: reqBody.typeKey});
        let data = {
            typeKey: reqBody.typeKey,
            typeValue: reqBody.typeValue,
            remark: reqBody.remark,
            user: reqBody.user
        }
        let respon = {}
        if(list && list.length > 0) {
            respon = resdata('0000', 'the type is exist', {});
        } else{
            let result = await commonType.create(data);
            respon = resdata('0000', 'create success', result);
        }
        return respon;
    } catch (err) {
        return errdata(err);
    }
}

exports.removeType = async (reqBody) => {
    if(!reqBody.id) return resdata('9999', 'id is required', {});
    try {
        let list = await commonType.delete({id: reqBody.id});
        return resdata('0000', 'success', list);
    } catch (err) {
        return errdata(err);
    }
}
