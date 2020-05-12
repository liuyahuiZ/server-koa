import {pageConfig} from '../modal/pageConfig'
import {resdata, errdata} from '../../utils/serve'
import { filer } from '../../utils/tools';
const logUtil = require('../../utils/logUtil');

exports.pageConfigList = async (reqBody) => {

    let dataArr = {
        pageId: reqBody.obj.pageId,
        status: reqBody.obj.status
    };

    let currentPage = parseInt(reqBody.current) || 1;
    let pageSize = parseInt(reqBody.size)||10;
    let startNum =  (currentPage-1) * pageSize;
    
    let skip = {skip:startNum,limit:pageSize,sort:{"createTime":-1}};
    try {
        let allList = await pageConfig.find(dataArr);
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
            return resdata('0000', 'no more', []);
        }
        let list = await pageConfig.find(dataArr, skip) ;
        return resdata('0000', 'success', list);
    } catch (err) {
        console.log('err',err)
        return errdata(err);
    }
}

exports.pageConfigDetail = async (reqBody) => {
    // console.log(reqBody.id);
    try {
        let list = await pageConfig.findOne({_id: reqBody.id});
        return resdata('0000', 'success', list);
    } catch (err) {
        return errdata(err);
    }
}

exports.createPageConfig = async (reqBody) => {
    let dataArr = {
        createUserId: reqBody.userId,
        name: reqBody.name,
        url: reqBody.url,
        pageId: reqBody.pageId,
        channelId: reqBody.channelId,
        configJson: reqBody.configJson,
        status: reqBody.status,
        configVersion: reqBody.configVersion,
    }
    try {
        let newUser = await pageConfig.create(dataArr);
        // console.log('newUser', newUser);
        let respon = resdata('0000', 'success', newUser);
        console.log(respon);
        return respon;
    } catch (err) {
        console.log('err', err)
        throw new Error(err);
        return errdata(err);
    }
}

exports.updatePageConfig = async (reqBody) => {
    let dataArr = {
        createUserId: reqBody.userId,
        name: reqBody.name,
        url: reqBody.url,
        pageId: reqBody.pageId,
        channelId: reqBody.channelId,
        configJson: reqBody.configJson,
        status: reqBody.status,
        configVersion: reqBody.configVersion,
    }
    try {
        let list = await pageConfig.find({_id: reqBody.id});
        let respon = {};
        if(list && list.length > 0) {
            dataArr = filer(dataArr)
            let updateUser = await pageConfig.update({_id: reqBody.id}, dataArr);
            console.log(updateUser);
            respon = resdata('0000', 'success', updateUser);
        }else {
            respon = resdata('0013', 'the pageConfig is not fond');
        }
        return respon;
    } catch (err) {
        console.log(err)
        throw new Error(err);
        return errdata(err);
    }
}


exports.removePageConfig = async (reqBody) => {
    try {
        let list = await pageConfig.find({_id: reqBody.id});
        let respon = {};
        if(list && list.length > 0) {
            // let list = await pageConfig.delete(dataArr);
            let dataArr = {
                isDelete: 1
            }
            let list = await pageConfig.update({_id: reqBody.id}, dataArr);
            // console.log(updateUser);
            respon = resdata('0000', 'success', list);
        }else {
            respon = resdata('0000', 'the id is not exicet', list);
        }
        return respon;
    } catch (err) {
        throw new Error(err);
        return errdata(err);
    }
}
