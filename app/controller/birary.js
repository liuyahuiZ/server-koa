import {storesMonitoring} from '../modal/storesMonitoring'
import {monitoringRecord} from '../modal/monitoringRecord'
import {resdata, errdata} from '../../utils/serve'

const logUtil = require('../../utils/logUtil');


exports.getStoreList = async (reqBody) => {
    let dataArr = {
    }
    let currentPage = parseInt(reqBody.currentPage) || 1;
    let pageSize = parseInt(reqBody.pageSize)||10;
    let startNum =  (currentPage-1) * pageSize;
    
    let skip = {skip:startNum,limit:pageSize,sort:{"createTime":-1}};
    try {
        let allList = await storesMonitoring.find(dataArr);
        let allPages = allList.length/pageSize;
        if(allPages>parseInt(allPages)){
            allPages=parseInt(allPages)+1
        }
        // console.log(allList, allList.length);
        let pageInfo = {
            allPage: allPages,
            allCount: allList.length,
            currentPage: currentPage,
            pageSize: pageSize,
        }
        if(currentPage>allPages) {
            return resdata('0000', 'no more', {pageInfo: pageInfo});
        }
        let list = await storesMonitoring.find(dataArr, skip);
        return resdata('0000', 'success', {pageInfo: pageInfo, list: list});
    } catch (err) {
        return errdata(err);
    }
}

exports.getStoreCollect = async (reqBody) => {
    // console.log(reqBody.id);
    let dataArr = {
    }
    let currentPage = parseInt(reqBody.currentPage) || 1;
    let pageSize = parseInt(reqBody.pageSize)||10;
    let startNum =  (currentPage-1) * pageSize;
    
    let skip = {skip:startNum,limit:pageSize,sort:{"createTime":-1}};
    try {
        let allList = await monitoringRecord.find(dataArr);
        let allPages = allList.length/pageSize;
        if(allPages>parseInt(allPages)){
            allPages=parseInt(allPages)+1
        }
        // console.log(allList, allList.length);
        let pageInfo = {
            allPage: allPages,
            allCount: allList.length,
            currentPage: currentPage,
            pageSize: pageSize,
        }
        if(currentPage>allPages) {
            return resdata('0000', 'no more', {pageInfo: pageInfo});
        }
        let list = await monitoringRecord.find(dataArr, skip);
        return resdata('0000', 'success', {pageInfo: pageInfo, list: list});
    } catch (err) {
        return errdata(err);
    }
}

exports.addStoreRecord = async (reqBody) => {
    console.log(reqBody.agent)
    let agent = reqBody.agent;
    let storeList = reqBody.storeList;

    let dataArr = {
        openId: reqBody.openId,
        systerm: agent.systerm,
        appName:  agent.appName,
        appVersion:  agent.appVersion,
        clientType: agent.clientType,
        availWidth: agent.availWidth,
        availHeight: agent.availHeight,
    }
    try {
        let list = await storesMonitoring.find({openId: reqBody.openId});
        let respon = {};
        if(list && list.length > 0) {
            
        }else {
            let updateUser = await storesMonitoring.create( dataArr);
            console.log(updateUser);
            respon = resdata('0000', 'success', updateUser);
        }
        for(let i=0;i<storeList.length;i++){
            let dataObg = {
                openId: reqBody.openId,
                name: storeList[i].name,
                content: storeList[i].content,
                type:  storeList[i].type,
                timestamp: storeList[i].timestamp,
            }
           
            let monitoringRespon = await monitoringRecord.create(dataObg);
            console.log(monitoringRespon);
        }
        respon = resdata('0000', 'the storesMonitoring is exist and add record');

        return respon;
    } catch (err) {
        console.log(err)
        throw new Error(err);
    }
}

exports.removeArticle = async (id) => {
    let dataArr = {
        id: id,
    }
    try {
        let list = await storesMonitoring.find({_id: id});
        let respon = {};
        if(list && list.length > 0) {
            let list = await storesMonitoring.delete(dataArr);
            respon = resdata('0000', 'success', list);
        }else {
            respon = resdata('0000', 'the id is not exicet', list);
        }
        return respon;
    } catch (err) {
        throw new Error(err);
    }
}
