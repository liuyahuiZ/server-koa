import {project} from '../modal/project'
import {pages} from '../modal/pages'
import {resdata, errdata} from '../../utils/serve'

const logUtil = require('../../utils/logUtil');

exports.projectList = async (reqBody) => {
    let dataArr = {
    }
    let currentPage = parseInt(reqBody.current) || 1;
    let pageSize = parseInt(reqBody.size)||10;
    let startNum =  (currentPage-1) * pageSize;
    
    let skip = {skip:startNum,limit:pageSize,sort:{"createTime":-1}};
    try {
        let allList = await project.find(dataArr);
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
        let list = await project.find(dataArr, skip);
        return resdata('0000', 'success', list);
    } catch (err) {
        console.log('err',err)
        return errdata(err);
    }
}

exports.projectMenu = async (reqBody, next) => {
    try {
        let list = await project.find({}, {});
        console.log(list);
        let newList = []
        for(let i=0; i<list.length; i++){
          let dataArr = {
            projectId: list[i]._id,
          }
            let pagesList = await pages.find(dataArr, {});
          console.log('pagesList', pagesList);
        //   newList[i] = list[i];
          newList.push({ _id: list[i]._id, 
            title: list[i].title,
            describe: list[i].describe,
            projectIcon: list[i].projectIcon,
            info: list[i],
            children: pagesList});
        }
        return resdata('0000', 'success', newList);
    } catch (err) {
        console.log('err',err)
        return errdata(err);
    }
}

exports.projectDetail = async (reqBody) => {
    // console.log(reqBody.id);
    try {
        let list = await project.findOne({_id: reqBody.id});
        return resdata('0000', 'success', list);
    } catch (err) {
        return errdata(err);
    }
}

exports.createProject = async (reqBody) => {
    let dataArr = {
        createUserId: reqBody.userId,
        title: reqBody.title,
        describe: reqBody.describe,
        parentId: reqBody.parentId,
        channelId: reqBody.channelId,
        projectIcon: reqBody.projectIcon,
        weight: reqBody.weight,
        feature: reqBody.feature,
    }
    try {
        let newUser = await project.create(dataArr);
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

exports.updateProject = async (reqBody) => {
    let dataArr = {
        title: reqBody.title,
        describe: reqBody.describe,
        parentId: reqBody.parentId,
        channelId: reqBody.channelId,
        projectIcon: reqBody.projectIcon,
        weight: reqBody.weight,
        feature: reqBody.feature,
    }
    try {
        let list = await project.find({_id: reqBody.id});
        let respon = {};
        if(list && list.length > 0) {
            let updateUser = await project.update({_id: reqBody.id}, dataArr);
            console.log(updateUser);
            respon = resdata('0000', 'success', updateUser);
        }else {
            respon = resdata('0013', 'the project is not fond');
        }
        return respon;
    } catch (err) {
        console.log(err)
        throw new Error(err);
        return errdata(err);
    }
}


exports.removeProject = async (reqBody) => {
    try {
        let list = await project.find({_id: reqBody.id});
        let respon = {};
        if(list && list.length > 0) {
            // let list = await project.delete(dataArr);
            let dataArr = {
                isDelete: 1
            }
            let list = await project.update({_id: reqBody.id}, dataArr);
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
