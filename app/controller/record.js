import {record} from '../modal/record'
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
        let dateException = await record.count(whereTime, skip);
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
        let pageSize = reqBody.pageSize || 10;
		let pageNumber = reqBody.pageNumber || 1;
        let sec = {
            typecode: reqBody.typecode,
            user: reqBody.user||'131626'
        }
        for(let it in sec){
            if(!(sec[it]&&sec[it]!=='')) {
                delete sec[it]
            }
        }
        let whereTime = {"actTimeStr":{
            "$gt": new Date(`${reqBody.dateTime} 00:00:00`).toJSON(), 
            "$lt": new Date(`${reqBody.dateTime} 23:59:59`).toJSON()
        }};
        sec = Object.assign({}, sec, whereTime);
        console.log('sec:', sec)

        const AllCount = await record.count(sec);
		console.log('count:', AllCount);
		const where = {skip: (pageNumber - 1) * pageSize, limit:pageSize, sort:{"actTimeStr":-1}}
		let list = await record.find(sec, where);
		return resdata('0000', 'success', {
			pageInfo: {
				allCount: AllCount,
				allPage: parseFloat(AllCount / pageSize),
				pageNumber: pageNumber,
				pageSize: pageSize
			},
			record: list
		});
    }catch(err){
        console.log(err);
        return errdata(err);
    }
}


exports.getRecordListForTime = async (reqBody) => {
    try{
        let pageSize = reqBody.pageSize || 10;
		let pageNumber = reqBody.pageNumber || 1;
        let sec = {
            typecode: reqBody.typecode,
            user: reqBody.user||'131626'
        }
        for(let it in sec){
            if(!(sec[it]&&sec[it]!=='')) {
                delete sec[it]
            }
        }
        let whereTime = {"actTimeStr":{
            "$gt": new Date(`${reqBody.startDate} 00:00:00`).toJSON(), 
            "$lt": new Date(`${reqBody.endDate} 23:59:59`).toJSON()
        }};
        sec = Object.assign({}, sec, whereTime);
        console.log('sec:', sec)

        const AllCount = await record.count(sec);
		console.log('count:', AllCount);
		const where = {skip: (pageNumber - 1) * pageSize, limit:pageSize, sort:{"actTimeStr":-1}}
		let list = await record.find(sec, where);
		return resdata('0000', 'success', {
			pageInfo: {
				allCount: AllCount,
				allPage: parseFloat(AllCount / pageSize),
				pageNumber: pageNumber,
				pageSize: pageSize
			},
			record: list
		});
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
        let dateException = await record.find(whereTime, skip);
        // newArr.push({ time: moment(arr[i].startTime).format('YYYY-MM-DD'),  data:dateException})
        // newArr.concat(dateException);
        newArr.push({ time: moment(arr[i].startTime).format('YYYY-MM-DD'), typecode: where.typecode,  count: dateException.length})
    }
    return (newArr);    
}

// exports.getRecordListForType = async (reqBody) => {
//     try{
//         let typeList = await commonType.find({});
//         let userPv = [];
//         let typeArr = []
//         for(let i=0;i<typeList.length;i++){
//             typeArr.push(typeList[i].typeValue);
//             // let result = await findRecords(time, {'typecode': typeList[i].typeValue, 'user': reqBody.user||'131626'});
//             // // userPv.push({type: typeList[i], operas: result});
//             // userPv.push({type: typeList[i], operas: result});
//         }
//         let whereTime = {"actTimeStr":{
//             "$gt": new Date(`${reqBody.startDate} 00:00:00`).toJSON(), 
//             "$lt": new Date(`${reqBody.endDate} 23:59:59`).toJSON()
//         }, 'typecode': {'$in':typeArr}};
//         let dateException = await record.find(whereTime);

// 		return resdata('0000', 'success', {
// 			record: dateException
// 		});
//     }catch(err){
//         console.log(err);
//         return errdata(err);
//     }
// }

exports.getRecordListForType = async (reqBody) => {
    try{
        let typeList = await commonType.find({});
        let userPv = [];
        const time = getDate(reqBody.dateNum||7);
        for(let i=0;i<typeList.length;i++){
            let result = await findRecords(time, {'typecode': typeList[i].typeValue, 'user': reqBody.user||'131626'});
            userPv = userPv.concat(result);
            // userPv.push({type: typeList[i], operas: result});
        }
		return resdata('0000', 'success', {
			record: userPv
		});
    }catch(err){
        console.log(err);
        return errdata(err);
    }
}

exports.docreate = async (reqBody) => {
    let user = reqBody.user;
    try {
          for(let i=0;i<reqBody.records.length;i++){
            let dataObg = {
                user: user,
                content: reqBody.records[i].content,
                type: reqBody.records[i].type,
                typecode: reqBody.records[i].type.value,
                time: reqBody.records[i].time,
                timeStr: reqBody.records[i].timeStr,
                actTimeStr: reqBody.records[i].actTimeStr
            }
            if(reqBody.records[i].type.value=='身高'){
                let dataArr = {height: reqBody.records[i].content}
                let upUser = await babyUser.update({phone: user}, dataArr);
            }
            if(reqBody.records[i].type.value=='体重'){
                let dataArr = {weight: reqBody.records[i].content}
                let upUser = await babyUser.update({phone: user}, dataArr);
            }
            let newUser = await record.create(dataObg);
            console.log('newUser', newUser);
          }
          return resdata('0000', 'success');
    } catch (err) {
        console.log(err)
        throw new Error(err);
        return errdata(err);
    }
}

exports.removeRecord = async (reqBody) => {
    if(!reqBody.id) return resdata('9999', 'id is required', {});
    try {
        let list = await record.delete({id: reqBody.id});
        return resdata('0000', 'success', list);
    } catch (err) {
        return errdata(err);
    }
}