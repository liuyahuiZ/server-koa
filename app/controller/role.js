import {resdata, errdata} from '../../utils/serve';
import {role} from '../modal/role'

exports.findRole = async (reqBody) => {
    try {
        let data = reqBody.data||{};
        let list = await role.find(data);
        return resdata('0000', 'success', list);
    } catch (err) {
        return errdata(err);
    }
}

exports.findTheRole = async (reqBody) => {
    try {
        let data = reqBody.data;
        let where = {
            _id: data._id
        }
        let result = await role.find(where);
        return resdata('0000', 'success', result[0]);
    } catch (err) {
        return errdata(err);
    }
}

exports.roleList = async (reqBody) => {
    try{
        let data = reqBody.data;
        let pageSize = data.pageSize || 10;
		let pageNumber = data.pageNumber || 1;
        let sec = {
            roleName: data.roleName,
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

        const AllCount = await role.count(sec);
		console.log('count:', AllCount);
        const where = {skip: (pageNumber - 1) * pageSize, limit:pageSize}
        console.log('where:', where);
        let list = await role.find(sec, where);
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

exports.addRole = async (reqBody) => {
    let data = reqBody.data || {};
    try {
        let list = await role.find({roleName: data.roleName});
        let dataReq = {
            roleName: data.roleName,
            roleCode: data.roleCode,
            menuGroup: data.menuGroup,
            remark: data.remark
        }
        let respon = {}
        if(list && list.length > 0) {
            respon = resdata('0000', 'the role is exist', {});
        } else{
            let result = await role.create(dataReq);
            respon = resdata('0000', 'create success', result);
        }
        return respon;
    } catch (err) {
        return errdata(err);
    }
}

exports.updateRole = async (reqBody) => {
    let data = reqBody.data || {};
    try {
        let list = await role.find({_id: data._id});
        let dataReq = {
            roleName: data.roleName,
            roleCode: data.roleCode,
            menuGroup: data.menuGroup,
            remark: data.remark
        }
        let respon = {}
        if(list && list.length > 0) {
            let result = await role.update({_id: data._id}, dataReq);
            respon = resdata('0000', 'create success', result);
        } else{
            respon = resdata('0000', 'the role is not exist', {});
        }
        return respon;
    } catch (err) {
        return errdata(err);
    }
}

exports.removeRole = async (reqBody) => {
    if(!reqBody.id) return resdata('9999', 'id is required', {});
    try {
        let list = await role.delete({id: reqBody.id});
        return resdata('0000', 'success', list);
    } catch (err) {
        return errdata(err);
    }
}
