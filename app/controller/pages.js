import {pages} from '../modal/pages'
import {pageConfig} from '../modal/pageConfig'
import {resdata, errdata} from '../../utils/serve'
import { filer } from '../../utils/tools';

const logUtil = require('../../utils/logUtil');

exports.pageList = async (reqBody) => {
    let dataArr = {
        projectId: reqBody.obj.projectId,
    }
    let currentPage = parseInt(reqBody.current) || 1;
    let pageSize = parseInt(reqBody.pageSize)||10;
    let startNum =  (currentPage-1) * pageSize;
    
    let skip = {skip:startNum,limit:pageSize,sort:{"createTime":-1}};
    try {
        dataArr = filer(dataArr)
        let allList = await pages.find(dataArr);
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
        console.log('dataArr', dataArr)
        if(currentPage>allPages) {
            return resdata('0000', 'no more', {pageInfo: pageInfo});
        }
                console.log('dataArr', dataArr)
        let list = await pages.find(dataArr, skip);
        return resdata('0000', 'success', list);
    } catch (err) {
        console.log('err',err)
        return errdata(err);
    }
}

exports.projectDetail = async (reqBody) => {
    // console.log(reqBody.id);
    try {
        let list = await pages.findOne({_id: reqBody.id});
        return resdata('0000', 'success', list);
    } catch (err) {
        return errdata(err);
    }
}

exports.createPage = async (reqBody) => {
    let dataArr = {
        createUserId: reqBody.userId,
        title: reqBody.title,
        describe: reqBody.describe,
        url: reqBody.url,
        projectId: reqBody.projectId,
        parentId: reqBody.parentId,
        templateId: reqBody.templateId,
        isDIYPage: reqBody.isDIYPage,
        pageIcon: reqBody.pageIcon,
        configId: reqBody.configId,
        weight: reqBody.weight,
        status: reqBody.status,
        feature: reqBody.feature,
    }
    try {
        let newUser = await pages.create(dataArr);
            console.log('newUser', newUser);
        let respon = resdata('0000', 'success', newUser);
        console.log(respon);
        return respon;
    } catch (err) {
        console.log('err', err)
        throw new Error(err);
        return errdata(err);
    }
}

exports.updatePage = async (reqBody) => {
    let dataArr = {
        createUserId: reqBody.userId,
        title: reqBody.title,
        describe: reqBody.describe,
        url: reqBody.url,
        projectId: reqBody.projectId,
        parentId: reqBody.parentId,
        templateId: reqBody.templateId,
        isDIYPage: reqBody.isDIYPage,
        pageIcon: reqBody.pageIcon,
        weight: reqBody.weight,
        feature: reqBody.feature,
        status: reqBody.status,
        configId: reqBody.configId,
    }
    try {
        let list = await pages.find({_id: reqBody.id});
        let respon = {};
        if(list && list.length > 0) {
            dataArr = filer(dataArr)
            let updateUser = await pages.update({_id: reqBody.id}, dataArr);
            console.log(updateUser);
            respon = resdata('0000', 'success', updateUser);
        }else {
            respon = resdata('0013', 'the pages is not fond');
        }
        return respon;
    } catch (err) {
        console.log(err)
        throw new Error(err);
        return errdata(err);
    }
}

exports.copyPage = async (reqBody) => {

    let dataArr = {
        createUserId: reqBody.userId,
        title: reqBody.title,
        describe: reqBody.describe,
        url: reqBody.url,
        projectId: reqBody.projectId,
        parentId: reqBody.parentId,
        templateId: reqBody.templateId,
        isDIYPage: reqBody.isDIYPage,
        pageIcon: reqBody.pageIcon,
        weight: reqBody.weight,
        feature: reqBody.feature,
        status: reqBody.status,
    }
    try {
        //创建page
        let newPage = await pages.create(dataArr);
            console.log('newUser', newPage);
        //查询要copy的config配置
        let list = await pageConfig.findOne({_id: reqBody.configId});
        let configArr = {
            createUserId: reqBody.userId,
            name: reqBody.name,
            url: reqBody.url,
            pageId: newPage._id,
            channelId: list.channelId,
            configJson: list.configJson,
            status: 0,
            configVersion: list.configVersion,
        }
        try {
            let newPageConfig = await pageConfig.create(configArr);
            console.log('newPageConfig', newPageConfig);
            let respon = resdata('0000', 'success', newPage);
            return respon;
        } catch (err) {
            console.log('err', err)
            throw new Error(err);
            return errdata(err);
        }
    } catch (err) {
        console.log('err', err)
        throw new Error(err);
        return errdata(err);
    }
}

exports.removePage = async (reqBody) => {
    try {
        let list = await pages.find({_id: reqBody.id});
        let respon = {};
        if(list && list.length > 0) {
            let list = await pages.delete({id: reqBody.id});
            // let dataArr = {
            //     isDelete: 1
            // }
            // let list = await pages.update({_id: reqBody.id}, dataArr);
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
