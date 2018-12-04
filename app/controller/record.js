import {record} from '../modal/record'
import {resdata, errdata} from '../../utils/serve'

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
            user: reqBody.user
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