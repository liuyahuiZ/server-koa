import {choRecord} from '../modal/choRecord'
import {resdata, errdata} from '../../utils/serve'
import {commonType} from '../modal/commonType'
import {babyUser} from '../modal/babyUser'
import moment from 'moment';

const logUtil = require('../../utils/logUtil');

async function findRecord(arr, where, skip){
    let newArr = []
    for(let i=0;i<arr.length;i++){
        let whereTime = {"createTime":{
            "$gt": arr[i].startTime, 
            "$lt": arr[i].endTime
        }};
        if(where){
            whereTime = Object.assign({}, whereTime, where);
        }
        let dateException = await choRecord.count(whereTime, skip);
        newArr.push({ time: moment(arr[i].startTime).format('YYYY-MM-DD'),  data:dateException})
    }
    return (newArr);    
}

function getDate(n=7){
    // let todayStart = new Date(new Date().toLocaleDateString());
    //new Date(new Date().setHours(0,0,0,0));
    // let todayEnd = new Date(new Date(new Date().toLocaleDateString()).getTime()+24*60*60*1000-1);
    
    let date = []
    for(let i=0;i<n;i++){
        date.push({
            startTime: new Date(new Date().toLocaleDateString()).getTime() - (i*(24*60*60*1000)),
            endTime: new Date(new Date().toLocaleDateString()).getTime() + (24*60*60*1000-1) - (i*(24*60*60*1000))
        })
    }
    return date;
}

exports.getRecordList = async (reqBody) => {
    try{
        let data = reqBody.data || {};
        let pageSize = data.size || 10;
        let pageNumber = data.current || 1;
        let sortType = data.sortType || 'sea'
        let sec = {
            modalType: data.modalType,
            busType: data.busType
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

        const AllCount = await choRecord.count(sec);
		console.log('count:', AllCount);
        const where = {skip: (pageNumber - 1) * pageSize, limit:pageSize, sort:{[sortType]:-1}}
        console.log('where:', where);
        let list = await choRecord.find(sec, where);
        // console.log('list:', list);
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

exports.findTheRecord = async (reqBody) => {
    try{
        let data = reqBody.data;
        let where = {
            _id: data._id
        }
        
        let result = await choRecord.find(where);
        return resdata('0000', 'success', result[0]);
    }catch(err){
        console.log(err);
        return errdata(err);
    }
}


async function findRecords(arr, where, skip){
    let newArr = []
    for(let i=0;i<arr.length;i++){
        let whereTime = {"actTimeStr":{
            "$gt": arr[i].startTime, 
            "$lt": arr[i].endTime
        }};
        if(where){
            whereTime = Object.assign({}, whereTime, where);
        }
        let dateException = await choRecord.find(whereTime, skip);
        // newArr.push({ time: moment(arr[i].startTime).format('YYYY-MM-DD'),  data:dateException})
        // newArr.concat(dateException);
        newArr.push({ time: moment(arr[i].startTime).format('YYYY-MM-DD'), typecode: where.typecode,  count: dateException.length})
    }
    return (newArr);    
}

exports.docreate = async (reqBody) => {

    let data = reqBody.data || {};
    try {
        let dataObg = {
            user: data.user,
            name: data.name,
            link: data.link,
            remark: data.remark,
            logoUrl: data.logoUrl,
            modalType: data.modalType,
            version: data.version,
            content: data.content,
            star: data.star,
            // type: reqBody.type,
            busType: data.busType,
            time: data.time,
            timeStr: data.timeStr,
        }
        let newUser = await choRecord.create(dataObg);
        console.log('newUser', newUser);
        return resdata('0000', 'success', newUser);
        
        
    } catch (err) {
        console.log(err)
        throw new Error(err);
        return errdata(err);
    }
}

exports.updateRecord = async (reqBody) => {
    let data = reqBody.data || {};
    let dataObg = {
        user: data.user,
        name: data.name,
        link: data.link,
        remark: data.remark,
        logoUrl: data.logoUrl,
        modalType: data.modalType,
        version: data.version,
        content: data.content,
        // type: reqBody.type,
        busType: data.busType,
        time: data.time,
        timeStr: data.timeStr,
    }
    try {
        let list = await choRecord.find({_id: data._id});
        let respon = {};
        if(list && list.length > 0) {
            let updateUser = await choRecord.update({_id: data._id}, dataObg);
            console.log(updateUser);
            respon = resdata('0000', 'success', updateUser);
        }else {
            respon = resdata('0013', 'the choRecord is not fond');
        }
        return respon;
    } catch (err) {
        console.log(err)
        throw new Error(err);
        return errdata(err);
    }
}


exports.addSea = async (reqBody) => {
    let data = reqBody.data || {};
    try {
        let list = await choRecord.find({_id: data._id});
        let respon = {};
        if(list && list.length > 0) {
            let counet = Number(list[0].sea||0) + 1 
            let updateUser = await choRecord.update({_id: data._id}, {sea: counet});
            console.log(updateUser);
            respon = resdata('0000', 'success', updateUser);
        }else {
            respon = resdata('0013', 'the choRecord is not fond');
        }
        return respon;
    } catch (err) {
        console.log(err)
        throw new Error(err);
        return errdata(err);
    }
}

exports.removeRecord = async (reqBody) => {
    let data = reqBody.data || {};
    if(!data._id) return resdata('9999', 'id is required', {});
    try {
        let list = await choRecord.delete({id: data._id});
        return resdata('0000', 'success', list);
    } catch (err) {
        return errdata(err);
    }
}